import { expect } from "@playwright/test";
import { Given, Then, currentPage } from "../fixtures";

Given(
  "其他網站以 iframe 嵌入 {string} 頁面",
  async ({ page, scene, baseURL, otherSite }, path: string) => {
    const target = new URL(path, baseURL).href;
    const url = await otherSite(
      `<!doctype html><title>其他網站</title><iframe src="${target}" width="800" height="600"></iframe>`
    );
    await page.goto(url);
    await page.frameLocator("iframe").locator("#root").waitFor({ state: "attached" });
    await page.waitForLoadState("networkidle");
    scene.current = page;
  }
);

Then("嵌入的畫面沒有顯示任何頁面內容", async ({ scene }) => {
  const frame = currentPage(scene).frameLocator("iframe");
  await expect(frame.locator("#root")).toBeEmpty();
  await expect(frame.locator("h1")).toHaveCount(0);
});
