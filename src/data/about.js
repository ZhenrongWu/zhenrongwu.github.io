// 關於我頁面的技能、工具與興趣資料。
// icon 存的是元件參考（非 JSX），由 About.jsx 的 SkillCard 渲染為 <item.icon />，
// 如此資料檔不需要 JSX，也能在測試中直接 import。
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaBootstrap,
  FaWordpress,
  FaGit,
  FaLinux,
  FaUnity,
  FaFigma,
  FaTrello,
  FaBook,
  FaDumbbell,
  FaFilm,
  FaPalette,
} from "react-icons/fa";
import {
  SiJquery,
  SiMongodb,
  SiMysql,
  SiVim,
  SiPostman,
  SiDocker,
  SiUnrealengine,
  SiNotion,
  SiDotnet,
  SiRider,
} from "react-icons/si";
import {
  SiPhotoshop,
  SiIllustrator,
  SiAfterEffects,
  SiPremierePro,
  SiInDesign,
  SiAdobeXd,
  SiCanva,
  CursorIcon,
  VSCodeIcon,
} from "../components/BrandIcons";

// 技能數據 - 按類別分組
export const skillsData = {
  languages: [
    { name: "C#", icon: SiDotnet, color: "#9B4F96" },
    { name: "HTML", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "PHP", icon: FaPhp, color: "#777BB4" },
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "AJAX", icon: FaJs, color: "#00B8D9" },
    { name: "RESTful", icon: FaNodeJs, color: "#4CAF50" },
  ],
  frameworks: [
    { name: "jQuery", icon: SiJquery, color: "#0769AD" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "WordPress", icon: FaWordpress, color: "#21759B" },
  ],
  databases: [
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  ],
  devTools: [
    { name: "vim", icon: SiVim, color: "#019733" },
    { name: "Git", icon: FaGit, color: "#F05032" },
    { name: "Linux", icon: FaLinux, color: "#FCC624" },
  ],
};

// 合併所有技能以保持原有顯示方式
export const skills = [
  ...skillsData.languages,
  ...skillsData.frameworks,
  ...skillsData.databases,
  ...skillsData.devTools,
];

// 工具列表
export const tools = [
  { name: "Cursor", icon: CursorIcon, color: "#1D9BF0" },
  { name: "VS Code", icon: VSCodeIcon, color: "#007ACC" },
  { name: "Jetbrain Rider", icon: SiRider, color: "#000000" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Unity3D", icon: FaUnity, color: "#000000" },
  { name: "Unreal Engine", icon: SiUnrealengine, color: "#0E1128" },
  { name: "Photoshop", icon: SiPhotoshop, color: "#31A8FF" },
  { name: "Illustrator", icon: SiIllustrator, color: "#FF9A00" },
  { name: "After Effects", icon: SiAfterEffects, color: "#9999FF" },
  { name: "Premiere", icon: SiPremierePro, color: "#9999FF" },
  { name: "InDesign", icon: SiInDesign, color: "#FF3366" },
  { name: "Adobe XD", icon: SiAdobeXd, color: "#FF61F6" },
  { name: "Figma", icon: FaFigma, color: "#F24E1E" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC" },
  { name: "Stable Diffusion", icon: FaPalette, color: "#0066CC" },
  { name: "Notion", icon: SiNotion, color: "#000000" },
  { name: "Trello", icon: FaTrello, color: "#0079BF" },
];

// 個人興趣
export const hobbies = [
  { name: "看動漫", icon: FaFilm, color: "#FF6B6B" },
  { name: "健身", icon: FaDumbbell, color: "#4CAF50" },
  { name: "閱讀", icon: FaBook, color: "#FF9800" },
];
