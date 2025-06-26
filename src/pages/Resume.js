import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { usePDF } from "react-to-pdf";

const Resume = () => {
  const { toPDF, targetRef } = usePDF({
    filename: "吳振榮履歷.pdf",
    page: {
      format: "A4",
      margin: 20,
    },
    options: {
      unit: "px",
      hotfixes: ["px_scaling"],
      windowWidth: 1200,
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
        position: "自由接案者",
        company: "",
        location: "",
        period: "2024.06 - 現在",
        responsibilities: [
          "網站前端開發與設計",
          "一對一遊戲開發專業指導",
          "教授兒童科學與資訊課程",
          "大學生專題製作與技術輔導",
          "數位短影音剪輯",
        ],
      },
      {
        position: "授課講師",
        company: "網頁前端設計師養成班",
        location: "台中市",
        period: "2025.01 - 2025.03",
        responsibilities: [
          "教授 JavaScript、jQuery、PHP、MySQL、Git、GitHub",
          "協助專題指導",
        ],
      },
      {
        position: "Unity 工程師",
        company: "Nobollel Inc.",
        location: "日本, 台灣",
        period: "2022.08 - 2024.01",
        responsibilities: [
          "使用 C# 串接後端 API",
          "實作遊戲選單",
          "獨立開發 Hyper Casual Game",
          "串接廣告 SDK",
          "製作 Unity 專案內部工具",
        ],
      },
      {
        position: "實習生",
        company: "弘遠數位娛樂股份有限公司",
        location: "高雄市",
        period: "2020.07 - 2020.12",
        responsibilities: [
          "獨自發想遊戲玩法",
          "與美術團隊合作，一起開發遊戲",
          "開發遊戲功能",
        ],
      },
    ],
    competitions: [
      {
        name: "Global Game Jam 2025",
        year: "2025/01",
        result: "參加",
        description:
          "活動主題是 Bubble，製作 2D 遊戲，主要負責所有遊戲功能和帶領團隊",
      },
      {
        name: "Global Game Jam 2024",
        year: "2024/01",
        result: "參加",
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
          <p className="lead text-muted">歡迎了解我的經歷和個人成就</p>
        </Col>
      </Row>

      {/* 下載按鈕 */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} className="text-center">
          <Button
            variant="primary"
            onClick={() => toPDF()}
            className="download-button btn-lavender"
            aria-label="下載履歷 PDF 檔案"
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
      <div ref={targetRef} className="resume-content">
        <article className="resume">
          <Row>
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
                        <h3 tabIndex="0">{comp.name}</h3>
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
