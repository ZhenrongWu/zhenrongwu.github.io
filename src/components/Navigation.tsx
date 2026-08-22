import { useState, useRef, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { isActivePath } from "../utils/isActivePath";

const Navigation = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const navLinks = [
    { path: "/", label: "首頁" },
    { path: "/about", label: "關於我" },
    { path: "/portfolio", label: "作品集" },
    { path: "/resume", label: "履歷" },
  ];

  return (
    <Navbar
      ref={navbarRef}
      className="navbar-lavender navbar-dark navbar-glass"
      expand="lg"
      fixed="top"
      expanded={isExpanded}
      onToggle={handleToggle}
    >
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="me-4">
          我的網站
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="切換導覽選單" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map(({ path, label }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                className={`px-3 ${isActivePath(path, location.pathname) ? "active" : ""}`}
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
