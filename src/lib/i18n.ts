// Minimal, dependency-free i18n. One flat dictionary per language, in
// ./locales/*. Keys are shared across languages; `t(key)` resolves against the
// active language and falls back to English (the default) for any missing key.

import { en } from "./locales/en.js";
import { pl } from "./locales/pl.js";
import { de } from "./locales/de.js";
import { es } from "./locales/es.js";
import { fr } from "./locales/fr.js";
import { it } from "./locales/it.js";
import { pt } from "./locales/pt.js";

export type Lang = "en" | "pl" | "de" | "es" | "fr" | "it" | "pt";

export type Dict = Record<string, string>;

// Order shown in the selector: English (default) first, Polish second, then a
// few of the most widely spoken languages. `label` is each language's own
// endonym so speakers recognise it regardless of the current UI language.
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pl", label: "Polski" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
];

const DICTS: Record<Lang, Dict> = { en, pl, de, es, fr, it, pt };

const SUPPORTED = new Set<string>(LANGS.map((l) => l.code));

const DEFAULT_LANG: Lang = "en";

const STORAGE_KEY = "certownia.lang";

let current: Lang = detectInitialLang();

/**
 * Decide the initial language. An explicit saved choice wins; otherwise the
 * first of the browser/system preferred languages that we support, matched on
 * the primary subtag so "de-AT" → "de"; otherwise English. Pure, so it can be
 * unit-tested without touching globals.
 */
export function resolveLang(
  saved: string | null | undefined,
  preferred: readonly string[],
): Lang {
  if (saved && SUPPORTED.has(saved)) return saved as Lang;
  for (const p of preferred) {
    const short = String(p).toLowerCase().split("-")[0];
    if (SUPPORTED.has(short)) return short as Lang;
  }
  return DEFAULT_LANG;
}

function detectInitialLang(): Lang {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* localStorage may be unavailable */
  }
  // navigator.languages is the ordered system-preference list; fall back to the
  // single navigator.language. Empty in non-browser (test) environments.
  const preferred =
    typeof navigator !== "undefined"
      ? navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
      : [];
  return resolveLang(saved, preferred);
}

export function getLang(): Lang {
  return current;
}

export function setLang(lang: Lang): void {
  current = SUPPORTED.has(lang) ? lang : DEFAULT_LANG;
  try {
    localStorage.setItem(STORAGE_KEY, current);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = current;
}

/** Translate a key, with optional positional {0},{1}… substitutions. */
export function t(key: string, ...args: (string | number)[]): string {
  const dict = DICTS[current];
  let s = dict[key] ?? en[key] ?? key;
  args.forEach((a, i) => {
    s = s.replaceAll(`{${i}}`, String(a)); // replace every occurrence, not just the first
  });
  return s;
}
