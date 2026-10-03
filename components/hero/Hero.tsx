"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Droplets } from "lucide-react";
import { HERO_COLORWAYS, WatchRecord } from "@/data/watch-data";
import { HeroFloatingWatch } from "./HeroFloatingWatch";
import { HeroBubbles } from "./HeroBubbles";
import { HeroFloatingDecor } from "./HeroFloatingDecor";
import { HeroColorwaySelector } from "./HeroColorwaySelector";
import { HeroCursor } from "./HeroCursor";
import { ScrambleText } from "@/components/ui/scramble-text";

/** "200M (20 ATM)" → { depth: "200M", atm: "20 ATM" } — derived from catalog data, never invented. */
function splitWaterResistance(value: string) {
  const match = value.match(/^(\S+)\s*\(([^)]+)\)/);
  return match ? { depth: match[1], atm: match[2] } : { depth: value, atm: "" };
}

export function Hero() {
  const [activeWatch, setActiveWatch] = useState<WatchRecord>(HERO_COLORWAYS[0]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 120);
    return () => clearTimeout(timer);
  }, []);

  // Card click → background palette morph + center watch morph (HeroFloatingWatch owns the motion).
  const handleSelectWatch = useCallback(
    (nextWatch: WatchRecord) => {
      if (isSwitching || nextWatch.id === activeWatch.id) return;

      setIsSwitching(true);

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("soffit:setPalette", {
            detail: nextWatch.palette,
          })
        );
        window.history.replaceState(null, "", `#colorway=${nextWatch.slug}`);
      }

      setActiveWatch(nextWatch);
    },
    [activeWatch.id, isSwitching]
  );

  const handleMorphComplete = useCallback(() => setIsSwitching(false), []);

  const wr = splitWaterResistance(activeWatch.waterResistance);
  const accent = activeWatch.palette.accent;

  return (
    <section id="hero-section" className="relative w-full">
      <div className="relative w-full min-h-screen lg:h-screen lg:min-h-[760px] overflow-hidden flex items-center justify-center pt-28 pb-16 lg:py-0">
        {/* Desktop Custom Cursor */}
        <HeroCursor />

        {/* Environmental Dive Bubbles */}
        <HeroBubbles />

        {/* Floating Horological Particles with Parallax & Pointer Repulsion */}
        <HeroFloatingDecor isSwitching={isSwitching} />

        {/* 3-Column Desktop Hero Layout */}
        <div className="relative z-20 w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full">

            {/* ================= LEFT COLUMN: EDITORIAL STATEMENT & CTA ================= */}
            <div
              className={`lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 relative z-10 transition-all duration-1000 ease-out ${
                isEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* Eyebrow with Precision Hairline & Scramble Text — follows the selected watch */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="h-px w-8 bg-[#0b0b14]/30" />
                <ScrambleText
                  duration={0.9}
                  speed={0.03}
                  scrambleOnHover={true}
                  className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#0b0b14]/70 uppercase cursor-default"
                >
                  {`${activeWatch.category} · ${activeWatch.brand} · ${activeWatch.model}`}
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

              {/* Editorial Statement — catalog description of the selected watch */}
              <p
                key={activeWatch.id}
                className="sumeri-meta-in font-sans text-sm sm:text-base text-[#0b0b14]/75 max-w-[360px] leading-relaxed mb-8 min-h-[4.5rem]"
              >
                {activeWatch.description}
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

              {/* Technical badge — water resistance of the selected watch */}
              <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-white/45 backdrop-blur-md border border-white/70 shadow-sm max-w-fit cursor-default group">
                <div
                  className="flex items-center justify-center h-9 w-9 rounded-xl group-hover:scale-110 transition-all duration-500"
                  style={{ backgroundColor: `${accent}1a`, color: accent }}
                >
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <ScrambleText
                    duration={0.6}
                    speed={0.03}
                    scrambleOnHover={true}
                    className="font-display text-base font-bold tracking-tight text-[#0b0b14] leading-tight"
                  >
                    {`WR ${wr.depth}`}
                  </ScrambleText>
                  <span className="font-mono text-[9px] font-semibold tracking-wider text-[#0b0b14]/60 uppercase">
                    {wr.atm ? `WATER RESISTANT · ${wr.atm}` : "WATER RESISTANT"}
                  </span>
                </div>
              </div>
            </div>

            {/* ================= CENTER COLUMN: LARGE FLOATING PRODUCT WATCH ================= */}
            <div
              className={`lg:col-span-5 relative z-0 flex items-center justify-center h-[min(104vw,560px)] sm:h-[620px] md:h-[680px] lg:h-[min(86vh,800px)] order-1 lg:order-2 transition-all duration-1000 delay-150 ease-out ${
                isEntered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <HeroFloatingWatch
                watches={HERO_COLORWAYS}
                activeId={activeWatch.id}
                onMorphComplete={handleMorphComplete}
              />
            </div>

            {/* ================= RIGHT COLUMN: THREE-WATCH SELECTOR ================= */}
            <div
              className={`lg:col-span-3 flex flex-col justify-center order-3 relative z-10 transition-all duration-1000 delay-300 ease-out ${
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
