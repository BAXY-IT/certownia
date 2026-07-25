/// <reference types="vitest/config" />
import { defineConfig } from "vite";

// BAXY SSL is a static, client-side app. The only server-side piece is a thin
// ACME CORS proxy (see functions/ for Cloudflare Pages, proxy/ for self-hosting).
// base defaults to "/" (Cloudflare Pages, Netlify, custom domains). For a
// GitHub Pages *project* site served from /<repo>/, set VITE_BASE=/baxy-it-ssl/.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  build: {
    target: "es2022",
    outDir: "dist",
    sourcemap: false, // don't ship source maps with the production bundle
  },
  server: {
    port: 5173,
  },
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
