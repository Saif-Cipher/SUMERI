"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Compass, Sparkles } from "lucide-react";
import { WATERFALL_WATCHES, WatchRecord } from "@/data/watch-data";
import { ScrambleText } from "@/components/ui/scramble-text";

export function WaterfallShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pointerTilt, setPointerTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  const deckRef = useRef<HTMLDivElement>(null);

  const total = WATERFALL_WATCHES.length;
  const activeWatch: WatchRecord = WATERFALL_WATCHES[activeIndex] || WATERFALL_WATCHES[0];

  // Build timeline nodes (main nodes for watches, 2 sub-nodes between each)
  const timelineNodes = useMemo(() => {
    const nodes: { type: "main" | "sub"; index: number; watch?: WatchRecord }[] = [];
    WATERFALL_WATCHES.forEach((watch, i) => {
      nodes.push({ type: "main", index: i, watch });
      if (i < WATERFALL_WATCHES.length - 1) {
        for (let j = 0; j < 2; j++) {
          nodes.push({ type: "sub", index: i + (j + 1) * 0.33 });
        }
      }
    });
    return nodes;
  }, []);

  const handleTimelineHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleTimelineClick = (index: number) => {
    const target = Math.max(0, Math.min(total - 1, Math.round(index)));
    setActiveIndex(target);
  };

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Pointer interaction on active card
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!deckRef.current) return;
    const rect = deckRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    const MAX_TILT = 7;
    setPointerTilt({
      rx: -py * MAX_TILT,
      ry: px * MAX_TILT,
      glareX: ((e.clientX - rect.left) / rect.width) * 100,
      glareY: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handlePointerLeave = () => {
    setPointerTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  // Keyboard navigation when section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="collection"
      className="relative z-20 w-full min-h-[92vh] py-24 sm:py-32 px-6 sm:px-10 lg:px-14 flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* ================= LEFT COLUMN: EDITORIAL NARRATIVE & DYNAMIC SPECS ================= */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          {/* Section Eyebrow with Scramble */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#0b0b14]/30" />
            <ScrambleText
              duration={0.9}
              speed={0.03}
              scrambleOnHover={true}
              className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#0b0b14]/70 uppercase cursor-default"
            >
              COLLECTION · VOL. 01 · 7 RELEASES
            </ScrambleText>
          </div>

          {/* Section Headline */}
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#0b0b14] leading-[0.92] mb-5">
            The Kinetic{" "}
            <span className="font-serif italic font-medium accent-gradient-text">
              Waterfall.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="font-sans text-sm sm:text-base text-[#0b0b14]/75 max-w-md leading-relaxed mb-7">
            A physical descent into our signature seven references. Each timepiece is
            calibrated with enduring architectural geometry, sealed for hydrostatic tension, and finished with precision balance.
          </p>

          {/* Dynamic Active Watch Metadata Badge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/55 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(11,11,20,0.06)] max-w-md mb-8">
            <div className="flex items-center justify-between mb-3 border-b border-[#0b0b14]/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase"
                  style={{
                    backgroundColor: `${activeWatch.palette.accent}1a`,
                    color: activeWatch.palette.accent,
                  }}
                >
                  {activeWatch.category}
                </span>
                <span className="font-mono text-[10px] text-[#0b0b14]/50">
                  REF. {activeWatch.model}
                </span>
              </div>
              <span className="font-display text-base font-bold text-[#0b0b14]">
                {activeWatch.price}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="block font-mono text-[9px] font-semibold uppercase text-[#0b0b14]/45">
                  Water Resistance
                </span>
                <span className="font-sans text-xs font-medium text-[#0b0b14]">
                  {activeWatch.waterResistance}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] font-semibold uppercase text-[#0b0b14]/45">
                  Movement
                </span>
                <span className="font-sans text-xs font-medium text-[#0b0b14] truncate block">
                  {activeWatch.movement}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] font-semibold uppercase text-[#0b0b14]/45">
                  Crystal Glass
                </span>
                <span className="font-sans text-xs font-medium text-[#0b0b14]">
                  {activeWatch.crystal}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] font-semibold uppercase text-[#0b0b14]/45">
                  Case Architecture
                </span>
                <span className="font-sans text-xs font-medium text-[#0b0b14] truncate block">
                  {activeWatch.caseMaterial}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/watch/${activeWatch.slug}`}
              data-cursor="link"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-all duration-300 shadow-[0_8px_20px_rgba(11,11,20,0.18)]"
            >
              <ScrambleText
                duration={0.5}
                speed={0.025}
                scrambleOnHover={true}
                className="font-mono text-xs font-semibold tracking-wider uppercase"
              >
                Inspect Timepiece
              </ScrambleText>
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </Link>

            <Link
              href="/collection"
              data-cursor="link"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 text-[#0b0b14] font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              Full Catalog (15)
            </Link>
          </div>
        </div>

        {/* ================= CENTER COLUMN: 3D STACKED WATCH CAROUSEL ================= */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
          {/* Mobile Stepper Controls */}
          <div className="flex lg:hidden items-center justify-between w-full max-w-[380px] mb-4">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold text-[#0b0b14]">
                0{activeIndex + 1}
              </span>
              <span className="font-mono text-xs text-[#0b0b14]/50">
                / 0{total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous watch"
                className="flex items-center justify-center h-8 w-8 rounded-full bg-white/80 border border-white shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 text-[#0b0b14]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next watch"
                className="flex items-center justify-center h-8 w-8 rounded-full bg-white/80 border border-white shadow-sm"
              >
                <ChevronRight className="w-4 h-4 text-[#0b0b14]" />
              </button>
            </div>
          </div>

          {/* 3D Stack Stage */}
          <div
            ref={deckRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative w-full max-w-[380px] sm:max-w-[420px] h-[520px] sm:h-[560px] flex items-center justify-center select-none pt-12"
            style={{ perspective: "1200px" }}
          >
            {WATERFALL_WATCHES.map((watch, i) => {
              const offset = i - activeIndex;
              const isPast = offset < 0;
              const isActive = offset === 0;

              // Stack physics calculations:
              // Upcoming cards (offset > 0) fan upward and backward into depth
              // Past cards (offset < 0) fold forward/down and exit
              const targetZ = isPast ? 180 + offset * 60 : -offset * 85;
              const targetY = isPast ? 340 : -offset * 38;
              const targetRotateX = isPast ? -28 : offset * 2.8 + (isActive ? pointerTilt.rx : 0);
              const targetRotateY = isActive ? pointerTilt.ry : 0;
              const targetRotateZ = isPast ? -6 : (offset % 2 === 0 ? 1 : -1) * offset * 1.2;
              const targetScale = isPast ? 1.18 : Math.max(0.74, 1 - offset * 0.055);
              const targetOpacity = isPast ? 0 : Math.max(0, 1 - Math.abs(offset) * 0.18);
              const cardZIndex = total - Math.abs(offset);

              return (
                <motion.div
                  key={watch.id}
                  onClick={() => setActiveIndex(i)}
                  className={`absolute w-[320px] sm:w-[360px] h-[420px] sm:h-[460px] rounded-[28px] p-6 flex flex-col justify-between overflow-hidden border transition-shadow duration-300 ${
                    isActive
                      ? "bg-white/85 border-white/95 shadow-[0_30px_70px_rgba(11,11,20,0.18)] ring-1 ring-white/70"
                      : "bg-white/55 hover:bg-white/75 border-white/75 shadow-[0_15px_40px_rgba(11,11,20,0.08)] cursor-pointer"
                  }`}
                  style={{
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    zIndex: cardZIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={false}
                  animate={{
                    z: targetZ,
                    y: targetY,
                    rotateX: targetRotateX,
                    rotateY: targetRotateY,
                    rotateZ: targetRotateZ,
                    scale: targetScale,
                    opacity: targetOpacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                    mass: 0.75,
                  }}
                >
                  {/* Subtle Interactive Glare Overlay for Active Card */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[28px] transition-opacity duration-300 opacity-40"
                      style={{
                        background: `radial-gradient(circle at ${pointerTilt.glareX}% ${pointerTilt.glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                      }}
                    />
                  )}

                  {/* Card Header: Chapter Number & Category Pill */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-white/75 font-mono text-[10px] font-bold text-[#0b0b14] border border-white/90 shadow-sm">
                      CHAPTER 0{i + 1}
                    </span>
                    <span
                      className="font-mono text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${watch.palette.accent}14`,
                        color: watch.palette.accent,
                      }}
                    >
                      {watch.palette.tag || watch.category}
                    </span>
                  </div>

                  {/* Large High-Res Transparent Watch Image */}
                  <div className="relative my-auto h-[220px] sm:h-[250px] w-full flex items-center justify-center">
                    <div className="relative h-full w-full">
                      <Image
                        src={watch.image}
                        alt={watch.name}
                        fill
                        priority={i === 0}
                        sizes="360px"
                        className={`object-contain select-none transition-transform duration-500 drop-shadow-[0_20px_30px_rgba(11,11,20,0.22)] ${
                          isActive ? "scale-105" : "scale-95 opacity-90"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Card Bottom Meta: Model & Price */}
                  <div className="flex flex-col z-10 border-t border-[#0b0b14]/10 pt-3.5">
                    <span className="font-mono text-[9px] tracking-widest text-[#0b0b14]/50 uppercase mb-0.5">
                      {watch.brand} · {watch.waterResistance}
                    </span>
                    <div className="flex items-end justify-between">
                      <span className="font-display text-xl sm:text-2xl font-semibold text-[#0b0b14] leading-tight">
                        {watch.model}
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-[#0b0b14]">
                        {watch.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= FAR RIGHT: VERTICAL TIMELINE / PROGRESS RAIL ================= */}
        <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center gap-6 pl-4 border-l border-[#0b0b14]/15 order-3 lg:order-3">
          {/* Active / Total Counter */}
          <div className="flex items-baseline">
            <span className="font-display text-6xl font-bold text-[#0b0b14] leading-none">
              0{activeIndex + 1}
            </span>
            <span className="font-mono text-xs text-[#0b0b14]/40 font-semibold ml-1">
              /0{total}
            </span>
          </div>

          {/* Stepper Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous watch"
              data-cursor="link"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white/70 hover:bg-white border border-white/90 text-[#0b0b14] transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next watch"
              data-cursor="link"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white/70 hover:bg-white border border-white/90 text-[#0b0b14] transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Stacked Timeline Nodes */}
          <div
            className="relative flex flex-col items-end py-3 px-1 z-30"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {timelineNodes.map((node, idx) => {
              if (node.type === "main") {
                const index = node.index;
                const isSelected = activeIndex === index;
                const watch = node.watch;

                return (
                  <button
                    key={`main-${index}`}
                    data-timeline-node="true"
                    className="relative inline-flex items-center justify-end py-1.5 w-24 group cursor-pointer border-0 bg-transparent"
                    onMouseEnter={() => handleTimelineHover(index)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTimelineClick(index);
                    }}
                  >
                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {hoveredIndex === index && watch && (
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 right-12 z-50 px-2.5 py-1 rounded-md bg-[#0b0b14] text-white whitespace-nowrap shadow-lg flex flex-col items-end pointer-events-none"
                          initial={{ opacity: 0, x: 6, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 4, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span className="font-mono text-[9px] font-bold text-[#2a4bd7]">
                            0{index + 1} · {watch.model}
                          </span>
                          <span className="font-mono text-[8px] text-white/70">
                            {watch.price}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Node Bar with Spring Scaling */}
                    <motion.div
                      className={`h-[3px] rounded-full origin-right transition-colors ${
                        isSelected
                          ? "bg-[#2a4bd7] shadow-[0_0_8px_rgba(42,75,215,0.6)]"
                          : "bg-[#0b0b14]/30 group-hover:bg-[#0b0b14]/70"
                      }`}
                      animate={{
                        width: isSelected ? 32 : 18,
                        scaleX:
                          hoveredIndex === null
                            ? 1
                            : isSelected
                            ? 1.35
                            : Math.abs(index - hoveredIndex) < 0.6
                            ? 1.2
                            : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  </button>
                );
              } else {
                const isHoveringNear =
                  hoveredIndex !== null && Math.abs(node.index - hoveredIndex) <= 0.45;

                return (
                  <div
                    key={`sub-${node.index}`}
                    data-timeline-node="true"
                    className="py-[2px] w-24 flex justify-end cursor-pointer"
                    onMouseEnter={() => handleTimelineHover(node.index)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTimelineClick(node.index);
                    }}
                  >
                    <motion.div
                      className="h-[2px] rounded-full bg-[#0b0b14]/20 origin-right"
                      animate={{
                        width: 10,
                        scaleX: hoveredIndex === null ? 1 : isHoveringNear ? 1.4 : 1,
                        opacity: hoveredIndex === null ? 0.35 : isHoveringNear ? 0.75 : 0.35,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  </div>
                );
              }
            })}
          </div>

          {/* Active Model Name Vertical Label */}
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#0b0b14]/65 uppercase whitespace-nowrap mt-2"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {activeWatch.model}
          </span>
        </div>

      </div>
    </section>
  );
}
