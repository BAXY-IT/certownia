import { describe, expect, it } from "vitest";
import { buildAcmeSh, buildCertbot, buildCertbotDnsCloudflare } from "../src/lib/commands.js";

describe("buildCertbot", () => {
  it("DNS manual, staging, with email", () => {
    const c = buildCertbot(["example.com", "www.example.com"], "dns-01", true, "me@example.com");
    expect(c).toContain("certbot certonly");
    expect(c).toContain("--manual --preferred-challenges dns");
    expect(c).toContain("--staging");
    expect(c).toContain("-m 'me@example.com'");
    expect(c).toContain("-d 'example.com'");
    expect(c).toContain("-d 'www.example.com'");
  });

  it("HTTP webroot, production, no email", () => {
    const c = buildCertbot(["example.com"], "http-01", false, undefined);
    expect(c).toContain("--webroot -w /var/www/html");
    expect(c).not.toContain("--staging");
    expect(c).toContain("--register-unsafely-without-email");
  });

  it("single-quotes every domain so the shell can't glob or interpret them", () => {
    const c = buildCertbot(["*.example.com", "example.com"], "dns-01", false);
    expect(c).toContain("-d '*.example.com'");
    expect(c).toContain("-d 'example.com'");
  });

  it("shell-quotes the email and escapes single quotes", () => {
    expect(buildCertbot(["example.com"], "dns-01", false, "a;b@example.com")).toContain(
      "-m 'a;b@example.com'",
    );
    expect(buildCertbot(["example.com"], "dns-01", false, "a'b@example.com")).toContain(
      "-m 'a'\\''b@example.com'",
    );
  });
});

describe("buildCertbotDnsCloudflare", () => {
  it("uses the cloudflare DNS plugin + credentials and the domains", () => {
    const c = buildCertbotDnsCloudflare(["example.com", "*.example.com"], "me@example.com");
    expect(c).toContain("--dns-cloudflare --dns-cloudflare-credentials ~/.secrets/cloudflare.ini");
    expect(c).toContain("-m 'me@example.com'");
    expect(c).toContain("-d 'example.com'");
    expect(c).toContain("-d '*.example.com'");
    expect(c).not.toContain("--manual");
  });
});

describe("buildAcmeSh", () => {
  it("DNS manual uses the letsencrypt server + manual-mode flag", () => {
    const c = buildAcmeSh(["example.com"], "dns-01", false);
    expect(c).toContain("acme.sh --issue --server letsencrypt");
    expect(c).toContain("--dns");
    expect(c).toContain("--yes-I-know-dns-manual-mode-enough-go-ahead-please");
  });

  it("staging uses letsencrypt_test", () => {
    expect(buildAcmeSh(["example.com"], "http-01", true)).toContain("--server letsencrypt_test");
  });

  it("HTTP uses webroot", () => {
    expect(buildAcmeSh(["example.com"], "http-01", false)).toContain("-w /var/www/html");
  });
});
