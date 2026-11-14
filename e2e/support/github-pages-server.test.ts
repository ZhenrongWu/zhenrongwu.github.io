import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resolveGithubPagesPath } from "./github-pages-server.ts";

let root: string;

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "gh-pages-"));
  for (const file of ["index.html", "about.html", "404.html", "robots.txt", "projects/p1.webp"]) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), file);
  }
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe("resolveGithubPagesPath", () => {
  it("根路徑回傳 index.html", () => {
    expect(resolveGithubPagesPath(root, "/")).toEqual({
      status: 200,
      file: path.join(root, "index.html"),
    });
  });

  it("沒有副檔名的路徑對應同名的 .html", () => {
    expect(resolveGithubPagesPath(root, "/about")).toEqual({
      status: 200,
      file: path.join(root, "about.html"),
    });
  });

  it("存在的檔案直接回傳", () => {
    expect(resolveGithubPagesPath(root, "/robots.txt").file).toBe(path.join(root, "robots.txt"));
  });

  it("結尾有斜線但沒有對應的 index.html 時回 404", () => {
    expect(resolveGithubPagesPath(root, "/about/")).toEqual({
      status: 404,
      file: path.join(root, "404.html"),
    });
  });

  it("目錄沒有結尾斜線時轉址到有斜線的網址", () => {
    expect(resolveGithubPagesPath(root, "/projects")).toEqual({
      status: 301,
      location: "/projects/",
    });
  });

  it("找不到的路徑回 404.html", () => {
    expect(resolveGithubPagesPath(root, "/no-such-page").status).toBe(404);
  });

  it("不允許讀取根目錄以外的檔案", () => {
    expect(resolveGithubPagesPath(root, "/../etc/passwd").status).toBe(404);
  });
});
