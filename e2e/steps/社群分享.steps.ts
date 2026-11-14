import { expect } from "@playwright/test";
import { Then, currentPage } from "../fixtures";

Then("分享預覽圖的尺寸是 {int}×{int}", async ({ scene, page }, width: number, height: number) => {
  const crawled = currentPage(scene);
  const meta = (property: string) =>
    crawled.locator(`meta[property="${property}"]`).getAttribute("content");
  expect(await meta("og:image:width")).toBe(String(width));
  expect(await meta("og:image:height")).toBe(String(height));

  const imageUrl = await meta("og:image");
  await page.goto(new URL(imageUrl!).pathname);
  const size = await page
    .locator("img")
    .evaluate((img: HTMLImageElement) => [img.naturalWidth, img.naturalHeight]);
  expect(size).toEqual([width, height]);
});

Then("分享預覽圖的替代文字是 {string}", async ({ scene }, alt: string) => {
  const page = currentPage(scene);
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", alt);
  await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute("content", alt);
});
