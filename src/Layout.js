import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import ScrollToTop from "./components/ScrollToTop";

const Navigation = () => {
  const location = useLocation();

  const navbarStyle = {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    transition: "box-shadow 0.3s ease",
    padding: "0.8rem 0",
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return path !== "/" && location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: "/", label: "首頁" },
    { path: "/about", label: "關於我" },
    { path: "/portfolio", label: "作品集" },
    { path: "/resume", label: "履歷" },
  ];

  return (
    <Navbar
      className="navbar-lavender navbar-dark"
      expand="lg"
      fixed="top"
      style={navbarStyle}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-4">
          我的網站
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map(({ path, label }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                className={`px-3 ${isActive(path) ? "active" : ""}`}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

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
    </footer>
  );
};

const Layout = () => {
  const mainStyle = {
    marginTop: "calc(56px + 0.5rem)", // Navbar 高度 + padding
    marginBottom: "1rem",
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navigation />
      </header>

      <main className="flex-grow-1" style={mainStyle}>
        <Container className="px-3 px-sm-4">
          <Outlet />
        </Container>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Layout;
