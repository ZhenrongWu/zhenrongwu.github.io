import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// 模擬進度：JS chunk 的載入無法取得真實進度，因此仿照遊戲讀條的做法
// 快速爬升並在接近上限時逐漸放慢；父層告知完成（active=false）時補到 100%。
const TICK_MS = 80;
const CEILING = 92;
// 100% 的停留時間與淡出時間（淡出秒數需與 _pageLoader.css 的 transition 一致）
const COMPLETE_DWELL_MS = 450;
const FADE_MS = 300;

const nextProgress = (current) => {
  const remaining = CEILING - current;
  const step = Math.max(0.4, remaining * 0.12);
  return Math.min(CEILING, current + step);
};

// 狀態機：hidden → loading → completing（顯示 100%）→ fading → hidden
const PageLoader = ({ active }) => {
  const [phase, setPhase] = useState(active ? "loading" : "hidden");
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 依 active 切換階段
  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    if (active) {
      clearTimers();
      setProgress(0);
      setPhase("loading");
      return clearTimers;
    }

    // active 轉為 false：若正在載入就進入完成流程
    setPhase((current) => {
      if (current !== "loading") return current;
      setProgress(100);
      const dwell = reduceMotion ? 0 : COMPLETE_DWELL_MS;
      const fade = reduceMotion ? 0 : FADE_MS;
      timersRef.current.push(
        setTimeout(() => setPhase("fading"), dwell),
        setTimeout(() => setPhase("hidden"), dwell + fade)
      );
      return "completing";
    });
    return clearTimers;
  }, [active, reduceMotion]);

  // 載入中：模擬進度
  useEffect(() => {
    if (phase !== "loading" || reduceMotion) return undefined;
    const timer = setInterval(() => setProgress(nextProgress), TICK_MS);
    return () => clearInterval(timer);
  }, [phase, reduceMotion]);

  if (phase === "hidden") return null;

  const percent = Math.round(progress);
  // 減少動態偏好下，載入中不顯示模擬數字；完成時仍顯示 100%
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

PageLoader.propTypes = {
  /** true = 有頁面正在載入；轉為 false 時讀條補到 100%、停留後淡出 */
  active: PropTypes.bool.isRequired,
};

export default PageLoader;
