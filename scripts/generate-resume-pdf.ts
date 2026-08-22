import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import { chromium } from "playwright-core";

export const resumePdfName = "resume.pdf";
const pageWidth = 1280;

export async function renderResumePdf(origin: string): Promise<Buffer> {
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const page = await browser.newPage({ viewport: { width: pageWidth, height: 900 } });
    await page.emulateMedia({ media: "screen" });
    await page.goto(new URL("/resume", origin).href, { waitUntil: "networkidle" });
    await page.waitForSelector("article.resume");
    await page.waitForSelector(".page-loader", { state: "detached" });
    await page.evaluate(() => document.fonts.ready);
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    return await page.pdf({
      width: `${pageWidth}px`,
      height: `${pageHeight}px`,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      displayHeaderFooter: false,
    });
  } finally {
    await browser.close();
  }
}

export async function generateResumePdf(buildDir: string): Promise<string> {
  if (!fs.existsSync(path.join(buildDir, "resume.html"))) {
    throw new Error(`找不到 ${buildDir}/resume.html，請先執行 vite build 與 generate-spa-fallback`);
  }

  const server = await preview({
    configFile: false,
    logLevel: "silent",
    build: { outDir: buildDir },
    preview: { port: 0, host: "127.0.0.1", open: false },
  });
  try {
    const origin = server.resolvedUrls?.local[0];
    if (!origin) throw new Error("preview server 未回報網址");
    const pdf = await renderResumePdf(origin);
    const target = path.join(buildDir, resumePdfName);
    fs.writeFileSync(target, pdf);
    return target;
  } finally {
    await server.close();
  }
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const file = await generateResumePdf(path.join(rootDir, "build"));
  console.log(`✓ 已產生履歷 PDF：${path.relative(rootDir, file)}`);
}
