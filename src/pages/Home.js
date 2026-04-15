import React, { useEffect, useState } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const heroTitles = [
    "軟體設計師",
    "遊戲開發者",
    "網頁開發者",
    "自由接案者",
    "授課講師",
  ];
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % heroTitles.length);
    }, 2200);

    return () => clearInterval(intervalId);
  }, [heroTitles.length]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="home-centered-container">
      <Row className="align-items-center w-100 gy-4">
        <Col lg={6} md={12} className="order-2 order-lg-1">
          <div className="text-center text-lg-start px-3 px-md-5">
            <h1 className="fw-bold mb-3">
              Hi! 我是
              <span className="text-lavender">吳振榮</span>
            </h1>
            <div className="mb-4" aria-live="polite">
              <h2 className="h4 text-lavender-dark mb-0">
                {heroTitles[activeTitleIndex]}
              </h2>
            </div>

            <p className="mb-4 home-paragraph">
              每一個專案對我來說，都像是自己的孩子一樣珍貴。
              我用心呵護和投入熱情，因為這是我所熱愛的領域。
              在這個瞬息萬變的數位時代，我始終保持著學習的熱忱與行動力。
              <span className="text-lavender">持續思考與成長</span>
              ，是我認為成為一名優秀軟體設計師最重要的核心能力。
              這份熱情與堅持，讓我在每一次挑戰中都能全力以赴，並從中找到成就感與喜悅。
            </p>

            <div className="home-button-container d-flex flex-row gap-3 justify-content-center justify-content-lg-start">
              <Button as={Link} to="/portfolio" className="btn btn-lavender">
                查看作品集
              </Button>
            </div>
          </div>
        </Col>

        <Col lg={6} md={12} className="order-1 order-lg-2">
          <div className="home-image-section d-flex align-items-center justify-content-center">
            <div className="home-image-wrapper">
              {imageLoading && (
                <div className="image-loading-overlay">
                  <div className="loading-spinner"></div>
                </div>
              )}
              <Image
                src="https://i.imgur.com/BEeKkLjl.jpg"
                alt="吳振榮個人照"
                fluid
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className={`rounded ${
                  imageLoading ? "image-loading" : "image-loaded"
                }`}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
