# 技術堆疊

| 類別     | 選用                                                     | 用途                                                               |
| -------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| 語言     | TypeScript 6                                             | 前端程式、建置腳本、驗收測試                                       |
| 前端框架 | React 19、React Router 7                                 | 單頁應用程式，路由為 `/`、`/about`、`/portfolio`、`/resume`        |
| UI       | Bootstrap 5、React Bootstrap、framer-motion、react-icons | 版面、動畫、圖示                                                   |
| 建置     | Vite 8                                                   | 打包；建置時注入 CSP、Cloudflare Web Analytics                     |
| 建置腳本 | Node 24（直接執行 `.ts`）                                | sitemap、各路由 HTML、作品資料 `projects.json`、字型子集、履歷 PDF |
| 單元測試 | Vitest、Testing Library、jsdom                           | 元件與建置腳本                                                     |
| 驗收測試 | playwright-bdd、Playwright（系統安裝的 Chrome）          | 直接執行 `specs/truth/features`                                    |
| 程式品質 | ESLint、Prettier、`tsc --noEmit`                         | CI 必過                                                            |
| 部署     | GitHub Actions、GitHub Pages                             | push 到 `master` 後建置並部署                                      |
| 監測     | Lighthouse CI                                            | 部署後稽核線上網站，SEO 與無障礙分數不達標即失敗                   |

## 外部服務與測試替身

驗收測試只替換專案外部的服務：

| 外部服務                      | 測試時的替代                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| GitHub Pages                  | `e2e/support/github-pages-server.ts`，依 GitHub Pages 的規則服務 `build/`：`/about` 對應 `about.html`、找不到的路徑回 `404.html` 並帶 404 狀態碼 |
| 其他網站（嵌入本站的 iframe） | 測試中臨時啟動、綁在 `127.0.0.1` 的伺服器，與 `localhost` 是不同來源                                                                             |
