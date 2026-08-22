import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import PageLoader from "./PageLoader";
import { mockMatchMedia } from "../test/setup";

describe("PageLoader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("active=false 且未曾載入時不渲染任何東西", () => {
    mockMatchMedia(false);
    const { container } = render(<PageLoader active={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("載入中：以 status 宣告，進度隨時間上升且不超過模擬上限", () => {
    mockMatchMedia(false);
    render(<PageLoader active />);
    expect(screen.getByRole("status")).toHaveTextContent("頁面載入中");
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");

    act(() => {
      vi.advanceTimersByTime(800);
    });
    const mid = Number(bar.getAttribute("aria-valuenow"));
    expect(mid).toBeGreaterThan(0);

    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    const late = Number(bar.getAttribute("aria-valuenow"));
    expect(late).toBeGreaterThan(mid);
    expect(late).toBeLessThanOrEqual(92);
  });

  it("載入完成：先顯示 100% 並停留，之後淡出並卸載", () => {
    mockMatchMedia(false);
    const { rerender, container } = render(<PageLoader active />);
    act(() => {
      vi.advanceTimersByTime(500);
    });

    rerender(<PageLoader active={false} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByRole("status")).toHaveTextContent("頁面載入完成");
    expect(container.querySelector(".page-loader-fading")).toBeNull();

    // 停留期過後進入淡出
    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(container.querySelector(".page-loader-fading")).not.toBeNull();

    // 淡出結束後卸載
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(container).toBeEmptyDOMElement();
  });

  it("偏好減少動態：載入中不模擬進度，完成時立即消失", () => {
    mockMatchMedia(true);
    const { rerender, container } = render(<PageLoader active />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");

    rerender(<PageLoader active={false} />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(container).toBeEmptyDOMElement();
  });
});
