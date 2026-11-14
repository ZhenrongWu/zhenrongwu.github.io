import type { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { socialLinks, type SocialLink } from "../data/social";

const icons: Record<SocialLink["id"], ReactNode> = {
  devherohub: <FaCode />,
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-lavender py-3">
      <Container>
        <Row className="align-items-center gy-2">
          <Col lg={4} sm={12} className="text-center text-lg-start">
            <p className="footer-text h6 mb-0">Designed and Developed by Zhenrong Wu</p>
          </Col>
          <Col lg={4} sm={12} className="text-center">
            <p className="footer-text h6 mb-0">Copyright © {currentYear} 我的網站</p>
          </Col>
          <Col lg={4} sm={12} className="text-center text-lg-end">
            <div className="d-flex gap-3 justify-content-center justify-content-lg-end">
              {socialLinks.map(({ id, url, label }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon-link"
                  title={label}
                >
                  <span className="social-icon fs-4">{icons[id]}</span>
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
