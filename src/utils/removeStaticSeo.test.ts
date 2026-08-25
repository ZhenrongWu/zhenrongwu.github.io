import { describe, it, expect, afterEach } from "vitest";
import { removeStaticSeo } from "./removeStaticSeo";
import { STATIC_SEO_ATTR } from "../data/seo";

afterEach(() => {
  document.head.innerHTML = "";
});

describe("removeStaticSeo", () => {
  it("移除建置期注入的標籤，保留其餘 head 內容", () => {
    document.head.innerHTML = [
      `<title ${STATIC_SEO_ATTR}>關於我 | ZHENRONG WU</title>`,
      `<meta name="description" content="描述" ${STATIC_SEO_ATTR}>`,
      '<meta name="author" content="Frank">',
    ].join("");

    expect(removeStaticSeo(document)).toBe(2);
    expect(document.head.querySelector("title")).toBeNull();
    expect(document.head.querySelector('meta[name="description"]')).toBeNull();
    expect(document.head.querySelector('meta[name="author"]')).not.toBeNull();
  });

  it("沒有注入標籤時不動任何東西", () => {
    document.head.innerHTML = '<meta name="author" content="Frank">';
    expect(removeStaticSeo(document)).toBe(0);
    expect(document.head.children).toHaveLength(1);
  });
});
