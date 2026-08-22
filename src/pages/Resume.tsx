import { Row, Col } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import Seo from "../components/Seo";
import { resumeData } from "../data/resume";

const resumePdfUrl = "/resume.pdf";
const resumePdfFileName = "吳振榮履歷.pdf";

const Resume = () => {
  return (
    <div className="py-5">
      <Seo
        title="履歷"
        description="吳振榮的履歷：學歷、工作經歷、專案經驗與技能，並可下載 PDF 版本。"
      />
      <Row className="mb-5 d-print-none">
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
      <Row className="justify-content-center mb-5 d-print-none">
        <Col xs={12} className="text-center">
          <a
            href={resumePdfUrl}
            download={resumePdfFileName}
            className="btn download-button btn-lavender"
            aria-label="下載履歷 PDF 檔案"
            style={{
              padding: "12px 30px",
              fontSize: "1.1em",
              borderRadius: "30px",
              transition: "all 0.3s ease",
              position: "relative",
            }}
          >
            <AiOutlineDownload aria-hidden="true" style={{ marginRight: "8px" }} />
            <span>下載履歷</span>
            <div className="button-background" aria-hidden="true"></div>
          </a>
        </Col>
      </Row>
      <div className="resume-content">
        <article className="resume">
          <Row className="g-4">
            <Col lg={6} className="resume-left">
              <header className="resume-header mb-5">
                <h1 className="heading-name" tabIndex={0}>
                  {resumeData.personalInfo.name}
                </h1>
                <div className="heading-meta">
                  <p className="meta-item" tabIndex={0}>
                    {resumeData.personalInfo.title}
                  </p>
                  <p className="meta-item">
                    <a href={`mailto:${resumeData.personalInfo.email}`} className="contact-link">
                      {resumeData.personalInfo.email}
                    </a>
                  </p>
                  <p className="meta-item">
                    <a href={`tel:${resumeData.personalInfo.phone}`} className="contact-link">
                      {resumeData.personalInfo.phone}
                    </a>
                  </p>
                  <p className="meta-item" tabIndex={0}>
                    {resumeData.personalInfo.location}
                  </p>
                </div>
              </header>
              <section
                className="resume-section timeline-section"
                aria-labelledby="work-experience"
              >
                <h2 id="work-experience" className="resume-title" tabIndex={0}>
                  工作經驗
                </h2>
                <div className="timeline">
                  {resumeData.workExperience.map((exp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-date" tabIndex={0}>
                        {exp.period}
                      </div>
                      <div className="timeline-content resume-item">
                        <h3 tabIndex={0}>{exp.position}</h3>
                        <h4 tabIndex={0}>{exp.company}</h4>
                        <ul>
                          {exp.responsibilities.map((item, i) => (
                            <li key={i} tabIndex={0}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="resume-section" aria-labelledby="education">
                <h2 id="education" className="resume-title" tabIndex={0}>
                  教育背景
                </h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="resume-item">
                    <h3 tabIndex={0}>{edu.institution}</h3>
                    <h4 tabIndex={0}>{edu.degree}</h4>
                    <p className="resume-date" tabIndex={0}>
                      {edu.period}
                    </p>
                  </div>
                ))}
              </section>
            </Col>

            <Col lg={6} className="resume-right">
              <section className="resume-section timeline-section" aria-labelledby="competitions">
                <h2 id="competitions" className="resume-title" tabIndex={0}>
                  競賽經驗
                </h2>
                <div className="timeline">
                  {resumeData.competitions.map((comp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-date" tabIndex={0}>
                        {comp.year}
                      </div>
                      <div className="timeline-content resume-item">
                        <h3 tabIndex={0}>
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
                        <h4 tabIndex={0}>{comp.result}</h4>
                        <p tabIndex={0}>{comp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="resume-section timeline-section" aria-labelledby="achievements">
                <h2 id="achievements" className="resume-title" tabIndex={0}>
                  個人成就
                </h2>
                <div className="timeline">
                  {resumeData.achievements.map((achievement, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-date" tabIndex={0}>
                        {achievement.period}
                      </div>
                      <div className="timeline-content resume-item">
                        <h3 tabIndex={0}>{achievement.title}</h3>
                        <p tabIndex={0}>{achievement.description}</p>
                        <ul>
                          {achievement.highlights.map((highlight, i) => (
                            <li key={i} tabIndex={0}>
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
