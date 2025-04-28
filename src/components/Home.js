import React, { useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(true);
    setTimeout(() => setIsImageClicked(false), 300);
  };

  return (
    <Container className="py-5 bg-lavender-light">
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <h1 className="fw-bold mb-3">
            Hi! 我是
            <span className="text-lavender">吳振榮</span>
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
              className="h4 text-lavender-dark"
              wrapper="h2"
              repeat={Infinity}
              style={{ display: "inline-block" }}
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

          <div className="d-flex gap-3">
            <Button as={Link} to="/portfolio" className="btn btn-lavender">
              查看作品集
            </Button>
          </div>
        </Col>

        <Col md={6} className="text-center">
          <div
            className="p-4 bg-white rounded shadow"
            style={{ maxWidth: "550px", margin: "0 auto" }}
          >
            <div
              className={`home-image-container ${
                isImageClicked ? "image-clicked" : ""
              }`}
              onClick={handleImageClick}
            >
              <Image
                src="https://i.imgur.com/fqdkX0P.jpg"
                alt="個人照"
                fluid
                className="rounded"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
