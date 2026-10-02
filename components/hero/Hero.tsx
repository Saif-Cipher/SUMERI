"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Droplets } from "lucide-react";
import { HERO_COLORWAYS, WatchRecord } from "@/data/watch-data";
import { HeroExplodedCanvas } from "./HeroExplodedCanvas";
import { HeroBubbles } from "./HeroBubbles";
import { HeroFloatingDecor } from "./HeroFloatingDecor";
import { HeroColorwaySelector } from "./HeroColorwaySelector";
import { HeroCursor } from "./HeroCursor";
import { ScrambleText } from "@/components/ui/scramble-text";

export function Hero() {
  const [activeWatch, setActiveWatch] = useState<WatchRecord>(HERO_COLORWAYS[0]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [spinDegrees, setSpinDegrees] = useState(0);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 120);
    return () => clearTimeout(timer);
  }, []);

  // Coordinated Colorway Switch
  const handleSelectWatch = useCallback(
    (nextWatch: WatchRecord) => {
      if (isSwitching || nextWatch.id === activeWatch.id) return;

      setIsSwitching(true);

      // 1. Dispatch Soffit Background Palette Morph (1.5s ease in WebGL)
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("soffit:setPalette", {
            detail: nextWatch.palette,
          })
        );
        window.history.replaceState(null, "", `#colorway=${nextWatch.slug}`);
      }

      // 2. Watch Spin Phase 1: 0deg -> 360deg (600ms)
      const startTime = performance.now();
      const phase1Duration = 600;

      const stepPhase1 = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / phase1Duration);
        const eased = progress * progress;

        setSpinDegrees(eased * 360);

        if (progress < 1) {
          requestAnimationFrame(stepPhase1);
        } else {
          setActiveWatch(nextWatch);

          // Phase 2: 360deg -> 720deg (1400ms with back.out overshoot settle)
          const p2Start = performance.now();
          const p2Duration = 1400;

          const stepPhase2 = (p2Now: number) => {
            const p2Elapsed = p2Now - p2Start;
            const p2Progress = Math.min(1, p2Elapsed / p2Duration);

            const c1 = 0.7;
            const c3 = c1 + 1;
            const t = p2Progress - 1;
            const eased2 = 1 + c3 * Math.pow(t, 3) + c1 * Math.pow(t, 2);

            setSpinDegrees(360 + eased2 * 360);

            if (p2Progress < 1) {
              requestAnimationFrame(stepPhase2);
            } else {
              setSpinDegrees(0);
              setIsSwitching(false);
            }
          };

          requestAnimationFrame(stepPhase2);
        }
      };

      requestAnimationFrame(stepPhase1);
    },
    [activeWatch.id, isSwitching]
  );

  return (
    <section id="hero-section" className="relative w-full min-h-[180vh] md:min-h-[220vh]">
      {/* Sticky Fullscreen Viewport for Scrubbed Hero Experience */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Desktop Custom Cursor */}
        <HeroCursor />

        {/* Environmental Dive Bubbles */}
        <HeroBubbles />

        {/* Floating Horological Particles with Parallax & Pointer Repulsion */}
        <HeroFloatingDecor isSwitching={isSwitching} />

        {/* 3-Column Desktop Hero Layout */}
        <div className="relative z-20 w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full">
            
            {/* ================= LEFT COLUMN: EDITORIAL STATEMENT & CTA (30%) ================= */}
            <div
              className={`lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 transition-all duration-1000 ease-out ${
                isEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* Eyebrow with Precision Hairline & Scramble Text */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="h-px w-8 bg-[#0b0b14]/30" />
                <ScrambleText
                  duration={1.1}
                  speed={0.035}
                  scrambleOnHover={true}
                  className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#0b0b14]/70 uppercase cursor-default"
                >
                  AUTOMATIC PRECISION · DIVER SERIES
                </ScrambleText>
              </div>

              {/* Primary Headline: "Built for the Deep" */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.88] text-[#0b0b14] mb-5 sm:mb-6">
                <span className="block font-normal">Built for</span>
                <span className="block font-normal">
                  the{" "}
                  <span className="font-serif italic font-medium accent-gradient-text pr-2">
                    Deep
                  </span>
                </span>
              </h1>

              {/* Editorial Statement (<= 25 words) */}
              <p className="font-sans text-sm sm:text-base text-[#0b0b14]/75 max-w-[360px] leading-relaxed mb-8">
                Engineered for 200-meter hydrostatic pressure. Stainless steel case,
                rotary split-bezel, and high-visibility dial markers sealed for the abyss.
              </p>

              {/* Primary CTA Button with Scramble on Hover */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6 mb-8">
                <Link
                  href="#collection"
                  data-cursor="link"
                  className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-all duration-300 shadow-[0_8px_20px_rgba(11,11,20,0.18)]"
                >
                  <ScrambleText
                    duration={0.6}
                    speed={0.025}
                    scrambleOnHover={true}
                    className="font-mono text-xs font-semibold tracking-wider uppercase"
                  >
                    Explore the collection
                  </ScrambleText>
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </Link>
              </div>

              {/* Bottom-left WR 200M Certified Badge with Scramble */}
              <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-white/45 backdrop-blur-md border border-white/70 shadow-sm max-w-fit cursor-default group">
                <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-[#2a4bd7]/10 text-[#2a4bd7] group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <ScrambleText
                    duration={0.6}
                    speed={0.03}
                    scrambleOnHover={true}
                    className="font-display text-base font-bold tracking-tight text-[#0b0b14] leading-tight"
                  >
                    WR 200M
                  </ScrambleText>
                  <span className="font-mono text-[9px] font-semibold tracking-wider text-[#0b0b14]/60 uppercase">
                    WATER RESISTANT
                  </span>
                </div>
              </div>
            </div>

            {/* ================= CENTER COLUMN: INTERACTIVE 3D EXPLODED WATCH (44%) ================= */}
            <div
              className={`lg:col-span-5 relative flex items-center justify-center h-[460px] sm:h-[540px] md:h-[620px] lg:h-[720px] order-1 lg:order-2 transition-all duration-1000 delay-150 ease-out ${
                isEntered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <HeroExplodedCanvas
                activeWatch={activeWatch}
                isSwitching={isSwitching}
                spinDegrees={spinDegrees}
              />
            </div>

          {/* ================= RIGHT COLUMN: COLORWAY SELECTOR & SECONDARY HEADLINE (26%) ================= */}
          <div
            className={`lg:col-span-3 flex flex-col justify-center order-3 transition-all duration-1000 delay-300 ease-out ${
              isEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <HeroColorwaySelector
              watches={HERO_COLORWAYS}
              activeWatch={activeWatch}
              onSelectWatch={handleSelectWatch}
              isSwitching={isSwitching}
            />
          </div>

          </div>
        </div>
      </div>
    </section>
  );
}
