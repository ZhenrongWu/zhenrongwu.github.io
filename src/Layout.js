import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navigation />
      </header>

      <main className="flex-grow-1 main-content">
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
