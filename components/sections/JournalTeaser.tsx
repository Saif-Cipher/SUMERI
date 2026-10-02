"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ARTICLES = [
  {
    slug: "hydrostatic-testing-200m",
    category: "HOROLOGY LOG",
    date: "OCTOBER 2026",
    title: "The Physics of 200-Meter Water Resistance and Gasket Integrity",
    summary:
      "A technical examination of dual O-ring crown compression and helical caseback threading under 20 atmospheres of oceanic pressure.",
    image: "/images_nobg/01_watchzone_Casio_Duro_Marlin_Diver_s_Batman_Black_Dial_Men_s_Watch.png",
  },
  {
    slug: "forged-carbon-dial-architecture",
    category: "MATERIALS SCIENCE",
    date: "SEPTEMBER 2026",
    title: "Structural Density: Forged Carbon Composites in Modern Tool Calibers",
    summary:
      "How high-pressure carbon layering creates unique, marbled dials with five times the tensile strength of standard alloy plates.",
    image: "/images_nobg/02_watchzone_Casio_Edifice_Automatic_Forged_Carbon_Black_Dial_Men_s_.png",
  },
  {
    slug: "super-titanium-duratect-chronicle",
    category: "METALLURGY",
    date: "AUGUST 2026",
    title: "Super Titanium and Duratect: The Evolution of Scratch-Resistant Space Metals",
    summary:
      "Aerospace titanium ion-plated with surface hardening technology to achieve 40% lighter wrist mass than 316L steel.",
    image: "/images_nobg/04_watchzone_Citizen_Zenshin_60_Automatic_Copper_Dial_Super_Titanium.png",
  },
];

export function JournalTeaser() {
  return (
    <section id="journal" className="relative z-20 py-28 sm:py-36 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1560px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#0b0b14]/30" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase">
                THE DISPATCH · 04
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0b0b14] leading-[0.95]">
              Horological{" "}
              <span className="font-serif italic font-medium accent-gradient-text">
                Journal.
              </span>
            </h2>
          </div>

          <Link
            href="/journal"
            data-cursor="link"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#0b0b14] hover:text-[#2a4bd7] uppercase transition-colors"
          >
            <span>Read all articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/journal/${art.slug}`}
              data-cursor="read"
              data-cursor-label="READ"
              className="group flex flex-col bg-white/45 backdrop-blur-md rounded-[26px] p-6 border border-white/80 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(11,11,20,0.08)]"
            >
              {/* Image Preview Container */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-white/60 mb-6 flex items-center justify-center p-6">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-[#0b0b14]/60">
                <span className="font-bold tracking-widest text-[#2a4bd7] uppercase">
                  {art.category}
                </span>
                <span>{art.date}</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl text-[#0b0b14] font-medium leading-snug mb-3 group-hover:text-[#2a4bd7] transition-colors">
                {art.title}
              </h3>

              <p className="font-sans text-xs text-[#0b0b14]/70 leading-relaxed mt-auto">
                {art.summary}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
