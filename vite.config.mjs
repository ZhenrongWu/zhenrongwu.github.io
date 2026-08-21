import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    // 沿用 CRA 的輸出目錄；fix-404.js 與 gh-pages 部署皆以 build/ 為準
    outDir: "build",
    emptyOutDir: true,
  },
});
