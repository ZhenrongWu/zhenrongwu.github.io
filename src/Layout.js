import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <header className="fixed-top">
        <Navigation className="py-3 py-sm-4" />
      </header>

      <main className="main-content">
        <Container>
          <Outlet />
        </Container>
      </main>

      <ScrollToTop />
      <Footer className="py-3 py-sm-4" />
    </div>
  );
};

export default Layout;
