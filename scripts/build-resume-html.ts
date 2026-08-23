import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ResumeData } from "../src/data/resume.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = path.join(rootDir, "src/assets/fonts");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fontFace(weight: number): string {
  const data = fs.readFileSync(path.join(fontDir, `NotoSansTC-${weight}.woff2`)).toString("base64");
  return `@font-face{font-family:"Noto Sans TC";src:url(data:font/woff2;base64,${data}) format("woff2");font-weight:${weight};}`;
}

function bullets(items: string[]): string {
  if (items.length === 0) return "";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

export function buildResumeHtml(data: ResumeData): string {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location]
    .filter(Boolean)
    .map(escapeHtml)
    .join('<span class="dot">・</span>');

  const work = data.workExperience
    .map((job) => {
      const org = [job.company, job.location].filter(Boolean).map(escapeHtml).join("・");
      return [
        '<article class="entry">',
        `<div class="entry-head"><h3>${escapeHtml(job.position)}</h3><span class="period">${escapeHtml(job.period)}</span></div>`,
        org ? `<p class="org">${org}</p>` : "",
        bullets(job.responsibilities),
        "</article>",
      ].join("");
    })
    .join("");

  const education = data.education
    .map((item) =>
      [
        '<article class="entry">',
        `<div class="entry-head"><h3>${escapeHtml(item.institution)}</h3><span class="period">${escapeHtml(item.period)}</span></div>`,
        `<p class="org">${escapeHtml(item.degree)}</p>`,
        "</article>",
      ].join("")
    )
    .join("");

  const competitions = data.competitions
    .map((item) =>
      [
        '<article class="entry">',
        `<div class="entry-head"><h3>${escapeHtml(item.name)}<span class="result">${escapeHtml(item.result)}</span></h3><span class="period">${escapeHtml(item.year)}</span></div>`,
        `<p class="detail">${escapeHtml(item.description)}</p>`,
        "</article>",
      ].join("")
    )
    .join("");

  const achievements = data.achievements
    .map((item) =>
      [
        '<article class="entry">',
        `<div class="entry-head"><h3>${escapeHtml(item.title)}</h3><span class="period">${escapeHtml(item.period)}</span></div>`,
        `<p class="detail">${escapeHtml(item.description)}</p>`,
        bullets(item.highlights),
        "</article>",
      ].join("")
    )
    .join("");

  return `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(info.name)}履歷</title>
<style>
${[400, 500, 700].map(fontFace).join("\n")}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:10pt;line-height:1.55;color:#23202b;}
header{border-bottom:2.5pt solid #663399;padding-bottom:10pt;}
.name-row{display:flex;align-items:baseline;gap:10pt;}
h1{font-size:21pt;font-weight:700;letter-spacing:2pt;}
.headline{font-size:11pt;color:#663399;font-weight:500;}
.contact{margin-top:4pt;color:#5a5563;font-size:9.5pt;}
.dot{margin:0 3pt;color:#a08cc0;}
h2{font-size:12.5pt;color:#663399;font-weight:700;letter-spacing:1.5pt;margin:16pt 0 8pt;padding-bottom:3pt;border-bottom:1pt solid #d9cfe8;break-after:avoid;}
.entry{margin-bottom:10pt;break-inside:avoid;}
.entry-head{display:flex;justify-content:space-between;align-items:baseline;gap:8pt;}
h3{font-size:10.5pt;font-weight:700;}
.result{font-weight:500;color:#663399;margin-left:6pt;font-size:9.5pt;}
.period{color:#6f6a78;font-size:9pt;white-space:nowrap;}
.org{color:#5a5563;font-size:9.5pt;margin-top:1pt;}
.detail{color:#44404e;margin-top:2pt;}
ul{margin:3pt 0 0 13pt;}
li{margin-bottom:1.5pt;}
</style>
</head>
<body>
<header>
<div class="name-row"><h1>${escapeHtml(info.name)}</h1><span class="headline">${escapeHtml(info.title)}</span></div>
<p class="contact">${contact}</p>
</header>
<main>
<section><h2>工作經驗</h2>${work}</section>
<section><h2>教育背景</h2>${education}</section>
<section><h2>競賽經驗</h2>${competitions}</section>
<section><h2>個人成就</h2>${achievements}</section>
</main>
</body>
</html>`;
}
