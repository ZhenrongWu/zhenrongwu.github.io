import { DEFAULT_DESCRIPTION } from "./seo.ts";

export type RouteConfig = {
  url: string;
  title?: string;
  description: string;
  changefreq: "monthly";
  priority: number;
  sources: string[];
};

export const routes: RouteConfig[] = [
  {
    url: "/",
    description: DEFAULT_DESCRIPTION,
    changefreq: "monthly",
    priority: 1.0,
    sources: ["src/pages/Home.tsx"],
  },
  {
    url: "/about",
    title: "關於我",
    description: "認識吳振榮：遊戲與網頁開發者的專業簡介、接觸過的技能、常用工具與興趣。",
    changefreq: "monthly",
    priority: 0.8,
    sources: ["src/pages/About.tsx", "src/data/about.ts"],
  },
  {
    url: "/portfolio",
    title: "作品集",
    description: "吳振榮的作品集：網頁開發、遊戲開發與自動化工具專案，包含使用技術與作品連結。",
    changefreq: "monthly",
    priority: 0.9,
    sources: ["src/pages/Portfolio.tsx", "src/data/projects.ts"],
  },
  {
    url: "/resume",
    title: "履歷",
    description: "吳振榮的履歷：學歷、工作經歷、專案經驗與技能，並可下載 PDF 版本。",
    changefreq: "monthly",
    priority: 0.8,
    sources: ["src/pages/Resume.tsx", "src/data/resume.ts"],
  },
];

export const seoFor = (url: string): { title?: string; description: string } => {
  const route = routes.find((r) => r.url === url);
  if (!route) throw new Error(`找不到 ${url} 的 SEO 設定`);
  return { title: route.title, description: route.description };
};
