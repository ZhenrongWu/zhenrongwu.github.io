import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "./routes.config.ts";

export function createSpaFallback(
  buildDir: string,
  routePaths: string[] = routes.map((r) => r.url)
): string[] {
  const indexPath = path.join(buildDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`找不到 ${indexPath}，請先執行 vite build`);
  }

  const written: string[] = [];
  const fourOhFourPath = path.join(buildDir, "404.html");
  fs.copyFileSync(indexPath, fourOhFourPath);
  written.push(fourOhFourPath);

  for (const route of routePaths) {
    if (route === "/") continue;
    const target = path.join(buildDir, `${route.replace(/^\//, "")}.html`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(indexPath, target);
    written.push(target);
  }
  return written;
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const rootDir = path.dirname(fileURLToPath(import.meta.url));
  const files = createSpaFallback(path.join(rootDir, "build"));
  console.log(`✓ 已產生 SPA fallback：${files.map((f) => path.relative(rootDir, f)).join(", ")}`);
}
