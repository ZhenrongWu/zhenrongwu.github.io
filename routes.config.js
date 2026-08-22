// 網站所有路由的單一來源，供 sitemap-generator.js 與 fix-404.js 共用。
// 新增頁面時：在此加一筆，並同步更新 src/App.jsx 與 Navigation.jsx。
// sources：會影響該頁內容的檔案，sitemap 以其最後 commit 日期作為 lastmod。
module.exports = [
  { url: "/", changefreq: "monthly", priority: 1.0, sources: ["src/pages/Home.jsx"] },
  {
    url: "/about",
    changefreq: "monthly",
    priority: 0.8,
    sources: ["src/pages/About.jsx", "src/data/about.js"],
  },
  {
    url: "/portfolio",
    changefreq: "monthly",
    priority: 0.9,
    sources: ["src/pages/Portfolio.jsx", "src/data/projects.js"],
  },
  {
    url: "/resume",
    changefreq: "monthly",
    priority: 0.8,
    sources: ["src/pages/Resume.jsx", "src/data/resume.js"],
  },
];
