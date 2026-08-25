import { STATIC_SEO_ATTR } from "../data/seo";

export const removeStaticSeo = (doc: Document = document): number => {
  const tags = doc.head.querySelectorAll(`[${STATIC_SEO_ATTR}]`);
  tags.forEach((tag) => tag.remove());
  return tags.length;
};
