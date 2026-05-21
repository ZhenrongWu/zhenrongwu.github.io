import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const createSequenceKey = (sequence) => JSON.stringify(sequence);

const getLongestTextByLength = (sequence) =>
  sequence.reduce(
    (longest, text) => (text.length >= longest.length ? text : longest),
    sequence[0] ?? ""
  );

const getLongestTextByWidth = (sequence, referenceElement) => {
  if (
    !referenceElement ||
    typeof window === "undefined" ||
    !sequence.length
  ) {
    return getLongestTextByLength(sequence);
  }

  const { fontWeight, fontSize, fontFamily } = window.getComputedStyle(
    referenceElement
  );
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return getLongestTextByLength(sequence);
  }

  context.font = `${fontWeight} ${fontSize} ${fontFamily}`;

  return sequence.reduce((longest, text) => {
    const textWidth = context.measureText(text).width;
    const longestWidth = context.measureText(longest).width;
    return textWidth > longestWidth ? text : longest;
  }, sequence[0]);
};

const sequencePropType = (props, propName, componentName) => {
  const value = props[propName];
  if (!Array.isArray(value) || value.length === 0) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`: must be a non-empty array of strings.`
    );
  }
  const invalidIndex = value.findIndex(
    (item) => typeof item !== "string" || item.length === 0
  );
  if (invalidIndex !== -1) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`: item at index ${invalidIndex} must be a non-empty string.`
    );
  }
  return null;
};

sequencePropType.isRequired = (props, propName, componentName) => {
  if (props[propName] == null) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\`.`
    );
  }
  return sequencePropType(props, propName, componentName);
};

const TypingEffect = ({
  sequence,
  typingSpeed = 150,
  deletingSpeed = 75,
  delayBetween = 2000,
  delayBeforeType = 500,
  className = "",
}) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const timerRef = useRef(null);
  const sequenceRef = useRef(sequence);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [longestText, setLongestText] = useState(() =>
    getLongestTextByLength(sequence)
  );

  const sequenceKey = createSequenceKey(sequence);
  sequenceRef.current = sequence;

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
    const items = sequenceRef.current;
    if (!items.length || !elementRef.current) return;
    elementRef.current.textContent = items[0];
  }, [sequenceKey, reduceMotion]);

  useEffect(() => {
    const items = sequenceRef.current;
    if (!items.length) return undefined;

    if (reduceMotion) {
      return undefined;
    }

    let isMounted = true;

    let sequenceIndex = 0;
    let currentText = items[0];
    let isDeleting = false;

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const schedule = (delay) => {
      if (!isMounted) return;
      clearTimer();
      timerRef.current = setTimeout(tick, delay);
    };

    const tick = () => {
      if (!isMounted || !elementRef.current) return;

      const fullText = sequenceRef.current[sequenceIndex];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }

      elementRef.current.textContent = currentText;

      let nextSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && currentText === fullText) {
        nextSpeed = delayBetween;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        sequenceIndex =
          (sequenceIndex + 1) % sequenceRef.current.length;
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
    <span
      ref={containerRef}
      className={`typing-effect-container ${className}`}
      aria-hidden="true"
    >
      <span className="typing-effect-sizer" aria-hidden="true">
        {longestText}
        <span className="typing-effect-sizer-cursor" aria-hidden="true" />
      </span>
      <span className="typing-effect-overlay">
        <span ref={elementRef} className="typing-effect-text" />
        {!reduceMotion && (
          <span className="typing-effect-cursor" aria-hidden="true" />
        )}
      </span>
    </span>
  );
};

TypingEffect.propTypes = {
  sequence: sequencePropType.isRequired,
  typingSpeed: PropTypes.number,
  deletingSpeed: PropTypes.number,
  delayBetween: PropTypes.number,
  delayBeforeType: PropTypes.number,
  className: PropTypes.string,
};

export default TypingEffect;
