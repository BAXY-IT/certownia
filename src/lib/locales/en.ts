import type { Dict } from "../i18n.js";

// English — the default language and the fallback for any missing key.
export const en: Dict = {
  "app.poweredBy": "Powered by Let's Encrypt",

  "hero.title": "A free SSL certificate in minutes",
  "hero.subtitle":
    "Generate a trusted HTTPS certificate for your domain. Free, no sign-up, nothing to install.",
  "hero.trust.title": "Your private key never leaves this computer",
  "hero.trust.body":
    "All cryptography happens in your browser, which talks to Let's Encrypt directly. No server sits in the middle, and nobody sees your private key. The code is open source — you can verify it yourself.",
  "hero.start": "Get started",
  "hero.step1": "Enter your domain",
  "hero.step1.desc": "Type the address you want a certificate for.",
  "hero.step2": "Prove ownership",
  "hero.step2.desc": "Add a DNS record or a file on your server — we show the exact one.",
  "hero.step3": "Download the certificate",
  "hero.step3.desc": "Private key and certificate land on your disk.",

  "cfg.title": "Certificate configuration",
  "cfg.domains.label": "Domains",
  "cfg.domains.hint":
    "One or more domains (separate with space or comma). Wildcard * is only possible with DNS validation.",
  "cfg.domains.placeholder": "example.com www.example.com",
  "a11y.theme": "Toggle light/dark theme",
  "a11y.language": "Language",
  "cfg.email.label": "Email (optional)",
  "cfg.email.hint":
    "Let's Encrypt uses it only for expiry notifications. You may leave it blank.",
  "cfg.email.placeholder": "you@example.com",
  "cfg.env.label": "Environment",
  "cfg.env.staging": "Testing (staging)",
  "cfg.env.staging.hint":
    "Recommended first. The certificate is NOT trusted by browsers, but it does not consume rate limits. Ideal to confirm everything works.",
  "cfg.env.production": "Production (real certificate)",
  "cfg.env.production.hint":
    "Issues a browser-trusted certificate. Let's Encrypt rate limits apply — use once your test passed.",
  "cfg.keytype.label": "Key type",
  "cfg.keytype.info":
    "ECDSA P-256 — a modern, short key: faster and lighter. Recommended for new servers.\nRSA 2048 — the classic standard: works almost everywhere, incl. older systems.\nRSA 4096 — a longer RSA key: widest compatibility and more security margin, but slower.\nNot sure? Keep ECDSA P-256.",
  "cfg.keytype.ecdsa.short": "recommended, faster",
  "cfg.keytype.rsa4096.short": "widest compatibility",
  "cfg.challenge.label": "Verification method",
  "cfg.challenge.dns": "DNS (TXT record)",
  "cfg.challenge.dns.hint":
    "Works everywhere, required for wildcard certificates. You need access to the domain's DNS settings.",
  "cfg.challenge.http": "File on server (HTTP)",
  "cfg.challenge.http.hint":
    "Simpler if you have access to the domain's web server. Does not work for wildcard.",
  "cfg.tos.pre": "I accept the ",
  "cfg.tos.link": "Let's Encrypt Subscriber Agreement",
  "cfg.tos.post": ".",
  "cfg.submit": "Continue",
  "cfg.back": "Back",

  "cfg.err.domains": "Enter at least one valid domain.",
  "cfg.err.domainInvalid": "Invalid domain: {0}",
  "cfg.err.wildcardHttp":
    "Wildcard domain ({0}) requires DNS validation — switch the verification method.",
  "cfg.err.email": "Invalid email address.",
  "cfg.err.tos": "You must accept the terms to continue.",

  "work.preparing": "Preparing…",
  "work.genAccountKey": "Generating ACME account key in your browser…",
  "work.genCertKey": "Generating certificate private key in your browser…",
  "work.register": "Registering account with Let's Encrypt…",
  "work.newOrder": "Creating the certificate order…",
  "work.fetchChallenges": "Fetching verification challenges…",
  "work.finalizing": "Sending the signing request (CSR)…",
  "work.downloading": "Downloading the finished certificate…",

  "chal.title": "Prove the domain is yours",
  "chal.dns.intro":
    "Add the TXT records below in your domain's DNS panel. After saving and propagation, click “Verify”.",
  "chal.http.intro":
    "Place the files below on your web server (at the exact URL shown), then click “Verify”.",
  "chal.dns.name": "Name / host",
  "chal.dns.type": "Type",
  "chal.dns.value": "Value",
  "chal.http.path": "File URL",
  "chal.http.content": "File content",
  "chal.http.download": "Download file",
  "chal.copy": "Copy",
  "chal.copied": "Copied!",
  "chal.dns.propagation":
    "Note: DNS changes can take a few minutes to an hour to propagate. If verification fails, wait and retry.",
  "chal.verify": "Verify domain",
  "chal.verifying": "Verifying…",
  "chal.verifyLocked":
    "The “Verify” button unlocks once we detect the record in DNS. Add the record, then click “Check whether the record is visible yet”.",
  "chal.recordChanged":
    "After the failed attempt we generated a fresh record. The name is the same, but the VALUE changed — replace it in DNS, check propagation, then verify.",
  "chal.verifyAnyway": "Sure it's added but we still don't detect it? Verify anyway.",

  "doh.check": "Check whether the record is visible yet",
  "doh.checking": "Checking DNS…",
  "doh.ok": "Record visible in DNS — you can verify now",
  "doh.pending": "Not visible yet — wait a moment and check again",
  "doh.error": "Could not check DNS — try again",
  "doh.hint":
    "Check propagation first so you don't click “Verify” blindly (a failed attempt requires generating a new record).",
  "doh.privacy":
    "The propagation check uses Cloudflare and Google public DNS — only your domain name is sent to them.",

  "provider.detected": "Detected DNS provider: {0}",
  "provider.hostList": "Open your hosting panel…",
  "provider.steps":
    "Log in to your hosting or DNS provider's panel.\nOpen your domain's DNS settings (“DNS zone” / “Edit DNS” / “DNS records”).\nAdd a new TXT record — use the “Host/Name” and “Value” from the table above.\nSave and wait a few minutes for the change to propagate.",
  "provider.generic": "Add the record in your domain provider's DNS panel.",

  "http.where.title": "Where to put the file",
  "http.where.body":
    "Place the file on the domain's web server so it is reachable at exactly the URL above — i.e. the .well-known/acme-challenge folder in your site root. It must work over HTTP (port 80).",
  "httpcheck.checking": "Checking the file…",
  "httpcheck.ok": "File visible — you can verify now",
  "httpcheck.pending": "File not found (or wrong content) — check and retry",
  "httpcheck.error": "Couldn't check automatically — open the file manually",
  "http.check": "Check whether the file is reachable",
  "http.open": "Open the file",
  "http.checkNote":
    "The automatic check is approximate — the file is fetched by a third-party relay (allorigins.win), since the browser can't read it directly. If it doesn't work, click “Open the file”, confirm you can see the file's content, then click “Verify anyway”.",
  "chal.verifyLockedHttp":
    "The “Verify” button unlocks once we detect the file. Click “Check whether the file is reachable” or “Open the file”.",

  "resume.text": "You have an unfinished verification for {0}.",
  "resume.hint": "You can return to it — the data (record) is the same, nothing to re-add.",
  "resume.continue": "Resume verification",
  "resume.discard": "Start over",
  "resume.restoring": "Restoring saved verification…",

  "done.title": "Done! Your SSL certificate is ready",
  "done.subtitle":
    "Step by step below: what to download and exactly where to paste it. You don't need to understand cryptography — just match the files to the fields in your panel.",
  "done.staging.warning":
    "This is a TEST (staging) certificate — browsers will not trust it. Once everything works, come back and issue a production certificate.",

  "done.step1": "Step 1 · Download the files",
  "done.step1.body":
    "These are plain text files (.pem). You don't always need all of them — step 2 tells you which to use.",
  "done.dl.key": "Private key",
  "done.dl.key.h": "Secret — keep it to yourself, never send it to anyone.",
  "done.dl.cert": "Certificate only",
  "done.dl.cert.h": "Your domain's certificate.",
  "done.dl.chain": "Chain / Root CA",
  "done.dl.chain.h": "The authority's intermediate certificates.",
  "done.dl.fullchain": "Certificate + chain together",
  "done.dl.fullchain.h": "One file: certificate and chain. Common in Nginx and when a panel asks for “fullchain”.",

  "done.step2": "Step 2 · Add the files in your hosting panel",
  "done.step2.body":
    "Open your hosting panel → the “SSL” or “Certificates” section. You'll see fields to paste into. Match the files to the fields by name:",
  "done.map.key": "“Private key” field",
  "done.map.cert": "“Certificate” field",
  "done.map.chain": "“Root CA”, “CA” or “chain” field",
  "done.map.fullchain":
    "Panel has only one certificate field or asks for “fullchain”? Then use fullchain.pem instead of cert.pem and chain.pem.",
  "done.step2.how":
    "Open each file in a text editor, select and copy the WHOLE contents — including the “-----BEGIN…” and “-----END…” lines — and paste it into the right field. Then save. The certificate usually works right away (sometimes after a short wait).",
  "done.secret":
    "The private key (privkey.pem) is secret — keep it to yourself and never send it or paste it anywhere untrusted.",

  "done.expiry":
    "The certificate is valid for 90 days — then it must be renewed. Set a reminder, or (if you run your own server) automate it as below.",
  "done.whatnow": "Running your own server (VPS)?",
  "done.whatnow.body":
    "In the config point: certificate = fullchain.pem, private key = privkey.pem. In Nginx that's ssl_certificate and ssl_certificate_key; in Apache SSLCertificateFile and SSLCertificateKeyFile.",
  "alt.title": "Prefer the terminal? Do it on your server",
  "alt.body":
    "The same thing, but as a command on your server: certbot (or acme.sh) will ask you to add a TXT record — exactly like the wizard above — and issue the certificate. Just swap example.com for your domain.",
  "alt.note": "This is a one-off command — it doesn't renew itself.",
  "alt.renewToggle": "Automatic renewal — how to set it up (expand)",

  "renew.title": "How to make the certificate renew itself",
  "renew.body":
    "The certificate is valid for 90 days. Instead of doing this by hand every 3 months, pick your situation:",
  "renew.shared.title": "Shared hosting (cyberFolks, OVH, nazwa.pl…)",
  "renew.shared.body":
    "Easiest: your hosting panel usually has a free, self-renewing SSL certificate (Let's Encrypt / AutoSSL). Enable it once and you're done — look for an “SSL” or “Certificates” section. Then you need neither certbot nor BAXY SSL.",
  "renew.vps.title": "Have your own server (VPS) and want full automation?",
  "renew.vps.body":
    "Use certbot — it renews the certificate on its own. Pick a method. The commands already include “--deploy-hook” so the server reloads the new certificate after renewal — change “nginx” to “apache2” if you use Apache:",
  "renew.webroot.label":
    "1) Site served over HTTP — the “webroot” method (replace /var/www/html with your site's directory):",
  "renew.dns.label":
    "2) Wildcard or no HTTP access — via your DNS provider's API (Cloudflare example):",
  "renew.dns.steps":
    "Install your provider's plugin (e.g. python3-certbot-dns-cloudflare), save an API token in ~/.secrets/cloudflare.ini, then run. A different provider = a different plugin (dns-ovh, dns-google, etc.).",
  "done.again": "Generate another",

  "err.title": "Something went wrong",
  "err.retry": "Try again",
  "err.startOver": "Start over (different domain)",
  "err.verifyFailed":
    "We couldn't verify the domain. Usually the record hasn't propagated yet, or its value doesn't match. Click “Try again” — we'll generate a fresh record: the name stays the same, only the value changes. Update the value in DNS, check propagation, then verify. Your domain and settings are kept — no need to start over.",
  "err.network":
    "Could not reach the proxy server. Check that the ACME proxy is running (see README) and try again.",
  "err.rateLimited":
    "Let's Encrypt rate limit reached. Use the staging environment for tests, or wait. Details in the console.",

  "step.config": "Configuration",
  "step.verify": "Verification",
  "step.download": "Download",

  "footer.madeBy": "An open-source project by",
  "footer.source": "Source code",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "cmd.caveat":
    "Run it on your own server, at your own risk — review it first. It includes --agree-tos, which accepts the Let's Encrypt terms on your behalf.",
  "footer.notAffiliated":
    "BAXY SSL is an open-source project and is not affiliated with, sponsored, or endorsed by Let's Encrypt or ISRG. Let's Encrypt is a free service and a trademark of ISRG.",
};
