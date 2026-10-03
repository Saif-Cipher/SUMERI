"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Droplets } from "lucide-react";
import { WATCH_CATALOG } from "@/data/watch-data";
import { ScrambleText } from "@/components/ui/scramble-text";

// Second distinct watch from catalog: Citizen Zenshin 60 Super Titanium NK5020-58P
const CITIZEN_ZENSHIN = WATCH_CATALOG.find((w) => w.id === "04-citizen-zenshin") || WATCH_CATALOG[3];

const ENGINEERING_STEPS = [
  {
    step: "01",
    title: "Super Titanium™ Monobloc Chassis",
    subtitle: "AEROSPACE CHASSIS",
    description:
      "Engineered from solid aerospace-grade Super Titanium™ treated with proprietary Duratect surface-hardening technology, achieving 5× the hardness of stainless steel with 40% less mass.",
    icon: Shield,
    stat: "40% Lighter",
    statLabel: "5X STEEL HARDNESS",
    transformFocus: "scale(1.16) translateY(-10px)",
  },
  {
    step: "02",
    title: "Anti-Reflective Sapphire Crystal",
    subtitle: "OPTICAL DEFENSE",
    description:
      "High-density scratch-resistant sapphire crystal seated flush into the titanium bezel rim, engineered for exceptional light transmission and uncompromised dial legibility in direct sunlight.",
    icon: Sparkles,
    stat: "99.6%",
    statLabel: "OPTICAL CLARITY",
    transformFocus: "scale(1.22) rotate(3deg)",
  },
  {
    step: "03",
    title: "Copper Sunburst & Small Seconds",
    subtitle: "TEXTURED DIAL CRAFT",
    description:
      "Radiating copper guilloché dial with offset small-seconds sub-register at 4:30 and faceted luminous indices, driven by Citizen's in-house 60-hour Caliber 8322 automatic movement.",
    icon: Clock,
    stat: "60 Hours",
    statLabel: "CAL. 8322 POWER RESERVE",
    transformFocus: "scale(1.25) translateY(12px)",
  },
  {
    step: "04",
    title: "100M Hydrostatic Pressure Chamber",
    subtitle: "INTEGRATED CHASSIS",
    description:
      "Precision-milled titanium case architecture and sealed crown assembly factory pressure-tested to 10 Bar (100 meters / 330 feet) for high-impact durability and all-terrain reliability.",
    icon: Droplets,
    stat: "10 BAR",
    statLabel: "HYDROSTATIC RATING",
    transformFocus: "scale(1.12) rotate(-3deg)",
  },
];

export function EngineeringArchitecture() {
  const [activeStep, setActiveStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle mouse parallax tilt (damping LERP)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x: x * 8, y: y * -8 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="engineering"
      className="relative z-20 py-28 sm:py-36 px-6 sm:px-10 lg:px-14 border-t border-[#0b0b14]/5 transition-colors"
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
                ENGINEERING ARCHITECTURE · 02
              </ScrambleText>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0b0b14] leading-[0.95] transition-colors">
              Tensile{" "}
              <span className="font-serif italic font-medium accent-gradient-text">
                Monolith.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-[#0b0b14]/70 max-w-sm leading-relaxed transition-colors">
            Every component is audited for tensile resilience and hydrostatic endurance.
            Explore the structural engineering of the Citizen Super Titanium™ collection.
          </p>
        </div>

        {/* 2-Column Engineering Architecture Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Numbered Engineering Specification Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {ENGINEERING_STEPS.map((s, idx) => {
              const isSelected = idx === activeStep;
              const Icon = s.icon;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 sm:p-7 rounded-[24px] transition-all duration-300 border flex flex-col gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-white/90 border-[#2a4bd7] shadow-[0_12px_30px_rgba(42,75,215,0.12)] ring-1 ring-[#2a4bd7]/20"
                      : "bg-white/45 hover:bg-white/70 border-white/80"
                  }`}
                  data-cursor="link"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#2a4bd7]">
                      {s.step} // {s.subtitle}
                    </span>
                    <Icon className="w-4 h-4 text-[#0b0b14]/50" />
                  </div>

                  <span className="font-display text-xl sm:text-2xl text-[#0b0b14] font-medium leading-tight transition-colors">
                    {s.title}
                  </span>

                  {isSelected && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-sans text-xs sm:text-sm text-[#0b0b14]/75 mt-2 leading-relaxed"
                    >
                      {s.description}
                    </motion.p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Large Watch Presentation Panel with Subtle Parallax & Technical Stat Overlay */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px] rounded-[32px] p-8 sm:p-12 overflow-hidden border border-white/80 bg-white/40 backdrop-blur-2xl transition-colors select-none"
          >
            {/* Top Reference Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold tracking-wider px-3 py-1 rounded-full bg-white/80 border border-white text-[#0b0b14] backdrop-blur-md shadow-sm">
                CITIZEN ZENSHIN 60 · NK5020-58P
              </span>
              <span className="font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase bg-[#c25e2e]/15 text-[#c25e2e] border border-[#c25e2e]/30 hidden sm:inline-block">
                SUPER TITANIUM™
              </span>
            </div>

            {/* Large Centered Floating Watch Cutout (No Batman Casio!) */}
            <motion.div
              animate={{
                rotateX: mousePos.y,
                rotateY: mousePos.x,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full max-w-[420px] h-[360px] sm:h-[440px] flex items-center justify-center will-change-transform pointer-events-none"
            >
              <Image
                src={CITIZEN_ZENSHIN.image}
                alt="Citizen Zenshin 60 Super Titanium Engineering"
                fill
                priority
                unoptimized
                sizes="500px"
                className="object-contain drop-shadow-[0_25px_45px_rgba(11,11,20,0.22)] transition-transform duration-700 select-none"
                style={{
                  transform: ENGINEERING_STEPS[activeStep].transformFocus,
                }}
              />
            </motion.div>

            {/* Floating Technical Stat Overlay */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[#0b0b14] text-white p-5 rounded-2xl shadow-xl flex flex-col max-w-[220px] border border-white/10 backdrop-blur-xl transition-colors">
              <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-none">
                {ENGINEERING_STEPS[activeStep].stat}
              </span>
              <span className="font-mono text-[9px] font-semibold tracking-widest text-[#2a4bd7] uppercase mt-1">
                {ENGINEERING_STEPS[activeStep].statLabel}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default EngineeringArchitecture;
