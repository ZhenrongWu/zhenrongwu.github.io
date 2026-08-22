import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import TypingEffect from "./TypingEffect";
import { mockMatchMedia } from "../test/setup";

const SEQUENCE = ["軟體設計師", "遊戲開發者"];
const getText = (container: HTMLElement) =>
  container.querySelector(".typing-effect-text")?.textContent;

describe("TypingEffect", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("初始顯示序列的第一個字串", () => {
    mockMatchMedia(false);
    const { container } = render(<TypingEffect sequence={SEQUENCE} />);
    expect(getText(container)).toBe(SEQUENCE[0]);
  });

  it("對輔助技術隱藏（文字由 visually-hidden 標籤鏡射）", () => {
    mockMatchMedia(false);
    const { container } = render(<TypingEffect sequence={SEQUENCE} />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("使用者偏好減少動態時：不打字、不顯示游標", () => {
    mockMatchMedia(true);
    const { container } = render(<TypingEffect sequence={SEQUENCE} />);

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(getText(container)).toBe(SEQUENCE[0]);
    expect(container.querySelector(".typing-effect-cursor")).toBeNull();
  });

  it("未偏好減少動態時：顯示游標並於延遲後開始刪除文字", () => {
    mockMatchMedia(false);
    const { container } = render(
      <TypingEffect sequence={SEQUENCE} delayBetween={100} deletingSpeed={10} />
    );
    expect(container.querySelector(".typing-effect-cursor")).not.toBeNull();
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(getText(container)).toBe(SEQUENCE[0]);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(getText(container)).toBe(SEQUENCE[0]?.slice(0, -1));
  });

  it("切換系統偏好時會即時停止動畫", () => {
    const mql = mockMatchMedia(false);
    const { container } = render(<TypingEffect sequence={SEQUENCE} />);
    expect(container.querySelector(".typing-effect-cursor")).not.toBeNull();

    act(() => {
      mql.trigger(true);
    });
    expect(container.querySelector(".typing-effect-cursor")).toBeNull();
  });
});
