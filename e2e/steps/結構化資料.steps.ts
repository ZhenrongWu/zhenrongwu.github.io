import { expect, type Page } from "@playwright/test";
import { Then, currentPage } from "../fixtures";

type Node = Record<string, unknown> & { "@type"?: string | string[]; "@id"?: string };

const structuredNodes = async (page: Page): Promise<Node[]> => {
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) => scripts.map((script) => script.textContent ?? ""));
  return blocks.flatMap((text) => {
    const data = JSON.parse(text) as Node & { "@graph"?: Node[] };
    expect(data["@context"]).toBe("https://schema.org");
    return data["@graph"] ?? [data];
  });
};

const nodeOfType = async (page: Page, type: string): Promise<Node> => {
  const nodes = (await structuredNodes(page)).filter((node) =>
    [node["@type"]].flat().includes(type)
  );
  expect(nodes, `結構化資料中的 ${type}`).toHaveLength(1);
  return nodes[0]!;
};

Then(
  "結構化資料描述一個 {string}，內容如下：",
  async ({ scene }, type: string, table: { hashes(): Record<string, string>[] }) => {
    const node = await nodeOfType(currentPage(scene), type);
    for (const { 欄位: field = "", 值: value } of table.hashes()) {
      const actual = node[field];
      if (Array.isArray(actual)) {
        expect(actual, field).toContain(value);
      } else {
        expect(actual, field).toBe(value);
      }
    }
  }
);

Then("網站的作者是結構化資料中的 {string}", async ({ scene }, type: string) => {
  const page = currentPage(scene);
  const site = await nodeOfType(page, "WebSite");
  const owner = await nodeOfType(page, type);
  expect(owner["@id"]).toBeTruthy();
  expect(site["author"]).toEqual({ "@id": owner["@id"] });
});
