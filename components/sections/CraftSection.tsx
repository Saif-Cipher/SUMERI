"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PREMIUM_CRAFT_WATCHES,
  WatchRecord,
  getWatchCraftProfile,
} from "@/data/watch-data";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ArrowRight, ShieldCheck, Sparkles, Layers, ArrowUpRight } from "lucide-react";

export function CraftSection() {
  // Default selection: Titan 1841NC01 (top-priced watch in catalog)
  const [selectedWatch, setSelectedWatch] = useState<WatchRecord>(PREMIUM_CRAFT_WATCHES[0]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isStackHovered, setIsStackHovered] = useState<boolean>(false);

  const selectedIndex = PREMIUM_CRAFT_WATCHES.findIndex((w) => w.id === selectedWatch.id);
  const activeProfile = getWatchCraftProfile(selectedWatch);

  // Dynamic Card Cascade Stagger calculations based on CardCascadeStagger physics
  const getCardTransform = (index: number) => {
    const isSelected = selectedWatch.id === PREMIUM_CRAFT_WATCHES[index].id;
    const isCardHovered = hoveredCardIndex === index;
    const diff = index - 2; // -2, -1, 0, 1, 2 from center

    // When deck is hovered: fan cards outward horizontally & vertically with slight rotation
    if (isStackHovered) {
      return {
        x: diff * 115,
        y: Math.abs(diff) * 18 - 8,
        rotate: diff * 4.5,
        scale: isCardHovered ? 1.06 : isSelected ? 1.02 : 0.96,
        zIndex: isCardHovered ? 40 : isSelected ? 30 : 20 - Math.abs(diff),
      };
    }

    // Idle stacked composition: gracefully overlapping deck
    return {
      x: diff * 28,
      y: Math.abs(diff) * 12,
      rotate: diff * 2.5,
      scale: isSelected ? 1.04 : 0.95 - Math.abs(diff) * 0.02,
      zIndex: isSelected ? 30 : 20 - Math.abs(diff),
    };
  };

  return (
    <section
      id="craft"
      className="relative z-20 py-28 sm:py-36 px-6 sm:px-10 lg:px-14 border-t border-[#0b0b14]/5 transition-colors overflow-hidden"
    >
      <div className="max-w-[1560px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#0b0b14]/30" />
              <ScrambleText
                duration={0.8}
                speed={0.03}
                scrambleOnHover={true}
                className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase cursor-default"
              >
                WATCH CRAFT & HOROLOGY · 03
              </ScrambleText>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0b0b14] leading-[0.95]">
              Artisanal{" "}
              <span className="font-serif italic font-medium accent-gradient-text">
                Metallurgy.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-[#0b0b14]/70 max-w-sm leading-relaxed">
            Select from the five pinnacle horological references in our archive to examine
            their structural architecture, proprietary alloys, and caliber finishing.
          </p>
        </div>

        {/* 2-Column Editorial Grid: Left 5-Card Staggered Fan Deck / Right Selected Watch Craft Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT / PRIMARY: 5-CARD WATCH CASCADE DECK ================= */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Staggered Interactive Cascade Deck */}
            <div
              onMouseEnter={() => setIsStackHovered(true)}
              onMouseLeave={() => {
                setIsStackHovered(false);
                setHoveredCardIndex(null);
              }}
              className="relative w-full max-w-[620px] h-[400px] sm:h-[480px] flex items-center justify-center cursor-pointer select-none"
            >
              {PREMIUM_CRAFT_WATCHES.map((watch, idx) => {
                const isSelected = selectedWatch.id === watch.id;
                const transform = getCardTransform(idx);

                return (
                  <motion.div
                    key={watch.id}
                    onClick={() => setSelectedWatch(watch)}
                    onMouseEnter={() => setHoveredCardIndex(idx)}
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
                      stiffness: 200,
                      damping: 22,
                      mass: 0.9,
                    }}
                    className={`absolute w-[180px] sm:w-[210px] h-[290px] sm:h-[360px] rounded-[26px] p-4 sm:p-5 flex flex-col justify-between transition-colors shadow-[0_18px_35px_rgba(11,11,20,0.12)] border backdrop-blur-2xl ${
                      isSelected
                        ? "bg-white/95 border-[#2a4bd7] ring-2 ring-[#2a4bd7]/30 shadow-[0_20px_45px_rgba(42,75,215,0.18)]"
                        : "bg-white/75 hover:bg-white/90 border-white/90"
                    }`}
                  >
                    {/* Card Top: Sequential Index & Category Badge */}
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-[10px] font-bold text-[#2a4bd7] tracking-wider">
                        0{idx + 1} / 05
                      </span>
                      <span className="font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase bg-white/85 text-[#0b0b14] border border-white/70 shadow-2xs">
                        {watch.category}
                      </span>
                    </div>

                    {/* Card Center: ONE COMPLETE, UNBROKEN FULL WATCH */}
                    <div className="relative w-full h-[150px] sm:h-[200px] my-auto flex items-center justify-center py-2">
                      <Image
                        src={watch.image}
                        alt={`${watch.brand} ${watch.model}`}
                        fill
                        unoptimized
                        sizes="260px"
                        className="object-contain select-none drop-shadow-[0_12px_22px_rgba(11,11,20,0.18)] transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Card Bottom: Brand, Model, Price */}
                    <div className="w-full pt-2 border-t border-[#0b0b14]/10 flex flex-col">
                      <span className="font-mono text-[9px] font-semibold text-[#0b0b14]/55 uppercase tracking-wider">
                        {watch.brand}
                      </span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="font-display text-sm sm:text-base font-bold text-[#0b0b14] truncate max-w-[110px]">
                          {watch.model}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#2a4bd7]">
                          {watch.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Interaction Prompt */}
            <div className="mt-6 hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#0b0b14]/50 uppercase">
              <span>HOVER TO SPREAD</span>
              <span>·</span>
              <span>CLICK TO SELECT WATCH</span>
            </div>

            {/* Mobile Touch Stepper Indicator */}
            <div className="mt-4 flex sm:hidden items-center gap-2">
              {PREMIUM_CRAFT_WATCHES.map((w, idx) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedWatch(w)}
                  className={`h-2 rounded-full transition-all ${
                    selectedWatch.id === w.id ? "w-6 bg-[#2a4bd7]" : "w-2 bg-[#0b0b14]/20"
                  }`}
                  aria-label={`Select ${w.model}`}
                />
              ))}
            </div>

          </div>

          {/* ================= RIGHT: SELECTED WATCH CRAFT SPECIFICATION PANEL ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWatch.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col"
              >
                {/* Reference Eyebrow */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#0b0b14]/60 uppercase">
                    REFERENCE 0{selectedIndex + 1}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#0b0b14]/30" />
                  <span className="font-mono text-xs font-bold text-[#2a4bd7] uppercase">
                    {selectedWatch.brand}
                  </span>
                </div>

                {/* Model Title & Price */}
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#0b0b14] tracking-tight">
                    {selectedWatch.model}
                  </h3>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#2a4bd7]">
                    {selectedWatch.price}
                  </span>
                </div>

                {/* Craft Headline & Summary */}
                <h4 className="font-sans text-sm font-semibold text-[#0b0b14]/90 mb-2">
                  {activeProfile.headline}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#0b0b14]/70 leading-relaxed mb-6">
                  {activeProfile.summary}
                </p>

                {/* 3-4 Concise Craft Specification Items */}
                <div className="flex flex-col gap-3 mb-8">
                  {activeProfile.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/60 border border-white/90 shadow-2xs backdrop-blur-md flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold text-[#2a4bd7] tracking-wider uppercase">
                          {spec.label}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-[#0b0b14]">
                          {spec.value}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] sm:text-xs text-[#0b0b14]/75 leading-snug">
                        {spec.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action Route to Full Spec Details */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/watch/${selectedWatch.slug}`}
                    data-cursor="link"
                    className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-all duration-300 shadow-sm font-mono text-xs font-semibold tracking-wider uppercase"
                  >
                    <span>Inspect Archive</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/collection"
                    data-cursor="link"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/70 hover:bg-white border border-white text-[#0b0b14] font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-2xs"
                  >
                    <span>All 15 Models</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0b0b14]/50" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CraftSection;
