import React, { Suspense, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PageLoader from "./PageLoader";

// 放在 Suspense fallback 的空元件：掛載代表開始等待、卸載代表載入完成。
// 讓讀條可以活在 Suspense 之外，才能在完成時補到 100% 並停留再淡出，
// 而不是隨 fallback 一起被瞬間移除。
const PendingSignal = ({ onChange }) => {
  useEffect(() => {
    onChange(true);
    return () => onChange(false);
  }, [onChange]);
  return null;
};

PendingSignal.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const SuspenseWithLoader = ({ children }) => {
  const [pending, setPending] = useState(false);
  const handleChange = useCallback((value) => setPending(value), []);

  return (
    <>
      <PageLoader active={pending} />
      <Suspense fallback={<PendingSignal onChange={handleChange} />}>{children}</Suspense>
    </>
  );
};

SuspenseWithLoader.propTypes = {
  children: PropTypes.node,
};

export default SuspenseWithLoader;
