import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { usePDF } from "react-to-pdf";
import Seo from "../components/Seo";
import { resumeData } from "../data/resume";

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


  return (
    <div className="py-5">
      <Seo
        title="履歷"
        description="吳振榮的履歷：學歷、工作經歷、專案經驗與技能，並可下載 PDF 版本。"
      />
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
