import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React, { lazy } from "react";
import { render, screen, act } from "@testing-library/react";
import SuspenseWithLoader from "./SuspenseWithLoader";
import { mockMatchMedia } from "../test/setup";

// 可手動控制何時 resolve 的懶載入元件
const makeDeferredLazy = () => {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  const Lazy = lazy(() => promise);
  const Page = () => <p>頁面內容</p>;
  return { Lazy, resolve: () => resolve({ default: Page }) };
};

describe("SuspenseWithLoader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("懶載入期間顯示讀條，完成後顯示內容、讀條補到 100% 並在停留與淡出後移除", async () => {
    const { Lazy, resolve } = makeDeferredLazy();
    const { container } = render(
      <SuspenseWithLoader>
        <Lazy />
      </SuspenseWithLoader>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("頁面內容")).toBeNull();

    await act(async () => {
      resolve();
    });

    // 內容已出現，但讀條仍在（顯示 100%）
    expect(screen.getByText("頁面內容")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");

    act(() => {
      vi.advanceTimersByTime(450 + 300);
    });
    expect(container.querySelector(".page-loader")).toBeNull();
  });
});
