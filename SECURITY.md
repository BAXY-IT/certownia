# Security

BAXY SSL handles cryptographic key material, so security is the whole point.

## Design guarantees

- **Private keys never leave the browser.** Both the ACME account key and the
  certificate key pair are generated with the WebCrypto API (`crypto.subtle`)
  inside the visitor's browser. The certificate private key is exported only to
  be offered as a download to the same user. No key material is ever sent to any
  server — not to the host of this site, and not to any proxy.
- **No backend by default.** The browser speaks the ACME protocol directly to
  Let's Encrypt, which serves CORS headers. There is no server in the middle
  that could observe requests. The optional proxy (`functions/`, `proxy/`) is
  off by default and, when enabled, only relays already-signed ACME requests —
  it still never sees a private key.
- **No tracking, no accounts, no server-side storage.** There is no backend that
  stores anything about you; the app runs entirely in your browser and sets no
  cookies and no analytics.
- **What the browser stores locally.** The **certificate** private key is never
  persisted — it exists only in memory and is offered to you as a download. To
  let you resume a pending verification after a reload, the app keeps the current
  session for up to 7 days (cleared on success or a fresh start): the domain(s),
  the optional email, and the pending order/challenges go in `localStorage`
  (key `certownia.session.v1`), while the ACME **account** key is stored
  separately in **IndexedDB** as a **non-extractable** WebCrypto key — it can
  sign requests but its raw key material can never be read back out, so even an
  injected script cannot exfiltrate it from storage. The account key is not the
  certificate key, never signs your certificate, and is never transmitted. UI
  preferences (language, theme) are stored separately. Clearing your browser's
  site data removes everything; avoid leaving a pending session on a shared or
  public computer.
- **Self-hosted fonts.** No third-party requests for assets (no CDN, no Google
  Fonts call), so loading the tool does not leak the visitor's IP to third parties.
- **DNS propagation checks use public DoH resolvers.** To tell you whether your
  TXT record is live and to guess your DNS provider, the app queries Cloudflare
  and Google DNS-over-HTTPS with the domain name only — never any key material.
- **The http-01 file check uses a public relay.** When you verify with the HTTP
  file method, the "is the file reachable" check fetches your challenge URL via
  `api.allorigins.win` (a browser can't read a plain-`http://` URL from an
  `https` page). That relay therefore sees the domain you are certifying and the
  public challenge path. The challenge file is public by design, so nothing
  secret is exposed, and the result is only advisory — Let's Encrypt performs the
  authoritative validation — so a misbehaving relay can at worst nudge you to
  click "Verify" early. You can skip this and open the file manually instead.
- **Content-Security-Policy — defense-in-depth, not a guarantee.** A strict CSP
  (`index.html`, plus real headers via `public/_headers` on Cloudflare Pages /
  Netlify) confines the page's network egress to Let's Encrypt, the DoH resolvers
  and the relay above. This shrinks the exfiltration surface, but it does **not**
  by itself prove a key cannot leak if the served bundle is tampered with: the
  allowed set includes a general-purpose relay and a DNS side channel. The real
  guarantee is that the code is open source and static — you can verify the
  deployed bundle.
- **The optional proxy is not an open relay.** It allow-lists the Let's Encrypt
  ACME hosts, so it cannot be abused to reach arbitrary URLs (SSRF).

## Reporting a vulnerability

Please report security issues privately to **security@baxy.it** rather than
opening a public issue. We aim to respond within a few business days.
