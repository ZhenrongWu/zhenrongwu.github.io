import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { routes, type RouteConfig } from "../src/data/routes.ts";
import {
  DEFAULT_DESCRIPTION,
  NOT_FOUND_TITLE,
  STATIC_SEO_ATTR,
  canonicalUrl,
  fullTitle,
} from "../src/data/seo.ts";
import { homeStructuredData } from "../src/data/structuredData.ts";

type HeadMeta = {
  title?: string;
  description: string;
  pathname?: string;
  noIndex?: boolean;
  structuredData?: object;
};

export type RenderPage = (url: string) => Promise<string>;

export const NOT_FOUND_PATH = "/404";

const ROOT_ELEMENT = /<div id="root"><\/div>/;
const LEADING_HOISTABLES = /^(?:<title>[\s\S]*?<\/title>|<meta\s[^>]*\/?>|<link\s[^>]*\/?>)+/;
const INLINE_STYLE_ATTR = /\sstyle="[^"]*"/g;

const escapeAttr = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const escapeJson = (value: object): string =>
  JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

const meta = (key: "name" | "property", value: string, content: string): string =>
  `    <meta ${key}="${value}" content="${escapeAttr(content)}" ${STATIC_SEO_ATTR} />`;

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
    ...(route.structuredData
      ? [`    <script type="application/ld+json">${escapeJson(route.structuredData)}</script>`]
      : []),
  ];

  return output.replace(/\s*<\/head>/, `\n${tags.join("\n")}\n  </head>`);
}

export const stripHoistables = (markup: string): string => markup.replace(LEADING_HOISTABLES, "");

export const stripInlineStyles = (markup: string): string => markup.replace(INLINE_STYLE_ATTR, "");

export function applyRouteBody(html: string, markup: string): string {
  if (!ROOT_ELEMENT.test(html)) {
    throw new Error('index.html 找不到空的 <div id="root"></div>，無法注入預先產生的內容');
  }
  const body = stripInlineStyles(stripHoistables(markup));
  return html.replace(ROOT_ELEMENT, () => `<div id="root">${body}</div>`);
}

export async function createSpaFallback(
  buildDir: string,
  render: RenderPage,
  routeList: RouteConfig[] = routes
): Promise<string[]> {
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

  const notFoundHead = applyRouteHead(shell, {
    title: NOT_FOUND_TITLE,
    description: DEFAULT_DESCRIPTION,
    noIndex: true,
  });
  write("404.html", applyRouteBody(notFoundHead, await render(NOT_FOUND_PATH)));

  for (const route of routeList) {
    const file = route.url === "/" ? "index.html" : `${route.url.replace(/^\//, "")}.html`;
    const head = applyRouteHead(shell, {
      title: route.title,
      description: route.description,
      pathname: route.url,
      structuredData: route.url === "/" ? homeStructuredData() : undefined,
    });
    write(file, applyRouteBody(head, await render(route.url)));
  }

  return written;
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const entry = path.join(rootDir, "build-ssr", "entry-server.js");
  if (!fs.existsSync(entry)) {
    throw new Error(`找不到 ${entry}，請先執行 vite build --ssr`);
  }
  const { render } = (await import(pathToFileURL(entry).href)) as { render: RenderPage };
  const files = await createSpaFallback(path.join(rootDir, "build"), render);
  console.log(`✓ 已產生各頁 HTML：${files.map((f) => path.relative(rootDir, f)).join(", ")}`);
}
