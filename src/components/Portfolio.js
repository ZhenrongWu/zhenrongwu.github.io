import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "../styles/components.css";

const ProjectCard = ({ project, index }) => {
  // 使用 useState 來追蹤卡片是否被翻轉
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card-wrapper mb-4"
    >
      <motion.div
        className="project-card-container position-relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", damping: 15 }}
      >
        {/* 卡片正面 */}
        <motion.div className="project-card-face position-absolute w-100 h-100">
          <motion.div className="project-card-border h-100">
            <Card
              className="project-card-card h-100 border-0 shadow-sm"
              onClick={() => setIsFlipped(true)}
            >
              <div className="project-card-img-container position-relative overflow-hidden">
                <Card.Img
                  variant="top"
                  src={project.image}
                  alt={project.title}
                  className="h-100 w-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <Card.Body className="p-4 d-flex flex-column text-center">
                <Card.Title className="fw-bold mb-2">
                  {project.title}
                </Card.Title>
                <Card.Text className="text-muted small mb-3">
                  {project.category}
                </Card.Text>

                <div className="mt-auto">
                  <button
                    className="btn btn-sm btn-outline-lavender project-card-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
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
        <motion.div className="project-card-face project-card-face-back position-absolute w-100 h-100">
          <motion.div className="project-card-border h-100">
            <Card
              className="project-card-card project-card-card-back h-100 border-0 shadow-sm"
              onClick={() => setIsFlipped(false)}
            >
              <Card.Body className="d-flex flex-column h-100 p-4">
                <div className="text-center mb-3 pt-2">
                  <h4 className="text-lavender fw-bold mb-1">
                    {project.title}
                  </h4>
                  <p className="project-card-category text-muted small mb-0">
                    {project.category}
                  </p>
                </div>

                <div className="card-back-content my-3">
                  <p className="project-card-description mb-4">
                    {project.description}
                  </p>

                  <h6 className="mb-2 fw-bold text-lavender">使用技術：</h6>
                  <div className="mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="project-card-tag badge bg-white text-lavender me-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto text-center pb-0.5">
                  <p className="text-muted small mb-3">
                    完成日期：{project.date}
                  </p>
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
                      className="btn btn-sm btn-outline-lavender project-card-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
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
  // 示例作品數據
  const projects = [
    {
      id: 1,
      title: "胖老爹食堂",
      category: "網頁開發",
      description: "一頁式商家網站",
      image: "https://i.imgur.com/n81DUZp.jpg",
      date: "2025年1月",
      tags: [
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "VS Code",
        "Photoshop",
        "Git",
      ],
      url: "https://fat-dad-eatery.netlify.app/",
    },
    {
      id: 2,
      title: "開發者英雄基地",
      category: "網頁開發",
      description: "個人電子商務平台，含有付款系統和訂單功能。",
      image: "https://i.imgur.com/bLWrULF.jpg",
      date: "2024年12月",
      tags: ["WordPress", "Elementor", "WooCommerce", "Canva"],
      url: "https://devherohub.com/",
    },
    {
      id: 3,
      title: "Sandwich-Tycoon",
      category: "遊戲開發",
      description:
        "前公司成功上架的專案，主要負責的內容是遊戲 AI、道具效果以及部分前端互動功能。",
      image: "https://i.imgur.com/3Hbx6J9.jpg",
      date: "2023年12月",
      tags: ["Unity", "C#", "Jetbrain Rider", "vim", "Git"],
      url: "https://play.google.com/store/apps/details?id=com.Nobollel.SandwichTycoon&hl=zh_TW",
    },
    {
      id: 4,
      title: "迴魂",
      category: "遊戲開發",
      description:
        "遊戲內所有功能皆一人完成，除此之外，還負責專案管理和部分關卡設計。",
      image: "https://i.imgur.com/QcxxdDl.jpg",
      date: "2022年9月",
      tags: ["Unity", "C#", "Jetbrain Rider", "vim", "Git"],
      url: "https://store.steampowered.com/app/2075110/Incarnation/?l=tchinese",
    },
    {
      id: 5,
      title: "嶺東科技大學 教學評量自動填寫",
      category: "網頁應用",
      description: "懶人小工具。",
      image: "https://i.imgur.com/xRYzVtL.jpg",
      date: "2021年12月",
      tags: ["HTML", "CSS", "JavaScript", "VS Code", "Git"],
      url: "https://chromewebstore.google.com/detail/dnkodhghfphabiopghdmpcmpojlchajg?utm_source=item-share-cb",
    },
    {
      id: 6,
      title: "Ctrl+S",
      category: "遊戲開發",
      description: "參與 FGJ 的作品，與當時一同實習的夥伴一同開發的遊戲。",
      image: "https://imgur.com/JG6aUO2.jpg",
      date: "2020年9月",
      tags: ["Unity", "C#"],
      url: "https://wanderviewer.itch.io/ctrls",
    },
  ];

  return (
    <Container className="py-5">
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
        {projects.map((project, index) => (
          <Col lg={4} md={6} key={project.id}>
            <ProjectCard project={project} index={index} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Portfolio;
