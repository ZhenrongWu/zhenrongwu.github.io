import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Resume from "./Resume";
import { resumeData } from "../data/resume";

const renderResume = () =>
  render(
    <MemoryRouter>
      <Resume />
    </MemoryRouter>
  );
const downloadLink = () => screen.getByRole("link", { name: "下載履歷 PDF 檔案" });

describe("Resume 下載履歷", () => {
  it("下載按鈕是指向預先產生 PDF 的下載連結", () => {
    renderResume();
    const link = downloadLink();
    expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(link).toHaveAttribute("download", "吳振榮履歷.pdf");
    expect(link).not.toHaveAttribute("aria-busy");
    expect(screen.queryByText(/正在生成/)).not.toBeInTheDocument();
  });

  it("點擊不會開啟列印對話框，交由瀏覽器下載檔案", async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    renderResume();
    await user.click(downloadLink());
    expect(print).not.toHaveBeenCalled();
  });

  it("頁面標題列與按鈕列在列印時隱藏，履歷內容不隱藏", () => {
    renderResume();
    const heading = screen.getByRole("heading", { level: 1, name: "履歷" });
    expect(heading.closest(".row")).toHaveClass("d-print-none");
    expect(downloadLink().closest(".row")).toHaveClass("d-print-none");
    const name = screen.getByRole("heading", { level: 1, name: resumeData.personalInfo.name });
    expect(name.closest(".d-print-none")).toBeNull();
    expect(name.closest(".resume-content")).not.toBeNull();
  });

  it("履歷內容以真實文字呈現，可供列印與選取", () => {
    renderResume();
    expect(screen.getByText(resumeData.personalInfo.email)).toBeInTheDocument();
    const firstJob = resumeData.workExperience[0];
    if (!firstJob) throw new Error("缺少工作經驗資料");
    expect(screen.getByText(firstJob.position)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "工作經驗" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "競賽經驗" })).toBeInTheDocument();
  });
});
