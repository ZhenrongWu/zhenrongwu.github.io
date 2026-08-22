import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import LazyImage from "../components/LazyImage";
import { projects } from "../data/projects";

const ProjectCard = ({ project, index }) => {
  // 使用 useState 來追蹤卡片是否被翻轉
  const [isFlipped, setIsFlipped] = useState(false);

  // 翻面後把焦點移到對應面，讓鍵盤與螢幕閱讀器使用者不會「遺失」在隱藏面上
  const frontCardRef = useRef(null);
  const backButtonRef = useRef(null);
  const hasFlippedRef = useRef(false);

  useEffect(() => {
    if (!hasFlippedRef.current) {
      // 首次掛載不搶焦點
      hasFlippedRef.current = true;
      return;
    }
    const target = isFlipped ? backButtonRef.current : frontCardRef.current;
    target?.focus();
  }, [isFlipped]);

  const flipToBack = () => setIsFlipped(true);
  const flipToFront = () => setIsFlipped(false);

  // 讓 role="button" 的卡片回應 Enter / Space；背面另外支援 Escape 返回
  const handleFrontKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipToBack();
    }
  };
  const handleBackKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      flipToFront();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card-wrapper mb-4"
    >
      <motion.div
        className="project-card-container position-relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", damping: 15 }}
      >
        {/* 卡片正面 */}
        <motion.div
          className="project-card-face position-absolute w-100 h-100"
          aria-hidden={isFlipped}
          inert={isFlipped || undefined}
        >
          <motion.div className="project-card-border h-100">
            <Card
              ref={frontCardRef}
              className="project-card-card h-100 border-0 shadow-sm"
              role="button"
              tabIndex={0}
              aria-expanded={isFlipped}
              aria-label={`查看 ${project.title} 詳細資料`}
              onClick={flipToBack}
              onKeyDown={handleFrontKeyDown}
            >
              <div className="project-card-img-container position-relative overflow-hidden">
                <LazyImage
                  src={project.image.src}
                  alt={project.title}
                  width={project.image.width}
                  height={project.image.height}
                  wrapperClassName="h-100"
                  className="card-img-top h-100 w-100 object-fit-cover"
                />
              </div>
              <Card.Body className="p-4 d-flex flex-column text-center">
                <Card.Title className="fw-bold mb-2">{project.title}</Card.Title>
                <Card.Text className="text-muted small mb-3">{project.category}</Card.Text>

                <div className="mt-auto">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-lavender project-card-button"
                    // 外層卡片已可聚焦並處理鍵盤，此按鈕只作為視覺提示，避免 Tab 要按兩次
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      flipToBack();
                    }}
                  >
                    查看詳細資料
                  </button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </motion.div>

        {/* 卡片背面 */}
        <motion.div
          className="project-card-face project-card-face-back position-absolute w-100 h-100"
          aria-hidden={!isFlipped}
          inert={!isFlipped || undefined}
        >
          <motion.div className="project-card-border h-100">
            <Card
              className="project-card-card project-card-card-back h-100 border-0 shadow-sm"
              onClick={flipToFront}
              onKeyDown={handleBackKeyDown}
            >
              <Card.Body className="d-flex flex-column h-100 p-4">
                <div className="text-center mb-3 pt-2">
                  <h4 className="text-lavender fw-bold mb-1">{project.title}</h4>
                  <p className="project-card-category text-muted small mb-0">{project.category}</p>
                </div>

                <div className="card-back-content my-3">
                  <p className="project-card-description mb-4">{project.description}</p>

                  <h6 className="mb-2 fw-bold text-lavender">使用技術：</h6>
                  <div className="mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto text-center pb-0.5">
                  <p className="text-muted small mb-3">完成日期：{project.date}</p>
                  <div className="d-flex justify-content-center gap-2">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-lavender project-card-button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        查看作品
                      </a>
                    )}
                    <button
                      ref={backButtonRef}
                      type="button"
                      className="btn btn-sm btn-outline-lavender project-card-button"
                      aria-label={`返回 ${project.title} 卡片正面`}
                      onClick={(e) => {
                        e.stopPropagation();
                        flipToFront();
                      }}
                    >
                      返回
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  // id 小到大代表舊到新；畫面顯示改為新到舊
  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  return (
    <div className="py-5">
      <Seo
        title="作品集"
        description="吳振榮的作品集：網頁開發、遊戲開發與自動化工具專案，包含使用技術與作品連結。"
      />
      {/* 頁面標題 */}
      <Row className="mb-5">
        <Col className="text-center">
          <div className="position-relative d-inline-block mb-4">
            <span className="title-underline bg-lavender position-absolute"></span>
            <h1 className="display-4 fw-bold">
              作品<span className="text-lavender">集</span>
            </h1>
          </div>
          <p className="lead text-muted">
            以下是我的部分作品，涵蓋了遊戲開發、網頁設計和應用程式開發等領域。
          </p>
        </Col>
      </Row>

      {/* 作品集格線：3列×2行 */}
      <Row>
        {sortedProjects.map((project, index) => (
          <Col lg={4} md={6} key={project.id}>
            <ProjectCard project={project} index={index} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Portfolio;
