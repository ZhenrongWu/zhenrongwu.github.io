import { describe, it, expect } from "vitest";
import { buildResumeHtml } from "./build-resume-html.ts";
import { resumeData, type ResumeData } from "../src/data/resume.ts";

const emptyData: ResumeData = {
  personalInfo: {
    name: "測試",
    title: "職稱",
    email: "test@example.com",
    phone: "0912345678",
    location: "台灣",
  },
  education: [],
  workExperience: [],
  competitions: [],
  achievements: [],
};

describe("buildResumeHtml", () => {
  it("輸出包含個人資訊、四個章節與所有經歷", () => {
    const html = buildResumeHtml(resumeData);
    expect(html).toContain(resumeData.personalInfo.name);
    expect(html).toContain(resumeData.personalInfo.email);
    for (const heading of ["工作經驗", "教育背景", "競賽經驗", "個人成就"]) {
      expect(html).toContain(`<h2>${heading}</h2>`);
    }
    for (const job of resumeData.workExperience) expect(html).toContain(job.position);
    for (const competition of resumeData.competitions) expect(html).toContain(competition.name);
    for (const achievement of resumeData.achievements) expect(html).toContain(achievement.title);
    expect(html.match(/@font-face/g)).toHaveLength(3);
  });

  it("跳脫 HTML 特殊字元", () => {
    const html = buildResumeHtml({
      ...emptyData,
      personalInfo: { ...emptyData.personalInfo, name: '<b>&"x' },
    });
    expect(html).toContain("&lt;b&gt;&amp;&quot;x");
    expect(html).not.toContain('<b>&"x');
  });

  it("空白的 company 與 location 不輸出空標籤", () => {
    const html = buildResumeHtml({
      ...emptyData,
      workExperience: [
        { position: "自由接案", company: "", location: "", period: "2024", responsibilities: [] },
      ],
    });
    expect(html).not.toContain('<p class="org"></p>');
    expect(html).not.toContain("<ul></ul>");
  });
});
