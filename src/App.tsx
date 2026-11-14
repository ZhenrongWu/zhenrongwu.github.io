import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Layout from "./Layout";
import SuspenseWithLoader from "./components/SuspenseWithLoader";
import { Home, About, Portfolio, Resume, NotFound } from "./pageModules";

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
};

export default App;
