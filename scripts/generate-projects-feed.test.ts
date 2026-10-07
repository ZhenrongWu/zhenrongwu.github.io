import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { generateProjectsFeed, FEED_FILE, FEED_IMAGE_DIR } from "./generate-projects-feed.ts";
import { projects } from "../src/data/projects.ts";
import { SITE_URL } from "../src/data/seo.ts";

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "projects-feed-"));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("generateProjectsFeed", () => {
  it("輸出全部專案，圖片改成固定檔名的絕對網址", () => {
    generateProjectsFeed(tmpDir, projects);
    const feed = JSON.parse(fs.readFileSync(path.join(tmpDir, FEED_FILE), "utf8"));
    const first = projects[0]!;

    expect(feed.projects).toHaveLength(projects.length);
    expect(feed.projects[0]).toMatchObject({
      title: first.title,
      tags: first.tags,
      image: { src: `${SITE_URL}/${FEED_IMAGE_DIR}/p1.webp`, width: first.image.width },
    });
  });

  it("把每張圖片複製到 build 目錄", () => {
    generateProjectsFeed(tmpDir, projects);
    for (const project of projects) {
      const file = path.join(tmpDir, FEED_IMAGE_DIR, path.basename(project.image.src));
      expect(fs.statSync(file).size).toBeGreaterThan(0);
    }
  });
});
