import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Project } from "../src/data/projects.ts";
import { SITE_URL } from "../src/data/seo.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** 輸出到 build/ 的位置；devherohub.com 建置時會讀 `${SITE_URL}/projects.json`。 */
export const FEED_FILE = "projects.json";
export const FEED_IMAGE_DIR = "projects";

/**
 * 把作品集資料輸出成 JSON，並把圖片以固定檔名複製出來，
 * 讓其他網站（devherohub.com 的「參與過的專案」）能直接引用，只需維護這裡一份。
 * Vite 打包後的圖片檔名帶 hash，每次建置都會變，所以另外複製一份不帶 hash 的。
 *
 * `project.image.src` 是相對專案根目錄、以 / 開頭的路徑（Vite 開發模式與下方的 load hook 都是這個格式）。
 */
export function generateProjectsFeed(buildDir: string, list: Project[]): string {
  const imageDir = path.join(buildDir, FEED_IMAGE_DIR);
  fs.mkdirSync(imageDir, { recursive: true });

  const feed = {
    projects: list.map((project) => {
      const source = path.join(rootDir, project.image.src);
      const fileName = path.basename(source);
      fs.copyFileSync(source, path.join(imageDir, fileName));
      return {
        ...project,
        image: { ...project.image, src: `${SITE_URL}/${FEED_IMAGE_DIR}/${fileName}` },
      };
    }),
  };

  const target = path.join(buildDir, FEED_FILE);
  fs.writeFileSync(target, `${JSON.stringify(feed, null, 2)}\n`);
  return target;
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const { registerHooks } = await import("node:module");
  // projects.ts 以 import 引入圖片；Node 本身不會處理 .webp，這裡改成回傳圖片路徑
  registerHooks({
    load(url, context, nextLoad) {
      if (!url.endsWith(".webp")) return nextLoad(url, context);
      const src = `/${path.relative(rootDir, fileURLToPath(url)).split(path.sep).join("/")}`;
      return {
        format: "module",
        source: `export default ${JSON.stringify(src)};`,
        shortCircuit: true,
      };
    },
  });
  const { projects } = await import("../src/data/projects.ts");
  const file = generateProjectsFeed(path.join(rootDir, "build"), projects);
  console.log(`✓ 已輸出作品集資料：${path.relative(rootDir, file)}（${projects.length} 筆）`);
}
