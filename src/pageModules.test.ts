import { describe, it, expect } from "vitest";
import { About, Home, NotFound, pageFor, withoutTrailingSlash } from "./pageModules";

describe("withoutTrailingSlash", () => {
  it.each([
    ["/", "/"],
    ["/about", "/about"],
    ["/about/", "/about"],
    ["/about//", "/about"],
    ["//", "/"],
  ])("%s → %s", (input, expected) => {
    expect(withoutTrailingSlash(input)).toBe(expected);
  });
});

describe("pageFor", () => {
  it("已知路徑對應各自的頁面", () => {
    expect(pageFor("/")).toBe(Home);
    expect(pageFor("/about")).toBe(About);
  });

  it("未知路徑對應找不到頁面", () => {
    expect(pageFor("/no-such-page")).toBe(NotFound);
  });
});
