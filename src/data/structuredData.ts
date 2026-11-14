import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./seo.ts";
import { resumeData } from "./resume.ts";
import { socialLinks } from "./social.ts";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const homeStructuredData = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: resumeData.personalInfo.name,
      alternateName: "Zhenrong Wu",
      jobTitle: resumeData.personalInfo.title,
      url: `${SITE_URL}/`,
      sameAs: socialLinks.filter((link) => link.isPersonalProfile).map((link) => link.url),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "zh-Hant",
      author: { "@id": PERSON_ID },
    },
  ],
});
