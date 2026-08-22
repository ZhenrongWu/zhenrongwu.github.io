import { SitemapStream, streamToPromise } from "sitemap";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../routes.config.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hostname = "https://zhenrongwu.github.io";
const today = new Date().toISOString().slice(0, 10);

const lastModified = (files: string[]): string => {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      cwd: rootDir,
      encoding: "utf8",
    }).trim();
    return out || today;
  } catch {
    return today;
  }
};

const sitemap = new SitemapStream({ hostname });

for (const route of routes) {
  sitemap.write({
    url: route.url,
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: lastModified(route.sources),
  });
}

sitemap.end();

const buffer = await streamToPromise(sitemap);

const formatted = buffer
  .toString()
  .replace(
    /<lastmod>([^<]+)<\/lastmod>/g,
    (_, date: string) => `<lastmod>${date.slice(0, 10)}</lastmod>`
  )
  .replace(/<urlset[^>]*>/, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  .replace(/\r\n/g, "\n")
  .replace(/></g, ">\n<")
  .replace(/\n\s*\n/g, "\n")
  .replace(/<\/url>\n<url>/g, "</url>\n\n<url>")
  .trimStart();

const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
fs.writeFileSync(sitemapPath, formatted);
console.log(`Sitemap generated at ${sitemapPath}`);
