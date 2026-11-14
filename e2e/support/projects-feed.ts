import { expect, type APIRequestContext } from "@playwright/test";

export const FEED_PATH = "/projects.json";

export type FeedProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  tags: string[];
  url?: string;
  image: { src: string; width: number; height: number };
};

export const readProjectsFeed = async (request: APIRequestContext): Promise<FeedProject[]> => {
  const response = await request.get(FEED_PATH);
  expect(response.status()).toBe(200);
  const { projects } = (await response.json()) as { projects: FeedProject[] };
  return projects;
};

export const newestFirst = (projects: FeedProject[]): FeedProject[] =>
  [...projects].sort((a, b) => b.id - a.id);
