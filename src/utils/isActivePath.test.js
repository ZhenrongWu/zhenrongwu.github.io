import { describe, it, expect } from "vitest";
import { isActivePath } from "./isActivePath";

describe("isActivePath", () => {
  it("首頁只在路徑完全等於 / 時啟用", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/", "/about")).toBe(false);
  });

  it("完全相同的路徑視為啟用", () => {
    expect(isActivePath("/about", "/about")).toBe(true);
  });

  it("子路徑視為啟用", () => {
    expect(isActivePath("/portfolio", "/portfolio/123")).toBe(true);
  });

  it("只是前綴相同的不同路徑不應啟用（迴歸測試）", () => {
    expect(isActivePath("/about", "/aboutX")).toBe(false);
    expect(isActivePath("/about", "/about-us")).toBe(false);
  });

  it("不相關的路徑不啟用", () => {
    expect(isActivePath("/resume", "/about")).toBe(false);
  });
});
