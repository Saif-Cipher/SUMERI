"use client";

import { useState } from "react";
import Image from "next/image";
import { WATCH_CATALOG, WatchRecord } from "@/data/watch-data";
import { Filter, Eye, ArrowUpRight } from "lucide-react";
import { ProductDetailOverlay } from "@/components/collection/ProductDetailOverlay";
import { ScrambleText } from "@/components/ui/scramble-text";

const CATEGORIES = ["ALL", "DIVER", "AUTOMATIC", "TITANIUM", "HERITAGE", "CHRONO", "CERAMIC"];

export default function CollectionPage() {
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [selectedWatch, setSelectedWatch] = useState<WatchRecord | null>(null);

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
              <ScrambleText
                duration={0.8}
                speed={0.03}
                scrambleOnHover={true}
                className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase cursor-default"
              >
                COLLECTION · VOL. 01 · 15 REFERENCES
              </ScrambleText>
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

        {/* 3-Column Watch Grid — Interactive Cards that trigger Product Detail Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map((watch) => (
            <button
              key={watch.id}
              type="button"
              onClick={() => setSelectedWatch(watch)}
              data-cursor="view"
              data-cursor-label="INSPECT"
              className="group text-left flex flex-col bg-white/55 backdrop-blur-md rounded-[28px] p-7 border border-white/85 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(11,11,20,0.1)] hover:bg-white/75 relative cursor-pointer"
            >
              {/* Card Header: Category & Water Resistance */}
              <div className="flex items-center justify-between mb-4 w-full">
                <span
                  className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase border border-white/80 shadow-sm"
                  style={{
                    backgroundColor: `${watch.palette.accent}18`,
                    color: watch.palette.accent,
                  }}
                >
                  {watch.palette.tag || watch.category}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[#0b0b14]/50">
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

                {/* Inspect Action Badge on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0b0b14]/85 text-white font-mono text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg border border-white/15">
                    <Eye className="w-3.5 h-3.5 text-[#2a4bd7]" />
                    10X Inspect
                  </span>
                </div>
              </div>

              {/* Card Footer: Brand, Model, Price */}
              <div className="flex flex-col pt-4 border-t border-[#0b0b14]/10 w-full transition-colors">
                <span className="font-mono text-[10px] tracking-wider text-[#0b0b14]/50 uppercase">
                  {watch.brand} · {watch.movement}
                </span>
                <div className="flex items-end justify-between mt-1">
                  <span className="font-display text-xl font-semibold text-[#0b0b14] leading-tight group-hover:text-[#2a4bd7] transition-colors">
                    {watch.model}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-sm font-bold text-[#0b0b14]">
                      {watch.price}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0b0b14]/40 group-hover:text-[#2a4bd7] transition-colors" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Product Detail Overlay with 10X Zoom & Liquid Glass Inspection Window */}
      {selectedWatch && (
        <ProductDetailOverlay
          watch={selectedWatch}
          onClose={() => setSelectedWatch(null)}
          onSelectWatch={(w) => setSelectedWatch(w)}
        />
      )}
    </div>
  );
}
