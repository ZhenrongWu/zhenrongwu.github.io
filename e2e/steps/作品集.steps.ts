import { expect, type Page } from "@playwright/test";
import { When, Then, currentPage, type Scene } from "../fixtures";
import { newestFirst, readProjectsFeed, type FeedProject } from "../support/projects-feed";
import { SITE_URL } from "../../src/data/seo";

const FRONT_LABEL = /^查看 (.+) 詳細資料$/;

const frontCard = (page: Page, project: FeedProject) =>
  page.getByRole("button", { name: `查看 ${project.title} 詳細資料`, exact: true });

const backButton = (page: Page, project: FeedProject) =>
  page.getByRole("button", { name: `返回 ${project.title} 卡片正面`, exact: true });

const chosenProject = (scene: Scene): FeedProject => {
  if (!scene.project) throw new Error("還沒有選定作品");
  return scene.project;
};

const pickNewest = async (scene: Scene, request: Parameters<typeof readProjectsFeed>[0]) => {
  const [newest] = newestFirst(await readProjectsFeed(request));
  if (!newest) throw new Error("作品資料是空的");
  scene.project = newest;
  return newest;
};

Then("作品卡片依作品資料由新到舊排列", async ({ scene, request }) => {
  const page = currentPage(scene);
  const expected = newestFirst(await readProjectsFeed(request)).map((p) => p.title);
  const cards = page.getByRole("button", { name: FRONT_LABEL });
  await expect(cards).toHaveCount(expected.length);
  const labels = await cards.evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("aria-label") ?? "")
  );
  expect(labels.map((label) => FRONT_LABEL.exec(label)?.[1])).toEqual(expected);
});

When("他點選最新一件作品的卡片", async ({ scene, request }) => {
  const project = await pickNewest(scene, request);
  await frontCard(currentPage(scene), project).click();
});

When("他在最新一件作品的卡片上按下 {string}", async ({ scene, request }, key: string) => {
  const project = await pickNewest(scene, request);
  const card = frontCard(currentPage(scene), project);
  await card.focus();
  await card.press(key);
});

Then("卡片背面顯示該作品的說明、使用技術與完成日期", async ({ scene }) => {
  const page = currentPage(scene);
  const project = chosenProject(scene);
  const back = backButton(page, project);
  await expect(back).toBeVisible();
  await expect(back).toBeFocused();
  const face = page.locator(".project-card-face-back").filter({ has: back });
  await expect(face).toContainText(project.description);
  for (const tag of project.tags) {
    await expect(face).toContainText(tag);
  }
  await expect(face).toContainText(`完成日期：${project.date}`);
  await expect(frontCard(page, project)).toHaveCount(0);
});

When("他點選卡片背面的 {string}", async ({ scene }, text: string) => {
  const page = currentPage(scene);
  const face = page
    .locator(".project-card-face-back")
    .filter({ has: backButton(page, chosenProject(scene)) });
  await face.getByText(text, { exact: true }).click();
});

Then("卡片翻回正面", async ({ scene }) => {
  const page = currentPage(scene);
  const project = chosenProject(scene);
  const front = frontCard(page, project);
  await expect(front).toBeVisible();
  await expect(front).toHaveAttribute("aria-expanded", "false");
  await expect(front).toBeFocused();
  await expect(backButton(page, project)).toHaveCount(0);
});

When("其他網站讀取作品資料", async ({ scene, request }) => {
  scene.projects = await readProjectsFeed(request);
});

Then("每件作品都有編號、名稱、分類、說明、使用技術、完成日期與圖片", async ({ scene }) => {
  const projects = scene.projects ?? [];
  expect(projects.length).toBeGreaterThan(0);
  for (const project of projects) {
    expect(Number.isInteger(project.id), `${project.title} 的編號`).toBe(true);
    for (const field of ["title", "category", "description", "date"] as const) {
      expect(project[field], `${project.title} 的 ${field}`).toBeTruthy();
    }
    expect(project.tags.length, `${project.title} 的使用技術`).toBeGreaterThan(0);
    expect(project.image.width).toBeGreaterThan(0);
    expect(project.image.height).toBeGreaterThan(0);
  }
});

Then("每件作品的圖片網址都指向本站且可以開啟", async ({ scene, request }) => {
  for (const project of scene.projects ?? []) {
    expect(project.image.src.startsWith(`${SITE_URL}/`), project.image.src).toBe(true);
    const image = await request.get(new URL(project.image.src).pathname);
    expect(image.status(), project.image.src).toBe(200);
    expect(image.headers()["content-type"]).toMatch(/^image\//);
  }
});
