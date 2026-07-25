// Generate ready-to-paste server commands for the two most common ACME clients,
// so a user who wants AUTOMATIC RENEWAL (which the one-off browser flow can't do)
// can set it up on their own server. Pure string builders — no network, no state.

export type CmdChallenge = "dns-01" | "http-01";

const WEBROOT = "/var/www/html";

// POSIX single-quote a value that will be pasted into a shell command. The email
// passes a lenient regex that allows shell metacharacters, so quote it to avoid
// surprises when the user runs the copied command.
function shq(s: string): string {
  return `'${s.replace(/'/g, "'\\''")}'`;
}

// Single-quote EVERY domain (via shq) so the shell can neither glob a wildcard
// nor act on any metacharacter — command safety must not depend on the caller's
// input regex.
function dFlags(domains: string[]): string {
  return domains.map((d) => `-d ${shq(d)}`).join(" ");
}

/** certbot certonly command matching the chosen challenge/environment. */
export function buildCertbot(
  domains: string[],
  challenge: CmdChallenge,
  staging: boolean,
  email?: string,
): string {
  const parts = ["certbot", "certonly", "--agree-tos"];
  parts.push(email ? `-m ${shq(email)}` : "--register-unsafely-without-email");
  if (staging) parts.push("--staging");
  if (challenge === "dns-01") parts.push("--manual", "--preferred-challenges", "dns");
  else parts.push("--webroot", "-w", WEBROOT);
  parts.push(dFlags(domains));
  return parts.join(" ");
}

/**
 * certbot with the Cloudflare DNS plugin — issues AND renews UNATTENDED (certbot
 * adds/removes the TXT record via the provider API). Example for the renewal
 * guide; other providers have their own plugin (dns-ovh, dns-google, …).
 */
export function buildCertbotDnsCloudflare(domains: string[], email?: string): string {
  const parts = ["certbot", "certonly", "--agree-tos"];
  parts.push(email ? `-m ${shq(email)}` : "--register-unsafely-without-email");
  parts.push("--dns-cloudflare", "--dns-cloudflare-credentials", "~/.secrets/cloudflare.ini");
  parts.push(dFlags(domains));
  return parts.join(" ");
}

/** acme.sh --issue command matching the chosen challenge/environment. */
export function buildAcmeSh(domains: string[], challenge: CmdChallenge, staging: boolean): string {
  const parts = ["acme.sh", "--issue", "--server", staging ? "letsencrypt_test" : "letsencrypt"];
  if (challenge === "dns-01") {
    parts.push("--dns", dFlags(domains), "--yes-I-know-dns-manual-mode-enough-go-ahead-please");
  } else {
    parts.push(dFlags(domains), "-w", WEBROOT);
  }
  return parts.join(" ");
}
