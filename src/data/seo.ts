export const SITE_NAME = "ZHENRONG WU";
export const SITE_URL = "https://zhenrongwu.github.io";
export const DEFAULT_DESCRIPTION =
  "吳振榮的個人網站，展示網頁開發、遊戲開發專案、技能與專業經歷。專注於前端技術、React、互動設計與數位產品開發。";
export const NOT_FOUND_TITLE = "找不到頁面";

export const STATIC_SEO_ATTR = "data-static-seo";

export const fullTitle = (title?: string): string =>
  title ? `${title} | ${SITE_NAME}` : SITE_NAME;

export const canonicalUrl = (pathname: string): string =>
  `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
