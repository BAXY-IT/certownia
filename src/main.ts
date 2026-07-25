import "./styles.css";
import { getLang, setLang, t, LANGS, type Lang } from "./lib/i18n.js";
import {
  AcmeClient,
  AcmeError,
  LE_REPOSITORY_URL,
  type AcmeEnv,
  type AcmeOrder,
  type CertificateBundle,
  type ChallengeInstruction,
  type ChallengeType,
} from "./lib/acme.js";
import {
  exportPrivateKeyPem,
  generateAccountKey,
  generateCertKey,
  type CertKeyType,
} from "./lib/crypto.js";
import { csrToAcmeBase64url } from "./lib/csr.js";
import { buildAcmeSh, buildCertbot, buildCertbotDnsCloudflare } from "./lib/commands.js";
import { copyToClipboard, downloadText } from "./lib/download.js";
import {
  clearSession,
  loadSession,
  markSessionDead,
  saveSession,
  type PersistedSession,
} from "./lib/session.js";
import { getAccountKey, putAccountKey } from "./lib/idb.js";
import { checkHttpFile, checkTxt, lookupNs } from "./lib/doh.js";
import { detectProvider, HOSTING_PANELS, type ProviderInfo } from "./lib/providers.js";

const SOURCE_URL = "https://github.com/BAXY-IT/baxy-it-ssl";
const BAXY_URL = "https://baxy.it";

// Optional ACME proxy. Empty by default — the browser talks to Let's Encrypt
// directly (it serves CORS). Set VITE_ACME_PROXY at build time only if you must
// route through your own proxy (see proxy/) or target a CA without CORS.
const ACME_PROXY = String(import.meta.env.VITE_ACME_PROXY ?? "");

// ---------------------------------------------------------------- icons
const ICON = {
  brand: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="40" height="40"><path d="M11 14v-2.5a5 5 0 0 1 10 0V14" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round"/><rect x="8.5" y="14" width="15" height="11" rx="2.6" fill="var(--accent)"/><circle cx="16" cy="18.6" r="1.7" fill="var(--paper)"/><rect x="15.2" y="19.4" width="1.6" height="3.4" rx="0.8" fill="var(--paper)"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l4-4m-4 4l-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
};

// ---------------------------------------------------------------- state
type Step = "hero" | "config" | "work" | "challenge" | "done" | "error";

interface Config {
  domains: string[];
  email: string;
  env: AcmeEnv;
  keyType: CertKeyType;
  challenge: ChallengeType;
}

interface AppState {
  step: Step;
  theme: "dark" | "light";
  config: Config | null;
  client: AcmeClient | null;
  accountKey: CryptoKeyPair | null;
  certKey: CryptoKeyPair | null;
  order: AcmeOrder | null;
  challenges: ChallengeInstruction[];
  bundle: CertificateBundle | null;
  privateKeyPem: string;
  error: string;
  workLines: string[];
}

const state: AppState = {
  step: "hero",
  theme: initTheme(),
  config: null,
  client: null,
  accountKey: null,
  certKey: null,
  order: null,
  challenges: [],
  bundle: null,
  privateKeyPem: "",
  error: "",
  workLines: [],
};

// A pending, resumable verification found in localStorage on load (or after a
// setup run). Drives the resume banner on the hero.
let pendingSession: PersistedSession | null = null;

type DohStatus = "checking" | "ok" | "pending" | "error";

// Challenge-enrichment cache (DoH propagation status + detected provider), keyed
// by statusKey. Re-renders (theme/language toggle) repaint from this cache
// instead of re-querying third-party DNS; enrichedKey gates the one-time
// auto-check per challenge set.
let enrichedKey: string | null = null;
const dohStatus = new Map<string, DohStatus>();
const providerCache = new Map<string, ProviderInfo | null>();

// true after a retry created a fresh order → the DNS record VALUE changed and
// the user must update it. Drives the "record changed" banner on the challenge.
let recordChanged = false;
// Live refs so DoH results can gate the Verify button (DNS only): it stays
// disabled until we actually detect the record in DNS.
let verifyBtn: HTMLButtonElement | null = null;
let checkBtn: HTMLButtonElement | null = null;
let gateNote: HTMLElement | null = null;
let escapeNote: HTMLElement | null = null;
let verifying = false; // a verification is in flight — block re-entrancy
let checking = false; // a propagation check is in flight — block re-entrancy
let verifyForced = false; // user chose "verify anyway" past the DoH gate
let checkedPending = false; // a manual propagation check came back not-visible

function resetEnrichment(): void {
  enrichedKey = null;
  dohStatus.clear();
  providerCache.clear();
}

function resetGate(): void {
  verifyForced = false;
  checkedPending = false;
}

// Verify is allowed once every challenge is visible ("ok"), or the user forced
// it. For DNS an "error" (both DoH resolvers unreachable — rare) also fails open;
// for HTTP the check goes through a flaky relay, so "error" does NOT auto-open —
// the user unblocks via "open the file" instead.
function verifyAllowed(): boolean {
  if (verifyForced) return true;
  const isDns = state.config?.challenge === "dns-01";
  return state.challenges.every((c) => {
    const s = dohStatus.get(statusKey(c));
    if (s === "ok") return true;
    return s === "error" && isDns;
  });
}

function updateVerifyGate(): void {
  if (state.step !== "challenge") return;
  // While a verification is in flight, keep everything locked (prevents a late
  // DoH result from re-enabling Verify and allowing a second concurrent run).
  if (verifying) {
    if (verifyBtn) verifyBtn.disabled = true;
    if (checkBtn) checkBtn.disabled = true;
    return;
  }
  const allowed = verifyAllowed();
  if (verifyBtn) verifyBtn.disabled = !allowed;
  if (checkBtn) checkBtn.disabled = checking; // don't re-enable a check that's mid-flight
  if (gateNote) gateNote.style.display = allowed ? "none" : "block";
  // Offer an escape only once the user has actively checked and it's still not
  // visible (covers a resolver false-negative on a record that is really live).
  if (escapeNote) escapeNote.style.display = !allowed && checkedPending ? "block" : "none";
}

function initTheme(): "dark" | "light" {
  try {
    const saved = localStorage.getItem("certownia.theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  return "light"; // matches baxy.it (light/paper)
}

// ---------------------------------------------------------------- dom helpers
type Props = Record<string, unknown>;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = String(v);
    else if (k === "for") (node as HTMLLabelElement).htmlFor = String(v);
    else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
    } else if (v === true) node.setAttribute(k, "");
    else node.setAttribute(k, String(v));
  }
  for (const c of children) node.append(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}

// Parse a trusted, static SVG string into a real SVG node (no innerHTML).
function icon(markup: string, cls?: string): HTMLElement {
  const doc = new DOMParser().parseFromString(markup, "image/svg+xml");
  const wrap = el("span", cls ? { class: cls } : {});
  wrap.append(document.importNode(doc.documentElement, true));
  return wrap;
}

function spinner(): HTMLElement {
  return el("span", { class: "spinner" });
}

// A small "i" icon with a hover/focus tooltip. Focusable + aria-labelled so the
// explanation is reachable by keyboard and screen readers, not just on hover.
function infoTip(text: string): HTMLElement {
  return el(
    "span",
    { class: "info-tip", tabindex: "0", role: "note", "aria-label": text },
    [icon(ICON.info, "info-ico"), el("span", { class: "tip-bubble", "aria-hidden": "true" }, [text])],
  );
}

// ---------------------------------------------------------------- shell
const root = document.getElementById("root")!;

function render(): void {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.lang = getLang();
  root.replaceChildren(renderHeader(), renderStage(), renderFooter());
}

function renderHeader(): HTMLElement {
  return el("header", { class: "site-header" }, [
    el("div", { class: "brand" }, [
      icon(ICON.brand, "brand-mark"),
      el("div", { class: "brand-text" }, [
        el("span", { class: "brand-name" }, ["BAXY SSL"]),
        el("span", { class: "brand-tag" }, [
          "by ",
          el("a", { href: BAXY_URL, target: "_blank", rel: "noopener" }, [
            "BAXY",
            el("span", { class: "dot" }, ["."]),
            "it",
          ]),
        ]),
      ]),
    ]),
    el("div", { class: "header-actions" }, [
      el(
        "button",
        {
          id: "theme-btn",
          class: "icon-btn",
          type: "button",
          "aria-label": t("a11y.theme"),
          "aria-pressed": state.theme === "dark" ? "true" : "false",
          onclick: toggleTheme,
        },
        [icon(state.theme === "dark" ? ICON.sun : ICON.moon)],
      ),
      renderLangSelect(),
    ]),
  ]);
}

// Language picker: a native <select> so the current language is always shown
// and the full list is one tap away. Its value is the active language code.
function renderLangSelect(): HTMLElement {
  const sel = el(
    "select",
    { id: "lang-select", class: "lang-select", "aria-label": t("a11y.language"), onchange: onLangChange },
    LANGS.map((l) => el("option", { value: l.code }, [l.label])),
  );
  sel.value = getLang();
  // Wrapper carries the globe icon and chevron (a native <select> can't hold
  // pseudo-elements of its own).
  return el("span", { class: "lang-select-wrap" }, [sel]);
}

function onLangChange(e: Event): void {
  setLang((e.target as HTMLSelectElement).value as Lang);
  render();
  document.getElementById("lang-select")?.focus(); // render() rebuilt the DOM
}

function renderStage(): HTMLElement {
  const views: Record<Step, () => HTMLElement> = {
    hero: renderHero,
    config: renderConfig,
    work: renderWork,
    challenge: renderChallenge,
    done: renderDone,
    error: renderError,
  };
  return el("main", { class: "stage" }, [views[state.step]()]);
}

function renderFooter(): HTMLElement {
  return el("footer", { class: "site-footer" }, [
    el("div", {}, [
      `${t("footer.madeBy")} `,
      el("a", { href: BAXY_URL, target: "_blank", rel: "noopener" }, [
        "BAXY",
        el("span", { class: "dot" }, ["."]),
        "it",
      ]),
    ]),
    el("div", { class: "foot-links" }, [
      el(
        "a",
        {
          href: `${import.meta.env.BASE_URL}privacy.${getLang()}.html`,
          target: "_blank",
          rel: "noopener",
        },
        [t("footer.privacy")],
      ),
      el(
        "a",
        {
          href: `${import.meta.env.BASE_URL}terms.${getLang()}.html`,
          target: "_blank",
          rel: "noopener",
        },
        [t("footer.terms")],
      ),
      el("a", { href: SOURCE_URL, target: "_blank", rel: "noopener" }, [t("footer.source")]),
      el(
        "a",
        { href: "https://letsencrypt.org", target: "_blank", rel: "noopener", class: "brand-tag" },
        [t("app.poweredBy")],
      ),
    ]),
    el("div", { class: "foot-note" }, [t("footer.notAffiliated")]),
  ]);
}

function stepper(active: number): HTMLElement {
  const labels = [t("step.config"), t("step.verify"), t("step.download")];
  const dots: (Node | string)[] = [];
  labels.forEach((label, i) => {
    if (i > 0) dots.push(el("span", { class: "sep" }));
    const cls = i === active ? "dot active" : i < active ? "dot done" : "dot";
    dots.push(el("span", { class: cls }, [`${i + 1} · ${label}`]));
  });
  return el("div", { class: "stepper" }, dots);
}

// ---------------------------------------------------------------- hero
function renderHero(): HTMLElement {
  const how = [
    ["1", t("hero.step1"), t("hero.step1.desc")],
    ["2", t("hero.step2"), t("hero.step2.desc")],
    ["3", t("hero.step3"), t("hero.step3.desc")],
  ].map(([n, title, desc]) =>
    el("div", { class: "how-step" }, [
      el("div", { class: "num" }, [n]),
      el("h3", {}, [title]),
      el("p", {}, [desc]),
    ]),
  );

  const section = el("section", { class: "view hero" }, [
    el("span", { class: "eyebrow" }, ["●  ", t("app.poweredBy")]),
    el("h1", {}, [t("hero.title")]),
    el("p", { class: "lede" }, [t("hero.subtitle")]),
    el("div", { class: "hero-cta" }, [
      el(
        "button",
        { class: "btn btn-primary btn-lg", type: "button", onclick: () => goto("config") },
        [t("hero.start"), icon(ICON.arrow)],
      ),
    ]),
    el("div", { class: "trust" }, [
      icon(ICON.shield, "shield"),
      el("div", {}, [el("h3", {}, [t("hero.trust.title")]), el("p", {}, [t("hero.trust.body")])]),
    ]),
    el("div", { class: "how" }, how),
    renderCliAlternative(),
  ]);
  if (pendingSession) section.prepend(renderResumeBanner());
  return section;
}

function renderResumeBanner(): HTMLElement {
  const s = pendingSession!;
  const extra = s.config.domains.length > 1 ? ` +${s.config.domains.length - 1}` : "";
  return el("div", { class: "resume" }, [
    el("div", { class: "resume-text" }, [
      el("div", {}, [t("resume.text", s.config.domains[0] + extra)]),
      el("div", { style: "margin-top:4px; color: var(--muted); font-size: 0.84rem" }, [
        t("resume.hint"),
      ]),
    ]),
    el("div", { class: "resume-actions" }, [
      el("button", { class: "btn btn-primary", type: "button", onclick: () => void resumeSession() }, [
        t("resume.continue"),
      ]),
      el("button", { class: "btn btn-ghost", type: "button", onclick: discardSession }, [
        t("resume.discard"),
      ]),
    ]),
  ]);
}

// ---------------------------------------------------------------- config
function optionTile(
  name: string,
  value: string,
  checked: boolean,
  title: string,
  hint: string,
  warn = false,
): HTMLElement {
  const children: (Node | string)[] = [
    el("input", { type: "radio", name, value, checked }),
    el("span", { class: "opt-title" }, [title]),
  ];
  if (hint) children.push(el("span", { class: "opt-hint" }, [hint]));
  return el("label", { class: warn ? "opt warn" : "opt" }, children);
}

function renderConfig(): HTMLElement {
  const errBox = el("div", { class: "form-error", style: "display:none", role: "alert" });

  const cfg0 = state.config ?? pendingSession?.config ?? null;
  const domains = el("input", {
    type: "text",
    id: "f-domains",
    placeholder: t("cfg.domains.placeholder"),
    autocomplete: "off",
    spellcheck: "false",
    value: cfg0?.domains.join(" ") ?? "",
  });
  const email = el("input", {
    type: "email",
    id: "f-email",
    placeholder: t("cfg.email.placeholder"),
    autocomplete: "off",
    value: cfg0?.email ?? "",
  });

  const env = cfg0?.env ?? "staging";
  const key = cfg0?.keyType ?? "ecdsa";
  const chal = cfg0?.challenge ?? "dns-01";

  const form = el("form", { novalidate: true }, [
    errBox,
    el("div", { class: "field" }, [
      el("label", { for: "f-domains" }, [t("cfg.domains.label")]),
      domains,
      el("div", { class: "hint" }, [t("cfg.domains.hint")]),
    ]),
    el("div", { class: "field" }, [
      el("label", { for: "f-email" }, [t("cfg.email.label")]),
      email,
      el("div", { class: "hint" }, [t("cfg.email.hint")]),
    ]),
    el("div", { class: "field" }, [
      el("label", {}, [t("cfg.env.label")]),
      el("div", { class: "options cols-2" }, [
        optionTile("env", "staging", env === "staging", t("cfg.env.staging"), t("cfg.env.staging.hint")),
        optionTile("env", "production", env === "production", t("cfg.env.production"), t("cfg.env.production.hint"), true),
      ]),
    ]),
    el("div", { class: "field" }, [
      el("label", {}, [t("cfg.challenge.label")]),
      el("div", { class: "options cols-2" }, [
        optionTile("chal", "dns-01", chal === "dns-01", t("cfg.challenge.dns"), t("cfg.challenge.dns.hint")),
        optionTile("chal", "http-01", chal === "http-01", t("cfg.challenge.http"), t("cfg.challenge.http.hint")),
      ]),
    ]),
    el("div", { class: "field" }, [
      el("label", {}, [t("cfg.keytype.label"), infoTip(t("cfg.keytype.info"))]),
      el("div", { class: "options cols-3" }, [
        optionTile("key", "ecdsa", key === "ecdsa", "ECDSA P-256", t("cfg.keytype.ecdsa.short")),
        optionTile("key", "rsa2048", key === "rsa2048", "RSA 2048", ""),
        optionTile("key", "rsa4096", key === "rsa4096", "RSA 4096", t("cfg.keytype.rsa4096.short")),
      ]),
    ]),
    el("div", { class: "field" }, [
      el("label", { class: "check" }, [
        el("input", { type: "checkbox", id: "f-tos" }),
        el("span", {}, [
          t("cfg.tos.pre"),
          el("a", { href: LE_REPOSITORY_URL, target: "_blank", rel: "noopener" }, [t("cfg.tos.link")]),
          t("cfg.tos.post"),
        ]),
      ]),
    ]),
    el("div", { class: "form-actions" }, [
      el("button", { class: "btn btn-ghost", type: "button", onclick: () => goto("hero") }, [t("cfg.back")]),
      el("button", { class: "btn btn-primary btn-block", type: "submit" }, [t("cfg.submit"), icon(ICON.arrow)]),
    ]),
  ]) as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cfg = readConfig(form);
    if (typeof cfg === "string") {
      errBox.textContent = cfg;
      errBox.style.display = "block";
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      errBox.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      return;
    }
    state.config = cfg;
    void runSetup();
  });

  return el("section", { class: "view" }, [
    stepper(0),
    el("div", { class: "panel" }, [el("h2", {}, [t("cfg.title")]), form]),
  ]);
}

const DOMAIN_RE = /^(\*\.)?([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Convert an internationalized domain (Unicode U-labels) to its ASCII A-label
// (punycode) form, which is what ACME requires. Pure-ASCII input is returned
// unchanged so junk still fails the strict regex below.
function toAscii(domain: string): string {
  const isAscii = [...domain].every((ch) => ch.charCodeAt(0) <= 127);
  if (isAscii) return domain; // pure ASCII - leave as-is
  const wild = domain.startsWith("*.");
  const base = wild ? domain.slice(2) : domain;
  try {
    const host = new URL(`https://${base}`).hostname; // URL punycodes the host
    return wild ? `*.${host}` : host;
  } catch {
    return domain;
  }
}

function readConfig(form: HTMLFormElement): Config | string {
  const raw = (form.querySelector("#f-domains") as HTMLInputElement).value;
  const domains = [
    ...new Set(
      raw
        .split(/[\s,]+/)
        .map((d) => toAscii(d.trim()).toLowerCase())
        .filter(Boolean),
    ),
  ];
  if (domains.length === 0) return t("cfg.err.domains");
  for (const d of domains) {
    if (!DOMAIN_RE.test(d)) return t("cfg.err.domainInvalid", d);
  }
  const email = (form.querySelector("#f-email") as HTMLInputElement).value.trim();
  if (email && !EMAIL_RE.test(email)) return t("cfg.err.email");

  const env = (form.querySelector('input[name="env"]:checked') as HTMLInputElement).value as AcmeEnv;
  const keyType = (form.querySelector('input[name="key"]:checked') as HTMLInputElement)
    .value as CertKeyType;
  const challenge = (form.querySelector('input[name="chal"]:checked') as HTMLInputElement)
    .value as ChallengeType;

  const wildcard = domains.find((d) => d.startsWith("*."));
  if (wildcard && challenge === "http-01") return t("cfg.err.wildcardHttp", wildcard);

  const tos = (form.querySelector("#f-tos") as HTMLInputElement).checked;
  if (!tos) return t("cfg.err.tos");

  return { domains, email, env, keyType, challenge };
}

// ---------------------------------------------------------------- work view
function renderWork(): HTMLElement {
  const lines = state.workLines.map((key) =>
    el("div", { class: "line", "data-log": key }, [el("span", { class: "mark" }, ["○"]), el("span", {}, [t(key)])]),
  );
  return el("section", { class: "view" }, [
    stepper(state.workLines.includes("work.finalizing") ? 2 : 1),
    el("div", { class: "panel" }, [
      el("h2", {}, [t("work.preparing")]),
      el("div", { class: "worklog", role: "status", "aria-live": "polite" }, lines),
    ]),
  ]);
}

function setLog(key: string, status: "active" | "done"): void {
  const line = root.querySelector(`.worklog [data-log="${key}"]`);
  if (!line) return;
  line.className = `line ${status}`;
  const mark = line.querySelector(".mark")!;
  if (status === "active") mark.replaceChildren(spinner());
  else mark.textContent = "✓";
}

// ---------------------------------------------------------------- challenge view
function copyField(text: string): HTMLElement {
  const btn = el("button", { type: "button" }, [t("chal.copy")]);
  btn.addEventListener("click", async () => {
    if (await copyToClipboard(text)) {
      btn.textContent = t("chal.copied");
      btn.classList.add("ok");
      setTimeout(() => {
        btn.textContent = t("chal.copy");
        btn.classList.remove("ok");
      }, 1600);
    }
  });
  return el("div", { class: "copyfield" }, [el("code", {}, [text]), btn]);
}

function renderChallenge(): HTMLElement {
  const isDns = state.config!.challenge === "dns-01";
  const records = state.challenges.map((c) => {
    const key = statusKey(c);
    const head = el("div", { class: "record-head" }, [
      el("span", { class: "domain" }, [c.wildcard ? `*.${c.domain}` : c.domain]),
      c.wildcard ? el("span", { class: "badge wild" }, ["wildcard"]) : "",
    ]);
    const rows: (Node | string)[] = [];
    if (isDns) {
      rows.push(
        el("span", { class: "k" }, [t("chal.dns.name")]),
        el("div", {}, [copyField(c.dnsRecordName!)]),
        el("span", { class: "k" }, [t("chal.dns.type")]),
        el("div", {}, [copyField("TXT")]),
        el("span", { class: "k" }, [t("chal.dns.value")]),
        el("div", {}, [copyField(c.dnsRecordValue!)]),
      );
    } else {
      rows.push(
        el("span", { class: "k" }, [t("chal.http.path")]),
        el("div", {}, [copyField(c.httpUrl!)]),
        el("span", { class: "k" }, [t("chal.http.content")]),
        el("div", {}, [copyField(c.httpContent!)]),
      );
    }
    const children: (Node | string)[] = [head, el("div", { class: "kv" }, rows)];
    if (!isDns) {
      const btns = el("div", { style: "display:flex; gap:8px; flex-wrap:wrap; margin-top:12px" });
      const dlBtn = el("button", { type: "button", class: "btn btn-ghost" }, [
        icon(ICON.download),
        t("chal.http.download"),
      ]);
      dlBtn.addEventListener("click", () => downloadText(c.httpFilename!, c.httpContent!, "text/plain"));
      const openBtn = el("button", { type: "button", class: "btn btn-ghost" }, [t("http.open")]);
      openBtn.addEventListener("click", () => {
        window.open(c.httpUrl!, "_blank", "noopener,noreferrer");
        // Don't blind-unlock (the user may have hit a 404): reveal the "verify
        // anyway" override so unlocking is their explicit second action.
        checkedPending = true;
        updateVerifyGate();
      });
      btns.append(dlBtn, openBtn);
      children.push(btns);
    }
    // reachability / propagation status (both methods)
    const dohNode = el("div", { class: "doh-status", "data-doh": key, role: "status", "aria-live": "polite" });
    const cachedDoh = dohStatus.get(key);
    if (cachedDoh) fillDohNode(dohNode, cachedDoh);
    children.push(dohNode);
    if (isDns) {
      const provNode = el("div", { class: "provider", "data-provider": key, style: "display:none" });
      if (providerCache.has(key)) fillProviderNode(provNode, providerCache.get(key) ?? null);
      children.push(provNode);
    }
    children.push(el("div", { class: "record-status", "data-status": key }, [el("span", {}, ["·"])]));
    return el("div", { class: "record" }, children);
  });

  const panelChildren: (Node | string)[] = [
    el("h2", {}, [t("chal.title")]),
    el("div", { class: "chal-intro" }, [isDns ? t("chal.dns.intro") : t("chal.http.intro")]),
  ];
  if (isDns && recordChanged) {
    panelChildren.push(el("div", { class: "callout warn" }, [t("chal.recordChanged")]));
  }
  panelChildren.push(...records);
  if (!isDns) {
    panelChildren.push(
      el("div", { class: "callout info", style: "margin-top:8px" }, [
        el("h4", {}, [t("http.where.title")]),
        el("p", { style: "margin:0" }, [t("http.where.body")]),
      ]),
      el("p", { class: "note" }, [t("http.checkNote")]),
    );
  }
  if (isDns) {
    panelChildren.push(el("p", { class: "note" }, [t("chal.dns.propagation")]));
    panelChildren.push(el("p", { class: "note", style: "margin-top:-14px" }, [t("doh.hint")]));
    panelChildren.push(el("p", { class: "note", style: "margin-top:-14px" }, [t("doh.privacy")]));
  }

  const actions: (Node | string)[] = [];
  const cBtn = el("button", { class: "btn btn-ghost btn-block", type: "button" }, [
    isDns ? t("doh.check") : t("http.check"),
  ]);
  cBtn.addEventListener("click", () => void checkAllPropagation(cBtn));
  checkBtn = cBtn;
  actions.push(cBtn);
  const vBtn = el("button", { class: "btn btn-primary btn-block", type: "button" }, [
    t("chal.verify"),
    icon(ICON.arrow),
  ]);
  vBtn.addEventListener("click", () => void runVerify(vBtn));
  verifyBtn = vBtn;
  actions.push(vBtn);
  panelChildren.push(
    el("div", { style: "display:flex; flex-direction:column; gap:12px; margin-top:26px" }, actions),
  );

  // Keep Verify locked until the record/file is detected (see verifyAllowed),
  // with a "verify anyway" escape once a manual check is still not visible.
  gateNote = el("p", { class: "note", style: "margin-top:10px; text-align:center" }, [
    isDns ? t("chal.verifyLocked") : t("chal.verifyLockedHttp"),
  ]);
  panelChildren.push(gateNote);

  const escapeLink = el("button", { type: "button", class: "linklike" }, [t("chal.verifyAnyway")]);
  escapeLink.addEventListener("click", () => {
    verifyForced = true;
    updateVerifyGate();
  });
  escapeNote = el("p", { class: "note", style: "margin-top:6px; text-align:center; display:none" }, [
    escapeLink,
  ]);
  panelChildren.push(escapeNote);

  updateVerifyGate();

  return el("section", { class: "view" }, [stepper(1), el("div", { class: "panel" }, panelChildren)]);
}

// ---- challenge enrichment: DNS propagation check + provider detection ----
function showChallenge(): void {
  goto("challenge");
  enrichChallenge();
}

// Runs once per challenge set (guarded by enrichedKey): check that the record /
// file is visible, and (DNS only) detect the provider. Results are cached so
// later re-renders repaint without re-querying.
function enrichChallenge(): void {
  const isDns = state.config?.challenge === "dns-01";
  const sig = state.challenges.map((c) => c.token).join("|");
  if (enrichedKey === sig) return;
  enrichedKey = sig;
  dohStatus.clear();
  providerCache.clear();
  if (isDns) {
    for (const c of state.challenges) {
      const key = statusKey(c);
      void lookupNs(c.domain)
        .then((ns) => renderProviderInto(key, detectProvider(ns)))
        .catch(() => {
          /* provider detection is best-effort */
        });
    }
  }
  void checkAllPropagation();
}

function fillDohNode(node: Element, status: DohStatus): void {
  const isDns = state.config?.challenge === "dns-01";
  const labels: Record<DohStatus, string> = isDns
    ? {
        checking: t("doh.checking"),
        ok: t("doh.ok"),
        pending: t("doh.pending"),
        error: t("doh.error"),
      }
    : {
        checking: t("httpcheck.checking"),
        ok: t("httpcheck.ok"),
        pending: t("httpcheck.pending"),
        error: t("httpcheck.error"),
      };
  node.className = `doh-status ${status === "ok" ? "ok" : status === "pending" ? "pending" : ""}`;
  node.replaceChildren();
  if (status === "checking") {
    node.append(spinner(), document.createTextNode(" " + labels.checking));
  } else {
    node.append(document.createTextNode((status === "ok" ? "✓ " : "") + labels[status]));
  }
}

function setDoh(key: string, status: DohStatus): void {
  dohStatus.set(key, status);
  const node = root.querySelector(`[data-doh="${key}"]`);
  if (node) fillDohNode(node, status);
  updateVerifyGate();
}

async function checkAllPropagation(btn?: HTMLButtonElement): Promise<void> {
  if (checking) return; // a check is already running — don't hammer the resolvers/relay
  checking = true;
  const isDns = state.config?.challenge === "dns-01";
  const checkLabel = isDns ? t("doh.check") : t("http.check");
  if (btn) {
    btn.disabled = true;
    btn.replaceChildren(
      spinner(),
      document.createTextNode(isDns ? t("doh.checking") : t("httpcheck.checking")),
    );
  }
  try {
    await Promise.all(
      state.challenges.map(async (c) => {
        const key = statusKey(c);
        setDoh(key, "checking");
        try {
          const ok = isDns
            ? await checkTxt(c.dnsRecordName!, c.dnsRecordValue!)
            : await checkHttpFile(c.httpUrl!, c.httpContent!);
          setDoh(key, ok ? "ok" : "pending");
        } catch {
          setDoh(key, "error");
        }
      }),
    );
    if (btn) {
      // The user actively checked; if any is still not visible, reveal the escape.
      checkedPending = state.challenges.some((c) => dohStatus.get(statusKey(c)) !== "ok");
      updateVerifyGate();
    }
  } finally {
    checking = false;
    if (btn) {
      // Restore the button's label (the disabled state is set by updateVerifyGate below).
      btn.replaceChildren(document.createTextNode(checkLabel));
    }
    // Refresh the gate now that `checking` is cleared. Critical for the auto
    // (no-btn) path: its final setDoh() ran while checking===true and left the
    // Check button disabled, and without this call nothing would re-enable it —
    // soft-locking the DNS-01 screen. updateVerifyGate re-derives checkBtn's
    // disabled state from `checking`/`verifying`, so it's correct for both paths.
    updateVerifyGate();
  }
}

// Collapsible list of popular hosting/DNS panels, each a real link. A native
// <select> would fire window.open on every keyboard arrow-key change (opening a
// tab per keypress — WCAG 3.2.2/3.2.5); a <details> of links only navigates on an
// explicit Enter/click, which is the correct control for an action menu.
function hostingDropdown(): HTMLElement {
  return el("details", { class: "host-details" }, [
    el("summary", {}, [t("provider.hostList")]),
    el(
      "div",
      { class: "host-list" },
      HOSTING_PANELS.map((h) =>
        el("a", { href: h.url, target: "_blank", rel: "noopener noreferrer" }, [h.name]),
      ),
    ),
  ]);
}

function fillProviderNode(node: HTMLElement, info: ProviderInfo | null): void {
  node.style.display = "block";
  node.replaceChildren();
  // Generic "add the TXT record" guide that works for any DNS panel, plus a
  // dropdown to open your host's panel. If a provider was detected we show its
  // name as a hint above the universal steps.
  const heading = info
    ? el("h4", {}, [el("span", { class: "pill" }, ["DNS"]), t("provider.detected", info.name)])
    : el("div", { style: "font-size:.86rem; color: var(--muted)" }, [t("provider.generic")]);
  node.append(
    heading,
    el(
      "ol",
      {},
      t("provider.steps")
        .split("\n")
        .map((s) => el("li", {}, [s])),
    ),
    hostingDropdown(),
  );
}

function renderProviderInto(key: string, info: ProviderInfo | null): void {
  providerCache.set(key, info);
  const node = root.querySelector(`[data-provider="${key}"]`) as HTMLElement | null;
  if (node) fillProviderNode(node, info);
}

// Unique per authorization: apex and its wildcard share identifier.value, so
// key on the wildcard-qualified name to avoid two rows colliding on one node.
function statusKey(c: ChallengeInstruction): string {
  return c.wildcard ? `*.${c.domain}` : c.domain;
}

function setRecordStatus(key: string, status: string): void {
  const node = root.querySelector(`[data-status="${key}"]`);
  if (!node) return;
  const valid = status === "valid";
  const invalid = status === "invalid";
  node.className = `record-status${valid ? " valid" : invalid ? " invalid" : ""}`;
  node.textContent = valid ? "✓ valid" : invalid ? "✕ invalid" : `… ${status}`;
}

// ---------------------------------------------------------------- done view
function downloadTile(
  cls: string,
  title: string,
  file: string,
  content: string,
  hint?: string,
): HTMLElement {
  const meta: (Node | string)[] = [
    el("span", { class: "dl-title", style: "display:block" }, [title]),
    el("span", { class: "dl-file" }, [file]),
  ];
  if (hint) meta.push(el("span", { class: "dl-hint" }, [hint]));
  const btn = el("button", { class: cls, type: "button" }, [
    icon(ICON.download, "dl-ic"),
    el("span", {}, meta),
  ]);
  btn.addEventListener("click", () => downloadText(file, content, "application/x-pem-file"));
  return btn;
}

// Reusable certbot ⇄ acme.sh command toggle with a copy button.
function cmdToggle(certbot: string, acmesh: string): HTMLElement {
  const cmds: Record<string, string> = { certbot, acmesh };
  let current = "certbot";

  const codeEl = el("code", {}, [cmds.certbot]);
  const copyBtn = el("button", { type: "button" }, [t("chal.copy")]);
  copyBtn.addEventListener("click", async () => {
    if (await copyToClipboard(cmds[current])) {
      copyBtn.textContent = t("chal.copied");
      copyBtn.classList.add("ok");
      setTimeout(() => {
        copyBtn.textContent = t("chal.copy");
        copyBtn.classList.remove("ok");
      }, 1600);
    }
  });
  const field = el("div", { class: "copyfield" }, [codeEl, copyBtn]);

  const tabs = el("div", { class: "cmd-tabs" });
  (
    [
      ["certbot", "certbot"],
      ["acmesh", "acme.sh"],
    ] as const
  ).forEach(([id, label]) => {
    const btn = el("button", { type: "button", class: id === current ? "cmd-tab active" : "cmd-tab" }, [
      label,
    ]);
    btn.addEventListener("click", () => {
      current = id;
      codeEl.textContent = cmds[id];
      [...tabs.children].forEach((c) => (c as HTMLElement).classList.remove("active"));
      btn.classList.add("active");
    });
    tabs.append(btn);
  });

  return el("div", {}, [tabs, field]);
}

// Landing-page alternative: the same one-off issuance straight from the terminal
// (it also prompts for a manual DNS record — so it's a real alternative path),
// with automatic renewal tucked into a collapsible below.
function renderCliAlternative(): HTMLElement {
  const certbot = buildCertbot(["example.com"], "dns-01", false);
  const acmesh = buildAcmeSh(["example.com"], "dns-01", false);
  return el("section", { class: "cli-alt" }, [
    el("h3", {}, [t("alt.title")]),
    el("p", { class: "cli-alt-body" }, [t("alt.body")]),
    cmdToggle(certbot, acmesh),
    el("p", { class: "note", style: "margin:10px 0 0" }, [t("alt.note")]),
    el("p", { class: "note", style: "margin:6px 0 0" }, [t("cmd.caveat")]),
    el("details", { class: "renew-details" }, [
      el("summary", {}, [t("alt.renewToggle")]),
      renderRenewalGuide(["example.com"]),
    ]),
  ]);
}

// How to make the certificate renew itself (shared hosting vs VPS). Reused on the
// done screen (real domains) and the landing collapsible (a placeholder domain).
function renderRenewalGuide(domains: string[], email?: string): HTMLElement {
  // certonly renews the files but doesn't reload the web server — a deploy hook
  // does. nginx is the common default; the copy tells Apache users to swap it.
  const hook = ' --deploy-hook "systemctl reload nginx"';
  const webroot = buildCertbot(domains, "http-01", false, email) + hook;
  const dns = buildCertbotDnsCloudflare(domains, email) + hook;
  return el("div", { class: "callout", style: "margin-top:18px" }, [
    el("h4", {}, [t("renew.title")]),
    el("p", { style: "margin:0 0 14px" }, [t("renew.body")]),
    el("div", { class: "renew-case" }, [
      el("h5", {}, [t("renew.shared.title")]),
      el("p", { style: "margin:0" }, [t("renew.shared.body")]),
    ]),
    el("div", { class: "renew-case" }, [
      el("h5", {}, [t("renew.vps.title")]),
      el("p", { style: "margin:0 0 10px" }, [t("renew.vps.body")]),
      el("p", { class: "renew-method" }, [t("renew.webroot.label")]),
      copyField(webroot),
      el("p", { class: "renew-method" }, [t("renew.dns.label")]),
      el("p", { class: "note", style: "margin:4px 0 6px" }, [t("renew.dns.steps")]),
      copyField(dns),
    ]),
  ]);
}

function mapRow(field: string, file: string): HTMLElement {
  return el("div", { class: "maprow" }, [
    el("span", { class: "mapfield" }, [field]),
    el("span", { class: "maparrow" }, ["→"]),
    el("code", {}, [file]),
  ]);
}

function renderDone(): HTMLElement {
  const b = state.bundle!;
  const staging = state.config!.env === "staging";
  const panelChildren: (Node | string)[] = [
    icon(ICON.check, "success-mark"),
    el("h2", {}, [t("done.title")]),
    el("p", { class: "sub" }, [t("done.subtitle")]),
  ];
  if (staging) {
    panelChildren.push(
      el("div", { class: "callout warn", style: "margin-bottom:8px" }, [t("done.staging.warning")]),
    );
  }

  panelChildren.push(
    // Step 1 — download the files
    el("h3", { class: "step" }, [t("done.step1")]),
    el("p", { class: "step-body" }, [t("done.step1.body")]),
    el("div", { class: "downloads" }, [
      downloadTile("dl primary", t("done.dl.fullchain"), "fullchain.pem", b.fullchain, t("done.dl.fullchain.h")),
      downloadTile("dl", t("done.dl.key"), "privkey.pem", state.privateKeyPem, t("done.dl.key.h")),
      downloadTile("dl", t("done.dl.cert"), "cert.pem", b.cert, t("done.dl.cert.h")),
      downloadTile("dl", t("done.dl.chain"), "chain.pem", b.chain, t("done.dl.chain.h")),
    ]),

    // Step 2 — install in the hosting panel (file → field mapping)
    el("h3", { class: "step" }, [t("done.step2")]),
    el("p", { class: "step-body" }, [t("done.step2.body")]),
    el("div", { class: "filemap" }, [
      mapRow(t("done.map.key"), "privkey.pem"),
      mapRow(t("done.map.cert"), "cert.pem"),
      mapRow(t("done.map.chain"), "chain.pem"),
    ]),
    el("div", { class: "callout info", style: "margin:12px 0" }, [t("done.map.fullchain")]),
    el("p", { class: "step-body" }, [t("done.step2.how")]),
    el("div", { class: "callout warn" }, [t("done.secret")]),

    // Own server (VPS)
    el("div", { class: "callout", style: "margin-top:18px" }, [
      el("h4", {}, [t("done.whatnow")]),
      el("p", { style: "margin:0" }, [t("done.whatnow.body")]),
    ]),

    // Automatic renewal (certbot / acme.sh)
    renderRenewalGuide(state.config!.domains, state.config!.email || undefined),

    el("p", { class: "note", style: "margin-top:18px" }, [t("done.expiry")]),
    el("div", { class: "form-actions" }, [
      el("button", { class: "btn btn-ghost", type: "button", onclick: resetFlow }, [t("done.again")]),
    ]),
  );
  return el("section", { class: "view" }, [stepper(2), el("div", { class: "panel" }, panelChildren)]);
}

// ---------------------------------------------------------------- error view
function renderError(): HTMLElement {
  // If we still have the domain + account, the user can retry without redoing
  // anything: "Try again" makes a fresh order for the same domains.
  const canRetry = !!(state.config && state.accountKey);
  const actions: (Node | string)[] = [];
  if (canRetry) {
    actions.push(
      el("button", { class: "btn btn-primary", type: "button", onclick: () => void retryOrder() }, [
        t("err.retry"),
      ]),
    );
  }
  actions.push(
    el(
      "button",
      { class: canRetry ? "btn btn-ghost" : "btn btn-primary", type: "button", onclick: resetFlow },
      [t("err.startOver")],
    ),
  );
  return el("section", { class: "view" }, [
    el("div", { class: "panel" }, [
      el("h2", {}, [t("err.title")]),
      el("div", { class: "form-error", style: "display:block; white-space:pre-wrap" }, [state.error]),
      el("div", { class: "form-actions" }, actions),
    ]),
  ]);
}

// ---------------------------------------------------------------- flow
function goto(step: Step): void {
  state.step = step;
  render();
}

function toggleTheme(): void {
  state.theme = state.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("certownia.theme", state.theme);
  } catch {
    /* ignore */
  }
  render();
  document.getElementById("theme-btn")?.focus(); // render() rebuilt the DOM
}

function resetFlow(): void {
  clearSession();
  pendingSession = null;
  resetEnrichment();
  resetGate();
  recordChanged = false;
  // Null all four challenge-screen refs together (they now point at detached
  // nodes); state.accountKey is deliberately kept so "generate another" reuses
  // the same ACME account.
  verifyBtn = null;
  checkBtn = null;
  gateNote = null;
  escapeNote = null;
  state.certKey = null;
  state.order = null;
  state.challenges = [];
  state.bundle = null;
  state.privateKeyPem = "";
  state.client = null;
  goto("config");
}

function discardSession(): void {
  clearSession();
  pendingSession = null;
  render();
}

// Rebuild the client from a persisted session and jump back to the SAME
// challenge (same DNS/HTTP value). The account key restores the account
// idempotently; the certificate key is regenerated later at finalize.
async function resumeSession(): Promise<void> {
  const s = pendingSession;
  if (!s) return;
  resetEnrichment();
  resetGate();
  recordChanged = false;
  state.workLines = ["resume.restoring"];
  goto("work");
  setLog("resume.restoring", "active");
  try {
    const accountKey = await getAccountKey();
    if (!accountKey) {
      // The account key is gone (storage cleared/blocked) — can't resume safely.
      clearSession();
      pendingSession = null;
      goto("config");
      return;
    }
    const client = new AcmeClient(s.config.env, accountKey, ACME_PROXY);
    await client.init();
    await client.createAccount(s.config.email || undefined);

    state.config = { ...s.config };
    state.accountKey = accountKey;
    state.client = client;
    state.certKey = null;

    if (s.orderDead) {
      // The previous order failed validation — go straight to a fresh order
      // instead of restoring the dead one (no wasted verify → fail round-trip).
      await retryOrder();
      return;
    }

    client.restoreOrder(s.orderUrl);
    state.order = s.order;
    state.challenges = s.challenges;
    recordChanged = s.recordChanged ?? false; // keep the "value changed" banner
    showChallenge();
  } catch (e) {
    clearSession();
    pendingSession = null;
    fail(e);
  }
}

function describeError(e: unknown): string {
  if (e instanceof AcmeError) {
    if (e.isRateLimit) return `${t("err.rateLimited")}\n\n${e.detail}`;
    return e.detail;
  }
  // Browser fetch network failures surface as TypeError ("Failed to fetch" /
  // "NetworkError…" / "Load failed"). Match those, not every TypeError.
  if (e instanceof TypeError && /fetch|network|load failed/i.test(e.message)) return t("err.network");
  return e instanceof Error ? e.message : String(e);
}

function fail(e: unknown): void {
  console.error("[certownia]", e);
  state.error = describeError(e);
  goto("error");
}

// Persist the pending session so the tab can be closed and resumed later. The
// account key goes to IndexedDB as a non-extractable CryptoKey; the domains,
// order and challenges go to localStorage. Best-effort: if storage is
// unavailable the flow still completes, only resume is lost.
async function persistSession(orderUrl: string): Promise<void> {
  if (!state.config || !state.accountKey || !state.order) return;
  try {
    await putAccountKey(state.accountKey);
    saveSession({
      config: state.config,
      order: state.order,
      orderUrl,
      challenges: state.challenges,
      recordChanged,
    });
    pendingSession = loadSession();
  } catch {
    /* persistence is best-effort */
  }
}

async function runSetup(): Promise<void> {
  const cfg = state.config!;
  resetEnrichment();
  resetGate();
  recordChanged = false;
  state.workLines = [
    "work.genAccountKey",
    "work.genCertKey",
    "work.register",
    "work.newOrder",
    "work.fetchChallenges",
  ];
  goto("work");

  try {
    setLog("work.genAccountKey", "active");
    if (!state.accountKey) state.accountKey = await generateAccountKey();
    setLog("work.genAccountKey", "done");

    setLog("work.genCertKey", "active");
    state.certKey = await generateCertKey(cfg.keyType);
    setLog("work.genCertKey", "done");

    setLog("work.register", "active");
    state.client = new AcmeClient(cfg.env, state.accountKey, ACME_PROXY);
    await state.client.init();
    await state.client.createAccount(cfg.email || undefined);
    setLog("work.register", "done");

    setLog("work.newOrder", "active");
    state.order = await state.client.newOrder(cfg.domains);
    setLog("work.newOrder", "done");

    setLog("work.fetchChallenges", "active");
    state.challenges = await state.client.getChallenges(state.order, cfg.challenge);
    setLog("work.fetchChallenges", "done");

    if (state.challenges.length === 0) {
      await runFinalize(); // every identifier already authorized
    } else {
      // Persist so the user can close the tab and return to the SAME record.
      if (state.client.pendingOrderUrl && state.accountKey && state.order) {
        await persistSession(state.client.pendingOrderUrl);
      }
      showChallenge();
    }
  } catch (e) {
    fail(e);
  }
}

async function runVerify(btn: HTMLButtonElement): Promise<void> {
  if (verifying) return; // guard against a second concurrent verification
  verifying = true;
  btn.disabled = true;
  if (checkBtn) checkBtn.disabled = true; // no propagation re-check mid-verify
  btn.replaceChildren(spinner(), document.createTextNode(t("chal.verifying")));
  try {
    await state.client!.verifyChallenges(state.challenges, (c, status) =>
      setRecordStatus(statusKey(c), status),
    );
    await runFinalize();
  } catch (e) {
    // Don't wipe anything: keep the domain, config and account so the user can
    // retry without re-entering everything. A failed challenge makes the ACME
    // order terminal, so "Try again" on the error screen creates a fresh order
    // for the SAME domains — same record name, new value.
    console.error("[certownia]", e);
    const transient =
      e instanceof AcmeError &&
      (e.type === "timeout" || e.isBadNonce || e.type === "unexpected" || e.type === "nonce");
    if (e instanceof AcmeError && e.isRateLimit) {
      state.error = `${t("err.rateLimited")}\n\n${e.detail}`;
    } else if (transient) {
      // Not a terminal authorization failure — the order is likely still pending
      // and reusable, so DON'T mark it dead (a fresh order would force the user to
      // publish a new DNS value for nothing).
      state.error = `${t("err.network")}\n\n${(e as AcmeError).detail}`;
    } else if (e instanceof AcmeError) {
      state.error = `${t("err.verifyFailed")}\n\n${e.detail}`;
      // The authorization is terminally invalid — mark the saved order dead so a
      // later resume issues a fresh one instead of re-failing on this one.
      markSessionDead();
      pendingSession = loadSession();
    } else {
      state.error = describeError(e);
    }
    goto("error");
  } finally {
    verifying = false;
  }
}

// Retry after a failed verification WITHOUT starting over: reuse the same
// account key and config, create a fresh order (same domains → same record
// name, new value) and go back to the challenge screen.
async function retryOrder(): Promise<void> {
  const cfg = state.config;
  if (!cfg || !state.accountKey) {
    goto("config");
    return;
  }
  resetEnrichment();
  resetGate();
  recordChanged = true; // fresh order → the record value changed
  state.workLines = ["work.newOrder", "work.fetchChallenges"];
  goto("work");
  try {
    if (!state.client) {
      state.client = new AcmeClient(cfg.env, state.accountKey, ACME_PROXY);
      await state.client.init();
      await state.client.createAccount(cfg.email || undefined);
    }
    setLog("work.newOrder", "active");
    state.order = await state.client.newOrder(cfg.domains);
    setLog("work.newOrder", "done");

    setLog("work.fetchChallenges", "active");
    state.challenges = await state.client.getChallenges(state.order, cfg.challenge);
    setLog("work.fetchChallenges", "done");

    if (state.challenges.length === 0) {
      await runFinalize(); // every identifier already authorized
      return;
    }
    if (state.client.pendingOrderUrl && state.order) {
      await persistSession(state.client.pendingOrderUrl);
    }
    showChallenge();
  } catch (e) {
    fail(e);
  }
}

async function runFinalize(): Promise<void> {
  const cfg = state.config!;
  state.workLines = ["work.finalizing", "work.downloading"];
  goto("work");
  try {
    setLog("work.finalizing", "active");
    if (!state.certKey) state.certKey = await generateCertKey(cfg.keyType); // resumed session
    const csr = await csrToAcmeBase64url(cfg.domains, state.certKey);
    // Export the private key BEFORE finalize: if this WebCrypto export ever fails,
    // it must not happen AFTER the certificate is already issued (a retry would
    // then re-order and burn a duplicate-certificate rate-limit slot).
    state.privateKeyPem = await exportPrivateKeyPem(state.certKey.privateKey);
    state.certKey = null; // PEM captured — drop the extractable key from memory
    state.bundle = await state.client!.finalize(state.order!, csr);
    setLog("work.finalizing", "done");

    setLog("work.downloading", "active");
    setLog("work.downloading", "done");

    clearSession(); // certificate issued — the pending session is done
    pendingSession = null;
    goto("done");
  } catch (e) {
    fail(e);
  }
}

// ---------------------------------------------------------------- boot
// Reflect the detected language on <html lang> without persisting it — so the
// system language keeps being followed on each visit until the user makes an
// explicit choice (which setLang() then saves).
document.documentElement.lang = getLang();
pendingSession = loadSession();
render();
