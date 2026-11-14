import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  NOT_FOUND_PATH,
  applyRouteBody,
  applyRouteHead,
  createSpaFallback,
  stripHoistables,
  stripInlineStyles,
} from "./generate-spa-fallback.ts";
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

  it("帶入結構化資料時輸出 JSON-LD，且不標記為前端要清除的標籤", () => {
    const html = applyRouteHead(shell, {
      description: "描述",
      pathname: "/",
      structuredData: { "@context": "https://schema.org", name: "</script><script>" },
    });
    const block = /<script type="application\/ld\+json">([^<]*)<\/script>/.exec(html);
    expect(block).not.toBeNull();
    expect(JSON.parse(block![1]!)).toEqual({
      "@context": "https://schema.org",
      name: "</script><script>",
    });
    expect(block![0]).not.toContain(STATIC_SEO_ATTR);
  });

  it("沒有結構化資料時不輸出 JSON-LD", () => {
    const html = applyRouteHead(shell, { description: "描述", pathname: "/about" });
    expect(html).not.toContain("application/ld+json");
  });

  it("index.html 缺少 title 時拋出錯誤而非靜默產出無標題頁面", () => {
    expect(() => applyRouteHead("<html><head></head></html>", { description: "描述" })).toThrow(
      /<title>/
    );
  });
});

describe("stripHoistables", () => {
  it("移除 React 放在最前面的 title、meta、link", () => {
    const markup =
      '<title>標題</title><meta name="description" content="描述"/><link rel="canonical" href="/"/><!--$--><main><title>圖示</title></main>';
    expect(stripHoistables(markup)).toBe("<!--$--><main><title>圖示</title></main>");
  });
});

describe("stripInlineStyles", () => {
  it("移除會被 CSP 擋下的 style 屬性，其他屬性保留", () => {
    expect(stripInlineStyles('<div class="a" style="opacity:0;color:red">x</div>')).toBe(
      '<div class="a">x</div>'
    );
  });

  it("不影響文字內容", () => {
    expect(stripInlineStyles("<p>style=&quot;x&quot;</p>")).toBe("<p>style=&quot;x&quot;</p>");
  });
});

describe("applyRouteBody", () => {
  it("把預先產生的內容放進 #root", () => {
    const html = applyRouteBody(shell, '<title>t</title><main style="x"><h1>內容</h1></main>');
    expect(html).toContain('<div id="root"><main><h1>內容</h1></main></div>');
  });

  it("找不到空的 #root 時拋出錯誤", () => {
    expect(() => applyRouteBody("<html><body></body></html>", "<main></main>")).toThrow(/root/);
  });
});

const fakeRender = async (url: string): Promise<string> =>
  `<title>${url}</title><meta name="description" content="${url}"/><main style="opacity:0"><h1>頁面 ${url}</h1></main>`;

describe("createSpaFallback", () => {
  it("為每個非根路由建立 <route>.html，讓 GitHub Pages 回 200 且不轉址", async () => {
    await createSpaFallback(tmpDir, fakeRender, routes);
    for (const { url } of routes) {
      if (url === "/") continue;
      expect(fs.existsSync(path.join(tmpDir, `${url.slice(1)}.html`))).toBe(true);
    }
  });

  it("每個路由的 canonical 都指向自己，彼此不再是相同的 HTML", async () => {
    await createSpaFallback(tmpDir, fakeRender, routes);
    expect(read("index.html")).toContain(`href="${SITE_URL}/"`);
    expect(read("about.html")).toContain(`href="${SITE_URL}/about"`);
    expect(read("portfolio.html")).toContain(`href="${SITE_URL}/portfolio"`);
    expect(read("resume.html")).toContain(`href="${SITE_URL}/resume"`);
    expect(read("about.html")).not.toBe(read("portfolio.html"));
  });

  it("每個路由的 #root 都是該路由預先產生的內容", async () => {
    await createSpaFallback(tmpDir, fakeRender, routes);
    expect(read("index.html")).toContain('<div id="root"><main><h1>頁面 /</h1></main></div>');
    expect(read("about.html")).toContain("<h1>頁面 /about</h1>");
    expect(read("404.html")).toContain(`<h1>頁面 ${NOT_FOUND_PATH}</h1>`);
  });

  it("只有首頁帶結構化資料", async () => {
    await createSpaFallback(tmpDir, fakeRender, routes);
    expect(read("index.html")).toContain("application/ld+json");
    expect(read("about.html")).not.toContain("application/ld+json");
    expect(read("404.html")).not.toContain("application/ld+json");
  });

  it("404.html 標記為 noindex", async () => {
    await createSpaFallback(tmpDir, fakeRender, routes);
    expect(read("404.html")).toContain('content="noindex, follow"');
  });

  it("以原始 index.html 為模板，不會把上一個路由的標籤疊加到下一個", async () => {
    await createSpaFallback(tmpDir, fakeRender, routes);
    const about = read("about.html");
    expect(about.match(/<title/g)).toHaveLength(1);
    expect(about.match(/rel="canonical"/g)).toHaveLength(1);
    expect(about.match(/<h1>/g)).toHaveLength(1);
  });

  it("index.html 不存在時拋出錯誤而非靜默失敗", async () => {
    const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), "spa-fallback-empty-"));
    await expect(createSpaFallback(emptyDir, fakeRender)).rejects.toThrow(/index\.html/);
    fs.rmSync(emptyDir, { recursive: true, force: true });
  });
});
