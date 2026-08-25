import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routes, type RouteConfig } from "../src/data/routes.ts";
import {
  DEFAULT_DESCRIPTION,
  NOT_FOUND_TITLE,
  STATIC_SEO_ATTR,
  canonicalUrl,
  fullTitle,
} from "../src/data/seo.ts";

type HeadMeta = {
  title?: string;
  description: string;
  pathname?: string;
  noIndex?: boolean;
};

const escapeAttr = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const meta = (key: "name" | "property", value: string, content: string): string =>
  `    <meta ${key}="${value}" content="${escapeAttr(content)}" ${STATIC_SEO_ATTR} />`;

/**
 * 把單一路由的 SEO 標籤寫進 index.html。
 * SPA 的初始 HTML 本來每頁都一樣，爬蟲得先執行 JS 才分得出差異，容易被判為重複網頁；
 * 這裡在建置期就讓每頁帶上自己的 title、description 與 canonical。
 */
export function applyRouteHead(html: string, route: HeadMeta): string {
  const title = fullTitle(route.title);
  const canonical = canonicalUrl(route.pathname ?? "/");

  if (!/<title>[\s\S]*?<\/title>/.test(html)) {
    throw new Error("index.html 找不到 <title>，無法注入路由 SEO 標籤");
  }
  let output = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title ${STATIC_SEO_ATTR}>${escapeAttr(title)}</title>`
  );

  if (route.noIndex) {
    const robots = /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/;
    if (!robots.test(output)) {
      throw new Error("index.html 找不到 robots meta，無法標記 404 為 noindex");
    }
    output = output.replace(
      robots,
      `<meta name="robots" content="noindex, follow" ${STATIC_SEO_ATTR} />`
    );
  }

  const tags = [
    meta("name", "description", route.description),
    ...(route.noIndex
      ? []
      : [`    <link rel="canonical" href="${canonical}" ${STATIC_SEO_ATTR} />`]),
    meta("property", "og:title", title),
    meta("property", "og:description", route.description),
    ...(route.noIndex ? [] : [meta("property", "og:url", canonical)]),
    meta("name", "twitter:title", title),
    meta("name", "twitter:description", route.description),
  ];

  return output.replace(/\s*<\/head>/, `\n${tags.join("\n")}\n  </head>`);
}

export function createSpaFallback(buildDir: string, routeList: RouteConfig[] = routes): string[] {
  const indexPath = path.join(buildDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`找不到 ${indexPath}，請先執行 vite build`);
  }
  const shell = fs.readFileSync(indexPath, "utf8");

  const written: string[] = [];
  const write = (file: string, html: string): void => {
    const target = path.join(buildDir, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html);
    written.push(target);
  };

  // GitHub Pages 用 404.html 服務未知路徑，不該被索引
  write(
    "404.html",
    applyRouteHead(shell, {
      title: NOT_FOUND_TITLE,
      description: DEFAULT_DESCRIPTION,
      noIndex: true,
    })
  );

  for (const route of routeList) {
    const file = route.url === "/" ? "index.html" : `${route.url.replace(/^\//, "")}.html`;
    write(
      file,
      applyRouteHead(shell, {
        title: route.title,
        description: route.description,
        pathname: route.url,
      })
    );
  }

  return written;
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const files = createSpaFallback(path.join(rootDir, "build"));
  console.log(`✓ 已產生 SPA fallback：${files.map((f) => path.relative(rootDir, f)).join(", ")}`);
}
