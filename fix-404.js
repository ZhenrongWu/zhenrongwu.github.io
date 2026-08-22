const fs = require("fs");
const path = require("path");
const routes = require("./routes.config");

/**
 * 讓 BrowserRouter 的 SPA 能在 GitHub Pages 正確運作：
 * 1. 複製 index.html 為 404.html —— 未知路徑交回 SPA（使用者看得到頁面）
 * 2. 為每個已知路由建立 <route>.html —— GitHub Pages 對無副檔名的 /about 會直接
 *    以 about.html 回 HTTP 200（不轉址、不加斜線），搜尋引擎與 Lighthouse 才會把
 *    這些頁面視為存在。注意不要用 <route>/index.html：那會造成 301 轉址到 /about/
 * @param {string} buildDir 建置輸出目錄
 * @param {string[]} routePaths 路由路徑清單（預設取 routes.config.js）
 * @returns {string[]} 寫入的檔案路徑
 */
function createSpaFallback(buildDir, routePaths = routes.map((r) => r.url)) {
  const indexPath = path.join(buildDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`找不到 ${indexPath}，請先執行 vite build`);
  }

  const written = [];
  const fourOhFourPath = path.join(buildDir, "404.html");
  fs.copyFileSync(indexPath, fourOhFourPath);
  written.push(fourOhFourPath);

  for (const route of routePaths) {
    if (route === "/") continue;
    const target = path.join(buildDir, `${route.replace(/^\//, "")}.html`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(indexPath, target);
    written.push(target);
  }
  return written;
}

// 直接以 node 執行時才動作；被 require（例如測試）時只匯出函式
if (require.main === module) {
  const files = createSpaFallback(path.join(__dirname, "build"));
  console.log(`✓ 已產生 SPA fallback：${files.map((f) => path.relative(__dirname, f)).join(", ")}`);
}

module.exports = { createSpaFallback };
