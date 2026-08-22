import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Portfolio from "./Portfolio";

const renderPortfolio = () =>
  render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>
  );

// 取第一張卡片（role="button" 的正面）
const firstCard = () => screen.getAllByRole("button", { name: /詳細資料$/ })[0];

describe("Portfolio 卡片無障礙", () => {
  it("正面卡片可 Tab 聚焦並標示未展開", () => {
    renderPortfolio();
    const card = firstCard();
    expect(card).toHaveAttribute("tabindex", "0");
    expect(card).toHaveAttribute("aria-expanded", "false");
  });

  it("按 Enter 翻面：aria-expanded 變 true，焦點移到「返回」按鈕", async () => {
    const user = userEvent.setup();
    renderPortfolio();
    const card = firstCard();
    card.focus();
    await user.keyboard("{Enter}");

    expect(card).toHaveAttribute("aria-expanded", "true");
    const back = screen.getAllByRole("button", { name: /^返回/ })[0];
    expect(back).toHaveFocus();
  });

  it("背面按 Escape 翻回正面，焦點回到卡片", async () => {
    const user = userEvent.setup();
    renderPortfolio();
    const card = firstCard();
    card.focus();
    await user.keyboard(" ");
    expect(card).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(card).toHaveAttribute("aria-expanded", "false");
    expect(card).toHaveFocus();
  });

  it("未翻面時背面內容對輔助技術隱藏", () => {
    renderPortfolio();
    // 「返回」按鈕位於背面，未翻面時應被 aria-hidden 排除於可及性樹之外
    expect(screen.queryAllByRole("button", { name: /^返回/ })).toHaveLength(0);
  });
});
