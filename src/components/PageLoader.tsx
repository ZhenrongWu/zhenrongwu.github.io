import { useEffect, useState } from "react";

const TICK_MS = 80;
const CEILING = 92;
const COMPLETE_DWELL_MS = 450;
const FADE_MS = 300;

type Phase = "hidden" | "loading" | "completing" | "fading";

type PageLoaderProps = {
  active: boolean;
};

const nextProgress = (current: number): number => {
  const remaining = CEILING - current;
  const step = Math.max(0.4, remaining * 0.12);
  return Math.min(CEILING, current + step);
};

const usePrefersReducedMotion = (): boolean => {
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduceMotion;
};

const PageLoader = ({ active }: PageLoaderProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(active ? "loading" : "hidden");
  const [progress, setProgress] = useState(0);
  const [prevActive, setPrevActive] = useState(active);

  if (active !== prevActive) {
    setPrevActive(active);
    if (active) {
      setProgress(0);
      setPhase("loading");
    } else if (phase === "loading") {
      setProgress(100);
      setPhase(reduceMotion ? "hidden" : "completing");
    }
  }

  useEffect(() => {
    if (phase !== "loading" || reduceMotion) return undefined;
    const timer = setInterval(() => setProgress(nextProgress), TICK_MS);
    return () => clearInterval(timer);
  }, [phase, reduceMotion]);

  useEffect(() => {
    if (phase !== "completing" && phase !== "fading") return undefined;
    const next: Phase = phase === "completing" ? "fading" : "hidden";
    const delay = phase === "completing" ? COMPLETE_DWELL_MS : FADE_MS;
    const timer = setTimeout(() => setPhase(next), delay);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "hidden") return null;

  const percent = Math.round(progress);
  const showPercent = !reduceMotion || phase !== "loading";

  return (
    <div
      className={`page-loader ${phase === "fading" ? "page-loader-fading" : ""}`}
      role="status"
      aria-live="polite"
      data-phase={phase}
    >
      <div className="page-loader-panel">
        <div className="page-loader-header" aria-hidden="true">
          <span className="page-loader-label">LOADING</span>
          <span className="page-loader-percent">{showPercent ? `${percent}%` : ""}</span>
        </div>
        <div
          className="page-loader-track"
          role="progressbar"
          aria-label="頁面載入進度"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={showPercent ? percent : undefined}
        >
          <div
            className={`page-loader-bar ${showPercent ? "" : "page-loader-bar-static"}`}
            style={showPercent ? { width: `${progress}%` } : undefined}
          />
        </div>
        <span className="visually-hidden">
          {phase === "loading" ? "頁面載入中" : "頁面載入完成"}
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
