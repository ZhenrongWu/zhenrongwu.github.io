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
- **子專案 Demo**：`public/` 底下的 Demo 是其他專案建置好的靜態檔，不經過本站的 CSP 注入，各自在自己的 `index.html` 帶 CSP

## 子專案 Demo

| 路徑                          | 來源                                                           | 說明                                                       |
| ----------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| `public/drone-route-planner/` | 私有 repo `GIS_DroneRoutePlanner` 的 `npm run build:demo` 產物 | 無人機航線規劃的 Demo 模式，沒有後端，空域檢核在瀏覽器執行 |

這些目錄是建置產物，不要直接修改，ESLint 與 Prettier 都已略過。更新方式：

```bash
cd ~/Personal/GIS_DroneRoutePlanner/frontend && npm run build:demo
rm -rf ~/Personal/zhenrongwu.github.io/public/drone-route-planner
cp -R dist-demo ~/Personal/zhenrongwu.github.io/public/drone-route-planner
```

部署流程會檢查 `build/drone-route-planner/index.html` 帶有 CSP，且禁航區資料檔存在。
