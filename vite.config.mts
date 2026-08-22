import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { renderResumePdf, resumePdfName } from "./generate-resume-pdf.ts";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
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

const resumePdfDevPlugin = (): Plugin => ({
  name: "resume-pdf-dev",
  apply: "serve",
  configureServer: (server) => {
    server.middlewares.use(`/${resumePdfName}`, (req, res) => {
      const origin = `http://${req.headers.host ?? "localhost:3000"}`;
      renderResumePdf(origin)
        .then((pdf) => {
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Cache-Control", "no-store");
          res.end(pdf);
        })
        .catch((error: unknown) => {
          res.statusCode = 500;
          res.end(error instanceof Error ? error.message : String(error));
        });
    });
  },
});

export default defineConfig({
  plugins: [react(), cspPlugin(), resumePdfDevPlugin()],
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
      include: ["src/**/*.{ts,tsx}", "fix-404.ts"],
      exclude: ["src/index.tsx", "src/test/**", "src/**/*.d.ts"],
    },
  },
});
