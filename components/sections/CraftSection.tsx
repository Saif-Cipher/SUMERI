"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Compass, Sparkles, Anchor } from "lucide-react";

const CRAFT_STEPS = [
  {
    step: "01",
    title: "Unidirectional Rotary Bezel",
    subtitle: "DIVER'S NAVIGATION RING",
    description:
      "Precision 60-click ratcheting bezel with dual-tone black and royal blue split insert. Machined from anodized aluminum with luminous 12-o'clock alignment pip for elapsed dive time tracking.",
    icon: Compass,
    stat: "60 Clicks",
    statLabel: "RATCHETING DETENTS",
  },
  {
    step: "02",
    title: "Anti-Reflective Crystal",
    subtitle: "HIGH-IMPACT DEFENSE",
    description:
      "Hardened crystal glass seated within a high-density steel rim, treated with anti-reflective coating on the inner surface to guarantee split-second dial legibility in bright sunlight or twilight water.",
    icon: Sparkles,
    stat: "99.4%",
    statLabel: "LIGHT TRANSMISSION",
  },
  {
    step: "03",
    title: "High-Visibility Dial & Lume",
    subtitle: "DEEP ABYSS READABILITY",
    description:
      "Oversized trapezoidal and circular indices filled with proprietary phosphorescent compound. Swords-style hands glow intense green-blue to maintain visibility in zero-light hydrostatic environments.",
    icon: ShieldCheck,
    stat: "8 Hours",
    statLabel: "CONTINUOUS LUMINESCENCE",
  },
  {
    step: "04",
    title: "200M Sealed Hydro-Chamber",
    subtitle: "STAINLESS STEEL CASEBACK",
    description:
      "Heavy-duty threaded screw-down crown with dual O-ring synthetic gaskets and laser-etched marlin emblem caseback. Individually pressure-tested in water to 20 bar (200 meters / 660 feet).",
    icon: Anchor,
    stat: "20 BAR",
    statLabel: "HYDROSTATIC RATING",
  },
];

export function CraftSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="craft" className="relative z-20 py-28 sm:py-36 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1560px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#0b0b14]/30" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase">
                ENGINEERING SPECIFICATIONS · 02
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0b0b14] leading-[0.95]">
              Precision{" "}
              <span className="font-serif italic font-medium accent-gradient-text">
                Architecture.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-[#0b0b14]/70 max-w-sm leading-relaxed">
            Every component is audited for tensile resilience and hydrostatic endurance.
            Explore the four structural pillars of the Diver Series.
          </p>
        </div>

        {/* 4-Step Interactive Exploded View Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Numbered Callouts List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {CRAFT_STEPS.map((s, idx) => {
              const isSelected = idx === activeStep;
              const Icon = s.icon;

              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 rounded-[22px] transition-all duration-300 border flex flex-col gap-2 ${
                    isSelected
                      ? "bg-white/85 border-[#2a4bd7] shadow-[0_12px_30px_rgba(42,75,215,0.12)] ring-1 ring-[#2a4bd7]/20"
                      : "bg-white/40 hover:bg-white/60 border-white/80"
                  }`}
                  data-cursor="link"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#2a4bd7]">
                      {s.step} // {s.subtitle}
                    </span>
                    <Icon className="w-4 h-4 text-[#0b0b14]/50" />
                  </div>

                  <span className="font-display text-xl sm:text-2xl text-[#0b0b14] font-medium leading-tight">
                    {s.title}
                  </span>

                  {isSelected && (
                    <p className="font-sans text-xs sm:text-sm text-[#0b0b14]/75 mt-2 leading-relaxed animate-fade-in">
                      {s.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Stage with Technical Spec Card */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px] rounded-[32px] p-8 sm:p-12 overflow-hidden border border-white/70 bg-white/35 backdrop-blur-xl">
            {/* Visual Watch Component Focus */}
            <div className="relative w-full max-w-[400px] h-[360px] sm:h-[420px] flex items-center justify-center">
              <Image
                src="/images_nobg/01_watchzone_Casio_Duro_Marlin_Diver_s_Batman_Black_Dial_Men_s_Watch.png"
                alt="SUMERI Duro Marlin diver engineering"
                fill
                sizes="400px"
                className="object-contain drop-shadow-[0_20px_35px_rgba(11,11,20,0.2)] transition-transform duration-700"
                style={{
                  transform:
                    activeStep === 0
                      ? "scale(1.18) translateY(-15px)"
                      : activeStep === 1
                      ? "scale(1.15) rotate(4deg)"
                      : activeStep === 2
                      ? "scale(1.22) translateY(10px)"
                      : "scale(1.1) rotate(-3deg)",
                }}
              />
            </div>

            {/* Floating Technical Stat Overlay */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[#0b0b14] text-white p-5 rounded-2xl shadow-xl flex flex-col max-w-[200px]">
              <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-none">
                {CRAFT_STEPS[activeStep].stat}
              </span>
              <span className="font-mono text-[9px] font-semibold tracking-widest text-[#2a4bd7] uppercase mt-1">
                {CRAFT_STEPS[activeStep].statLabel}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
