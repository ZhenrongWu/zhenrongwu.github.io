import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createSpaFallback } from "./fix-404.js";

let tmpDir;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fix-404-"));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("createSpaFallback", () => {
  it("將 index.html 原封不動複製為 404.html", () => {
    const html = "<!doctype html><title>test</title>";
    fs.writeFileSync(path.join(tmpDir, "index.html"), html);

    const out = createSpaFallback(tmpDir);

    expect(out).toBe(path.join(tmpDir, "404.html"));
    expect(fs.readFileSync(out, "utf8")).toBe(html);
  });

  it("index.html 不存在時拋出錯誤而非靜默失敗", () => {
    expect(() => createSpaFallback(tmpDir)).toThrow(/index\.html/);
  });
});
