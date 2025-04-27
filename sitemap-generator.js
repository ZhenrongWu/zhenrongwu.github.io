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
    const sitemapXml = buffer.toString();

    // 使用更清晰易讀的格式保存XML
    const formattedXml = sitemapXml
      .replace(/></g, ">\n<")
      .replace(/<urlset/g, "<urlset\n  ")
      .replace(/xmlns:/g, "\n  xmlns:")
      .replace(/<url>/g, "\n  <url>")
      .replace(/<\/url>/g, "\n  </url>")
      .replace(/<loc>/g, "\n    <loc>")
      .replace(/<lastmod>/g, "\n    <lastmod>")
      .replace(/<changefreq>/g, "\n    <changefreq>")
      .replace(/<priority>/g, "\n    <priority>")
      .replace(/<\/loc>/g, "</loc>")
      .replace(/<\/lastmod>/g, "</lastmod>")
      .replace(/<\/changefreq>/g, "</changefreq>")
      .replace(/<\/priority>/g, "</priority>")
      .replace(/<\/urlset>/g, "\n</urlset>");

    const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(sitemapPath, formattedXml);
    console.log(`Sitemap generated at ${sitemapPath}`);
  })
  .catch((error) => console.error("Error generating sitemap:", error));
