import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LazyImage from "./LazyImage";

const props = { src: "/x.jpg", alt: "測試圖", width: 100, height: 50 };

describe("LazyImage", () => {
  it("載入前顯示 spinner，輸出 width/height 以預留版面", () => {
    const { container } = render(<LazyImage {...props} />);
    const img = screen.getByRole("img", { name: "測試圖" });
    expect(img).toHaveAttribute("width", "100");
    expect(img).toHaveAttribute("height", "50");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveClass("image-loading");
    expect(container.querySelector(".loading-spinner")).not.toBeNull();
  });

  it("載入完成後移除 spinner 並淡入", () => {
    const { container } = render(<LazyImage {...props} />);
    fireEvent.load(screen.getByRole("img"));
    expect(screen.getByRole("img")).toHaveClass("image-loaded");
    expect(container.querySelector(".loading-spinner")).toBeNull();
  });

  it("載入失敗時也移除 spinner，不會無限轉圈", () => {
    const { container } = render(<LazyImage {...props} />);
    fireEvent.error(screen.getByRole("img"));
    expect(container.querySelector(".loading-spinner")).toBeNull();
  });

  it("eager 模式使用 eager 載入與高優先權", () => {
    render(<LazyImage {...props} eager />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
  });
});
