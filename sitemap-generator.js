const { SitemapStream, streamToPromise } = require("sitemap");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 網站的基本URL
const hostname = "https://zhenrongwu.github.io";

// 所有頁面路徑（與 fix-404.js 共用同一份設定）
const routes = require("./routes.config");

// 從 git 取得檔案最後修改日期（YYYY-MM-DD）；非 git 環境或查無紀錄時退回今天
const today = new Date().toISOString().split("T")[0];
const lastModified = (files) => {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      cwd: __dirname,
      encoding: "utf8",
    }).trim();
    return out || today;
  } catch {
    return today;
  }
};

// 創建sitemap
const sitemap = new SitemapStream({ hostname });

// 將所有路徑添加到sitemap
routes.forEach((route) => {
  sitemap.write({
    url: route.url,
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: lastModified(route.sources),
  });
});

// 結束流
sitemap.end();

// 將流轉換為Buffer並寫入文件
streamToPromise(sitemap)
  .then((buffer) => {
    let sitemapXml = buffer.toString();

    // lastmod 改為 YYYY-MM-DD 格式（符合 sitemap 常見寫法）
    sitemapXml = sitemapXml.replace(
      /<lastmod>([^<]+)<\/lastmod>/g,
      (_, dateStr) => `<lastmod>${dateStr.split("T")[0]}</lastmod>`
    );

    // 僅保留基本 xmlns，移除 news/xhtml/image/video 等未使用的 namespace
    sitemapXml = sitemapXml.replace(
      /<urlset[^>]*>/,
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    );

    // 格式化成範例風格：標籤間單一換行，僅在 </url> 與 <url> 之間留一空行
    const formattedXml = sitemapXml
      .replace(/\r\n/g, "\n")
      .replace(/></g, ">\n<")
      .replace(/\n\s*\n/g, "\n") // 合併多餘空行
      .replace(/<\/url>\n<url>/g, "</url>\n\n<url>") // url 區塊間加一空行
      .trimStart();

    const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(sitemapPath, formattedXml);
    console.log(`Sitemap generated at ${sitemapPath}`);
  })
  .catch((error) => console.error("Error generating sitemap:", error));
