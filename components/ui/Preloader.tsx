"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only show once per session
    if (typeof window !== "undefined" && sessionStorage.getItem("sumeri_preloaded")) {
      setIsVisible(false);
      return;
    }

    const startTime = performance.now();
    const duration = 1200; // ms

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          sessionStorage.setItem("sumeri_preloaded", "true");
          setTimeout(() => setIsVisible(false), 500);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0b0b14] flex flex-col items-center justify-center transition-all duration-500 ease-out ${
        isFinished ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Bezel Ring Closing Graphic */}
      <div className="relative flex items-center justify-center h-32 w-32 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#2a4bd7"
            strokeWidth="3"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
        </svg>

        {/* Counter */}
        <span className="absolute font-mono text-xs font-semibold text-white tracking-widest">
          {progress < 10 ? `0${progress}` : progress}
        </span>
      </div>

      <span className="font-display text-lg tracking-[0.3em] font-semibold text-white uppercase">
        SUMERI
      </span>
      <span className="font-mono text-[9px] tracking-[0.25em] text-[#8a8d9e] uppercase mt-1">
        CALIBRATING PRESSURE CHAMBER
      </span>
    </div>
  );
}
