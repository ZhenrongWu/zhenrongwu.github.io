import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { resumeData } from "../src/data/resume.ts";
import { SITE_URL } from "../src/data/seo.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

type OgImageContent = {
  name: string;
  englishName: string;
  title: string;
  site: string;
  avatarDataUrl: string;
  fontDataUrls: { regular: string; bold: string };
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildOgImageHtml(content: OgImageContent): string {
  return `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: "Noto Sans TC"; font-weight: 400; src: url(${content.fontDataUrls.regular}) format("woff2"); }
  @font-face { font-family: "Noto Sans TC"; font-weight: 700; src: url(${content.fontDataUrls.bold}) format("woff2"); }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: ${OG_IMAGE_WIDTH}px;
    height: ${OG_IMAGE_HEIGHT}px;
    display: flex;
    align-items: center;
    gap: 64px;
    padding: 0 80px;
    font-family: "Noto Sans TC", sans-serif;
    color: #ffffff;
    background: linear-gradient(135deg, #663399 0%, #4b0082 100%);
  }
  .avatar {
    width: 440px;
    height: 352px;
    object-fit: cover;
    border-radius: 24px;
    border: 6px solid rgba(255, 255, 255, 0.85);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
  }
  .name { font-size: 96px; font-weight: 700; line-height: 1.1; }
  .english { margin-top: 8px; font-size: 40px; font-weight: 400; opacity: 0.9; }
  .title { margin-top: 36px; font-size: 40px; font-weight: 700; }
  .site { margin-top: 48px; font-size: 26px; font-weight: 400; opacity: 0.75; }
</style>
</head>
<body>
  <img class="avatar" src="${content.avatarDataUrl}" alt="" />
  <div>
    <div class="name">${escapeHtml(content.name)}</div>
    <div class="english">${escapeHtml(content.englishName)}</div>
    <div class="title">${escapeHtml(content.title)}</div>
    <div class="site">${escapeHtml(content.site)}</div>
  </div>
</body>
</html>`;
}

const dataUrl = (file: string, type: string): string =>
  `data:${type};base64,${fs.readFileSync(path.join(rootDir, file)).toString("base64")}`;

async function renderOgImage(html: string): Promise<Buffer> {
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const page = await browser.newPage({
      viewport: { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
    });
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    return await page.screenshot({ type: "jpeg", quality: 90 });
  } finally {
    await browser.close();
  }
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const html = buildOgImageHtml({
    name: resumeData.personalInfo.name,
    englishName: "Zhenrong Wu",
    title: resumeData.personalInfo.title,
    site: new URL(SITE_URL).host,
    avatarDataUrl: dataUrl("src/assets/images/avatar.webp", "image/webp"),
    fontDataUrls: {
      regular: dataUrl("src/assets/fonts/NotoSansTC-400.woff2", "font/woff2"),
      bold: dataUrl("src/assets/fonts/NotoSansTC-700.woff2", "font/woff2"),
    },
  });
  const target = path.join(rootDir, "public", "og-image.jpg");
  fs.writeFileSync(target, await renderOgImage(html));
  console.log(`✓ 已產生分享預覽圖：${path.relative(rootDir, target)}`);
}
