import { useEffect, useLayoutEffect, useRef, useState } from "react";

type TypingEffectProps = {
  sequence: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  delayBeforeType?: number;
  className?: string;
};

const createSequenceKey = (sequence: readonly string[]) => JSON.stringify(sequence);

const getLongestTextByLength = (sequence: readonly string[]): string =>
  sequence.reduce(
    (longest, text) => (text.length >= longest.length ? text : longest),
    sequence[0] ?? ""
  );

const getLongestTextByWidth = (
  sequence: readonly string[],
  referenceElement: HTMLElement | null
): string => {
  const first = sequence[0];
  if (!referenceElement || typeof window === "undefined" || first === undefined) {
    return getLongestTextByLength(sequence);
  }

  const { fontWeight, fontSize, fontFamily } = window.getComputedStyle(referenceElement);
  const context = document.createElement("canvas").getContext("2d");

  if (!context) {
    return getLongestTextByLength(sequence);
  }

  context.font = `${fontWeight} ${fontSize} ${fontFamily}`;

  return sequence.reduce((longest, text) => {
    const textWidth = context.measureText(text).width;
    const longestWidth = context.measureText(longest).width;
    return textWidth > longestWidth ? text : longest;
  }, first);
};

const TypingEffect = ({
  sequence,
  typingSpeed = 150,
  deletingSpeed = 75,
  delayBetween = 2000,
  delayBeforeType = 500,
  className = "",
}: TypingEffectProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const elementRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequenceRef = useRef(sequence);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [longestText, setLongestText] = useState(() => getLongestTextByLength(sequence));

  const sequenceKey = createSequenceKey(sequence);

  useLayoutEffect(() => {
    sequenceRef.current = sequence;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    let isActive = true;

    const updateLongestText = () => {
      const items = sequenceRef.current;
      if (!isActive || !containerRef.current || !items.length) return;
      setLongestText(getLongestTextByWidth(items, containerRef.current));
    };

    updateLongestText();
    window.addEventListener("resize", updateLongestText);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateLongestText);
    }

    return () => {
      isActive = false;
      window.removeEventListener("resize", updateLongestText);
    };
  }, [sequenceKey]);

  useLayoutEffect(() => {
    const first = sequenceRef.current[0];
    if (first === undefined || !elementRef.current) return;
    elementRef.current.textContent = first;
  }, [sequenceKey, reduceMotion]);

  useEffect(() => {
    const first = sequenceRef.current[0];
    if (first === undefined || reduceMotion) return undefined;

    let isMounted = true;
    let sequenceIndex = 0;
    let currentText = first;
    let isDeleting = false;

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const schedule = (delay: number) => {
      if (!isMounted) return;
      clearTimer();
      timerRef.current = setTimeout(tick, delay);
    };

    const tick = () => {
      if (!isMounted || !elementRef.current) return;

      const fullText = sequenceRef.current[sequenceIndex] ?? "";

      currentText = isDeleting
        ? fullText.substring(0, currentText.length - 1)
        : fullText.substring(0, currentText.length + 1);

      elementRef.current.textContent = currentText;

      let nextSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && currentText === fullText) {
        nextSpeed = delayBetween;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        sequenceIndex = (sequenceIndex + 1) % sequenceRef.current.length;
        nextSpeed = delayBeforeType;
      }

      schedule(nextSpeed);
    };

    schedule(delayBetween);

    return () => {
      isMounted = false;
      clearTimer();
    };
  }, [sequenceKey, typingSpeed, deletingSpeed, delayBetween, delayBeforeType, reduceMotion]);

  if (!sequence.length) {
    return null;
  }

  return (
    <span ref={containerRef} className={`typing-effect-container ${className}`} aria-hidden="true">
      <span className="typing-effect-sizer" aria-hidden="true">
        {longestText}
        <span className="typing-effect-sizer-cursor" aria-hidden="true" />
      </span>
      <span className="typing-effect-overlay">
        <span ref={elementRef} className="typing-effect-text" />
        {!reduceMotion && <span className="typing-effect-cursor" aria-hidden="true" />}
      </span>
    </span>
  );
};

export default TypingEffect;
