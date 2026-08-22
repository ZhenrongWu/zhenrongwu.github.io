import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceUrl =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf";
const fontDir = path.join(rootDir, "src/assets/fonts");
export const fontWeights = [400, 500, 700] as const;
export const fontOutput = (weight: number) => path.join(fontDir, `NotoSansTC-${weight}.woff2`);

const asciiRange = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) =>
  String.fromCharCode(0x20 + i)
).join("");
const extraChars = "，。、；：？！「」『』（）《》〈〉—…％／－～‧・·×°©®™€£¥→←↑↓✓✗│";

export function collectSiteText(dir = path.join(rootDir, "src")): string {
  const chars = new Set<string>();
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(tsx?|css|html)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) {
        for (const ch of fs.readFileSync(full, "utf8")) chars.add(ch);
      }
    }
  };
  walk(dir);
  for (const ch of fs.readFileSync(path.join(rootDir, "index.html"), "utf8")) chars.add(ch);
  return [...chars].filter((ch) => ch.codePointAt(0)! > 0x7e).join("");
}

export async function generateFonts(): Promise<{ files: string[]; chars: number }> {
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`下載字型失敗：${response.status} ${sourceUrl}`);
  const source = Buffer.from(await response.arrayBuffer());
  const text = asciiRange + extraChars + collectSiteText();
  fs.mkdirSync(fontDir, { recursive: true });
  const files: string[] = [];
  for (const weight of fontWeights) {
    const woff2 = await subsetFont(source, text, {
      targetFormat: "woff2",
      variationAxes: { wght: weight },
    });
    fs.writeFileSync(fontOutput(weight), woff2);
    files.push(fontOutput(weight));
  }
  return { files, chars: new Set(text).size };
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  const { files, chars } = await generateFonts();
  const sizes = files.map(
    (file) => `${path.relative(rootDir, file)} ${Math.round(fs.statSync(file).size / 1024)} KB`
  );
  console.log(`✓ 已產生字型子集（${chars} 字元）：${sizes.join("、")}`);
}
