import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Layout from "./Layout";
import SuspenseWithLoader from "./components/SuspenseWithLoader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    // reducedMotion="user"：使用者開啟「減少動態效果」時，framer-motion 自動停用位移/縮放/旋轉動畫
    <MotionConfig reducedMotion="user">
      <Router>
        <SuspenseWithLoader>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SuspenseWithLoader>
      </Router>
    </MotionConfig>
  );
};

export default App;
