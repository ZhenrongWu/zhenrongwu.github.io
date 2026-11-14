# specs：網站規格

本專案採用 AIxBDD：`truth/` 是網站目前行為的唯一真相，`plans/` 是每一輪迭代的計畫與對 truth 的變更紀錄。

第一版 truth 從既有程式碼逆向而來，過程記在 [plans/000-baseline-reverse/](plans/000-baseline-reverse/)。

## 目錄

```text
specs/
├── README.md
├── truth/
│   ├── techstack.md              技術堆疊與測試替身
│   ├── contracts/                對其他網站提供的資料（OpenAPI 3.0.3）
│   │   ├── openapi.yaml          入口
│   │   └── 03-作品集.yaml         /projects.json
│   └── features/
│       ├── dsl.md                跨領域共用句型
│       ├── 01-網站導覽/
│       ├── 02-搜尋引擎與社群分享/
│       ├── 03-作品集/
│       ├── 04-履歷/
│       └── 05-網站安全/           各領域的 *.feature 與 dsl.md
└── plans/
    └── NNN-主題/                 每輪迭代的目標、決定、任務、truth 變更；待裁決問題寫在 questions.md
```

網站沒有資料庫，所以沒有 `truth/data/`。

## 執行 feature

feature 由 playwright-bdd 直接讀 `specs/truth/features/**/*.feature`，不另外複製。測試對建置產物執行，GitHub Pages 以 `e2e/support/github-pages-server.ts` 模擬。

```bash
npm run build
npm run test:bdd
```

- 瀏覽器使用系統安裝的 Chrome（`channel: "chrome"`），不另外下載
- 預設排除 `@unverified`；要連同未驗證的場景一起看，設 `E2E_TAGS=""`，只跑某個 tag 可設 `E2E_TAGS="@unverified"`
- step definition 在 `e2e/steps/`，句型與實作檔的對照在各層的 `dsl.md`
- CI（`ci.yml`、`deploy.yml`）在建置之後執行 `npm run test:bdd`，失敗就不部署

## 標籤

| 標籤                  | 意義                                                    |
| --------------------- | ------------------------------------------------------- |
| 無                    | 已有 step definition，在 CI 執行並通過                  |
| `@unverified`         | 還沒有 step definition，或實作還沒完成；不在 CI 執行    |
| `@need-clarification` | 行為需要使用者裁決，問題寫在該輪 plan 的 `questions.md` |
| `@code-mismatch`      | 程式碼與 feature 不一致，待裁決是改程式還是改規格       |

## 開發順序

1. 在 `plans/NNN-主題/` 寫計畫
2. 修改 `truth/features`，新句型登記到 `dsl.md`，新場景標 `@unverified`
3. 寫 step definition，確認場景失敗
4. 實作到場景通過，移除 `@unverified`
5. 實作改變了行為就同步更新 truth
