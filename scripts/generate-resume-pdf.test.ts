import { describe, it, expect } from "vitest";
import zlib from "node:zlib";
import { validateResumePdf } from "./generate-resume-pdf.ts";

function buildTtf(numGlyphs: number): Buffer {
  const header = Buffer.alloc(12);
  header.writeUInt32BE(0x00010000, 0);
  header.writeUInt16BE(1, 4);
  const record = Buffer.alloc(16);
  record.write("maxp", 0, "latin1");
  record.writeUInt32BE(28, 8);
  record.writeUInt32BE(6, 12);
  const maxp = Buffer.alloc(6);
  maxp.writeUInt32BE(0x00005000, 0);
  maxp.writeUInt16BE(numGlyphs, 4);
  return Buffer.concat([header, record, maxp]);
}

function buildPdf(fontData: Buffer, cmap: string, compressFont = false): Buffer {
  const cmapBuffer = Buffer.from(cmap, "latin1");
  const fontStream = compressFont ? zlib.deflateSync(fontData) : fontData;
  const fontFilter = compressFont ? "/Filter /FlateDecode\n" : "";
  const head = [
    "%PDF-1.4",
    "10 0 obj",
    "<</Type /Font\n/Subtype /Type0\n/BaseFont /AAAAAA+NotoSansTC-Thin\n/Encoding /Identity-H\n/DescendantFonts [11 0 R]\n/ToUnicode 14 0 R>>",
    "endobj",
    "11 0 obj",
    "<</Type /Font\n/FontDescriptor 12 0 R\n/Subtype /CIDFontType2\n/CIDToGIDMap /Identity\n/CIDSystemInfo <</Registry (Adobe)\n/Ordering (Identity)\n/Supplement 0>>>>",
    "endobj",
    "12 0 obj",
    "<</Type /FontDescriptor\n/FontName /AAAAAA+NotoSansTC-Thin\n/FontFile2 13 0 R>>",
    "endobj",
    "13 0 obj",
    `<</Length1 ${fontData.length}\n${fontFilter}/Length ${fontStream.length}>> stream`,
    "",
  ].join("\n");
  const middle = `\nendstream\nendobj\n14 0 obj\n<</Length ${cmapBuffer.length}>> stream\n`;
  return Buffer.concat([
    Buffer.from(head, "latin1"),
    fontStream,
    Buffer.from(middle, "latin1"),
    cmapBuffer,
    Buffer.from("\nendstream\nendobj\n%%EOF", "latin1"),
  ]);
}

const cmapWith = (entries: string) => `begincmap\n2 beginbfchar\n${entries}\nendbfchar\nendcmap`;

describe("validateResumePdf", () => {
  it("字形編號在範圍內且必要字元齊全時通過", () => {
    const pdf = buildPdf(buildTtf(952), cmapWith("<0173> <5433>\n<01e5> <632F>"));
    expect(validateResumePdf(pdf, "吳振")).toEqual([]);
  });

  it("偵測超出內嵌字型範圍的字形編號", () => {
    const pdf = buildPdf(buildTtf(952), cmapWith("<5C65> <5DE5>"));
    const problems = validateResumePdf(pdf, "工");
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("23653");
    expect(problems[0]).toContain("952");
  });

  it("NFKC 相容字元視為已涵蓋", () => {
    const pdf = buildPdf(buildTtf(952), cmapWith("<0010> <002C>"));
    expect(validateResumePdf(pdf, "，")).toEqual([]);
  });

  it("共用字形的別名碼位視為已涵蓋", () => {
    const pdf = buildPdf(buildTtf(952), cmapWith("<0083> <00B7>"));
    const aliases = new Map([[0x30fb, [0x30fb, 0xb7]]]);
    expect(validateResumePdf(pdf, "・", aliases)).toEqual([]);
    expect(validateResumePdf(pdf, "・")).toHaveLength(1);
  });

  it("偵測文字層缺少的必要字元", () => {
    const pdf = buildPdf(buildTtf(952), cmapWith("<0173> <632F>"));
    const problems = validateResumePdf(pdf, "吳振");
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("吳");
  });

  it("支援 FlateDecode 壓縮的內嵌字型與 bfrange 區段", () => {
    const cmap = "begincmap\n1 beginbfrange\n<0100> <0102> <5433>\nendbfrange\nendcmap";
    const pdf = buildPdf(buildTtf(300), cmap, true);
    expect(validateResumePdf(pdf, "吳")).toEqual([]);
  });

  it("找不到任何 Type0 字型時回報問題", () => {
    const problems = validateResumePdf(Buffer.from("%PDF-1.4\n%%EOF", "latin1"), "吳");
    expect(problems.some((p) => p.includes("Type0"))).toBe(true);
  });
});
