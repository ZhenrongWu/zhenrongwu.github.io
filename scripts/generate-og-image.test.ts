import { describe, it, expect } from "vitest";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, buildOgImageHtml } from "./generate-og-image.ts";

const content = {
  name: "吳振榮",
  englishName: "Zhenrong Wu",
  title: "遊戲與網頁開發者",
  site: "zhenrongwu.github.io",
  avatarDataUrl: "data:image/webp;base64,AAAA",
  fontDataUrls: { regular: "data:font/woff2;base64,AA", bold: "data:font/woff2;base64,BB" },
};

describe("buildOgImageHtml", () => {
  it("版面是大圖卡片建議的 1200×630", () => {
    expect([OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT]).toEqual([1200, 630]);
    const html = buildOgImageHtml(content);
    expect(html).toContain(`width: ${OG_IMAGE_WIDTH}px`);
    expect(html).toContain(`height: ${OG_IMAGE_HEIGHT}px`);
  });

  it("包含名字、英文名、職稱與網址", () => {
    const html = buildOgImageHtml(content);
    for (const text of [content.name, content.englishName, content.title, content.site]) {
      expect(html).toContain(text);
    }
  });

  it("文字會跳脫 HTML 特殊字元", () => {
    const html = buildOgImageHtml({ ...content, title: "<b>開發者</b>" });
    expect(html).toContain("&lt;b&gt;開發者&lt;/b&gt;");
  });
});
