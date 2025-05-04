import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";

const DownloadButton = ({ onClick, className = "", ...props }) => {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      className={`download-button ${className}`}
      aria-label="下載履歷 PDF 檔案"
      style={{
        backgroundColor: "var(--color-primary)",
        border: "none",
        position: "relative",
        overflow: "hidden",
      }}
      {...props}
    >
      <AiOutlineDownload aria-hidden="true" style={{ marginRight: "8px" }} />
      <span>下載履歷</span>
      <div className="button-background" aria-hidden="true" />

      <style jsx>{`
        .download-button {
          padding: 10px 25px;
          font-size: 1.1em;
          border-radius: 30px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .download-button:hover,
        .download-button:focus {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          outline: none;
        }

        .download-button:focus {
          box-shadow: var(--shadow-focus);
        }

        .button-background {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
        }

        .download-button:hover .button-background {
          left: 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .download-button,
          .button-background {
            transition: none;
          }
        }
      `}</style>
    </Button>
  );
};

export default DownloadButton;
