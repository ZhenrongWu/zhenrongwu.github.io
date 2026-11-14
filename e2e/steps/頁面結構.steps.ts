import { expect } from "@playwright/test";
import { Then, currentPage } from "../fixtures";

Then("網頁作者是 {string}", async ({ scene }, author: string) => {
  await expect(currentPage(scene).locator('meta[name="author"]')).toHaveAttribute(
    "content",
    author
  );
});

Then("頁面只有一個主標題", async ({ scene }) => {
  await expect(currentPage(scene).locator("h1")).toHaveCount(1);
});

Then("標題層級沒有跳級", async ({ scene }) => {
  const headings = await currentPage(scene)
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((nodes) =>
      nodes.map((node) => ({
        level: Number(node.tagName.slice(1)),
        text: (node.textContent ?? "").trim(),
      }))
    );
  expect(headings[0]?.level, "第一個標題").toBe(1);
  const skipped = headings.filter(
    (heading, index) => index > 0 && heading.level > headings[index - 1]!.level + 1
  );
  expect(skipped.map((heading) => `h${heading.level} ${heading.text}`)).toEqual([]);
});
