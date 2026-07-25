// Known DNS providers, matched against a zone's NS hostnames, so the detected
// provider's name can be shown as a hint on the DNS-challenge screen. The
// "add a TXT record" steps are generic and live in the shared i18n
// (provider.steps); the panel links are HOSTING_PANELS below.

export interface ProviderInfo {
  id: string;
  name: string;
  match: RegExp;
}

export const PROVIDERS: ProviderInfo[] = [
  { id: "cloudflare", name: "Cloudflare", match: /(^|\.)cloudflare\.com$/ },
  { id: "ovh", name: "OVHcloud", match: /(^|\.)ovh\.(net|com|cloud)$/ },
  { id: "homepl", name: "home.pl", match: /(^|\.)home\.pl$/ },
  { id: "cyberfolks", name: "cyberFolks", match: /(^|\.)cyber-?folks\.pl$/ },
  { id: "nazwapl", name: "nazwa.pl", match: /(^|\.)(nazwa\.pl|nazwadns\.pl)$/ },
];

export function detectProvider(nsHosts: string[]): ProviderInfo | null {
  for (const p of PROVIDERS) {
    if (nsHosts.some((h) => p.match.test(h))) return p;
  }
  return null;
}

// Popular hosting / DNS panels for the "open your hosting panel" dropdown, so a
// user can jump to their own host even when auto-detection missed it. URLs are
// login/panel pages verified to resolve.
export const HOSTING_PANELS: { name: string; url: string }[] = [
  { name: "cyberFolks", url: "https://panel.cyberfolks.pl" },
  { name: "home.pl", url: "https://panel.home.pl" },
  { name: "nazwa.pl", url: "https://www.nazwa.pl/panel/" },
  { name: "OVHcloud", url: "https://www.ovh.com/manager/" },
  { name: "LH.pl", url: "https://panel.lh.pl" },
  { name: "zenbox", url: "https://panel.zenbox.pl" },
  { name: "hekko", url: "https://panel.hekko.pl" },
  { name: "Kylos", url: "https://panel.kylos.pl" },
  { name: "seohost", url: "https://panel.seohost.pl" },
  { name: "AZ.pl", url: "https://panel.az.pl" },
  { name: "webio", url: "https://panel.webio.pl" },
  { name: "Hostinger", url: "https://hpanel.hostinger.com" },
  { name: "Cloudflare (DNS)", url: "https://dash.cloudflare.com" },
];
