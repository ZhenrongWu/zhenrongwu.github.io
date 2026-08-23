import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import * as fontkit from "fontkit";
import { buildResumeHtml } from "./build-resume-html.ts";
import { resumeData } from "../src/data/resume.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resumePdfName = "resume.pdf";

async function renderResumePdf(html: string): Promise<Buffer> {
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf({
      format: "A4",
      margin: { top: "14mm", right: "15mm", bottom: "16mm", left: "15mm" },
      printBackground: true,
    });
  } finally {
    await browser.close();
  }
}

function findObject(text: string, objNum: string): number {
  return text.indexOf(`\n${objNum} 0 obj`);
}

function objectSlice(text: string, objNum: string): string {
  const start = findObject(text, objNum);
  if (start === -1) return "";
  const end = text.indexOf("endobj", start);
  return text.slice(start, end === -1 ? undefined : end);
}

function streamData(text: string, pdf: Buffer, objNum: string): Buffer | null {
  const objStart = findObject(text, objNum);
  if (objStart === -1) return null;
  const streamKeyword = text.indexOf("stream", objStart);
  if (streamKeyword === -1) return null;
  const dict = text.slice(objStart, streamKeyword);
  const length = /\/Length\s+(\d+)/.exec(dict);
  if (!length) return null;
  let start = streamKeyword + "stream".length;
  if (text[start] === "\r") start++;
  if (text[start] === "\n") start++;
  const raw = pdf.subarray(start, start + Number(length[1]));
  return dict.includes("/FlateDecode") ? zlib.inflateSync(raw) : Buffer.from(raw);
}

function ttfNumGlyphs(font: Buffer): number | null {
  if (font.length < 12) return null;
  const tableCount = font.readUInt16BE(4);
  for (let i = 0; i < tableCount; i++) {
    const record = 12 + i * 16;
    if (record + 16 > font.length) return null;
    if (font.toString("latin1", record, record + 4) === "maxp") {
      const offset = font.readUInt32BE(record + 8);
      if (offset + 6 > font.length) return null;
      return font.readUInt16BE(offset + 4);
    }
  }
  return null;
}

function parseToUnicode(cmap: string): { cids: number[]; unicodes: Set<number> } {
  const cids: number[] = [];
  const unicodes = new Set<number>();
  for (const block of cmap.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const pair of block[1]!.matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)) {
      cids.push(parseInt(pair[1]!, 16));
      unicodes.add(parseInt(pair[2]!.slice(0, 4), 16));
    }
  }
  for (const block of cmap.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
    for (const triple of block[1]!.matchAll(
      /<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g
    )) {
      const low = parseInt(triple[1]!, 16);
      const high = parseInt(triple[2]!, 16);
      const unicode = parseInt(triple[3]!.slice(0, 4), 16);
      cids.push(low, high);
      for (let i = 0; i <= high - low; i++) unicodes.add(unicode + i);
    }
  }
  return { cids, unicodes };
}

export function collectGlyphAliases(fontFile: string): Map<number, number[]> {
  const font = fontkit.create(fs.readFileSync(fontFile));
  if (!("characterSet" in font)) throw new Error(`字型檔不是單一字型：${fontFile}`);
  const byGlyph = new Map<number, number[]>();
  for (const codePoint of font.characterSet) {
    const id = font.glyphForCodePoint(codePoint).id;
    const group = byGlyph.get(id);
    if (group) group.push(codePoint);
    else byGlyph.set(id, [codePoint]);
  }
  const aliases = new Map<number, number[]>();
  for (const group of byGlyph.values()) {
    if (group.length > 1) for (const codePoint of group) aliases.set(codePoint, group);
  }
  return aliases;
}

export function validateResumePdf(
  pdf: Buffer,
  requiredText: string,
  glyphAliases: Map<number, number[]> = new Map()
): string[] {
  const text = pdf.toString("latin1");
  const problems: string[] = [];
  const coveredUnicodes = new Set<number>();
  const type0Dicts = [...text.matchAll(/<<[^<>]*\/Subtype\s*\/Type0[^<>]*>>/g)];
  if (type0Dicts.length === 0) problems.push("PDF 內找不到任何 Type0 字型");
  for (const dict of type0Dicts) {
    const baseFont = /\/BaseFont\s*\/([^\s/]+)/.exec(dict[0])?.[1] ?? "unknown";
    try {
      const toUnicodeRef = /\/ToUnicode\s+(\d+)\s+0\s+R/.exec(dict[0])?.[1];
      const descendantRef = /\/DescendantFonts\s*\[\s*(\d+)\s+0\s+R\s*\]/.exec(dict[0])?.[1];
      if (!toUnicodeRef || !descendantRef) {
        problems.push(`${baseFont}：缺少 ToUnicode 或 DescendantFonts`);
        continue;
      }
      const cmapBuffer = streamData(text, pdf, toUnicodeRef);
      if (!cmapBuffer) {
        problems.push(`${baseFont}：無法讀取 ToUnicode`);
        continue;
      }
      const { cids, unicodes } = parseToUnicode(cmapBuffer.toString("latin1"));
      for (const unicode of unicodes) coveredUnicodes.add(unicode);
      const descriptorRef = /\/FontDescriptor\s+(\d+)\s+0\s+R/.exec(
        objectSlice(text, descendantRef)
      )?.[1];
      const fontFileRef = descriptorRef
        ? /\/FontFile2\s+(\d+)\s+0\s+R/.exec(objectSlice(text, descriptorRef))?.[1]
        : undefined;
      if (!fontFileRef) continue;
      const fontBuffer = streamData(text, pdf, fontFileRef);
      const numGlyphs = fontBuffer ? ttfNumGlyphs(fontBuffer) : null;
      if (numGlyphs === null) {
        problems.push(`${baseFont}：無法解析內嵌字型`);
        continue;
      }
      const maxCid = Math.max(-1, ...cids);
      if (maxCid >= numGlyphs) {
        problems.push(`${baseFont}：引用字形編號 ${maxCid}，超出內嵌字型的 ${numGlyphs} 個字形`);
      }
    } catch {
      problems.push(`${baseFont}：內嵌字型資料解析失敗`);
    }
  }
  const isCovered = (ch: string): boolean => {
    const codePoint = ch.codePointAt(0)!;
    if (coveredUnicodes.has(codePoint)) return true;
    if ((glyphAliases.get(codePoint) ?? []).some((alias) => coveredUnicodes.has(alias))) {
      return true;
    }
    const normalized = ch.normalize("NFKC");
    return (
      normalized !== ch && [...normalized].every((c) => coveredUnicodes.has(c.codePointAt(0)!))
    );
  };
  const missing = [...new Set(requiredText)].filter(
    (ch) => ch.codePointAt(0)! > 0x7e && !isCovered(ch)
  );
  if (missing.length > 0) problems.push(`PDF 文字層缺字：${missing.join("")}`);
  return problems;
}

export async function generateResumePdf(): Promise<string> {
  const html = buildResumeHtml(resumeData);
  const pdf = await renderResumePdf(html);
  const problems = validateResumePdf(
    pdf,
    html.replace(/<title>.*?<\/title>/, ""),
    collectGlyphAliases(path.join(rootDir, "src/assets/fonts/NotoSansTC-400.woff2"))
  );
  if (problems.length > 0) {
    throw new Error(`履歷 PDF 驗證未通過：${problems.join("；")}`);
  }
  const target = path.join(rootDir, "public", resumePdfName);
  fs.writeFileSync(target, pdf);
  return target;
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const file = await generateResumePdf();
  console.log(`✓ 已產生履歷 PDF：${path.relative(rootDir, file)}，請確認內容後 commit`);
}
