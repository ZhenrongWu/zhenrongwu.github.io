import { describe, it, expect } from "vitest";
import { toChineseNumber, yearsOfExperience } from "./yearsOfExperience";

describe("yearsOfExperience", () => {
  it("2026 年為六年", () => {
    expect(yearsOfExperience(new Date(2026, 9, 29))).toBe(6);
  });

  it("每跨一個年度增加一年", () => {
    expect(yearsOfExperience(new Date(2026, 11, 31))).toBe(6);
    expect(yearsOfExperience(new Date(2027, 0, 1))).toBe(7);
  });
});

describe("toChineseNumber", () => {
  it("轉換個位數", () => {
    expect(toChineseNumber(6)).toBe("六");
    expect(toChineseNumber(9)).toBe("九");
  });

  it("轉換十位數", () => {
    expect(toChineseNumber(10)).toBe("十");
    expect(toChineseNumber(13)).toBe("十三");
    expect(toChineseNumber(20)).toBe("二十");
    expect(toChineseNumber(25)).toBe("二十五");
  });
});
