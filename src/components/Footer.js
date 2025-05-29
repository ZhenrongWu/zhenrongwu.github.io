import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      url: "https://devherohub.com",
      icon: <FaCode />,
      label: "開發者英雄基地",
      ariaLabel: "開發者英雄基地",
    },
    {
      url: "https://github.com/ZhenrongWu",
      icon: <FaGithub />,
      label: "GitHub",
      ariaLabel: "GitHub",
    },
    {
      url: "https://www.linkedin.com/in/zhenrong-wu",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      ariaLabel: "LinkedIn",
    },
  ];

  return (
    <footer className="footer-lavender">
      <Container>
        <Row className="align-items-center g-0">
          <Col lg={4} className="text-center text-lg-start">
            <h3>Designed and Developed by Zhenrong Wu</h3>
          </Col>
          <Col lg={4} className="text-center">
            <h3>Copyright © {currentYear} 我的網站</h3>
          </Col>
          <Col lg={4} className="text-center text-lg-end">
            <div className="social-links">
              {socialLinks.map(({ url, icon, label, ariaLabel }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  title={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
