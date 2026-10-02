"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "The Duro Batman hits well above its weight class. 200 meters of true water resistance paired with high-contrast sword hands makes this the gold standard in affordable diver horology.",
    author: "HOROLOGICAL DISPATCH",
    title: "Quarterly Diver Assessment",
    stat1: "200M Tested",
    stat2: "5/5 Build Ratio",
  },
  {
    quote:
      "The bezel clicks with sharp mechanical certainty. On the wrist, the proportions are commanding yet restrained. SUMERI delivers genuine horological credibility without artificial inflation.",
    author: "MARITIME CHRONOS",
    title: "Tool Watch Review",
    stat1: "60-Click Bezel",
    stat2: "Surgical Steel",
  },
];

export function ReviewsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length);

  const review = REVIEWS[current];

  return (
    <section className="relative z-20 py-28 sm:py-36 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1280px] mx-auto bg-white/45 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 sm:p-14 lg:p-20 shadow-[0_20px_50px_rgba(11,11,20,0.06)]">
        <div className="flex flex-col gap-10">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Quote className="w-8 h-8 text-[#2a4bd7]" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/60 uppercase">
                CRITIQUE & FIELD EVALUATION
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                data-cursor="link"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/80 hover:bg-white text-[#0b0b14] border border-white shadow-sm transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                data-cursor="link"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/80 hover:bg-white text-[#0b0b14] border border-white shadow-sm transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0b0b14] leading-[1.12]">
            &ldquo;{review.quote}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-black/10 pt-8">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-widest text-[#0b0b14] uppercase">
                {review.author}
              </span>
              <span className="font-sans text-xs text-[#0b0b14]/60">
                {review.title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-4 py-2 rounded-full bg-[#0b0b14] text-white font-mono text-xs font-semibold uppercase">
                {review.stat1}
              </span>
              <span className="px-4 py-2 rounded-full bg-[#2a4bd7]/15 text-[#2a4bd7] font-mono text-xs font-semibold uppercase">
                {review.stat2}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
