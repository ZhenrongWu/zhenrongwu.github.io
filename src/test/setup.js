import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// 每個測試結束後卸載所有元件，避免測試之間互相污染
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// jsdom 沒有實作 matchMedia；提供一個可由各測試覆寫的預設實作
export const mockMatchMedia = (matches = false) => {
  const listeners = new Set();
  const mql = {
    matches,
    media: "",
    addEventListener: (_, fn) => listeners.add(fn),
    removeEventListener: (_, fn) => listeners.delete(fn),
    // 測試可呼叫此方法模擬使用者切換系統偏好
    trigger(next) {
      mql.matches = next;
      listeners.forEach((fn) => fn({ matches: next }));
    },
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return mql;
};

mockMatchMedia(false);
