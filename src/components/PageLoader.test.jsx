import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageLoader from "./PageLoader";

describe("PageLoader", () => {
  it("以 status 角色宣告載入中，並提供螢幕閱讀器文字", () => {
    render(<PageLoader />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("頁面載入中");
  });

  it("spinner 對輔助技術隱藏", () => {
    const { container } = render(<PageLoader />);
    expect(container.querySelector(".loading-spinner")).toHaveAttribute("aria-hidden", "true");
  });
});
