import http from "node:http";
import type { AddressInfo } from "node:net";
import type { APIResponse, Download, Page } from "@playwright/test";
import { createBdd, test as base } from "playwright-bdd";
import type { FeedProject } from "./support/projects-feed";

export type Scene = {
  current?: Page;
  status?: number;
  file?: APIResponse;
  download?: Download;
  project?: FeedProject;
  projects?: FeedProject[];
};

type Fixtures = {
  scene: Scene;
  crawlerPage: Page;
  otherSite: (html: string) => Promise<string>;
};

export const test = base.extend<Fixtures>({
  scene: async ({}, use) => {
    await use({});
  },
  otherSite: async ({}, use) => {
    const servers: http.Server[] = [];
    await use(async (html) => {
      const server = http.createServer((_, res) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
      });
      servers.push(server);
      await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
      const { port } = server.address() as AddressInfo;
      return `http://127.0.0.1:${port}/`;
    });
    await Promise.all(servers.map((server) => new Promise((resolve) => server.close(resolve))));
  },
  crawlerPage: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    await use(await context.newPage());
    await context.close();
  },
});

export const { Given, When, Then } = createBdd(test);

export const currentPage = (scene: Scene): Page => {
  if (!scene.current) throw new Error("還沒有開啟任何頁面");
  return scene.current;
};
