# 000-baseline-reverse：從程式碼逆向基準線

## 目標

專案導入 AIxBDD 之前已經有完整的網站。這一輪不改任何行為，只把目前的行為寫成 `specs/truth/`，並讓 feature 在 CI 執行，作為之後每一輪迭代的起點。

## 事實來源

1. 程式碼：`src/`、`scripts/`、`index.html`、`vite.config.mts`、`public/`
2. 建置產物：`npm run build` 產生的 `build/`
3. 線上網站：以 `curl` 確認 GitHub Pages 對 `/about`、不存在的路徑、`/about/` 的實際回應

## 決定

1. **測試對建置產物執行。** SEO 相關的行為（各路由的 HTML、sitemap、404 狀態碼）只存在於建置產物，dev server 測不到。
2. **GitHub Pages 用本機伺服器模擬。** GitHub Pages 是外部服務，`e2e/support/github-pages-server.ts` 照它的規則服務 `build/`：有 `about.html` 時 `/about` 回傳它；路徑以 `/` 結尾時找 `index.html`；都找不到就回 `404.html` 並帶 404 狀態碼。
3. **爬蟲用停用 JavaScript 的瀏覽器模擬。** 搜尋引擎與 AI 爬蟲不一定執行 JavaScript，停用後讀到的就是它們看到的 HTML。
4. **作品資料以 `/projects.json` 為準。** 作品集場景的預期值從建置產物的 `/projects.json` 讀，與畫面同一個來源，新增作品時不必改 feature。
5. **「其他網站」用 `127.0.0.1` 的臨時伺服器。** Chrome 的區域網路存取保護會擋住公開網域嵌入 `localhost`，用 Playwright `route` 假造的網頁也會被當成公開網域；改在 `127.0.0.1` 啟動真正的伺服器，它與 `localhost` 是不同來源，可以驗證防嵌入。
6. **瀏覽器使用系統 Chrome。** 與 `scripts/generate-resume-pdf.ts` 相同，本機與 GitHub Actions 的 `ubuntu-latest` 都已安裝，不必另外下載。

## 不寫成 feature 的部分

- 關於我頁的技能、工具、興趣清單與年資：只是資料展示，年資計算已有單元測試（`src/utils/yearsOfExperience.test.ts`）
- 換頁時的進度條、打字效果、卡片動畫：視覺效果，沒有業務規則
- 字型子集、履歷 PDF 的產生：建置腳本，已有單元測試

## truth 變更

全部新增：

| 路徑                                                        | 內容                                                      |
| ----------------------------------------------------------- | --------------------------------------------------------- |
| `truth/techstack.md`                                        | 技術堆疊與測試替身                                        |
| `truth/contracts/openapi.yaml`、`03-作品集.yaml`            | `/projects.json`                                          |
| `truth/features/01-網站導覽/頁面導覽.feature`               | 導覽列、首頁按鈕、找不到頁面                              |
| `truth/features/02-搜尋引擎與社群分享/搜尋引擎收錄.feature` | 各頁標題、摘要、正式網址，404 不收錄，sitemap、robots.txt |
| `truth/features/02-搜尋引擎與社群分享/社群分享.feature`     | 分享預覽的標題、摘要、網址、預覽圖                        |
| `truth/features/03-作品集/作品集.feature`                   | 排序、翻卡（滑鼠與鍵盤）、作品資料                        |
| `truth/features/04-履歷/履歷.feature`                       | 段落、PDF 下載、只公開 email                              |
| `truth/features/05-網站安全/防止嵌入.feature`               | 被 iframe 嵌入時不顯示內容                                |

## 驗證

2026-11-15 對建置產物執行 `npm run test:bdd`，26 個場景全部通過，沒有 `@unverified`、`@code-mismatch`。

## 已知現況（留給下一輪）

逆向時發現、但這一輪不改的地方，交給 [001-seo-improvements](../001-seo-improvements/) 處理：

- HTML 的 `<body>` 只有空的 `#root`，不執行 JavaScript 的爬蟲讀不到頁面內容
- 沒有結構化資料
- `meta name="author"` 是 `Frank`，與網站上的名字「吳振榮」不一致
- 分享預覽圖只有 640×512
- 履歷頁有兩個 `h1`，部分頁面的標題層級跳級
- `/about/` 這類結尾多一個斜線的網址會回 404
