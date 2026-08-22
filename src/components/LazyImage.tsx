import { useState, type ImgHTMLAttributes } from "react";

type LazyImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height" | "loading" | "decoding" | "onLoad" | "onError"
> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  wrapperClassName?: string;
  eager?: boolean;
};

const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  wrapperClassName = "",
  eager = false,
  ...imgProps
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleRef = (node: HTMLImageElement | null) => {
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

export default LazyImage;
