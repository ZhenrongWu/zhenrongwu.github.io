import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self'",
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

export default defineConfig({
  plugins: [react(), cspPlugin()],
  server: { port: 3000, open: true },
  build: {
    outDir: "build",
    emptyOutDir: true,
    chunkSizeWarningLimit: 650,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}", "fix-404.ts"],
      exclude: ["src/index.tsx", "src/test/**", "src/**/*.d.ts"],
    },
  },
});
