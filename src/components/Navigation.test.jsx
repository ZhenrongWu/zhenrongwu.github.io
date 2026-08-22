import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

// Navigation 依賴 useLocation，必須包在 Router 內；MemoryRouter 可指定起始路徑
const renderAt = (pathname) =>
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Navigation />
    </MemoryRouter>
  );

describe("Navigation", () => {
  it("渲染所有導覽連結", () => {
    renderAt("/");
    for (const label of ["首頁", "關於我", "作品集", "履歷"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("只有目前頁面的連結帶有 active class", () => {
    renderAt("/portfolio");
    expect(screen.getByRole("link", { name: "作品集" })).toHaveClass("active");
    expect(screen.getByRole("link", { name: "首頁" })).not.toHaveClass("active");
    expect(screen.getByRole("link", { name: "關於我" })).not.toHaveClass("active");
  });

  it("在首頁時只有首頁連結啟用", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: "首頁" })).toHaveClass("active");
    expect(screen.getByRole("link", { name: "作品集" })).not.toHaveClass("active");
  });
});
