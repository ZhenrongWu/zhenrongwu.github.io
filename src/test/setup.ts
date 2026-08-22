import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

type Listener = (event: { matches: boolean }) => void;

export type MockMediaQueryList = {
  matches: boolean;
  media: string;
  addEventListener: (type: string, listener: Listener) => void;
  removeEventListener: (type: string, listener: Listener) => void;
  trigger: (next: boolean) => void;
};

export const mockMatchMedia = (matches = false): MockMediaQueryList => {
  const listeners = new Set<Listener>();
  const mql: MockMediaQueryList = {
    matches,
    media: "",
    addEventListener: (_, fn) => {
      listeners.add(fn);
    },
    removeEventListener: (_, fn) => {
      listeners.delete(fn);
    },
    trigger(next) {
      mql.matches = next;
      listeners.forEach((fn) => fn({ matches: next }));
    },
  };
  window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia;
  return mql;
};

mockMatchMedia(false);
