import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
