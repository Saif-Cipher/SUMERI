"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WATCH_CATALOG, WatchRecord, CraftDetailItem, getWatchCraftDetails } from "@/data/watch-data";
import { ScrambleText } from "@/components/ui/scramble-text";
import { Layers, Shield, Sparkles, Clock, Droplets, Compass, CheckCircle2, ChevronRight } from "lucide-react";

// Featured watches available for the Craft Cascade showcase
const CRAFT_FEATURED_WATCHES = [
  WATCH_CATALOG.find((w) => w.id === "02-edifice-carbon") || WATCH_CATALOG[1], // Casio Edifice Forged Carbon
  WATCH_CATALOG.find((w) => w.id === "08-timex-marlin-gmt") || WATCH_CATALOG[7], // Timex Marlin GMT
  WATCH_CATALOG.find((w) => w.id === "03-victorinox-alliance") || WATCH_CATALOG[2], // Victorinox Alliance
  WATCH_CATALOG.find((w) => w.id === "12-titan-ceramic") || WATCH_CATALOG[11], // Titan Stealth Ceramic
];

export function CraftSection() {
  const [selectedWatch, setSelectedWatch] = useState<WatchRecord>(CRAFT_FEATURED_WATCHES[0]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(2); // Center card active by default
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  const craftDetails = getWatchCraftDetails(selectedWatch);
  const activeDetail = craftDetails[activeCardIndex] || craftDetails[2];

  // Dynamic Card Cascade Stagger calculations
  const getCardTransform = (index: number) => {
    const isCenter = index === 2;
    const diff = index - 2; // -2, -1, 0, 1, 2

    // When hovered or mobile expanded: cards fan outward horizontally & vertically with rotation
    if (isHovered || mobileExpanded) {
      return {
        x: diff * 85,
        y: Math.abs(diff) * 16 - 8,
        rotate: diff * 5,
        scale: index === activeCardIndex ? 1.05 : 0.96,
        zIndex: index === activeCardIndex ? 30 : 20 - Math.abs(diff),
      };
    }

    // Idle stacked state: tightly overlapping deck
    return {
      x: diff * 22,
      y: Math.abs(diff) * 10,
      rotate: diff * 2.5,
      scale: isCenter ? 1.0 : 0.95 - Math.abs(diff) * 0.03,
      zIndex: 20 - Math.abs(diff),
    };
  };

  return (
    <section
      id="craft"
      className="relative z-20 py-28 sm:py-36 px-6 sm:px-10 lg:px-14 border-t border-[#0b0b14]/5 dark:border-white/5 transition-colors overflow-hidden"
    >
      <div className="max-w-[1560px] mx-auto">
        
        {/* Section Header with Product Selector Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#0b0b14]/30 dark:bg-white/30" />
              <ScrambleText
                duration={0.8}
                speed={0.03}
                scrambleOnHover={true}
                className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 dark:text-white/70 uppercase cursor-default"
              >
                WATCH CRAFT & HOROLOGY · 03
              </ScrambleText>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0b0b14] dark:text-white leading-[0.95] transition-colors">
              Artisanal{" "}
              <span className="font-serif italic font-medium accent-gradient-text">
                Metallurgy.
              </span>
            </h2>
          </div>

          {/* Model Switcher Pill Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[#0b0b14]/50 dark:text-white/50 uppercase mr-1 hidden sm:inline-block">
              SELECT CHASSIS:
            </span>
            {CRAFT_FEATURED_WATCHES.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  setSelectedWatch(w);
                  setActiveCardIndex(2);
                }}
                data-cursor="link"
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedWatch.id === w.id
                    ? "bg-[#0b0b14] dark:bg-[#1f1f7d] text-white shadow-sm ring-1 ring-white/20"
                    : "bg-white/50 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.12] text-[#0b0b14]/70 dark:text-white/70 border border-white/80 dark:border-white/10"
                }`}
              >
                {w.model}
              </button>
            ))}
          </div>
        </div>

        {/* Main Craft Interactive Stagger Cascade Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Contextual Horological Narrative */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#0b0b14]/60 dark:text-white/60 uppercase">
                {selectedWatch.brand}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#0b0b14]/30 dark:bg-white/30" />
              <span className="font-mono text-xs font-bold text-[#2a4bd7] dark:text-[#3b82f6] uppercase">
                {selectedWatch.category}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0b0b14] dark:text-white tracking-tight mb-3">
              {selectedWatch.name}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#0b0b14]/75 dark:text-white/75 leading-relaxed mb-6">
              {selectedWatch.description}
            </p>

            {/* Active Highlight Detail Callout Box */}
            <div className="p-5 rounded-2xl bg-white/60 dark:bg-[#0d1a41]/80 border border-white/80 dark:border-white/10 shadow-sm backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold text-[#2a4bd7] dark:text-[#3b82f6] tracking-widest uppercase">
                  {activeDetail.num} // {activeDetail.category}
                </span>
                <span className="font-mono text-[10px] text-[#0b0b14]/50 dark:text-white/50">
                  ACTIVE FOCUS
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-[#0b0b14] dark:text-white mb-1">
                {activeDetail.title}
              </h4>
              <p className="font-sans text-xs text-[#0b0b14]/75 dark:text-white/75 leading-snug">
                {activeDetail.description}
              </p>
            </div>

            {/* Mobile Touch Guidance Tip */}
            <div className="mt-4 lg:hidden text-center">
              <span className="font-mono text-[10px] text-[#0b0b14]/60 dark:text-white/60 uppercase tracking-widest">
                {mobileExpanded ? "TAP ANY CARD TO FOCUS DETAIL" : "TAP STACK TO CASCADE CRAFT CARDS"}
              </span>
            </div>
          </div>

          {/* RIGHT / CENTER: 5-Card Staggered Cascade Deck */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[520px] relative">
            
            {/* Cascade Deck Interactive Container */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setMobileExpanded((prev) => !prev)}
              className="relative w-full max-w-[700px] h-[380px] sm:h-[440px] flex items-center justify-center cursor-pointer select-none"
            >
              {craftDetails.map((detail, idx) => {
                const transform = getCardTransform(idx);
                const isActive = idx === activeCardIndex;

                return (
                  <motion.div
                    key={detail.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCardIndex(idx);
                      setMobileExpanded(true);
                    }}
                    initial={false}
                    animate={{
                      x: transform.x,
                      y: transform.y,
                      rotate: transform.rotate,
                      scale: transform.scale,
                      zIndex: transform.zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 22,
                      mass: 0.85,
                    }}
                    whileHover={{
                      scale: 1.08,
                      transition: { duration: 0.2 },
                    }}
                    className={`absolute w-[180px] sm:w-[220px] h-[280px] sm:h-[340px] rounded-[24px] p-4 sm:p-5 flex flex-col justify-between transition-colors shadow-[0_15px_35px_rgba(11,11,20,0.12)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.6)] border backdrop-blur-2xl ${
                      isActive
                        ? "bg-white/95 dark:bg-[#181819]/95 border-[#2a4bd7] dark:border-[#3b82f6] ring-2 ring-[#2a4bd7]/30 dark:ring-[#3b82f6]/40"
                        : "bg-white/75 dark:bg-[#0d1a41]/85 border-white/90 dark:border-white/15"
                    }`}
                  >
                    {/* Card Top: Number & Category Badge */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-[10px] font-bold text-[#2a4bd7] dark:text-[#3b82f6] tracking-wider">
                        {detail.num}
                      </span>
                      <span className="font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase bg-white/80 dark:bg-white/10 text-[#0b0b14] dark:text-white border border-white/60 dark:border-white/10">
                        {detail.category}
                      </span>
                    </div>

                    {/* Card Center: Focused Crop of Real Watch Asset */}
                    <div className="relative w-full h-[140px] sm:h-[180px] overflow-hidden rounded-xl bg-white/40 dark:bg-black/20 my-auto flex items-center justify-center border border-white/50 dark:border-white/5">
                      <div
                        className="relative w-full h-full flex items-center justify-center transition-transform duration-500 will-change-transform pointer-events-none"
                        style={{
                          transformOrigin: `${detail.focusArea.x}% ${detail.focusArea.y}%`,
                          transform: `scale(${detail.focusArea.scale})`,
                        }}
                      >
                        <Image
                          src={selectedWatch.image}
                          alt={`${selectedWatch.name} ${detail.category}`}
                          fill
                          sizes="240px"
                          unoptimized
                          className="object-contain select-none drop-shadow-[0_10px_20px_rgba(11,11,20,0.15)]"
                        />
                      </div>
                    </div>

                    {/* Card Bottom: Concise Title & 1-line description */}
                    <div className="w-full pt-2 border-t border-[#0b0b14]/5 dark:border-white/10">
                      <h5 className="font-display text-sm sm:text-base font-bold text-[#0b0b14] dark:text-white leading-tight truncate">
                        {detail.title}
                      </h5>
                      <p className="font-sans text-[10px] sm:text-xs text-[#0b0b14]/70 dark:text-white/70 leading-snug line-clamp-2 mt-0.5">
                        {detail.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Interaction Prompt */}
            <div className="mt-8 hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#0b0b14]/50 dark:text-white/50 uppercase">
              <span>HOVER TO CASCADE</span>
              <span>·</span>
              <span>CLICK CARD TO FOCUS DETAIL</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CraftSection;
