import { Suspense, useCallback, useEffect, useState, type ReactNode } from "react";
import PageLoader from "./PageLoader";

type PendingSignalProps = {
  onChange: (pending: boolean) => void;
};

const PendingSignal = ({ onChange }: PendingSignalProps) => {
  useEffect(() => {
    onChange(true);
    return () => onChange(false);
  }, [onChange]);
  return null;
};

type SuspenseWithLoaderProps = {
  children: ReactNode;
};

const SuspenseWithLoader = ({ children }: SuspenseWithLoaderProps) => {
  const [pending, setPending] = useState(false);
  const handleChange = useCallback((value: boolean) => setPending(value), []);

  return (
    <>
      <PageLoader active={pending} />
      <Suspense fallback={<PendingSignal onChange={handleChange} />}>{children}</Suspense>
    </>
  );
};

export default SuspenseWithLoader;
