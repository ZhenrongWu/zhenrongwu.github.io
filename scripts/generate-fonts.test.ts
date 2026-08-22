import { describe, it, expect } from "vitest";
import fs from "node:fs";
import * as fontkit from "fontkit";
import { collectSiteText, fontOutput, fontWeights } from "./generate-fonts.ts";

describe("Noto Sans TC 字型子集", () => {
  it.each(fontWeights)(
    "字重 %i 涵蓋網站所有非 ASCII 字元（缺字時請執行 npm run generate-fonts）",
    (weight) => {
      const font = fontkit.create(fs.readFileSync(fontOutput(weight)));
      if (!("hasGlyphForCodePoint" in font)) throw new Error("字型檔不是單一字型");
      const missing = [...new Set(collectSiteText())].filter(
        (ch) => !font.hasGlyphForCodePoint(ch.codePointAt(0)!)
      );
      expect(missing).toEqual([]);
    }
  );
});
