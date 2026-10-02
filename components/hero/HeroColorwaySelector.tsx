"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WatchRecord } from "@/data/watch-data";
import { ScrambleText } from "@/components/ui/scramble-text";

interface HeroColorwaySelectorProps {
  watches: WatchRecord[];
  activeWatch: WatchRecord;
  onSelectWatch: (watch: WatchRecord) => void;
  isSwitching: boolean;
}

export function HeroColorwaySelector({
  watches,
  activeWatch,
  onSelectWatch,
  isSwitching,
}: HeroColorwaySelectorProps) {
  const currentIndex = watches.findIndex((w) => w.id === activeWatch.id);

  const handlePrev = () => {
    if (isSwitching) return;
    const prevIndex = (currentIndex - 1 + watches.length) % watches.length;
    onSelectWatch(watches[prevIndex]);
  };

  const handleNext = () => {
    if (isSwitching) return;
    const nextIndex = (currentIndex + 1) % watches.length;
    onSelectWatch(watches[nextIndex]);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Secondary Right-side Headline & Carousel Controls */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <ScrambleText
            duration={0.8}
            speed={0.03}
            scrambleOnHover={true}
            className="font-mono text-[10px] tracking-[0.25em] text-[#0b0b14]/55 uppercase cursor-default"
          >
            CALIBER ARCHITECTURE
          </ScrambleText>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#0b0b14] leading-[0.95]">
            Precision,{" "}
            <span className="font-serif italic font-normal text-[#2a4bd7]">
              Sealed
            </span>
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-1.5 pb-1">
          <button
            onClick={handlePrev}
            disabled={isSwitching}
            aria-label="Previous watch colorway"
            data-cursor="link"
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 text-[#0b0b14] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={isSwitching}
            aria-label="Next watch colorway"
            data-cursor="link"
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 text-[#0b0b14] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Colorway Cards List */}
      <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
        {watches.map((watch) => {
          const isActive = watch.id === activeWatch.id;

          return (
            <button
              key={watch.id}
              onClick={() => {
                if (!isActive && !isSwitching) {
                  onSelectWatch(watch);
                }
              }}
              disabled={isSwitching}
              data-cursor="link"
              className={`group relative flex items-center justify-between text-left p-3.5 sm:p-4 rounded-[20px] transition-all duration-300 w-full min-w-[240px] sm:min-w-[280px] lg:min-w-0 ${
                isActive
                  ? "bg-white/80 border-2 border-[#2a4bd7] shadow-[0_12px_30px_rgba(42,75,215,0.15)] ring-1 ring-[#2a4bd7]/20"
                  : "bg-white/45 hover:bg-white/70 border border-white/80 hover:border-[#2a4bd7]/40 shadow-[0_4px_20px_rgba(11,11,20,0.04)]"
              } ${isSwitching ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
            >
              {/* Left Details */}
              <div className="flex flex-col pr-3 z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: isActive ? "rgba(42, 75, 215, 0.12)" : "rgba(11, 11, 20, 0.06)",
                      color: isActive ? "#2a4bd7" : "#0b0b14",
                    }}
                  >
                    {watch.palette.tag}
                  </span>
                  <span className="font-mono text-[9px] text-[#0b0b14]/50">
                    {watch.waterResistance}
                  </span>
                </div>

                <ScrambleText
                  duration={0.5}
                  speed={0.02}
                  scrambleOnHover={true}
                  trigger={isActive}
                  className="font-display text-base sm:text-lg text-[#0b0b14] leading-tight font-medium"
                >
                  {watch.model}
                </ScrambleText>

                <span className="font-mono text-xs font-semibold text-[#0b0b14]/80 mt-1">
                  {watch.price}
                </span>
              </div>

              {/* Right Watch Thumbnail with Hover Pop (translateY(-30px) rotate(-12deg) scale(1.15)) */}
              <div className="relative h-16 w-14 sm:h-20 sm:w-16 flex-shrink-0">
                <div className="absolute inset-0 transition-transform duration-300 ease-spring group-hover:translate-y-[-30px] group-hover:rotate-[-12deg] group-hover:scale-115">
                  <Image
                    src={watch.image}
                    alt={watch.name}
                    fill
                    sizes="80px"
                    className="object-contain drop-shadow-[0_10px_15px_rgba(11,11,20,0.18)]"
                  />
                </div>
              </div>

              {/* Active Pip Indicator */}
              {isActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-5 w-1.5 rounded-r-full bg-[#2a4bd7]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Micro-specs validation footnote */}
      <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#0b0b14]/45 pt-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2a4bd7]/60" />
        <span>CERTIFIED 200M HYDROSTATIC PRESSURE SEAL</span>
      </div>
    </div>
  );
}
