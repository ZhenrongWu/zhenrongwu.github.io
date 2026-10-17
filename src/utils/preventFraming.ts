export function preventFraming(win: Window = window): boolean {
  if (win.top === win.self) return false;
  try {
    win.top!.location.href = win.self.location.href;
  } catch {
    return true;
  }
  return true;
}
