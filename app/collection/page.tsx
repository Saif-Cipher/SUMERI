"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WATCH_CATALOG } from "@/data/watch-data";
import { ArrowRight, Filter } from "lucide-react";

const CATEGORIES = ["ALL", "DIVER", "AUTOMATIC", "TITANIUM", "HERITAGE", "CHRONO", "CERAMIC"];

export default function CollectionPage() {
  const [selectedCat, setSelectedCat] = useState("ALL");

  const filteredWatches =
    selectedCat === "ALL"
      ? WATCH_CATALOG
      : WATCH_CATALOG.filter((w) => w.category === selectedCat);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#0b0b14]/30" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase">
                COLLECTION · VOL. 01
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#0b0b14] leading-[0.92]">
              The Complete{" "}
              <span className="font-serif italic font-medium accent-gradient-text">
                Catalog.
              </span>
            </h1>
          </div>

          <p className="font-sans text-sm text-[#0b0b14]/70 max-w-sm leading-relaxed">
            15 curated horological references collected and verified for tensile integrity,
            mechanical precision, and aesthetic endurance.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <div className="flex items-center gap-2 pr-3 border-r border-[#0b0b14]/15 mr-1 text-[#0b0b14]/60">
            <Filter className="w-4 h-4" />
            <span className="font-mono text-[10px] font-semibold tracking-widest uppercase">
              FILTER
            </span>
          </div>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCat === cat
                  ? "bg-[#0b0b14] text-white shadow-sm"
                  : "bg-white/60 hover:bg-white text-[#0b0b14]/75 border border-white/80"
              }`}
              data-cursor="link"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Watch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map((watch) => (
            <Link
              key={watch.id}
              href={`/watch/${watch.slug}`}
              data-cursor="view"
              data-cursor-label="VIEW"
              className="group flex flex-col bg-white/50 backdrop-blur-md rounded-[28px] p-7 border border-white/80 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(11,11,20,0.08)] hover:bg-white/70"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-white font-mono text-[10px] font-semibold text-[#0b0b14] uppercase">
                  {watch.category}
                </span>
                <span className="font-mono text-[10px] text-[#0b0b14]/50">
                  {watch.waterResistance}
                </span>
              </div>

              {/* Watch Cutout */}
              <div className="relative h-72 w-full my-auto flex items-center justify-center py-4">
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain drop-shadow-[0_15px_25px_rgba(11,11,20,0.18)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-2deg]"
                />
              </div>

              {/* Card Footer */}
              <div className="flex flex-col pt-4 border-t border-black/5">
                <span className="font-mono text-[10px] tracking-wider text-[#0b0b14]/50 uppercase">
                  {watch.brand}
                </span>
                <div className="flex items-end justify-between mt-1">
                  <span className="font-display text-xl font-semibold text-[#0b0b14] leading-tight group-hover:text-[#2a4bd7] transition-colors">
                    {watch.model}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#0b0b14]">
                    {watch.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
