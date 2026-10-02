"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WATERFALL_WATCHES, WatchRecord } from "@/data/watch-data";

export function WaterfallShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [cardTransforms, setCardTransforms] = useState<
    {
      y: number;
      scale: number;
      z: number;
      rotateX: number;
      opacity: number;
      zIndex: number;
    }[]
  >([]);

  const N = WATERFALL_WATCHES.length;

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalDist = container.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      // Current section progress: 0 to 1
      const rawProgress = Math.max(0, Math.min(1, -rect.top / totalDist));
      // Map progress to card index range [0, N - 1]
      const p = rawProgress * (N - 1);
      const currentIndex = Math.min(N - 1, Math.floor(p + 0.5));
      setActiveIdx(currentIndex);

      // Exact place(card, d) physics from projectplan.md §9A
      const viewportH = window.innerHeight;
      const transforms = WATERFALL_WATCHES.map((_, i) => {
        const d = i - p;
        let y = 0;
        let scale = 1;
        let z = 0;
        let rotateX = 0;
        let opacity = 1;

        if (d >= 0) {
          // Upcoming cards queued above, receding in depth
          y = -d * 34;
          scale = 1 - d * 0.06;
          z = -d * 90;
          rotateX = d * 2;
          opacity = Math.max(0, 1 - d * 0.18);
        } else {
          // Passed cards fold over crest and cascade straight down
          const k = Math.min(1, -d);
          y = k * (viewportH * 0.9);
          rotateX = -k * 38;
          scale = 1 + k * 0.04;
          opacity = Math.max(0, 1 - k);
        }

        const zIndex = 100 - Math.round(Math.abs(d) * 10);
        return { y, scale, z, rotateX, opacity, zIndex };
      });

      setCardTransforms(transforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [N]);

  const activeWatch = WATERFALL_WATCHES[activeIdx] || WATERFALL_WATCHES[0];

  return (
    <section
      ref={containerRef}
      id="collection"
      className="relative z-20 w-full"
      style={{ height: `${N * 100}vh` }}
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-14">
        <div className="relative z-10 w-full max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: EDITORIAL NARRATIVE ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#0b0b14]/30" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase">
                COLLECTION · VOL. 01
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#0b0b14] leading-[0.92] mb-6">
              The Deep{" "}
              <span className="font-serif italic font-medium accent-gradient-text">
                Waterfall.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#0b0b14]/75 max-w-md leading-relaxed mb-8">
              A kinetic descent into our seven primary references. Each timepiece is
              engineered for hydrodynamic tension and calibrated with enduring physical presence.
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="/collection"
                data-cursor="link"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-colors shadow-sm"
              >
                <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                  Explore full catalog ({WATERFALL_WATCHES.length}/15)
                </span>
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </Link>
            </div>
          </div>

          {/* ================= CENTER-RIGHT: PERSPECTIVE WATERFALL DECK ================= */}
          <div
            className="lg:col-span-5 relative h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center"
            style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
          >
            {WATERFALL_WATCHES.map((watch, i) => {
              const tr = cardTransforms[i] || {
                y: -i * 34,
                scale: 1 - i * 0.06,
                z: -i * 90,
                rotateX: i * 2,
                opacity: 1 - i * 0.18,
                zIndex: 100 - i * 10,
              };

              const isActive = i === activeIdx;

              return (
                <div
                  key={watch.id}
                  className="absolute w-[300px] sm:w-[340px] md:w-[380px] h-[400px] sm:h-[440px] rounded-[26px] p-6 flex flex-col justify-between overflow-hidden shadow-[0_30px_60px_rgba(11,11,20,0.18)] border border-white/80 transition-shadow duration-300"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.65)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    transform: `translate3d(0, ${tr.y}px, ${tr.z}px) rotateX(${tr.rotateX}deg) scale(${tr.scale})`,
                    opacity: tr.opacity,
                    zIndex: tr.zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  data-cursor="view"
                  data-cursor-label="VIEW"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-white/70 font-mono text-[10px] font-semibold text-[#0b0b14] border border-white/90">
                      0{i + 1} / 0{N}
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-[#0b0b14]/60 uppercase">
                      {watch.category}
                    </span>
                  </div>

                  {/* Centered Watch Cutout with subtle tilt */}
                  <div className="relative my-auto h-[220px] w-full flex items-center justify-center">
                    <Image
                      src={watch.image}
                      alt={watch.name}
                      fill
                      sizes="340px"
                      className={`object-contain drop-shadow-[0_15px_25px_rgba(11,11,20,0.2)] transition-transform duration-500 ${
                        isActive ? "scale-105 rotate-[-2deg]" : "scale-95"
                      }`}
                    />
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="flex flex-col z-10 border-t border-black/5 pt-3">
                    <span className="font-mono text-[9px] tracking-widest text-[#0b0b14]/50 uppercase">
                      CHAPTER 0{i + 1}
                    </span>
                    <div className="flex items-end justify-between">
                      <span className="font-display text-lg font-semibold text-[#0b0b14] leading-tight">
                        {watch.model}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#2a4bd7]">
                        {watch.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= FAR RIGHT: SYNCHRONIZED PROGRESS RAIL & COUNTER ================= */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center gap-6 pl-4 border-l border-[#0b0b14]/15">
            {/* Giant Digits Slot Counter */}
            <div className="flex items-baseline">
              <span className="font-display text-7xl font-bold text-[#0b0b14] leading-none">
                0{activeIdx + 1}
              </span>
              <span className="font-mono text-sm text-[#0b0b14]/40 font-semibold ml-1">
                /0{N}
              </span>
            </div>

            {/* Vertical Progress Rail */}
            <div className="relative h-44 w-1 bg-[#0b0b14]/15 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 bg-[#2a4bd7] rounded-full transition-all duration-200"
                style={{
                  height: `${((activeIdx + 1) / N) * 100}%`,
                }}
              />
            </div>

            {/* Rotated Active Title */}
            <span
              className="font-mono text-xs tracking-[0.25em] text-[#0b0b14]/70 uppercase whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {activeWatch.model}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
