const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");
const path = require("path");

// 網站的基本URL
const hostname = "https://zhenrongwu.github.io";

// 所有頁面路徑
const routes = [
  { url: "/", changefreq: "monthly", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/portfolio", changefreq: "monthly", priority: 0.9 },
  { url: "/resume", changefreq: "monthly", priority: 0.8 },
];

// 創建sitemap
const sitemap = new SitemapStream({ hostname });

// 將所有路徑添加到sitemap
routes.forEach((route) => {
  sitemap.write({
    url: route.url,
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: new Date().toISOString().split("T")[0], // 今天的日期作為最後修改日期
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
      (_, dateStr) =>
        `<lastmod>${dateStr.split("T")[0]}</lastmod>`
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
