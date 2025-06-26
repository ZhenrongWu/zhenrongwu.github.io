import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center gy-4">
        <Col lg={6} md={12} className="order-2 order-lg-1">
          <div className="text-center text-lg-start">
            <h1 className="fw-bold mb-3">
              Hi! 我是
              <span className="text-lavender ms-2">吳振榮</span>
            </h1>
            <div className="mb-4">
              <TypeAnimation
                sequence={[
                  "軟體設計師",
                  2000,
                  "遊戲開發者",
                  2000,
                  "網頁開發者",
                  2000,
                  "自由接案者",
                  2000,
                  "授課講師",
                  2000,
                ]}
                speed={10}
                className="h4 text-lavender-dark type-animation-inline"
                wrapper="h2"
                repeat={Infinity}
              />
            </div>

            <p className="mb-4 home-paragraph">
              每一個專案對我來說，都像是自己的孩子一樣珍貴。
              我用心呵護和投入熱情，因為這是我所熱愛的領域。
              在這個瞬息萬變的數位時代，我始終保持著學習的熱忱與行動力。
              <span className="text-lavender">持續思考與成長</span>
              ，是我認為成為一名優秀軟體設計師最重要的核心能力。
              這份熱情與堅持，讓我在每一次挑戰中都能全力以赴，並從中找到成就感與喜悅。
            </p>

            <div className="home-button-container d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Button
                as={Link}
                to="/portfolio"
                className="btn btn-lavender home-main-button"
              >
                查看作品集
              </Button>
            </div>
          </div>
        </Col>

        <Col lg={6} md={12} className="order-1 order-lg-2">
          <div className="home-image-section d-flex align-items-center justify-content-center">
            <div className="home-image-wrapper">
              <div className="home-image-container">
                <Image
                  src="https://imgur.com/BEeKkLj.jpg"
                  alt="吳振榮個人照"
                  fluid
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
