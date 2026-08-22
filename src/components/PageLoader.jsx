import React from "react";

/**
 * 頁面懶載入時的全視窗置中載入指示。
 * 視覺上只有旋轉的 spinner；文字以 visually-hidden 提供給螢幕閱讀器，
 * role="status" + aria-live 讓輔助技術能宣告「載入中」。
 */
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <div className="loading-spinner" aria-hidden="true" />
    <span className="visually-hidden">頁面載入中</span>
  </div>
);

export default PageLoader;
