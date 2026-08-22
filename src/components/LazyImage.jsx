import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * 帶載入指示的圖片。
 * - 統一 Home / Portfolio 原本各自重複的 spinner + 淡入邏輯
 * - 要求 width / height，讓瀏覽器在載入前預留版面，避免 CLS
 * - 若圖片已在快取中（onLoad 可能在 React 綁定前觸發），以 `complete` 補正狀態
 */
const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  wrapperClassName = "",
  eager = false,
  ...imgProps
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleRef = (node) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  };

  return (
    <div className={`lazy-image-wrapper position-relative ${wrapperClassName}`}>
      {!loaded && (
        <div className="image-loading-overlay" aria-hidden="true">
          <div className="loading-spinner" />
        </div>
      )}
      <img
        ref={handleRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${loaded ? "image-loaded" : "image-loading"} ${className}`}
        {...imgProps}
      />
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  /** 首屏關鍵圖片設為 true：eager + fetchPriority=high */
  eager: PropTypes.bool,
};

export default LazyImage;
