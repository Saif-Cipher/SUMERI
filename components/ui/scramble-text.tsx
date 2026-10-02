"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "span";
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
  scrambleOnHover?: boolean;
} & HTMLMotionProps<"span">;

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>-_+=[]{}";

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.035,
  characterSet = DEFAULT_CHARS,
  className = "",
  as = "span",
  trigger = true,
  onScrambleComplete,
  scrambleOnHover = false,
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const text = children;
    const steps = Math.max(1, Math.round(duration / speed));
    let step = 0;

    intervalRef.current = setInterval(() => {
      let scrambled = "";
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " ";
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  }, [children, duration, speed, characterSet, isAnimating, onScrambleComplete]);

  // Trigger on prop change or mount
  useEffect(() => {
    if (!trigger) return;
    scramble();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, [trigger, children]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      scramble();
    }
  };

  const Component = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <Component
      className={className}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayText}
    </Component>
  );
}

// Named alias matching both amicro CLI and motion-primitives
export const ScrambleText = TextScramble;
export default TextScramble;
