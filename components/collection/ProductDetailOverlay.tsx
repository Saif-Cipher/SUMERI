"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight, Maximize2, Shield, Droplets, Clock, Layers } from "lucide-react";
import { WatchRecord, WATCH_CATALOG } from "@/data/watch-data";

interface ProductDetailOverlayProps {
  watch: WatchRecord | null;
  onClose: () => void;
  onSelectWatch: (watch: WatchRecord) => void;
}

export function ProductDetailOverlay({
  watch,
  onClose,
  onSelectWatch,
}: ProductDetailOverlayProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const zoomStageRef = useRef<HTMLDivElement>(null);
  const targetCoordsRef = useRef({ x: 50, y: 50 });
  const currentCoordsRef = useRef({ x: 50, y: 50 });
  const animFrameRef = useRef<number | null>(null);

  const currentIndex = watch
    ? WATCH_CATALOG.findIndex((w) => w.id === watch.id)
    : 0;

  const totalWatches = WATCH_CATALOG.length;

  const handlePrev = useCallback(() => {
    if (!watch) return;
    const prevIndex = (currentIndex - 1 + totalWatches) % totalWatches;
    onSelectWatch(WATCH_CATALOG[prevIndex]);
  }, [currentIndex, totalWatches, watch, onSelectWatch]);

  const handleNext = useCallback(() => {
    if (!watch) return;
    const nextIndex = (currentIndex + 1) % totalWatches;
    onSelectWatch(WATCH_CATALOG[nextIndex]);
  }, [currentIndex, totalWatches, watch, onSelectWatch]);

  // Keyboard navigation (ESC to close, Left/Right arrows to step)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  // Prevent body scrolling while modal is open
  useEffect(() => {
    if (watch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [watch]);

  // 10X Zoom smooth interpolation loop
  useEffect(() => {
    if (!isZoomed) {
      targetCoordsRef.current = { x: 50, y: 50 };
    }

    const loop = () => {
      const LERP = 0.12;
      currentCoordsRef.current.x +=
        (targetCoordsRef.current.x - currentCoordsRef.current.x) * LERP;
      currentCoordsRef.current.y +=
        (targetCoordsRef.current.y - currentCoordsRef.current.y) * LERP;

      setZoomCoords({
        x: currentCoordsRef.current.x,
        y: currentCoordsRef.current.y,
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isZoomed]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!zoomStageRef.current) return;
    const rect = zoomStageRef.current.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp coordinates with padding to keep watch in view
    const clampedX = Math.max(10, Math.min(90, rawX));
    const clampedY = Math.max(10, Math.min(90, rawY));

    targetCoordsRef.current = { x: clampedX, y: clampedY };
    if (!isZoomed) setIsZoomed(true);
  };

  const handlePointerLeave = () => {
    setIsZoomed(false);
    targetCoordsRef.current = { x: 50, y: 50 };
  };

  // Mobile tap-to-toggle-zoom support
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomStageRef.current) return;
    const rect = zoomStageRef.current.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;
    targetCoordsRef.current = {
      x: Math.max(10, Math.min(90, rawX)),
      y: Math.max(10, Math.min(90, rawY)),
    };
    setIsZoomed((prev) => !prev);
  };

  if (!watch) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Translucent Dimmed Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0b0b14]/50 backdrop-blur-xl transition-opacity"
        />

        {/* Liquid Glass Modal Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[1240px] max-h-[92vh] overflow-y-auto lg:overflow-hidden rounded-[32px] bg-white/92 backdrop-blur-3xl border border-white/95 shadow-[0_30px_90px_rgba(11,11,20,0.22)] ring-1 ring-white/80 flex flex-col z-10 my-auto"
        >
          {/* Top Bar: Reference Counter, Navigation Steppers, and Close Button */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-[#0b0b14]/10 bg-white/50">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#0b0b14] px-3 py-1 rounded-full bg-white/80 border border-white shadow-sm">
                REFERENCE 0{currentIndex + 1} / {totalWatches < 10 ? `0${totalWatches}` : totalWatches}
              </span>
              <span
                className="font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase hidden sm:inline-block border border-white/60"
                style={{
                  backgroundColor: `${watch.palette.accent}18`,
                  color: watch.palette.accent,
                }}
              >
                {watch.palette.tag || watch.category}
              </span>
            </div>

            {/* Stepper Controls & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous watch"
                data-cursor="link"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/70 hover:bg-white border border-white text-[#0b0b14] transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next watch"
                data-cursor="link"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/70 hover:bg-white border border-white text-[#0b0b14] transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                aria-label="Close overlay"
                data-cursor="link"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-[#0b0b14] hover:bg-[#1a1a2e] text-white transition-all shadow-sm ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Overlay Content: 2-Column Desktop Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center overflow-y-auto">
            
            {/* ================= LEFT / PRIMARY: 10X MACRO INSPECTION ZOOM ================= */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                ref={zoomStageRef}
                onClick={handleStageClick}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px] rounded-[24px] bg-white/65 border border-white/90 shadow-inner overflow-hidden flex items-center justify-center cursor-crosshair select-none group"
              >
                {/* 10X Inspection HUD Overlay */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0b14]/85 text-white font-mono text-[9px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                    <Maximize2 className="w-3 h-3 text-[#2a4bd7]" />
                    {isZoomed ? "10X MACRO ACTIVE" : "10X INSPECTION READY"}
                  </span>
                  {isZoomed && (
                    <span className="font-mono text-[9px] text-[#0b0b14]/70 px-2 py-0.5 rounded-full bg-white/80 border border-white shadow-sm backdrop-blur-md">
                      X: {zoomCoords.x.toFixed(1)}% Y: {zoomCoords.y.toFixed(1)}%
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 z-20 pointer-events-none opacity-65 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[9px] tracking-widest text-[#0b0b14]/65 uppercase px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm">
                    {isZoomed ? "MOVE POINTER TO EXPLORE DIAL & CROWN" : "HOVER OR TAP TO ENGAGE 10X MACRO ZOOM"}
                  </span>
                </div>

                {/* Magnified Image Container with Transform Origin tracking */}
                <motion.div
                  key={watch.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: isZoomed ? 8.5 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    scale: {
                      type: "spring",
                      stiffness: isZoomed ? 240 : 320,
                      damping: isZoomed ? 26 : 32,
                      mass: 0.6,
                    },
                    opacity: { duration: 0.3 },
                  }}
                  className="relative w-full h-full flex items-center justify-center will-change-transform pointer-events-none"
                  style={{
                    transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                  }}
                >
                  <div className="relative w-[75%] h-[75%] max-w-[440px] max-h-[440px]">
                    <Image
                      src={watch.image}
                      alt={watch.name}
                      fill
                      priority
                      unoptimized
                      sizes="600px"
                      className="object-contain drop-shadow-[0_25px_40px_rgba(11,11,20,0.22)] select-none pointer-events-none"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ================= RIGHT / INFORMATION: SPECIFICATIONS & DETAILS ================= */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Brand & Category Eyebrow */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#0b0b14]/60 uppercase">
                  {watch.brand}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#0b0b14]/30" />
                <span className="font-mono text-xs font-semibold tracking-wider text-[#2a4bd7] uppercase">
                  {watch.category}
                </span>
              </div>

              {/* Model Headline */}
              <h2
                id="product-modal-title"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0b0b14] leading-[0.95] mb-2"
              >
                {watch.model}
              </h2>

              {/* Full Watch Name */}
              <p className="font-sans text-sm text-[#0b0b14]/75 mb-4 leading-snug">
                {watch.name}
              </p>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#0b0b14]/10">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#0b0b14]">
                  {watch.price}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[#0b0b14]/50 uppercase">
                  INCL. VAT & CERTIFICATE
                </span>
              </div>

              {/* Detailed Technical Specifications Table */}
              <div className="grid grid-cols-2 gap-3.5 mb-6 bg-white/55 p-4 rounded-2xl border border-white/80">
                <div>
                  <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-[#0b0b14]/45 uppercase mb-0.5">
                    <Droplets className="w-3 h-3 text-[#2a4bd7]" />
                    Water Resistance
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#0b0b14]">
                    {watch.waterResistance}
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-[#0b0b14]/45 uppercase mb-0.5">
                    <Clock className="w-3 h-3 text-[#2a4bd7]" />
                    Movement
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#0b0b14] truncate block">
                    {watch.movement}
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-[#0b0b14]/45 uppercase mb-0.5">
                    <Shield className="w-3 h-3 text-[#2a4bd7]" />
                    Crystal Glass
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#0b0b14]">
                    {watch.crystal}
                  </span>
                </div>

                <div>
                  <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-[#0b0b14]/45 uppercase mb-0.5">
                    <Layers className="w-3 h-3 text-[#2a4bd7]" />
                    Case Architecture
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#0b0b14] truncate block">
                    {watch.caseMaterial}
                  </span>
                </div>

                {watch.bezel && (
                  <div className="col-span-2 pt-2 border-t border-[#0b0b14]/5">
                    <span className="block font-mono text-[9px] font-bold text-[#0b0b14]/45 uppercase mb-0.5">
                      Bezel & Strap
                    </span>
                    <span className="font-sans text-xs text-[#0b0b14]/85">
                      {watch.bezel} · {watch.strap}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Narrative Description */}
              <p className="font-sans text-xs sm:text-sm text-[#0b0b14]/75 leading-relaxed mb-6">
                {watch.description}
              </p>

              {/* Action Link & Order */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/watch/${watch.slug}`}
                  data-cursor="link"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-all duration-300 shadow-[0_8px_20px_rgba(11,11,20,0.18)]"
                >
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                    Full Specification Route
                  </span>
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/70 hover:bg-white border border-white text-[#0b0b14] font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-sm"
                >
                  Enquire Availability
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
