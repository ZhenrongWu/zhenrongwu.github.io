import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Seo, { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from "./Seo";

const renderAt = (pathname, props) =>
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Seo {...props} />
    </MemoryRouter>
  );

const meta = (selector) => document.head.querySelector(selector)?.getAttribute("content");

describe("Seo", () => {
  it("首頁使用站名作為標題與預設描述", () => {
    renderAt("/", {});
    expect(document.title).toBe(SITE_NAME);
    expect(meta('meta[name="description"]')).toBe(DEFAULT_DESCRIPTION);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE_URL}/`
    );
  });

  it("子頁面標題加上站名後綴，canonical 對應目前路徑", () => {
    renderAt("/about", { title: "關於我", description: "自訂描述" });
    expect(document.title).toBe(`關於我 | ${SITE_NAME}`);
    expect(meta('meta[name="description"]')).toBe("自訂描述");
    expect(meta('meta[property="og:title"]')).toBe(`關於我 | ${SITE_NAME}`);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE_URL}/about`
    );
  });

  it("noIndex 頁面輸出 robots noindex 且不輸出 canonical", () => {
    renderAt("/nope", { title: "找不到頁面", noIndex: true });
    expect(meta('meta[name="robots"]')).toBe("noindex, follow");
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });
});
