import fs from "node:fs/promises";
import { expect } from "@playwright/test";
import { Then, currentPage } from "../fixtures";

const PHONE_PATTERN = /(\+886|\b09\d{2})[-\s]?\d{3}[-\s]?\d{3}\b/;

Then("履歷依序列出以下段落：", async ({ scene }, table: { hashes(): Record<string, string>[] }) => {
  const titles = currentPage(scene).locator(".resume-title");
  await expect(titles).toHaveText(table.hashes().map((row) => row["段落"] ?? ""));
});

Then("下載的檔案名稱是 {string}", async ({ scene }, fileName: string) => {
  await expect.poll(() => scene.download?.suggestedFilename()).toBe(fileName);
});

Then("下載的檔案是 PDF", async ({ scene }) => {
  const file = await scene.download!.path();
  const header = (await fs.readFile(file)).subarray(0, 5).toString("latin1");
  expect(header).toBe("%PDF-");
});

Then("畫面有 email 聯絡連結", async ({ scene }) => {
  await expect(currentPage(scene).locator('a[href^="mailto:"]').first()).toBeVisible();
});

Then("畫面沒有電話號碼", async ({ scene }) => {
  const page = currentPage(scene);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  expect(await page.locator("body").innerText()).not.toMatch(PHONE_PATTERN);
});
