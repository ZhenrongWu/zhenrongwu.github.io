import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { lazy, type ComponentType } from "react";
import { render, screen, act } from "@testing-library/react";
import SuspenseWithLoader from "./SuspenseWithLoader";
import { mockMatchMedia } from "../test/setup";
type LazyModule = { default: ComponentType };

const makeDeferredLazy = () => {
  let resolve: (module: LazyModule) => void = () => {};
  const promise = new Promise<LazyModule>((r) => {
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
    expect(screen.getByText("頁面內容")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");

    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(container.querySelector(".page-loader-fading")).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(container.querySelector(".page-loader")).toBeNull();
  });
});
