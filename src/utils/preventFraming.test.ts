import { describe, it, expect } from "vitest";
import { preventFraming } from "./preventFraming";

const fakeWindow = (framed: boolean, topLocation: { href: string } | null) => {
  const self = { location: { href: "https://zhenrongwu.github.io/about" } };
  const top = framed
    ? {
        get location() {
          if (!topLocation) throw new Error("blocked");
          return topLocation;
        },
      }
    : self;
  return { ...self, self, top } as unknown as Window;
};

describe("preventFraming", () => {
  it("未被嵌入時不做任何事", () => {
    expect(preventFraming(fakeWindow(false, null))).toBe(false);
  });

  it("被嵌入時把最上層視窗導向本站", () => {
    const topLocation = { href: "https://evil.example/" };
    expect(preventFraming(fakeWindow(true, topLocation))).toBe(true);
    expect(topLocation.href).toBe("https://zhenrongwu.github.io/about");
  });

  it("無法導向最上層視窗時仍回報被嵌入", () => {
    expect(preventFraming(fakeWindow(true, null))).toBe(true);
  });
});
