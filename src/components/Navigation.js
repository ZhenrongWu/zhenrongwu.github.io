import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

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
      className="navbar-lavender navbar-dark navbar-glass"
      expand="lg"
      fixed="top"
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

export default Navigation;
