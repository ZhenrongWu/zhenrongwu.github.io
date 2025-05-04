import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 檢查頁面資源載入狀態
    const checkLoadingStatus = () => {
      if (document.readyState === "complete") {
        // 給一個短暫的延遲以確保平滑過渡
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    // 如果頁面已經加載完成
    if (document.readyState === "complete") {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      // 監聽 load 事件
      window.addEventListener("load", checkLoadingStatus);
      // 監聽 readystatechange 事件
      document.addEventListener("readystatechange", checkLoadingStatus);

      // 清理監聽器
      return () => {
        window.removeEventListener("load", checkLoadingStatus);
        document.removeEventListener("readystatechange", checkLoadingStatus);
      };
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
