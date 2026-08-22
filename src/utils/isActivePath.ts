export const isActivePath = (linkPath: string, pathname: string): boolean => {
  if (linkPath === "/") {
    return pathname === "/";
  }
  return pathname === linkPath || pathname.startsWith(`${linkPath}/`);
};
