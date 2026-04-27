import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { usePDF } from "react-to-pdf";

const Resume = () => {
  const { toPDF, targetRef } = usePDF({
    filename: "吳振榮履歷.pdf",
    page: {
      format: "A4",
      margin: 2,
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
      useCORS: true,
    },
    options: {
      unit: "px",
      hotfixes: ["px_scaling"],
      windowWidth: 1200,
      windowHeight: 4000,
      scrollX: 0,
      scrollY: 0,
      usePrintMedia: true,
      backgroundColor: "#ffffff",
      waitForFonts: true,
      allowTaint: true,
      foreignObjectRendering: true,
    },
  });

  // 履歷各部分的資料
  const resumeData = {
    personalInfo: {
      name: "吳振榮",
      title: "遊戲與網頁開發者",
      email: "tim4224171@gmail.com",
      phone: "(+886) 989-365-942",
      location: "台灣，高雄市",
    },
    education: [
      {
        institution: "嶺東科技大學",
        degree: "數位媒體設計系與企業管理系 - 學士學位",
        period: "2018 - 2022",
      },
    ],
    workExperience: [
      {
        position: "自由接案者 (兼職)",
        company: "",
        location: "",
        period: "2024.06 - 現在",
        responsibilities: [
          "開發與設計網站前端頁面",
          "提供一對一遊戲開發指導",
          "教授兒童科學與資訊相關課程",
          "輔導大學生完成專題製作與技術實作",
          "剪輯數位短影音內容",
        ],
      },
      {
        position: "軟體工程師",
        company: "藏識科技有限公司",
        location: "台灣, 高雄市",
        period: "2026.05 - 現在",
        responsibilities: ["工作內容整理中，近期補上詳細項目"],
      },
      {
        position: "軟體專案工程師",
        company: "宗偉科技有限公司",
        location: "台灣, 高雄市",
        period: "2025.11 - 2026.05",
        responsibilities: [
          "負責 ERP legacy code 分析、問題定位與缺陷修復",
          "設計並開發會計模組 RDLC 報表，支援帳務資料呈現與輸出",
          "針對舊模組高耦合問題，規劃生管新模組後端架構",
          "主導生管新模組前半段核心功能開發與流程落地",
          "執行 WPF 至 SQL Server 的端到端開發與資料串接",
        ],
      },
      {
        position: "前端工程師（遠端工作）",
        company: "遠山創品有限公司",
        location: "台灣, 高雄市",
        period: "2025.05 - 現在",
        responsibilities: [
          "開發 LINE OA 前端功能，主要使用 React 與 Next.js",
          "實作 RWD 與可重用元件化 UI",
          "整合後端 API 並處理狀態與錯誤情境",
          "導入 GA、GTM 事件埋點與標籤管理以支援成效分析",
        ],
      },
      {
        position: "授課講師",
        company: "產業新尖兵計畫-AI前端工程師人才應用培訓班",
        location: "台灣, 台北市",
        period: "2026.01 - 2025.02",
        responsibilities: [
          "教授 UI/UX 設計與前端實作觀念",
          "協助學員完成專題製作與成果發表",
        ],
      },
      {
        position: "授課講師",
        company: "產業新尖兵計畫-網頁前端設計師養成班",
        location: "台灣, 台中市",
        period: "2025.07 - 2025.08",
        responsibilities: [
          "教授 Bootstrap、JavaScript、jQuery、React、PHP、Git、GitHub",
          "協助學員完成專題製作與成果發表",
        ],
      },
      {
        position: "授課講師",
        company: "產業新尖兵計畫-網頁前端設計師養成班",
        location: "台灣, 台中市",
        period: "2025.01 - 2025.03",
        responsibilities: [
          "教授 JavaScript、jQuery、PHP、MySQL、Git、GitHub",
          "協助學員完成專題製作與成果發表",
        ],
      },
      {
        position: "Unity 工程師 (遠端工作)",
        company: "Nobollel Inc.",
        location: "台灣, 高雄市",
        period: "2022.08 - 2024.01",
        responsibilities: [
          "使用 C# 串接後端 API",
          "實作遊戲選單與操作流程",
          "獨立開發 Hyper Casual Game 玩法與功能",
          "串接廣告 SDK 並完成測試上線",
          "製作 Unity 專案內部工具以提升開發效率",
        ],
      },
      {
        position: "實習生",
        company: "弘遠數位娛樂股份有限公司",
        location: "台灣, 高雄市",
        period: "2020.07 - 2020.12",
        responsibilities: [
          "獨立發想遊戲玩法與核心機制",
          "與美術團隊協作完成遊戲內容整合",
          "開發遊戲功能並協助問題排除",
        ],
      },
    ],
    competitions: [
      {
        name: "Global Game Jam 2026",
        year: "2026/01",
        result: "參加",
        url: "https://globalgamejam.org/games/2026/whos-cat-ching-naps-7",
        description: "活動主題是 Mask，製作 2D 遊戲，主要負責專案管理和主程式",
      },
      {
        name: "Global Game Jam 2025",
        year: "2025/01",
        result: "參加",
        url: "https://globalgamejam.org/games/2025/disizu-2",
        description:
          "活動主題是 Bubble，製作 2D 遊戲，主要負責所有遊戲功能和帶領團隊",
      },
      {
        name: "Global Game Jam 2024",
        year: "2024/01",
        result: "參加",
        url: "https://globalgamejam.org/games/2024/team3-8",
        description:
          "活動主題是 Make Me Laugh，製作 2D 遊戲，主要負責整合功能和帶領團隊",
      },
      {
        name: "Global Game Jam 2023",
        year: "2023/02",
        result: "參加",
        description:
          "活動主題是 Roots，製作 2D 遊戲，與同事一起參加，主要負責介面的功能",
      },
      {
        name: "巴哈姆特 ACG 創作大賽 遊戲組",
        year: "2022/06",
        result: "入圍",
        description: "大學畢業專題",
      },
      {
        name: "放視大賞 遊戲組 PC 遊戲組",
        year: "2022/05",
        result: "入圍",
        description: "大學畢業專題",
      },
      {
        name: "Global Game Jam 2022",
        year: "2022/01",
        result: "參加",
        description:
          "活動主題是 Duolity，製作 2D 遊戲，主要負責遊戲核心功能跟功能整合",
      },
      {
        name: "全國大專程式設計極客挑戰賽",
        year: "2021/11",
        result: "決賽",
        description: "在短時間要完成許多小遊戲",
      },
      {
        name: "Global Game Jam 2021",
        year: "2021/01",
        result: "參加",
        description: "活動主題是 Lost and Found，製作 2D 遊戲，主要負責怪物 AI",
      },
      {
        name: "DIGI+ Talent 數位新星大賞",
        year: "2020/12",
        result: "特選",
        description: "與實習生一起參加，主要負責的遊戲是拳擊",
      },
      {
        name: "Faust Game Jam 2020",
        year: "2020/08",
        result: "參加",
        url: "https://wanderviewer.itch.io/ctrls",
        description:
          "活動主題是 Save Yourself, Not the World，製作 2D 遊戲，主要負責遊戲介面和功能整合",
      },
      {
        name: "Global Game Jam 2020",
        year: "2020/01",
        result: "參加",
        description: "活動主題是 Repair，製作 2D 遊戲，主要負責遊戲介面",
      },
    ],
    achievements: [
      {
        title: "去日本見前同事們",
        period: "2024.10",
        description: "日本東京見前同事，為期 6 天",
        highlights: [
          "與朋友的約定",
          "培養獨立思考和解決問題的能力",
          "深刻體會到國際語言的重要性",
        ],
      },
      {
        title: "徒步環島",
        period: "2024.02",
        description: "徒步環繞小圈的台灣，總長約 900 公里，為期 30 天",
        highlights: [
          "緬懷父親",
          "再次看見台灣的美",
          "與自己的對話",
          "認識不同陌生人的故事",
          "與朋友們的重逢",
        ],
      },
      {
        title: "單車環島",
        period: "2019.07",
        description: "騎單車環繞台灣一圈，總長約 1,200 公里，為期 9 天",
        highlights: [
          "與堂哥的約定",
          "挑戰自我極限",
          "看到台灣的美",
          "與騎友大哥的相遇和分別",
        ],
      },
      {
        title: "青年就業領航計畫",
        period: "2017.08 - 2018.09",
        description: "參加青年就業領航計畫，為期 1 年",
        highlights: [
          "一人北漂",
          "認識不同國家的人",
          "職場相處",
          "經濟自主",
          "自主學習",
        ],
      },
      {
        title: "第一次出國",
        period: "2017.06",
        description: "日本京阪神奈獨旅，為期 5 天",
        highlights: [
          "一個人搭飛機",
          "沿途記錄當地文化與自然風光",
          "培養獨立思考和解決問題的能力",
        ],
      },
    ],
  };

  return (
    <div className="py-5">
      {/* 頁面標題 */}
      <Row className="mb-5">
        <Col className="text-center">
          <div className="position-relative d-inline-block mb-4">
            <span className="title-underline bg-lavender position-absolute"></span>
            <h1 className="display-4 fw-bold">
              履<span className="text-lavender">歷</span>
            </h1>
          </div>
          <p className="lead text-muted mb-4">歡迎了解我的經歷和個人成就</p>
        </Col>
      </Row>

      {/* 下載按鈕 */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} className="text-center">
          <Button
            onClick={() => {
              // 添加下載提示
              const button = document.querySelector(".download-button");
              const originalText = button.innerHTML;
              button.innerHTML =
                "<span class='loading-text'>正在生成 PDF...</span>";
              button.disabled = true;

              // 執行 PDF 下載
              toPDF()
                .then(() => {
                  // 下載完成後恢復按鈕
                  setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                  }, 500); // 延遲 500ms 讓使用者看到完成狀態
                })
                .catch((error) => {
                  console.error("PDF 生成失敗:", error);
                  button.innerHTML = originalText;
                  button.disabled = false;
                });
            }}
            className="download-button btn-lavender"
            aria-label="下載履歷 PDF 檔案"
            style={{
              padding: "12px 30px",
              fontSize: "1.1em",
              borderRadius: "30px",
              transition: "all 0.3s ease",
              position: "relative",
            }}
          >
            <AiOutlineDownload
              aria-hidden="true"
              style={{ marginRight: "8px" }}
            />
            <span>下載履歷</span>
            <div className="button-background" aria-hidden="true"></div>
          </Button>
        </Col>
      </Row>

      {/* 履歷內容 */}
      <div
        ref={targetRef}
        className="resume-content"
        style={{
          backgroundColor: "#ffffff",
          padding: "1px",
          maxWidth: "100%",
          fontFamily: "Arial, sans-serif",
          lineHeight: "0.9",
          minHeight: "auto",
        }}
      >
        <article className="resume">
          <Row className="g-4">
            <Col lg={6} className="resume-left">
              {/* 個人資訊 */}
              <header className="resume-header mb-5">
                <h1 className="heading-name" tabIndex="0">
                  {resumeData.personalInfo.name}
                </h1>
                <div className="heading-meta">
                  <p className="meta-item" tabIndex="0">
                    {resumeData.personalInfo.title}
                  </p>
                  <p className="meta-item">
                    <a
                      href={`mailto:${resumeData.personalInfo.email}`}
                      className="contact-link"
                    >
                      {resumeData.personalInfo.email}
                    </a>
                  </p>
                  <p className="meta-item">
                    <a
                      href={`tel:${resumeData.personalInfo.phone}`}
                      className="contact-link"
                    >
                      {resumeData.personalInfo.phone}
                    </a>
                  </p>
                  <p className="meta-item" tabIndex="0">
                    {resumeData.personalInfo.location}
                  </p>
                </div>
              </header>

              {/* 工作經驗 */}
              <section
                className="resume-section timeline-section"
                aria-labelledby="work-experience"
              >
                <h2 id="work-experience" className="resume-title" tabIndex="0">
                  工作經驗
                </h2>
                <div className="timeline">
                  {resumeData.workExperience.map((exp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-date" tabIndex="0">
                        {exp.period}
                      </div>
                      <div className="timeline-content resume-item">
                        <h3 tabIndex="0">{exp.position}</h3>
                        <h4 tabIndex="0">{exp.company}</h4>
                        <ul>
                          {exp.responsibilities.map((item, i) => (
                            <li key={i} tabIndex="0">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 教育背景 */}
              <section className="resume-section" aria-labelledby="education">
                <h2 id="education" className="resume-title" tabIndex="0">
                  教育背景
                </h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="resume-item">
                    <h3 tabIndex="0">{edu.institution}</h3>
                    <h4 tabIndex="0">{edu.degree}</h4>
                    <p className="resume-date" tabIndex="0">
                      {edu.period}
                    </p>
                  </div>
                ))}
              </section>
            </Col>

            <Col lg={6} className="resume-right">
              {/* 競賽經驗 */}
              <section
                className="resume-section timeline-section"
                aria-labelledby="competitions"
              >
                <h2 id="competitions" className="resume-title" tabIndex="0">
                  競賽經驗
                </h2>
                <div className="timeline">
                  {resumeData.competitions.map((comp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-date" tabIndex="0">
                        {comp.year}
                      </div>
                      <div className="timeline-content resume-item">
                        <h3 tabIndex="0">
                          {comp.url ? (
                            <a
                              href={comp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="competition-link"
                            >
                              {comp.name}
                            </a>
                          ) : (
                            comp.name
                          )}
                        </h3>
                        <h4 tabIndex="0">{comp.result}</h4>
                        <p tabIndex="0">{comp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 個人成就 */}
              <section
                className="resume-section timeline-section"
                aria-labelledby="achievements"
              >
                <h2 id="achievements" className="resume-title" tabIndex="0">
                  個人成就
                </h2>
                <div className="timeline">
                  {resumeData.achievements.map((achievement, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-date" tabIndex="0">
                        {achievement.period}
                      </div>
                      <div className="timeline-content resume-item">
                        <h3 tabIndex="0">{achievement.title}</h3>
                        <p tabIndex="0">{achievement.description}</p>
                        <ul>
                          {achievement.highlights.map((highlight, i) => (
                            <li key={i} tabIndex="0">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Col>
          </Row>
        </article>
      </div>
    </div>
  );
};

export default Resume;
