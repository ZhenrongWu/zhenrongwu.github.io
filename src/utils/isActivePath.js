/**
 * 判斷導覽連結是否對應目前路徑。
 * 以「路徑區段」比對而非字串前綴，避免 /about 誤判 /aboutX 為啟用。
 * @param {string} linkPath 導覽連結路徑，例如 "/about"
 * @param {string} pathname 目前 location.pathname
 */
export const isActivePath = (linkPath, pathname) => {
  if (linkPath === "/") {
    return pathname === "/";
  }
  return pathname === linkPath || pathname.startsWith(`${linkPath}/`);
};
