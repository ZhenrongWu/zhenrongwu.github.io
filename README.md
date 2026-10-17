# zhenrongwu.github.io

## 使用技術

- **前端**：React 19、TypeScript、React Router 7、Vite 8
- **UI**：Bootstrap 5 / React Bootstrap、framer-motion、react-icons
- **測試**：Vitest、Testing Library
- **程式品質**：ESLint、Prettier
- **部署**：GitHub Actions、GitHub Pages

## 安全性

- **CSP**：建置時注入 `<meta http-equiv="Content-Security-Policy">`，`style-src` 不允許 `'unsafe-inline'`；framer-motion 與 React 的 `style` 屬性是透過 CSSOM 設定，不受此限制
- **防點擊劫持**：GitHub Pages 無法設定 `frame-ancestors` 或 `X-Frame-Options` header，`<meta>` 形式的 CSP 也不支援 `frame-ancestors`，因此由 `preventFraming` 在偵測到被嵌入 iframe 時不渲染內容，並嘗試將最上層視窗導回本站
- **個資**：履歷頁與 `resume.pdf` 只公開 email，不放電話號碼，避免被爬蟲收集
