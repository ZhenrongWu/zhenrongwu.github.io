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
  test: {
    // jsdom 提供 document / window，讓 React 元件測試能在 Node 執行
    environment: "jsdom",
    // 每個測試檔都自動載入 jest-dom 的 matcher（toBeInTheDocument 等）
    setupFiles: ["./src/test/setup.js"],
    globals: true,
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{js,jsx}", "fix-404.js"],
      exclude: ["src/index.jsx", "src/test/**"],
    },
  },
});
