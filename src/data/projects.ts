import p1Img from "../assets/images/p1.webp";
import p2Img from "../assets/images/p2.webp";
import p3Img from "../assets/images/p3.webp";
import p4Img from "../assets/images/p4.webp";
import p5Img from "../assets/images/p5.webp";
import p6Img from "../assets/images/p6.webp";
import p7Img from "../assets/images/p7.webp";
import p8Img from "../assets/images/p8.webp";
import p9Img from "../assets/images/p9.webp";
import p10Img from "../assets/images/p10.webp";
import p11Img from "../assets/images/p11.webp";
import p12Img from "../assets/images/p12.webp";
import p13Img from "../assets/images/p13.webp";
import p14Img from "../assets/images/p14.webp";
export type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: ProjectImage;
  date: string;
  tags: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Ctrl+S",
    category: "遊戲開發",
    description:
      "Faust Game Jam 2020 參賽作品，主題為 Save Yourself, Not the World。2D 策略遊戲，我主要負責遊戲介面和功能整合。",
    image: { src: p14Img, width: 880, height: 630 },
    date: "2020年8月",
    tags: ["Unity", "C#", "WebGL", "itch.io"],
    url: "https://wanderviewer.itch.io/ctrls",
  },
  {
    id: 2,
    title: "嶺東科技大學 教學評量自動填寫",
    category: "網頁應用",
    description: "懶人小工具。",
    image: { src: p1Img, width: 1456, height: 816 },
    date: "2021年12月",
    tags: ["HTML", "CSS", "JavaScript", "VS Code", "Git"],
    url: "https://chromewebstore.google.com/detail/dnkodhghfphabiopghdmpcmpojlchajg?utm_source=item-share-cb",
  },
  {
    id: 3,
    title: "迴魂",
    category: "遊戲開發",
    description: "此畢業專案，我主要負責遊戲系統與功能實作，另負責專案管理及部分關卡規劃。",
    image: { src: p2Img, width: 1456, height: 816 },
    date: "2022年9月",
    tags: ["Unity", "C#", "Jetbrain Rider", "vim", "Git"],
    url: "https://store.steampowered.com/app/2075110/Incarnation/?l=tchinese",
  },
  {
    id: 4,
    title: "Sandwich-Tycoon",
    category: "遊戲開發",
    description:
      "於 Nobollel 前公司成功上架的專案，我主要負責遊戲內的 AI、道具效果與部分前端頁面互動功能開發。",
    image: { src: p3Img, width: 1456, height: 816 },
    date: "2023年12月",
    tags: ["Unity", "C#", "Jetbrain Rider", "vim", "Git"],
    url: "https://apps.apple.com/tw/app/sandwich-tycoon/id6475956767",
  },
  {
    id: 5,
    title: "開發者英雄基地",
    category: "網頁開發",
    description: "個人電子商務平台，含有付款系統和訂單功能。",
    image: { src: p4Img, width: 1456, height: 816 },
    date: "2024年12月",
    tags: ["WordPress", "Elementor", "WooCommerce", "Canva"],
    url: "https://devherohub.com/",
  },
  {
    id: 6,
    title: "胖老爹食堂",
    category: "網頁開發",
    description: "專為小型商家設計的一頁式網站，提供簡潔的線上展示平台。",
    image: { src: p5Img, width: 1456, height: 816 },
    date: "2025年1月",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "VS Code", "Photoshop", "Git"],
    url: "https://fat-dad-eatery.netlify.app/",
  },
  {
    id: 7,
    title: "Babble bubble",
    category: "遊戲開發",
    description:
      "Global Game Jam 2025 參賽作品，主題為 Bubble。以傳話遊戲為靈感，玩家搧風推動對話泡泡，讓居民的話語傳到對的人耳中；我主要負責所有遊戲功能和帶領團隊。",
    image: { src: p13Img, width: 960, height: 588 },
    date: "2025年1月",
    tags: ["Unity", "C#", "WebGL", "itch.io"],
    url: "https://wanderviewer.itch.io/babble-bubble",
  },
  {
    id: 8,
    title: "圖像畫廊",
    category: "網頁開發",
    description: "整合 Pexels API 的圖像網站，瀏覽與下載精美圖片。",
    image: { src: p6Img, width: 1456, height: 816 },
    date: "2025年5月",
    tags: ["HTML", "CSS", "Sass", "JavaScript", "React", "Ajax", "VS Code", "Git"],
    url: "https://image-gallery-2025.netlify.app/",
  },
  {
    id: 9,
    title: "Who's Cat-ching Naps",
    category: "遊戲開發",
    description:
      "Global Game Jam 2026 參賽作品，主題為 Mask。扮演老師在下課前揪出上課偷懶的學生，點擊越多次打混的學生分數越高；我主要負責專案管理和主程式。",
    image: { src: p12Img, width: 960, height: 600 },
    date: "2026年1月",
    tags: ["Unity", "C#", "WebGL", "itch.io"],
    url: "https://wanderviewer.itch.io/whos-cat-ching-naps",
  },
  {
    id: 10,
    title: "RPA．ERP 系統",
    category: "網頁開發",
    description:
      "開發 RPA-ERP MVP 系統，完成進銷存、會計、生產與自動化模組之全端整合，支援登入授權、CRUD 與儀表板監控。",
    image: { src: p7Img, width: 1500, height: 685 },
    date: "2026年4月",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "REST API",
      "SQL",
      "RPA",
      "ERP",
      "Git",
    ],
    url: "https://rpa-erp-system.vercel.app",
  },
  {
    id: 11,
    title: "墨池爭食",
    category: "遊戲開發",
    description:
      "用 Google AI Studio 產出原型，下載至本機修正後上架到 Google Play，並提供兩種版本網頁跟 App。",
    image: { src: p8Img, width: 1500, height: 684 },
    date: "2026年5月",
    tags: ["TypeScript", "React", "Canvas", "Google AI Studio", "Google Play", "Netlify", "Git"],
    url: "https://play.google.com/store/apps/details?id=com.Frank.InkPool",
  },
  {
    id: 12,
    title: "網頁版小畫家",
    category: "網頁開發",
    description:
      "復刻 Windows 經典小畫家。支援自由畫筆、多種幾何形狀繪製、線條粗細與顏色調整、油漆桶填色、橡皮擦、文字輸入，並具備完整的歷史紀錄（復原與重做）及畫布下載功能。",
    image: { src: p9Img, width: 1500, height: 679 },
    date: "2026年5月",
    tags: ["TypeScript", "React", "Vite", "Tailwind CSS", "Canvas", "Netlify", "Git"],
    url: "https://paint-devherohub.netlify.app/",
  },
  {
    id: 13,
    title: "PassMD 密碼保險庫",
    category: "網頁應用",
    description:
      "密碼產生器結合端對端加密的保險庫，密碼以 Markdown 形式存放在使用者自己的 Google Drive，換裝置也能同步；支援 PWA 安裝、離線使用與版本衝突處理。",
    image: { src: p10Img, width: 1500, height: 680 },
    date: "2026年9月",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Web Crypto API",
      "Google Drive API",
      "PWA",
      "Netlify",
      "Git",
    ],
    url: "https://passmd.devherohub.com/",
  },
  {
    id: 14,
    title: "Deep Sea Gambler",
    category: "遊戲開發",
    description:
      "Faust Game Jam 2026 參賽作品，主題為 Breath。在深海中以氧氣作為籌碼，與四種深海生物進行大話骰對決，支援網頁直接遊玩；遊戲所有功能皆由我負責開發。",
    image: { src: p11Img, width: 960, height: 600 },
    date: "2026年10月",
    tags: ["Unity", "C#", "WebGL", "itch.io"],
    url: "https://wanderviewer.itch.io/deep-sea-gambler",
  },
];
