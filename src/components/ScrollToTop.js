import React, { useState, useEffect } from "react";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTop = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 添加 CSS 樣式到 head - 確保全站統一按鈕樣式
  useEffect(() => {
    // 先移除可能存在的舊樣式
    const existingStyles = document.querySelectorAll(
      "style[data-scroll-to-top]"
    );
    existingStyles.forEach((style) => style.remove());

    const style = document.createElement("style");
    style.setAttribute("data-scroll-to-top", "true");
    style.textContent = `
      .top-button {
        position: fixed;
        bottom: clamp(20px, 5vh, 40px);
        right: clamp(20px, 5vw, 40px);
        width: clamp(40px, 12vw, 50px);
        height: clamp(40px, 12vw, 50px);
        background-color: #663399;
        background-image: linear-gradient(45deg, #663399, #4B0082);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .top-button.show {
        opacity: 0.9;
        visibility: visible;
        transform: translateY(0);
      }

      .top-button:hover,
      .top-button:focus {
        opacity: 1;
        background-image: linear-gradient(45deg, #7a46b3, #663399);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        transform: translateY(-3px);
        outline: none;
      }

      .top-button:focus {
        box-shadow: 0 0 0 3px rgba(102, 51, 153, 0.4);
      }

      /* 支援觸控裝置的懸停效果 */
      @media (hover: hover) {
        .top-button:hover {
          transform: translateY(-3px);
        }
      }

      /* 小螢幕裝置優化 */
      @media (max-width: 480px) {
        .top-button {
          bottom: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
        }
      }

      /* 減少動畫效果 */
      @media (prefers-reduced-motion: reduce) {
        .top-button {
          transition: none;
        }
      }

      /* 高對比度模式 */
      @media (forced-colors: active) {
        .top-button {
          border: 2px solid ButtonText;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <button
      className={`top-button ${showTopButton ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="返回頁面頂部"
      title="返回頂部"
    >
      <BiArrowToTop size={24} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
