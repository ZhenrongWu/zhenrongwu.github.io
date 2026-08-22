import { useLocation } from "react-router-dom";

export const SITE_NAME = "ZHENRONG WU";
export const SITE_URL = "https://zhenrongwu.github.io";
export const DEFAULT_DESCRIPTION =
  "吳振榮的個人網站，展示網頁開發、遊戲開發專案、技能與專業經歷。專注於前端技術、React、互動設計與數位產品開發。";
type SeoProps = {
  title?: string;
  description?: string;
  noIndex?: boolean;
};

const Seo = ({ title, description = DEFAULT_DESCRIPTION, noIndex = false }: SeoProps) => {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={canonical} />
      )}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
};

export default Seo;
