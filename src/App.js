import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Resume from "./components/Resume";
import Loading from "./components/Loading";
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
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
