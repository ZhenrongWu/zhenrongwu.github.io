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
        <Row className="align-items-center">
          <Col lg={4} md={6} className="mb-3 mb-lg-0 text-center text-md-start">
            <h3 className="h6 mb-0">Designed and Developed by Zhenrong Wu</h3>
          </Col>
          <Col
            lg={4}
            md={6}
            className="mb-3 mb-lg-0 text-center text-md-end text-lg-center order-md-3 order-lg-2"
          >
            <h3 className="h6 mb-0">Copyright © {currentYear} 我的網站</h3>
          </Col>
          <Col lg={4} className="text-center text-lg-end order-md-2 order-lg-3">
            <section className="d-flex gap-3 justify-content-center justify-content-lg-end">
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
            </section>
          </Col>
        </Row>
      </Container>
<<<<<<< HEAD
=======
      <style jsx="true">{`
        .social-icon-link {
          color: #6c757d;
          transition: color 0.3s ease, transform 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }
        .social-icon-link:hover {
          color: var(--bs-lavender);
          transform: translateY(-3px);
        }
        .social-icon {
          display: inline-flex;
        }
        @media (max-width: 767.98px) {
          .social-icon-link {
            padding: 0.25rem;
          }
          .social-icon {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
>>>>>>> 84ef2e4 (refactor: split Navigation and Footer components from Layout into components directory)
    </footer>
  );
};

export default Footer;
