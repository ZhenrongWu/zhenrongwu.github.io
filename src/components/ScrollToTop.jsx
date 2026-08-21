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
