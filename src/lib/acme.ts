// ACME v2 client (RFC 8555) that runs entirely in the browser and talks to
// Let's Encrypt directly. Let's Encrypt serves CORS headers and exposes
// Replay-Nonce / Location / Link, so no proxy is needed. A proxy base URL can
// still be supplied (see proxy/) as an optional fallback or to target another CA.

import { dns01Value, jwsAlg, keyAuthorization, publicJwk } from "./crypto.js";
import { signJws } from "./jws.js";

export type AcmeEnv = "staging" | "production";
export type ChallengeType = "dns-01" | "http-01";

const DIRECTORY_URLS: Record<AcmeEnv, string> = {
  production: "https://acme-v02.api.letsencrypt.org/directory",
  staging: "https://acme-staging-v02.api.letsencrypt.org/directory",
};

/** Stable page that always links the current Let's Encrypt Subscriber Agreement. */
export const LE_REPOSITORY_URL = "https://letsencrypt.org/repository/";

export class AcmeError extends Error {
  constructor(
    public type: string,
    public detail: string,
    public httpStatus?: number,
  ) {
    super(detail || type);
    this.name = "AcmeError";
  }
  get isRateLimit(): boolean {
    return this.type.endsWith("rateLimited");
  }
  get isBadNonce(): boolean {
    return this.type.endsWith("badNonce");
  }
}

interface Directory {
  newNonce: string;
  newAccount: string;
  newOrder: string;
  revokeCert?: string;
  keyChange?: string;
  meta?: { termsOfService?: string; website?: string };
}

interface AcmeResponse {
  status: number;
  headers: Headers;
  text: string;
  json: any;
}

export interface AcmeOrder {
  status: string;
  identifiers: { type: string; value: string }[];
  authorizations: string[];
  finalize: string;
  certificate?: string;
}

export interface ChallengeInstruction {
  domain: string;
  wildcard: boolean;
  type: ChallengeType;
  authzUrl: string;
  challengeUrl: string;
  token: string;
  dnsRecordName?: string;
  dnsRecordValue?: string;
  httpUrl?: string;
  httpFilename?: string;
  httpContent?: string;
}

export interface CertificateBundle {
  fullchain: string;
  cert: string;
  chain: string;
}

export class AcmeClient {
  private directory!: Directory;
  private nonce: string | null = null;
  private accountUrl: string | null = null;
  private orderUrl: string | null = null;

  constructor(
    private readonly env: AcmeEnv,
    private readonly accountKey: CryptoKeyPair,
    private readonly proxyBase = "",
  ) {}

  /** Route a target URL through the optional proxy, or hit it directly. */
  private wrap(url: string): string {
    return this.proxyBase ? `${this.proxyBase}?target=${encodeURIComponent(url)}` : url;
  }

  private async parse(res: Response): Promise<AcmeResponse> {
    const text = await res.text();
    const ct = res.headers.get("content-type") ?? "";
    let json: any = null;
    if (ct.includes("json") && text) {
      try {
        json = JSON.parse(text);
      } catch {
        /* leave json null */
      }
    }
    const replay = res.headers.get("replay-nonce");
    if (replay) this.nonce = replay;
    return { status: res.status, headers: res.headers, text, json };
  }

  private throwIfError(r: AcmeResponse): void {
    if (r.status >= 400) {
      const type = r.json?.type ?? "urn:ietf:params:acme:error:unknown";
      const detail = r.json?.detail ?? r.text ?? `HTTP ${r.status}`;
      throw new AcmeError(type, detail, r.status);
    }
  }

  async init(): Promise<void> {
    const res = await fetch(this.wrap(DIRECTORY_URLS[this.env]));
    const r = await this.parse(res);
    this.throwIfError(r);
    this.directory = r.json as Directory;
  }

  get termsOfService(): string | undefined {
    return this.directory?.meta?.termsOfService;
  }

  private async ensureNonce(): Promise<string> {
    if (this.nonce) {
      const n = this.nonce;
      this.nonce = null;
      return n;
    }
    const res = await fetch(this.wrap(this.directory.newNonce), { method: "HEAD" });
    await this.parse(res);
    if (!this.nonce) throw new AcmeError("nonce", "No Replay-Nonce returned by the server");
    const n = this.nonce;
    this.nonce = null;
    return n;
  }

  /** Signed POST (or POST-as-GET when payload==="") with one badNonce retry. */
  private async signedRequest(
    url: string,
    payload: Record<string, unknown> | "",
    useJwk = false,
  ): Promise<AcmeResponse> {
    for (let attempt = 0; attempt < 2; attempt++) {
      const nonce = await this.ensureNonce();
      const alg = jwsAlg(this.accountKey.publicKey);
      const body = await signJws({
        privateKey: this.accountKey.privateKey,
        alg,
        url,
        nonce,
        payload,
        jwk: useJwk ? await publicJwk(this.accountKey.publicKey) : undefined,
        kid: useJwk ? undefined : this.accountUrl ?? undefined,
      });
      const res = await fetch(this.wrap(url), {
        method: "POST",
        headers: { "content-type": "application/jose+json" },
        body,
      });
      const r = await this.parse(res);
      if (r.status >= 400 && r.json?.type?.endsWith("badNonce") && attempt === 0) {
        continue; // fresh nonce already captured from this response; retry once
      }
      this.throwIfError(r);
      return r;
    }
    throw new AcmeError("badNonce", "Repeated bad nonce from the ACME server");
  }

  async createAccount(email?: string): Promise<void> {
    const payload: Record<string, unknown> = { termsOfServiceAgreed: true };
    if (email) payload.contact = [`mailto:${email}`];
    const r = await this.signedRequest(this.directory.newAccount, payload, true);
    const loc = r.headers.get("location");
    if (!loc) throw new AcmeError("account", "No account URL (Location header) returned");
    this.accountUrl = loc;
  }

  async newOrder(domains: string[]): Promise<AcmeOrder> {
    const payload = { identifiers: domains.map((value) => ({ type: "dns", value })) };
    const r = await this.signedRequest(this.directory.newOrder, payload);
    this.orderUrl = r.headers.get("location");
    return r.json as AcmeOrder;
  }

  /** The pending order URL (needed to persist/resume a session). */
  get pendingOrderUrl(): string | null {
    return this.orderUrl;
  }

  /** Restore the order URL when resuming a persisted session. */
  restoreOrder(orderUrl: string): void {
    this.orderUrl = orderUrl;
  }

  /** Fetch every authorization and derive the concrete instructions for `type`. */
  async getChallenges(order: AcmeOrder, type: ChallengeType): Promise<ChallengeInstruction[]> {
    const out: ChallengeInstruction[] = [];
    for (const authzUrl of order.authorizations) {
      const r = await this.signedRequest(authzUrl, "");
      const authz = r.json;
      if (!authz) throw new AcmeError("unexpected", "Unexpected non-JSON authorization response");
      if (authz.status === "valid") continue; // already authorized (reused)
      const domain: string = authz.identifier.value;
      const wildcard: boolean = authz.wildcard === true;
      const challenge = authz.challenges.find((c: any) => c.type === type);
      if (!challenge) {
        throw new AcmeError(
          "challenge",
          `The server did not offer a ${type} challenge for ${domain}`,
        );
      }
      const instruction: ChallengeInstruction = {
        domain,
        wildcard,
        type,
        authzUrl,
        challengeUrl: challenge.url,
        token: challenge.token,
      };
      if (type === "dns-01") {
        instruction.dnsRecordName = `_acme-challenge.${domain}`;
        instruction.dnsRecordValue = await dns01Value(challenge.token, this.accountKey.publicKey);
      } else {
        instruction.httpUrl = `http://${domain}/.well-known/acme-challenge/${challenge.token}`;
        instruction.httpFilename = challenge.token;
        instruction.httpContent = await keyAuthorization(
          challenge.token,
          this.accountKey.publicKey,
        );
      }
      out.push(instruction);
    }
    return out;
  }

  /** Tell the server to validate each challenge, then poll authzs to completion. */
  async verifyChallenges(
    challenges: ChallengeInstruction[],
    onProgress?: (challenge: ChallengeInstruction, status: string) => void,
  ): Promise<void> {
    for (const c of challenges) {
      await this.signedRequest(c.challengeUrl, {});
    }
    for (const c of challenges) {
      await this.pollUntil(c.authzUrl, ["valid", "invalid", "deactivated", "expired", "revoked"], (authz) => {
        onProgress?.(c, authz.status);
      }).then((authz) => {
        if (authz.status !== "valid") {
          const err = authz.challenges?.find((x: any) => x.error)?.error;
          throw new AcmeError(
            err?.type ?? "challenge",
            err?.detail ?? `Validation failed for ${c.domain}`,
          );
        }
      });
    }
  }

  async finalize(
    order: AcmeOrder,
    csrBase64url: string,
    onProgress?: (status: string) => void,
  ): Promise<CertificateBundle> {
    await this.signedRequest(order.finalize, { csr: csrBase64url });
    if (!this.orderUrl) throw new AcmeError("order", "Missing order URL for polling");
    const finalOrder = await this.pollUntil(this.orderUrl, ["valid", "invalid"], (o) =>
      onProgress?.(o.status),
    );
    if (finalOrder.status !== "valid" || !finalOrder.certificate) {
      // Surface the order's problem document (e.g. a CAA block) instead of a
      // generic message — RFC 8555 §7.1.6.
      throw new AcmeError(
        finalOrder.error?.type ?? "order",
        finalOrder.error?.detail ?? "Order did not reach a valid state",
      );
    }
    const r = await this.signedRequest(finalOrder.certificate, "");
    return splitChain(r.text);
  }

  /** POST-as-GET poll until `status` is one of `terminal`, honoring Retry-After. */
  private async pollUntil(
    url: string,
    terminal: string[],
    onTick?: (obj: any) => void,
    maxAttempts = 30,
  ): Promise<any> {
    for (let i = 0; i < maxAttempts; i++) {
      const r = await this.signedRequest(url, "");
      if (!r.json) throw new AcmeError("unexpected", "Unexpected non-JSON response while polling", r.status);
      onTick?.(r.json);
      if (terminal.includes(r.json.status)) return r.json;
      const wait = retryAfterMs(r.headers.get("retry-after")) ?? 3000;
      await sleep(wait);
    }
    throw new AcmeError("timeout", "Timed out waiting for the ACME server");
  }
}

function retryAfterMs(header: string | null): number | null {
  if (!header) return null;
  const secs = Number(header);
  if (!Number.isNaN(secs)) return Math.min(secs * 1000, 30000);
  const date = Date.parse(header);
  if (!Number.isNaN(date)) return Math.max(0, Math.min(date - Date.now(), 30000));
  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Split a PEM certificate chain into leaf, intermediates, and the full bundle. */
function splitChain(pem: string): CertificateBundle {
  const blocks = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) ?? [];
  const normalized = blocks.map((b) => b.trim() + "\n");
  const cert = normalized[0] ?? "";
  const chain = normalized.slice(1).join("");
  return { cert, chain, fullchain: normalized.join("") };
}

export { DIRECTORY_URLS };
