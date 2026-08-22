import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createSpaFallback } from "./fix-404.ts";
import { routes } from "./routes.config.ts";

let tmpDir: string;
const html = "<!doctype html><title>test</title>";

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fix-404-"));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("createSpaFallback", () => {
  it("將 index.html 原封不動複製為 404.html", () => {
    fs.writeFileSync(path.join(tmpDir, "index.html"), html);
    createSpaFallback(tmpDir, []);
    expect(fs.readFileSync(path.join(tmpDir, "404.html"), "utf8")).toBe(html);
  });

  it("為每個非根路由建立 <route>.html，讓 GitHub Pages 回 200 且不轉址", () => {
    fs.writeFileSync(path.join(tmpDir, "index.html"), html);
    const written = createSpaFallback(tmpDir, ["/", "/about", "/portfolio"]);
    expect(fs.readFileSync(path.join(tmpDir, "about.html"), "utf8")).toBe(html);
    expect(fs.readFileSync(path.join(tmpDir, "portfolio.html"), "utf8")).toBe(html);
    expect(written).toHaveLength(3); // 404.html + 2 routes
  });

  it("預設使用 routes.config.js 的路由清單", () => {
    fs.writeFileSync(path.join(tmpDir, "index.html"), html);
    createSpaFallback(tmpDir);
    for (const { url } of routes) {
      if (url === "/") continue;
      expect(fs.existsSync(path.join(tmpDir, `${url.slice(1)}.html`))).toBe(true);
    }
  });

  it("index.html 不存在時拋出錯誤而非靜默失敗", () => {
    expect(() => createSpaFallback(tmpDir)).toThrow(/index\.html/);
  });
});
