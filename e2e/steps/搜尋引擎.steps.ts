import { expect, type Page } from "@playwright/test";
import { When, Then, currentPage, type Scene } from "../fixtures";

const metaContent = (page: Page, selector: string) =>
  page.locator(`meta[${selector}]`).getAttribute("content");

const robotsDirectives = async (page: Page): Promise<string[]> =>
  page
    .locator('meta[name="robots"]')
    .evaluateAll((tags) => tags.map((tag) => (tag.getAttribute("content") ?? "").toLowerCase()));

const fileText = async (scene: Scene): Promise<string> => {
  if (!scene.file) throw new Error("還沒有讀取任何檔案");
  expect(scene.file.status()).toBe(200);
  return scene.file.text();
};

When("不執行 JavaScript 的爬蟲讀取 {string}", async ({ crawlerPage, scene }, path: string) => {
  const response = await crawlerPage.goto(path);
  if (!response) throw new Error(`讀取 ${path} 沒有回應`);
  scene.status = response.status();
  scene.current = crawlerPage;
});

When("爬蟲讀取 {string} 檔案", async ({ request, scene }, path: string) => {
  scene.file = await request.get(path);
});

Then("回應狀態碼是 {int}", async ({ scene }, status: number) => {
  expect(scene.status).toBe(status);
});

Then("網頁標題是 {string}", async ({ scene }, title: string) => {
  await expect(currentPage(scene)).toHaveTitle(title);
});

Then("網頁摘要是 {string}", async ({ scene }, description: string) => {
  await expect(currentPage(scene).locator('meta[name="description"]')).toHaveAttribute(
    "content",
    description
  );
});

Then("正式網址是 {string}", async ({ scene }, url: string) => {
  await expect(currentPage(scene).locator('link[rel="canonical"]')).toHaveAttribute("href", url);
});

Then("網頁只有一個正式網址", async ({ scene }) => {
  await expect(currentPage(scene).locator('link[rel="canonical"]')).toHaveCount(1);
});

Then("網頁沒有正式網址", async ({ scene }) => {
  await expect(currentPage(scene).locator('link[rel="canonical"]')).toHaveCount(0);
});

Then("網頁允許搜尋引擎收錄", async ({ scene }) => {
  const directives = await robotsDirectives(currentPage(scene));
  expect(directives.some((content) => content.includes("noindex"))).toBe(false);
});

Then("網頁要求搜尋引擎不要收錄", async ({ scene }) => {
  const directives = await robotsDirectives(currentPage(scene));
  expect(directives.some((content) => content.includes("noindex"))).toBe(true);
});

Then(
  "sitemap 列出以下網址，且每個網址都有最後更新日期：",
  async ({ scene }, table: { hashes(): Record<string, string>[] }) => {
    const xml = await fileText(scene);
    const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body = ""]) => ({
      loc: /<loc>([^<]+)<\/loc>/.exec(body)?.[1],
      lastmod: /<lastmod>([^<]+)<\/lastmod>/.exec(body)?.[1],
    }));
    expect(entries.map((entry) => entry.loc)).toEqual(table.hashes().map((row) => row["網址"]));
    for (const entry of entries) {
      expect(entry.lastmod, `${entry.loc} 的最後更新日期`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  }
);

Then("robots.txt 允許所有爬蟲收錄全站", async ({ scene }) => {
  const lines = (await fileText(scene)).split("\n").map((line) => line.trim());
  expect(lines).toContain("User-agent: *");
  expect(lines).toContain("Allow: /");
  expect(lines.filter((line) => /^Disallow:\s*\S/.test(line))).toEqual([]);
});

Then("robots.txt 指出 sitemap 位於 {string}", async ({ scene }, url: string) => {
  const lines = (await fileText(scene)).split("\n").map((line) => line.trim());
  expect(lines).toContain(`Sitemap: ${url}`);
});

Then("分享預覽的標題是 {string}", async ({ scene }, title: string) => {
  const page = currentPage(scene);
  expect(await metaContent(page, 'property="og:title"')).toBe(title);
  expect(await metaContent(page, 'name="twitter:title"')).toBe(title);
});

Then("分享預覽的摘要與網頁摘要相同", async ({ scene }) => {
  const page = currentPage(scene);
  const description = await metaContent(page, 'name="description"');
  expect(description).toBeTruthy();
  expect(await metaContent(page, 'property="og:description"')).toBe(description);
  expect(await metaContent(page, 'name="twitter:description"')).toBe(description);
});

Then("分享預覽的網址是 {string}", async ({ scene }, url: string) => {
  expect(await metaContent(currentPage(scene), 'property="og:url"')).toBe(url);
});

Then("分享預覽以大圖卡片顯示 {string}", async ({ scene, request }, imageUrl: string) => {
  const page = currentPage(scene);
  expect(await metaContent(page, 'name="twitter:card"')).toBe("summary_large_image");
  expect(await metaContent(page, 'property="og:image"')).toBe(imageUrl);
  expect(await metaContent(page, 'name="twitter:image"')).toBe(imageUrl);
  const image = await request.get(new URL(imageUrl).pathname);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toMatch(/^image\//);
});
