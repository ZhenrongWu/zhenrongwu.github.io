import React, { memo } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  // 程式語言和框架圖標
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
  // 開發工具圖標
  FaUnity,
  FaFigma,
  FaTrello,
  // 個人興趣圖標
  FaBook,
  FaDumbbell,
  FaFilm,
  // 新增圖標
  FaQuoteLeft,
  FaPalette,
} from "react-icons/fa";
import {
  SiJquery,
  SiMongodb,
  SiMysql,
  SiVim,
  SiPostman,
  SiUnrealengine,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiAdobeindesign,
  SiAdobexd,
  SiCanva,
  SiNotion,
  SiDotnet,
  SiRider,
} from "react-icons/si";

// Cursor 圖標組件
const CursorIcon = ({ className, style }) => (
  <div className={className} style={style}>
    <svg
      height="1em"
      style={{ flexGrow: 0, lineHeight: 1 }}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cursor</title>
      <path
        d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z"
        fill="url(#lobe-icons-cursorundefined-fill-0)"
      ></path>
      <path
        d="M22.35 18V6L11.925 0v12l10.425 6z"
        fill="url(#lobe-icons-cursorundefined-fill-1)"
      ></path>
      <path
        d="M11.925 0L1.5 6v12l10.425-6V0z"
        fill="url(#lobe-icons-cursorundefined-fill-2)"
      ></path>
      <path d="M22.35 6L11.925 24V12L22.35 6z" fill="#555"></path>
      <path d="M22.35 6l-10.425 6L1.5 6h20.85z" fill="#000"></path>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-cursorundefined-fill-0"
          x1="11.925"
          x2="11.925"
          y1="12"
          y2="24"
        >
          <stop offset=".16" stopColor="#000" stopOpacity=".39"></stop>
          <stop offset=".658" stopColor="#000" stopOpacity=".8"></stop>
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-cursorundefined-fill-1"
          x1="22.35"
          x2="11.925"
          y1="6.037"
          y2="12.15"
        >
          <stop offset=".182" stopColor="#000" stopOpacity=".31"></stop>
          <stop offset=".715" stopColor="#000" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-cursorundefined-fill-2"
          x1="11.925"
          x2="1.5"
          y1="0"
          y2="18"
        >
          <stop stopColor="#000" stopOpacity=".6"></stop>
          <stop offset=".667" stopColor="#000" stopOpacity=".22"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// VSCode 圖標組件
const VSCodeIcon = ({ className, style }) => (
  <div className={className} style={style}>
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="vscode-mask0"
        maskType="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="100"
        height="100"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z"
          fill="white"
        />
      </mask>
      <g mask="url(#vscode-mask0)">
        <path
          d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1042 10.5347 76.2036 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z"
          fill="#0065A9"
        />
        <g filter="url(#vscode-filter0_d)">
          <path
            d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z"
            fill="#007ACC"
          />
        </g>
        <g filter="url(#vscode-filter1_d)">
          <path
            d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z"
            fill="#1F9CF0"
          />
        </g>
        <g style={{ mixBlendMode: "overlay" }} opacity="0.25">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z"
            fill="url(#vscode-paint0_linear)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="vscode-filter0_d"
          x="-8.39411"
          y="15.8291"
          width="116.727"
          height="92.2456"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.16667" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="overlay"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="vscode-filter1_d"
          x="60.4167"
          y="-8.07558"
          width="47.9167"
          height="116.151"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.16667" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="overlay"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="vscode-paint0_linear"
          x1="49.9392"
          y1="0.257812"
          x2="49.9392"
          y2="99.7423"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// 技能卡片組件
const SkillCard = memo(({ item }) => (
  <div
    className="text-center p-3 rounded-3 h-100 skill-card"
    style={{
      backgroundColor: `${item.color}10`,
      transition: "all 0.3s ease",
      border: "none",
    }}
  >
    <div className="fs-2 mb-2" style={{ color: item.color }}>
      {item.icon}
    </div>
    <p className="small mb-0 fw-bold">{item.name}</p>
  </div>
));

// 技能區塊組件
const SkillSection = memo(({ title, items }) => (
  <Row className="mb-5">
    <Col lg={10} className="mx-auto">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <h2 className="h3 mb-0">{title}</h2>
      </div>

      <Card className="border-0 shadow-sm mb-5">
        <Card.Body className="p-4">
          <Row className="g-3">
            {items.map((item, index) => (
              <Col xs={4} sm={3} md={2} key={index}>
                <SkillCard item={item} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Col>
  </Row>
));

// 興趣區塊組件
const HobbySection = memo(({ hobbies }) => (
  <Card className="border-0 shadow-sm mb-4">
    <Card.Body className="p-4">
      <h3 className="h4 mb-4 text-center">除了編程，我還喜歡以下活動：</h3>
      <Row className="justify-content-center text-center g-4">
        {hobbies.map((hobby, index) => (
          <Col xs={6} md={4} key={index}>
            <div
              className="p-4 rounded-3 h-100 hobby-card"
              style={{
                border: "none",
                transition: "all 0.3s ease",
              }}
            >
              <div className="fs-1 mb-3" style={{ color: hobby.color }}>
                {hobby.icon}
              </div>
              <h4 className="h5 mb-0">{hobby.name}</h4>
            </div>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
));

// 引言區塊組件
const QuoteSection = memo(() => (
  <div className="text-center mb-4 p-4 bg-lavender-light rounded-3 shadow-sm hover-lift">
    <FaQuoteLeft className="text-lavender fs-1 mb-3" />
    <p className="lead fst-italic mb-0">
      「努力創造能夠改變世界的數位產品！」
      <br />
      <span className="small text-muted mt-2 d-block">— Zhenrong Wu</span>
    </p>
  </div>
));

// 專業介紹組件
const ProfessionalIntro = memo(() => (
  <Row className="mb-5">
    <Col lg={8} className="mx-auto text-center">
      <div className="position-relative d-inline-block mb-4">
        <span
          className="bg-lavender position-absolute"
          style={{
            height: "8px",
            width: "100%",
            bottom: "8px",
            left: "0",
            zIndex: "-1",
            opacity: "0.5",
          }}
        ></span>
        <h1 className="display-4 fw-bold">
          關於<span className="text-lavender">我</span>
        </h1>
      </div>

      <div className="bg-lavender-light p-4 rounded-3 shadow-sm mb-4">
        <h4 className="mb-3">專業簡介</h4>
        <p className="lead mb-3">
          大家好，我來自台灣，目前是一位自由接案者。
          專注於遊戲開發和網頁應用程式設計，致力於帶給用戶良好的體驗。
        </p>
      </div>

      <div className="text-muted mb-0">
        擁有 <span className="badge bg-lavender">六年以上</span>{" "}
        的遊戲開發經驗， 以及 <span className="badge bg-lavender">半年</span>{" "}
        程式教學經驗。 主要專精於遊戲開發和網頁前端技術。
      </div>
    </Col>
  </Row>
));

const About = () => {
  // 定義卡片懸停樣式
  const cardHoverStyle = `
    .skill-card, .hobby-card {
      position: relative;
      transform: scale(1);
      transition: transform 0.3s ease;
    }
    .skill-card::after, .hobby-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid rgba(108, 99, 255, 0.35);
      border-radius: 0.3rem;
      transition: transform 0.3s ease;
      pointer-events: none;
    }
    .skill-card:hover, .hobby-card:hover {
      transform: scale(1.1 );
    }
    .skill-card:hover::after, .hobby-card:hover::after {
      transform: scale(1);
    }
  `;

  // 技能數據 - 按類別分組
  const skillsData = {
    languages: [
      { name: "C#", icon: <SiDotnet />, color: "#9B4F96" },
      { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
      { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
      { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
      { name: "PHP", icon: <FaPhp />, color: "#777BB4" },
      { name: "Python", icon: <FaPython />, color: "#3776AB" },
    ],
    frameworks: [
      { name: "jQuery", icon: <SiJquery />, color: "#0769AD" },
      { name: "React", icon: <FaReact />, color: "#61DAFB" },
      { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
      { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952B3" },
      { name: "WordPress", icon: <FaWordpress />, color: "#21759B" },
    ],
    databases: [
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    ],
    devTools: [
      { name: "vim", icon: <SiVim />, color: "#019733" },
      { name: "Git", icon: <FaGit />, color: "#F05032" },
      { name: "Linux", icon: <FaLinux />, color: "#FCC624" },
    ],
  };

  // 合併所有技能以保持原有顯示方式
  const skills = [
    ...skillsData.languages,
    ...skillsData.frameworks,
    ...skillsData.databases,
    ...skillsData.devTools,
  ];

  // 工具列表
  const tools = [
    { name: "Cursor", icon: <CursorIcon />, color: "#1D9BF0" },
    { name: "VS Code", icon: <VSCodeIcon />, color: "#007ACC" },
    { name: "Jetbrain Rider", icon: <SiRider />, color: "#000000" },
    { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
    { name: "Unity3D", icon: <FaUnity />, color: "#000000" },
    { name: "Unreal Engine", icon: <SiUnrealengine />, color: "#0E1128" },
    { name: "Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF" },
    { name: "Illustrator", icon: <SiAdobeillustrator />, color: "#FF9A00" },
    { name: "After Effects", icon: <SiAdobeaftereffects />, color: "#9999FF" },
    { name: "Premiere", icon: <SiAdobepremierepro />, color: "#9999FF" },
    { name: "InDesign", icon: <SiAdobeindesign />, color: "#FF3366" },
    { name: "Adobe XD", icon: <SiAdobexd />, color: "#FF61F6" },
    { name: "Figma", icon: <FaFigma />, color: "#F24E1E" },
    { name: "Canva", icon: <SiCanva />, color: "#00C4CC" },
    { name: "Stable Diffusion", icon: <FaPalette />, color: "#0066CC" },
    { name: "Notion", icon: <SiNotion />, color: "#000000" },
    { name: "Trello", icon: <FaTrello />, color: "#0079BF" },
  ];

  // 個人興趣
  const hobbies = [
    { name: "看動漫", icon: <FaFilm />, color: "#FF6B6B" },
    { name: "健身", icon: <FaDumbbell />, color: "#4CAF50" },
    { name: "閱讀", icon: <FaBook />, color: "#FF9800" },
  ];

  return (
    <>
      <style>{cardHoverStyle}</style>
      <Container className="py-5">
        {/* 頁面標題與介紹 */}
        <ProfessionalIntro />

        {/* 技能部分 */}
        <SkillSection title="接觸過的專業技能" items={skills} />

        {/* 工具部分 */}
        <SkillSection title="使用過的工具" items={tools} />

        {/* 興趣與格言部分 */}
        <Row>
          <Col lg={10} className="mx-auto">
            <HobbySection hobbies={hobbies} />
            <QuoteSection />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
