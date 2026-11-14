import { expect } from "@playwright/test";
import { Given, When, Then, currentPage } from "../fixtures";

Given("訪客開啟 {string} 頁面", async ({ page, scene }, path: string) => {
  page.on("download", (download) => {
    scene.download = download;
  });
  await page.goto(path);
  await page.locator("main h1").first().waitFor();
  scene.current = page;
});

When("他點選導覽列的 {string}", async ({ scene }, label: string) => {
  const page = currentPage(scene);
  await page.getByRole("navigation").getByRole("link", { name: label, exact: true }).click();
});

When("他點選 {string}", async ({ scene }, text: string) => {
  await currentPage(scene).getByText(text, { exact: true }).click();
});

When("他按下 {string}", async ({ scene }, key: string) => {
  await currentPage(scene).keyboard.press(key);
});

Then("網址是 {string}", async ({ scene }, path: string) => {
  await expect(currentPage(scene)).toHaveURL((url) => url.pathname === path);
});

Then("頁面主標題是 {string}", async ({ scene }, text: string) => {
  await expect(currentPage(scene).locator("h1").first()).toHaveText(text);
});

Then("畫面顯示 {string}", async ({ scene }, text: string) => {
  await expect(currentPage(scene).getByText(text).first()).toBeVisible();
});
