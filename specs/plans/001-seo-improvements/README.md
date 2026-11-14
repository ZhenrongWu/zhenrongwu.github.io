# 001-seo-improvements：SEO 改善

## 目標

修正 [000-baseline-reverse](../000-baseline-reverse/) 列出的 SEO 缺口：

1. 不執行 JavaScript 的爬蟲（Bing 的部分抓取、GPTBot、ClaudeBot、PerplexityBot 等 AI 爬蟲）也讀得到每頁的內容
2. 首頁提供 `Person` 與 `WebSite` 結構化資料，讓搜尋引擎把「吳振榮」「Zhenrong Wu」與 GitHub、LinkedIn 連在一起
3. 網頁作者與網站上的名字一致
4. 分享預覽圖改成 1200×630，並標示尺寸與替代文字
5. 每頁只有一個 `h1`，標題層級不跳級
6. `/about/` 這類結尾多一個斜線的網址改用正式網址
7. 移除沒有作用的設定：`meta name="keywords"`、sitemap 的 `changefreq` 與 `priority`

## 決定

1. **建置時預先產生每頁的 HTML。** 以 Vite SSR 建置 `src/entry-server.tsx`，再用 React 19 的 `react-dom/static` 的 `prerenderToNodeStream` 等所有延遲載入的頁面都準備好之後輸出 HTML，由 `scripts/generate-spa-fallback.ts` 寫進每個路由與 `404.html` 的 `#root`。不改用 Next.js 之類的框架，部署方式與路由都不變。
2. **瀏覽器端不做 hydration，改成先載入目前頁面再一次換掉預先產生的內容。** 網站的 CSP 是 `style-src 'self'`，HTML 裡的 `style` 屬性會被瀏覽器忽略；React hydration 在正式環境不會修正屬性差異，被忽略的 `style` 之後也不會補上（例如履歷下載按鈕的內距、技能卡片的顏色）。所以 `src/index.tsx` 改成：先載入目前路由的頁面模組，再用 `createRoot` 渲染。這樣第一次渲染就是完整頁面，預先產生的內容直接被換掉，不會先閃一下載入畫面。
3. **路由的延遲載入改成可以預先載入。** `React.lazy` 無法得知模組是否已經載入，第一次渲染一定會先顯示 fallback。新增 `src/utils/preloadable.ts`：模組已載入時直接渲染，否則交給 `React.lazy`。原本嘗試以 `use()` 等待載入，但元件第一次掛載就暫停時不會恢復（單元測試重現），所以改用 `React.lazy` 處理暫停與重試。同一個元件實例固定走同一條路，避免中途切換造成重新掛載。頁面模組集中到 `src/pageModules.ts`，伺服器端與瀏覽器端共用。
4. **頁面的 `<title>`、`<meta>` 仍由建置腳本寫進 `<head>`。** React 19 會把元件裡的 `<title>`、`<meta>`、`<link>` 輸出在 HTML 片段的最前面，建置腳本把這段移掉，沿用既有的 `applyRouteHead`，避免 `<head>` 與 `<body>` 各有一份。
5. **預先產生的 HTML 移除 `style` 屬性。** 這些屬性會被 CSP 擋下，瀏覽器在主控台留下大量錯誤（會拉低 Lighthouse 的 Best Practices 分數），而且瀏覽器端本來就會整個重新渲染，移除後外觀不變。
6. **被嵌入時清空預先產生的內容。** `preventFraming` 偵測到被嵌入時，`src/index.tsx` 清空 `#root`。iframe 以 `sandbox` 禁止執行程式時，訪客仍會看到靜態內容；這些內容只有連結，沒有表單或需要權限的操作，風險可以接受，寫進 README 的安全性說明。
7. **結構化資料只放在首頁，且不隨換頁移除。** JSON-LD 以 `@graph` 放 `Person` 與 `WebSite`，`WebSite.author` 以 `@id` 指向 `Person`。`<script type="application/ld+json">` 是資料區塊，不受 CSP 的 `script-src` 限制。社群連結集中到 `src/data/social.ts`，頁尾與結構化資料共用。
8. **分享預覽圖由腳本產生。** 新增 `scripts/generate-og-image.ts`，用系統 Chrome 截圖 1200×630 的版面（個人照、名字、職稱），輸出 `public/og-image.jpg`；與 `generate-resume-pdf` 一樣是手動執行並提交產物。
9. **結尾多一個斜線時在瀏覽器端改網址。** GitHub Pages 對 `/about/` 只能回 `404.html`，HTTP 狀態碼改不了；`src/index.tsx` 在渲染前用 `history.replaceState` 去掉結尾斜線，訪客看到正式網址與正確頁面。爬蟲讀到的仍是 404 與 `noindex`，正式網址本來就沒有斜線，不影響收錄。
10. **`noscript` 提示移除。** 頁面內容已經在 HTML 裡，「請啟用 JavaScript」的提示不再正確。

## 任務

| #   | 任務                                                                         | 對應場景                                         |
| --- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| 1   | feature 新增場景並標 `@unverified`，新句型登記到 `dsl.md`                    | —                                                |
| 2   | 寫 step definition，確認新場景失敗                                           | —                                                |
| 3   | 路由表與可預先載入的頁面、`entry-server.tsx`、SSR 建置、建置腳本注入 `#root` | 不執行 JavaScript 也讀得到頁面內容               |
| 4   | `src/index.tsx`：結尾斜線、預先載入、被嵌入時清空                            | 網址結尾多了斜線、被其他網站嵌入時不顯示頁面內容 |
| 5   | 首頁結構化資料、`src/data/social.ts`                                         | 結構化資料                                       |
| 6   | 作者、移除 keywords、sitemap 精簡                                            | 網頁作者                                         |
| 7   | 分享預覽圖腳本、尺寸與替代文字                                               | 分享預覽圖                                       |
| 8   | 履歷、作品集、關於我、頁尾的標題層級                                         | 標題層級                                         |
| 9   | 移除 `@unverified`，更新 README 與單元測試，跑完整檢查                       | 全部                                             |

## truth 變更

| 路徑                                                  | 變更                                                                                    |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `features/01-網站導覽/頁面導覽.feature`               | 新增 Rule「網址結尾多了斜線時改用正式網址」                                             |
| `features/02-搜尋引擎與社群分享/搜尋引擎收錄.feature` | 新增 Rule「不執行 JavaScript 也讀得到頁面內容」、「每頁只有一個主標題，標題層級不跳級」 |
| `features/02-搜尋引擎與社群分享/結構化資料.feature`   | 新增                                                                                    |
| `features/02-搜尋引擎與社群分享/社群分享.feature`     | 新增場景「分享預覽圖的尺寸與替代文字」                                                  |
| `features/02-搜尋引擎與社群分享/dsl.md`               | 新增句型                                                                                |
| `features/dsl.md`                                     | `頁面主標題是`、`畫面顯示` 也用於爬蟲讀到的 HTML                                        |

## 驗證

2026-11-15：

- `E2E_TAGS="" npm run test:bdd`：43 個場景全部通過（基準線 26 個、這輪新增 17 個）
- 以 Chrome 開啟各頁：主控台沒有錯誤（不存在的網址只有預期中的 404），首次載入不會出現載入畫面，`<title>`、`h1`、正式網址各只有一個
- 截圖比對履歷標頭、作品卡背面、頁尾，調整標題層級後外觀不變

## 待裁決

見 [questions.md](questions.md)。
