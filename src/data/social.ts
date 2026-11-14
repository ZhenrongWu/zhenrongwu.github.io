export type SocialLink = {
  id: "devherohub" | "github" | "linkedin";
  url: string;
  label: string;
  isPersonalProfile: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    id: "devherohub",
    url: "https://devherohub.com",
    label: "開發者英雄基地",
    isPersonalProfile: false,
  },
  {
    id: "github",
    url: "https://github.com/ZhenrongWu",
    label: "GitHub",
    isPersonalProfile: true,
  },
  {
    id: "linkedin",
    url: "https://www.linkedin.com/in/zhenrong-wu",
    label: "LinkedIn",
    isPersonalProfile: true,
  },
];
