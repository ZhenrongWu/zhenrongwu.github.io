import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Cloudflare Web Analytics 的 beacon token 不是機密（本來就會出現在 HTML），
// 但用環境變數帶入可以讓本地開發不必發出這支請求。
const beaconToken = process.env.CF_BEACON_TOKEN;

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self'${beaconToken ? " https://static.cloudflareinsights.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self'${beaconToken ? " https://cloudflareinsights.com" : ""}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

const cspPlugin = (): Plugin => ({
  name: "content-security-policy",
  apply: "build",
  transformIndexHtml: () => [
    {
      tag: "meta",
      attrs: { "http-equiv": "Content-Security-Policy", content: contentSecurityPolicy },
      injectTo: "head-prepend",
    },
  ],
});

const analyticsPlugin = (): Plugin => ({
  name: "cloudflare-web-analytics",
  apply: "build",
  transformIndexHtml: () =>
    beaconToken
      ? [
          {
            tag: "script",
            attrs: {
              defer: true,
              src: "https://static.cloudflareinsights.com/beacon.min.js",
              "data-cf-beacon": JSON.stringify({ token: beaconToken }),
            },
            injectTo: "body",
          },
        ]
      : [],
});

export default defineConfig({
  plugins: [react(), cspPlugin(), analyticsPlugin()],
  server: { port: 3000, open: true },
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}", "scripts/**/*.ts"],
      exclude: ["src/index.tsx", "src/test/**", "src/**/*.d.ts", "**/*.test.ts"],
    },
  },
});
