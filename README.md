# zhenrongwu.github.io

## 使用技術

- **前端**：React 19、TypeScript、React Router 7、Vite 8
- **UI**：Bootstrap 5 / React Bootstrap、framer-motion、react-icons
- **測試**：Vitest、Testing Library；驗收測試以 playwright-bdd 執行 `specs/truth/features`
- **程式品質**：ESLint、Prettier
- **部署**：GitHub Actions、GitHub Pages

## 規格與驗收測試

採用 AIxBDD，規格結構與執行方式見 [specs/README.md](specs/README.md)。

```bash
npm run build
npm run test:bdd
```

## SEO

- 建置時以 React 的 `prerenderToNodeStream` 預先產生每頁內容（`src/entry-server.tsx`），不執行 JavaScript 的爬蟲也讀得到；瀏覽器端不做 hydration，先載入目前頁面再重新渲染，因為 CSP 會擋下 HTML 裡的 `style` 屬性，hydration 又不會補回
- 每頁的標題、摘要、正式網址由 `scripts/generate-spa-fallback.ts` 寫進 HTML；首頁另有 `Person` 與 `WebSite` 結構化資料
- 分享預覽圖由 `npm run generate-og-image` 產生（1200×630），改到名字、職稱或個人照時要重新執行

## 安全性

- **CSP**：建置時注入 `<meta http-equiv="Content-Security-Policy">`，`style-src` 不允許 `'unsafe-inline'`；framer-motion 與 React 的 `style` 屬性是透過 CSSOM 設定，不受此限制
- **防點擊劫持**：GitHub Pages 無法設定 `frame-ancestors` 或 `X-Frame-Options` header，`<meta>` 形式的 CSP 也不支援 `frame-ancestors`，因此由 `preventFraming` 在偵測到被嵌入 iframe 時清空頁面內容，並嘗試將最上層視窗導回本站。各頁內容在建置時預先寫進 HTML，iframe 若以 `sandbox` 禁止執行程式，仍會顯示靜態內容；這些內容只有連結，沒有表單或需要權限的操作，因此接受這個風險
- **個資**：履歷頁與 `resume.pdf` 只公開 email，不放電話號碼，避免被爬蟲收集
