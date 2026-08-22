const fs = require("fs");
const path = require("path");

/**
 * 將 build/index.html 複製為 build/404.html，讓 GitHub Pages 把未知路徑交回 SPA。
 * @param {string} buildDir 建置輸出目錄
 * @returns {string} 寫入的 404.html 路徑
 */
function createSpaFallback(buildDir) {
  const indexPath = path.join(buildDir, "index.html");
  const fourOhFourPath = path.join(buildDir, "404.html");

  if (!fs.existsSync(indexPath)) {
    throw new Error(`找不到 ${indexPath}，請先執行 vite build`);
  }

  fs.copyFileSync(indexPath, fourOhFourPath);
  return fourOhFourPath;
}

// 直接以 node 執行時才動作；被 require（例如測試）時只匯出函式
if (require.main === module) {
  createSpaFallback(path.join(__dirname, "build"));
  console.log("✓ 已將 index.html 的內容複製到 404.html");
}

module.exports = { createSpaFallback };
