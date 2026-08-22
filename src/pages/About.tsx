import { memo } from "react";
import Seo from "../components/Seo";
import { skills, tools, hobbies, type IconItem } from "../data/about";
import { Row, Col, Card } from "react-bootstrap";
import { FaQuoteLeft } from "react-icons/fa";
const SkillCard = memo(({ item }: { item: IconItem }) => (
  <div
    className="text-center p-3 rounded-3 h-100 skill-card"
    style={{
      backgroundColor: `${item.color}10`,
      transition: "all 0.3s ease",
      border: "none",
    }}
  >
    <div className="fs-2 mb-2" style={{ color: item.color }}>
      <item.icon />
    </div>
    <p className="small mb-0 fw-bold">{item.name}</p>
  </div>
));
const SkillSection = memo(({ title, items }: { title: string; items: IconItem[] }) => (
  <Row>
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
const HobbySection = memo(({ hobbies }: { hobbies: IconItem[] }) => (
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
                <hobby.icon />
              </div>
              <h4 className="h5 mb-0">{hobby.name}</h4>
            </div>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
));
const QuoteSection = memo(() => (
  <div className="text-center p-4 bg-lavender-light rounded-3 shadow-sm hover-lift">
    <FaQuoteLeft className="text-lavender fs-1 mb-3" />
    <p className="lead fst-italic mb-0">
      「努力創造能夠改變世界的數位產品！」
      <br />
      <span className="small text-muted mt-2 d-block">— Zhenrong Wu</span>
    </p>
  </div>
));
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
        <p className="lead mb-3 text-justify">
          大家好，我來自台灣，目前是一位軟體工程師。
          專注於遊戲開發和網頁應用程式設計，致力於帶給用戶良好的體驗。
        </p>
      </div>

      <div className="text-muted mb-0 text-justify text-md-center">
        擁有 <span className="badge bg-lavender">六年以上</span> 的軟體開發經驗， 以及{" "}
        <span className="badge bg-lavender">半年</span> 程式教學經驗。
        主要專精於遊戲開發和網頁前端技術。
      </div>
    </Col>
  </Row>
));

const About = () => {
  return (
    <>
      <Seo
        title="關於我"
        description="認識吳振榮：遊戲與網頁開發者的專業簡介、接觸過的技能、常用工具與興趣。"
      />
      <div className="py-5">
        <ProfessionalIntro />
        <SkillSection title="接觸過的專業技能" items={skills} />
        <SkillSection title="使用過的工具" items={tools} />
        <Row>
          <Col lg={10} className="mx-auto">
            <HobbySection hobbies={hobbies} />
            <QuoteSection />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default About;
