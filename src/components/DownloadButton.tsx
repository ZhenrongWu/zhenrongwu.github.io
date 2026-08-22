import { Button, type ButtonProps } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";

type DownloadButtonProps = Omit<ButtonProps, "children">;

const DownloadButton = ({ className = "", ...props }: DownloadButtonProps) => {
  return (
    <Button
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
