import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createSpaFallback, applyRouteHead } from "./generate-spa-fallback.ts";
import { routes } from "../src/data/routes.ts";
import { SITE_NAME, SITE_URL, STATIC_SEO_ATTR } from "../src/data/seo.ts";

let tmpDir: string;
const shell = [
  "<!doctype html>",
  "<html>",
  "  <head>",
  '    <meta name="robots" content="index, follow" />',
  "    <title>ZHENRONG WU</title>",
  "  </head>",
  '  <body><div id="root"></div></body>',
  "</html>",
].join("\n");

const read = (file: string): string => fs.readFileSync(path.join(tmpDir, file), "utf8");

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "spa-fallback-"));
  fs.writeFileSync(path.join(tmpDir, "index.html"), shell);
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("applyRouteHead", () => {
  it("子頁面帶上自己的標題、描述與 canonical", () => {
    const html = applyRouteHead(shell, {
      title: "關於我",
      description: "描述",
      pathname: "/about",
    });
    expect(html).toContain(`<title ${STATIC_SEO_ATTR}>關於我 | ${SITE_NAME}</title>`);
    expect(html).toContain(`href="${SITE_URL}/about"`);
    expect(html).toContain('content="描述"');
    expect(html).toContain(`content="關於我 | ${SITE_NAME}"`);
    expect(html).not.toContain(`<title>${SITE_NAME}</title>`);
  });

  it("首頁只用站名當標題，canonical 指向根路徑", () => {
    const html = applyRouteHead(shell, { description: "描述", pathname: "/" });
    expect(html).toContain(`<title ${STATIC_SEO_ATTR}>${SITE_NAME}</title>`);
    expect(html).toContain(`href="${SITE_URL}/"`);
  });

  it("noIndex 頁面改寫 robots 且不輸出 canonical 與 og:url", () => {
    const html = applyRouteHead(shell, { title: "找不到頁面", description: "描述", noIndex: true });
    expect(html).toContain('content="noindex, follow"');
    expect(html).not.toContain('content="index, follow"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('property="og:url"');
  });

  it("注入的標籤都帶上可供前端清除的標記", () => {
    const html = applyRouteHead(shell, { description: '含 "引號" 的描述', pathname: "/" });
    const injected = html.match(new RegExp(STATIC_SEO_ATTR, "g")) ?? [];
    expect(injected.length).toBe(8);
    expect(html).toContain("&quot;引號&quot;");
  });

  it("index.html 缺少 title 時拋出錯誤而非靜默產出無標題頁面", () => {
    expect(() => applyRouteHead("<html><head></head></html>", { description: "描述" })).toThrow(
      /<title>/
    );
  });
});

describe("createSpaFallback", () => {
  it("為每個非根路由建立 <route>.html，讓 GitHub Pages 回 200 且不轉址", () => {
    createSpaFallback(tmpDir, routes);
    for (const { url } of routes) {
      if (url === "/") continue;
      expect(fs.existsSync(path.join(tmpDir, `${url.slice(1)}.html`))).toBe(true);
    }
  });

  it("每個路由的 canonical 都指向自己，彼此不再是相同的 HTML", () => {
    createSpaFallback(tmpDir, routes);
    expect(read("index.html")).toContain(`href="${SITE_URL}/"`);
    expect(read("about.html")).toContain(`href="${SITE_URL}/about"`);
    expect(read("portfolio.html")).toContain(`href="${SITE_URL}/portfolio"`);
    expect(read("resume.html")).toContain(`href="${SITE_URL}/resume"`);
    expect(read("about.html")).not.toBe(read("portfolio.html"));
  });

  it("404.html 標記為 noindex", () => {
    createSpaFallback(tmpDir, routes);
    expect(read("404.html")).toContain('content="noindex, follow"');
  });

  it("以原始 index.html 為模板，不會把上一個路由的標籤疊加到下一個", () => {
    createSpaFallback(tmpDir, routes);
    const about = read("about.html");
    expect(about.match(/<title/g)).toHaveLength(1);
    expect(about.match(/rel="canonical"/g)).toHaveLength(1);
  });

  it("index.html 不存在時拋出錯誤而非靜默失敗", () => {
    const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), "spa-fallback-empty-"));
    expect(() => createSpaFallback(emptyDir)).toThrow(/index\.html/);
    fs.rmSync(emptyDir, { recursive: true, force: true });
  });
});
