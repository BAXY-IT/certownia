import { afterEach, describe, expect, it, vi } from "vitest";
import { checkHttpFile } from "../src/lib/doh.js";

afterEach(() => vi.restoreAllMocks());

describe("checkHttpFile", () => {
  it("returns true when the relay body matches (trimmed)", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("TOKEN.keyauth\n", { status: 200 })));
    expect(
      await checkHttpFile("http://example.com/.well-known/acme-challenge/x", "TOKEN.keyauth"),
    ).toBe(true);
  });

  it("returns false when the body differs", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("something else", { status: 200 })));
    expect(await checkHttpFile("http://example.com/x", "TOKEN.keyauth")).toBe(false);
  });

  it("throws when the relay responds with an error status", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("bad gateway", { status: 502 })));
    await expect(checkHttpFile("http://example.com/x", "y")).rejects.toThrow();
  });

  it("relays the url-encoded target with an &-joined cache-buster and no-store", async () => {
    const spy = vi.fn(async (_url?: unknown, _init?: unknown) => new Response("y", { status: 200 }));
    vi.stubGlobal("fetch", spy);
    await checkHttpFile("http://ex.com/a?b=1", "y");
    const relayUrl = String(spy.mock.calls[0][0]);
    const init = spy.mock.calls[0][1] as RequestInit;
    expect(relayUrl.startsWith("https://api.allorigins.win/raw?url=")).toBe(true);
    // target already has a query, so the cache-buster is joined with "&"
    expect(relayUrl).toContain(encodeURIComponent("http://ex.com/a?b=1&cb="));
    expect(init.cache).toBe("no-store");
  });

  it("joins the cache-buster with ? when the target URL has no query", async () => {
    const spy = vi.fn(async (_url?: unknown, _init?: unknown) => new Response("y", { status: 200 }));
    vi.stubGlobal("fetch", spy);
    await checkHttpFile("http://ex.com/x", "y");
    expect(String(spy.mock.calls[0][0])).toContain(encodeURIComponent("http://ex.com/x?cb="));
  });
});
