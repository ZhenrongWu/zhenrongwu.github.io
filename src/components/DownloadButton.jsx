import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";

const DownloadButton = ({ onClick, className = "", ...props }) => {
  return (
    <Button
      onClick={onClick}
      className={`download-button btn-lavender ${className}`}
      aria-label="下載履歷 PDF 檔案"
      {...props}
    >
      <AiOutlineDownload aria-hidden="true" style={{ marginRight: "8px" }} />
      <span>下載履歷</span>
      <div className="button-background" aria-hidden="true" />
    </Button>
  );
};

export default DownloadButton;
