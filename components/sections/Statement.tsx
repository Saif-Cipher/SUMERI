"use client";

import { useEffect, useRef } from "react";

const STATEMENT_TEXT =
  "Engineered for the deep. Finished like an architectural keepsake. Every SUMERI timepiece is pressure-calibrated to 200 meters and assembled to outlast the temporal tide.";

export function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      wordsRef.current.forEach((w) => {
        if (w) w.style.opacity = "1";
      });
      return;
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Scroll progress through the statement section (0.0 to 1.0)
      const start = windowH * 0.8;
      const end = windowH * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

      const totalWords = wordsRef.current.length;
      wordsRef.current.forEach((wordEl, i) => {
        if (!wordEl) return;
        const wordThreshold = i / totalWords;
        if (progress >= wordThreshold) {
          wordEl.style.opacity = "1";
          wordEl.style.color = "#0b0b14";
        } else {
          wordEl.style.opacity = "0.2";
          wordEl.style.color = "rgba(11, 11, 20, 0.2)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = STATEMENT_TEXT.split(" ");

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative z-20 py-32 sm:py-44 px-6 sm:px-10 lg:px-14 flex items-center justify-center min-h-[70vh]"
    >
      <div className="max-w-[1280px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2a4bd7]" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#0b0b14]/60 uppercase">
            HOROLOGICAL CREED · 01
          </span>
        </div>

        <p className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] transition-colors duration-200">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="inline-block mx-1.5 sm:mx-2 transition-opacity duration-300 opacity-20"
            >
              {word === "deep." || word === "temporal" ? (
                <span className="font-serif italic font-medium text-[#2a4bd7]">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
