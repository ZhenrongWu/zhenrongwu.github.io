const CAREER_START_YEAR = 2020;

const DIGITS = "零一二三四五六七八九";

export const toChineseNumber = (n: number): string => {
  if (n < 10) return DIGITS.charAt(n);
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${tens === 1 ? "" : DIGITS.charAt(tens)}十${ones === 0 ? "" : DIGITS.charAt(ones)}`;
};

export const yearsOfExperience = (now: Date = new Date()): number =>
  Math.max(now.getFullYear() - CAREER_START_YEAR + 1, 0);
