import { preloadable } from "./utils/preloadable";

export const Home = preloadable(() => import("./pages/Home"));
export const About = preloadable(() => import("./pages/About"));
export const Portfolio = preloadable(() => import("./pages/Portfolio"));
export const Resume = preloadable(() => import("./pages/Resume"));
export const NotFound = preloadable(() => import("./pages/NotFound"));

const pagesByPath: Record<string, typeof Home> = {
  "/": Home,
  "/about": About,
  "/portfolio": Portfolio,
  "/resume": Resume,
};

export const pageFor = (pathname: string) => pagesByPath[pathname] ?? NotFound;

export const withoutTrailingSlash = (pathname: string): string =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
