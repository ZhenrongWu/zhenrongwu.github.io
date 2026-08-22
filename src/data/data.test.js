import { describe, it, expect } from "vitest";
import { projects } from "./projects";
import { resumeData } from "./resume";
import { skills, tools, hobbies } from "./about";

// 內容資料的「形狀」測試：確保日後新增項目時沒漏欄位，頁面不會在執行期才壞掉
describe("projects 資料", () => {
  it("每筆都有必要欄位且 id 唯一", () => {
    const ids = new Set();
    for (const p of projects) {
      expect(typeof p.id).toBe("number");
      expect(ids.has(p.id)).toBe(false);
      ids.add(p.id);
      expect(p.title).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.image.src).toBeTruthy();
      expect(p.image.width).toBeGreaterThan(0);
      expect(p.image.height).toBeGreaterThan(0);
      expect(Array.isArray(p.tags)).toBe(true);
      if (p.url) expect(p.url).toMatch(/^https?:\/\//);
    }
  });
});

describe("resumeData", () => {
  it("包含個人資訊、學歷與工作經歷", () => {
    expect(resumeData.personalInfo.name).toBeTruthy();
    expect(resumeData.education.length).toBeGreaterThan(0);
    expect(resumeData.workExperience.length).toBeGreaterThan(0);
  });
});

describe("about 資料", () => {
  it("每個項目都有 name、icon 元件與顏色", () => {
    for (const item of [...skills, ...tools, ...hobbies]) {
      expect(item.name).toBeTruthy();
      expect(typeof item.icon).toBe("function");
      expect(item.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});
