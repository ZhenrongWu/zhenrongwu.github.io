import { useLocation } from "react-router-dom";
import { DEFAULT_DESCRIPTION, canonicalUrl, fullTitle } from "../data/seo";

type SeoProps = {
  title?: string;
  description?: string;
  noIndex?: boolean;
};

const Seo = ({ title, description = DEFAULT_DESCRIPTION, noIndex = false }: SeoProps) => {
  const { pathname } = useLocation();
  const pageTitle = fullTitle(title);
  const canonical = canonicalUrl(pathname);

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={canonical} />
      )}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
};

export default Seo;
