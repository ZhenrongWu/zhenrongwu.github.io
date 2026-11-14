import { describe, it, expect, vi } from "vitest";
import { Suspense, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { preloadable } from "./preloadable";

const Greeting = ({ name }: { name: string }) => <p>你好 {name}</p>;

describe("preloadable", () => {
  it("預先載入後第一次渲染就顯示內容，不經過 fallback", async () => {
    const Page = preloadable(async () => ({ default: Greeting }));
    await Page.preload();
    render(
      <Suspense fallback={<p>載入中</p>}>
        <Page name="訪客" />
      </Suspense>
    );
    expect(screen.getByText("你好 訪客")).toBeInTheDocument();
    expect(screen.queryByText("載入中")).not.toBeInTheDocument();
  });

  it("沒有預先載入時先顯示 fallback，載入完成後顯示內容", async () => {
    const Page = preloadable(async () => ({ default: Greeting }));
    render(
      <Suspense fallback={<p>載入中</p>}>
        <Page name="訪客" />
      </Suspense>
    );
    expect(screen.getByText("載入中")).toBeInTheDocument();
    expect(await screen.findByText("你好 訪客")).toBeInTheDocument();
  });

  it("延遲載入的元件在父元件重新渲染後保留狀態", async () => {
    const Counter = ({ label }: { label: string }) => {
      const [count, setCount] = useState(0);
      return (
        <button type="button" onClick={() => setCount(count + 1)}>
          {label} {count}
        </button>
      );
    };
    const Page = preloadable(async () => ({ default: Counter }));
    const view = (label: string) => (
      <Suspense fallback={<p>載入中</p>}>
        <Page label={label} />
      </Suspense>
    );
    const { rerender } = render(view("次數"));
    fireEvent.click(await screen.findByRole("button", { name: "次數 0" }));
    rerender(view("點擊"));
    expect(screen.getByRole("button", { name: "點擊 1" })).toBeInTheDocument();
  });

  it("多次預先載入只呼叫一次載入函式", async () => {
    const factory = vi.fn(async () => ({ default: Greeting }));
    const Page = preloadable(factory);
    await Promise.all([Page.preload(), Page.preload()]);
    expect(factory).toHaveBeenCalledTimes(1);
  });
});
