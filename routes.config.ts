export type RouteConfig = {
  url: string;
  changefreq: "monthly";
  priority: number;
  sources: string[];
};

export const routes: RouteConfig[] = [
  { url: "/", changefreq: "monthly", priority: 1.0, sources: ["src/pages/Home.tsx"] },
  {
    url: "/about",
    changefreq: "monthly",
    priority: 0.8,
    sources: ["src/pages/About.tsx", "src/data/about.ts"],
  },
  {
    url: "/portfolio",
    changefreq: "monthly",
    priority: 0.9,
    sources: ["src/pages/Portfolio.tsx", "src/data/projects.ts"],
  },
  {
    url: "/resume",
    changefreq: "monthly",
    priority: 0.8,
    sources: ["src/pages/Resume.tsx", "src/data/resume.ts"],
  },
];
