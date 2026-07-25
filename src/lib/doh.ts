// DNS-over-HTTPS lookups (Cloudflare with a Google fallback). Both endpoints
// send CORS headers, so this works straight from the browser. Used to (a) tell
// the user whether their TXT record has propagated before they trigger ACME
// validation, and (b) detect their DNS provider from the zone's NS records.

const ENDPOINTS = [
  (name: string, type: string) =>
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
  (name: string, type: string) =>
    `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`,
];

interface DohAnswer {
  name?: string;
  type?: number;
  data?: string;
}
interface DohJson {
  Answer?: DohAnswer[];
  Authority?: DohAnswer[];
}

async function dohJson(name: string, type: string): Promise<DohJson | null> {
  for (const build of ENDPOINTS) {
    try {
      const res = await fetch(build(name, type), { headers: { accept: "application/dns-json" } });
      if (res.ok) return (await res.json()) as DohJson;
    } catch {
      /* try next endpoint */
    }
  }
  return null;
}

// Strip the quotes DoH puts around a TXT value. This handles a SINGLE character
// string only — enough for ACME dns-01 tokens (a 43-char base64url string, no
// spaces, no escapes). It does NOT reassemble multi-string TXT records
// ("aaa" "bbb") or decode DNS presentation-format escapes; don't reuse it for
// arbitrary TXT lookups without extending it.
function unquoteTxt(data: string): string {
  return data
    .trim()
    .replace(/^"(.*)"$/s, "$1")
    .replace(/\\"/g, '"');
}

/** True if a TXT record with `expected` value is already visible for `name`. */
export async function checkTxt(name: string, expected: string): Promise<boolean> {
  const j = await dohJson(name, "TXT");
  if (!j) throw new Error("DoH lookup failed");
  return (j.Answer ?? []).some((a) => unquoteTxt(String(a.data ?? "")) === expected);
}

/**
 * Best-effort http-01 file check. The browser can't read the challenge file
 * itself (it's served on :80 → mixed content from our HTTPS page, and the user's
 * server sends no CORS header), so we ask a public relay to fetch it and compare
 * the body. The http-01 file is public by design, so nothing secret is exposed;
 * if the relay is unavailable this throws and the UI falls back to "open the file".
 */
export async function checkHttpFile(url: string, expected: string): Promise<boolean> {
  // Cache-buster so the relay doesn't return a stale "miss" cached from before
  // the file existed (static servers ignore the query string on the file path).
  const target = `${url}${url.includes("?") ? "&" : "?"}cb=${Date.now()}`;
  const relay = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;
  const res = await fetch(relay, { cache: "no-store" });
  if (!res.ok) throw new Error("relay failed");
  // Let's Encrypt ignores TRAILING whitespace only — mirror that, not a full trim.
  return (await res.text()).replace(/\s+$/, "") === expected;
}

/** Return the zone's NS hostnames (walks up to the apex; merges Authority). */
export async function lookupNs(domain: string): Promise<string[]> {
  const base = domain.replace(/^\*\./, "");
  const labels = base.split(".");
  const candidates = [base];
  if (labels.length > 2) candidates.push(labels.slice(-2).join("."));
  if (labels.length > 3) candidates.push(labels.slice(-3).join("."));

  const out = new Set<string>();
  for (const c of candidates) {
    const j = await dohJson(c, "NS");
    const records = [...(j?.Answer ?? []), ...(j?.Authority ?? [])].filter((r) => r.type === 2);
    for (const r of records) out.add(String(r.data ?? "").replace(/\.$/, "").toLowerCase());
    if (out.size) break;
  }
  return [...out];
}
