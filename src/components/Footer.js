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
    <footer className="footer-lavender py-3">
      <Container>
        <Row className="align-items-center gy-2">
          <Col lg={4} sm={12} className="text-center text-lg-start">
            <h3 className="h6 mb-0">Designed and Developed by Zhenrong Wu</h3>
          </Col>
          <Col lg={4} sm={12} className="text-center">
            <h3 className="h6 mb-0">Copyright © {currentYear} 我的網站</h3>
          </Col>
          <Col lg={4} sm={12} className="text-center text-lg-end">
            <div className="d-flex gap-3 justify-content-center justify-content-lg-end">
              {socialLinks.map(({ url, icon, label, ariaLabel }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="social-icon-link"
                  title={label}
                >
                  <span className="social-icon fs-4">{icon}</span>
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
