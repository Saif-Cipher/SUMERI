"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WatchRecord } from "@/data/watch-data";
import { ScrambleText } from "@/components/ui/scramble-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 185;

interface HeroExplodedCanvasProps {
  activeWatch: WatchRecord;
  isSwitching: boolean;
  spinDegrees: number;
}

interface ComponentCallout {
  id: string;
  name: string;
  code: string;
  spec: string;
  minProgress: number;
  maxProgress: number;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "middle-left";
}

const CALLOUTS: ComponentCallout[] = [
  {
    id: "crystal",
    name: "Domed Sapphire Crystal",
    code: "LAYER 01 / EXT",
    spec: "Double AR Coating · 1.52 IOR · Scratch Proof",
    minProgress: 0.18,
    maxProgress: 1.0,
    position: "top-left",
  },
  {
    id: "bezel",
    name: "Ceramic Rotary Bezel",
    code: "LAYER 02 / DUAL-TONE",
    spec: "120-Click Unidirectional · Batman Blue & Midnight",
    minProgress: 0.32,
    maxProgress: 1.0,
    position: "top-right",
  },
  {
    id: "dial",
    name: "Sunray Diver Dial & Handset",
    code: "LAYER 03-04 / PINION",
    spec: "Super-LumiNova C3 · Marlin Deep Crest · Date Window",
    minProgress: 0.48,
    maxProgress: 1.0,
    position: "bottom-left",
  },
  {
    id: "movement",
    name: "Calibre Core & Escapement",
    code: "LAYER 05 / GEAR TRAIN",
    spec: "Precision Balance Wheel · Brass Train · Synthetic Rubies",
    minProgress: 0.64,
    maxProgress: 1.0,
    position: "middle-left",
  },
  {
    id: "case",
    name: "316L Monobloc Case Architecture",
    code: "LAYER 06-07 / CORE",
    spec: "Surgical Stainless Steel · Screw-Down Crown · 200M ISO 6425",
    minProgress: 0.78,
    maxProgress: 1.0,
    position: "bottom-right",
  },
];

export function HeroExplodedCanvas({
  activeWatch,
  isSwitching,
  spinDegrees,
}: HeroExplodedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy cache for loaded HTMLImageElements
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingFrames = useRef<Set<number>>(new Set());
  const lastDrawnFrameRef = useRef<number>(1);

  const [currentFrame, setCurrentFrame] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse Parallax Micro-Tilt
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 1. Detect Reduced Motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Frame URL Helper with zero-padding
  const getFrameUrl = useCallback((frameNum: number, ext: "webp" | "png" = "webp") => {
    const padded = String(frameNum).padStart(3, "0");
    return `/animation_processed/frame-${padded}.${ext}`;
  }, []);

  // Load an individual frame on-demand with caching
  const loadFrame = useCallback((frameNum: number, onLoaded?: (img: HTMLImageElement) => void) => {
    if (frameCache.current.has(frameNum)) {
      onLoaded?.(frameCache.current.get(frameNum)!);
      return;
    }

    if (loadingFrames.current.has(frameNum)) return;
    loadingFrames.current.add(frameNum);

    const img = new Image();
    img.src = getFrameUrl(frameNum, "webp");

    img.onload = () => {
      loadingFrames.current.delete(frameNum);
      frameCache.current.set(frameNum, img);
      onLoaded?.(img);
    };

    img.onerror = () => {
      // Fallback to PNG if WebP fails
      const fallbackImg = new Image();
      fallbackImg.src = getFrameUrl(frameNum, "png");
      fallbackImg.onload = () => {
        loadingFrames.current.delete(frameNum);
        frameCache.current.set(frameNum, fallbackImg);
        onLoaded?.(fallbackImg);
      };
      fallbackImg.onerror = () => {
        loadingFrames.current.delete(frameNum);
      };
    };
  }, [getFrameUrl]);

  // Find the closest loaded frame to prevent stutter during rapid scrolling
  const getClosestLoadedFrame = useCallback((target: number): HTMLImageElement | null => {
    if (frameCache.current.has(target)) {
      return frameCache.current.get(target)!;
    }

    let closest = lastDrawnFrameRef.current;
    let minDiff = Infinity;

    for (const key of frameCache.current.keys()) {
      const diff = Math.abs(key - target);
      if (diff < minDiff) {
        minDiff = diff;
        closest = key;
      }
    }

    return frameCache.current.get(closest) || null;
  }, []);

  // Draw frame on canvas with sub-pixel crispness and aspect fitting
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const img = getClosestLoadedFrame(frameNum);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio || 1) : 1;
    const displayWidth = canvas.clientWidth || 700;
    const displayHeight = canvas.clientHeight || 700;

    const neededWidth = Math.round(displayWidth * dpr);
    const neededHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== neededWidth || canvas.height !== neededHeight) {
      canvas.width = neededWidth;
      canvas.height = neededHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;

    let drawW = canvas.width;
    let drawH = canvas.height;

    if (canvasAspect > imgAspect) {
      drawW = canvas.height * imgAspect;
    } else {
      drawH = canvas.width / imgAspect;
    }

    // Scale padding so exploded parts comfortably fill canvas without clipping
    drawW *= 0.95;
    drawH *= 0.95;

    const drawX = (canvas.width - drawW) / 2;
    const drawY = (canvas.height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastDrawnFrameRef.current = frameNum;
  }, [getClosestLoadedFrame]);

  // Preload proximity window around target frame
  const preloadProximity = useCallback((center: number) => {
    const radius = 10;
    const start = Math.max(1, center - radius);
    const end = Math.min(TOTAL_FRAMES, center + radius);

    for (let f = start; f <= end; f++) {
      loadFrame(f);
    }
  }, [loadFrame]);

  // Initial Load: Frame 1 immediately + Stride keyframes
  useEffect(() => {
    // 1. Instant load of frame 1 (assembled watch)
    loadFrame(1, () => {
      setIsReady(true);
      drawFrame(1);

      // 2. Preload keyframe stride (1, 15, 30, 45, 60... 185) for instant response across scroll range
      for (let f = 1; f <= TOTAL_FRAMES; f += 12) {
        loadFrame(f);
      }
      // Also ensure terminal exploded frame 185 is preloaded
      loadFrame(TOTAL_FRAMES);
    });
  }, [loadFrame, drawFrame]);

  // GSAP ScrollTrigger Scrubbing Engine
  useEffect(() => {
    if (prefersReducedMotion) {
      drawFrame(1);
      return;
    }

    const heroSection = document.getElementById("hero-section") || containerRef.current?.closest("section");
    if (!heroSection) return;

    let ticking = false;

    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        setScrubProgress(p);

        // Map scroll progress [0, 1] to frames [1, 185]
        const target = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(1 + p * (TOTAL_FRAMES - 1))));
        setCurrentFrame(target);
        preloadProximity(target);

        if (!ticking) {
          requestAnimationFrame(() => {
            drawFrame(target);
            ticking = false;
          });
          ticking = true;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [drawFrame, preloadProximity, prefersReducedMotion]);

  // Mouse Parallax Micro-Tilt (0.05 lerp smoothing)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      mouseRef.current.targetX = (e.clientX - cx) / (window.innerWidth * 0.5);
      mouseRef.current.targetY = (e.clientY - cy) / (window.innerHeight * 0.5);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const canvas = canvasRef.current;
      if (canvas) {
        const rotY = mouseRef.current.x * 4.2;
        const rotX = -mouseRef.current.y * 4.2;
        const transX = mouseRef.current.x * 8;
        const transY = mouseRef.current.y * 8;

        canvas.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [prefersReducedMotion]);

  // Re-draw when switching or spinning
  useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame, drawFrame, spinDegrees, isSwitching]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full select-none"
      style={{ perspective: "1400px" }}
    >
      {/* Ambient Colorway Reactive Glow */}
      <div
        className="absolute w-[460px] h-[460px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] opacity-45 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${activeWatch.palette.colorA}40 0%, ${activeWatch.palette.accent}25 50%, transparent 70%)`,
          transform: `scale(${1 + scrubProgress * 0.25})`,
        }}
      />

      {/* Blueprint Geometric Reticle (Subtle Technical Accent) */}
      <div
        className="absolute w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px] rounded-full border border-dashed border-[#0b0b14]/15 pointer-events-none transition-all duration-700 ease-out"
        style={{
          transform: `rotate(${scrubProgress * 120 + spinDegrees}deg) scale(${1 + scrubProgress * 0.15})`,
          opacity: 0.3 + scrubProgress * 0.4,
        }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#0b0b14]/30" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-3 bg-[#0b0b14]/30" />
        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-3 bg-[#0b0b14]/30" />
        <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-1.5 w-3 bg-[#0b0b14]/30" />
      </div>

      {/* Primary HTML5 Canvas: 185-Frame Transparent Exploded Watch */}
      <canvas
        ref={canvasRef}
        data-cursor="explore"
        className="relative z-10 w-full max-w-[560px] sm:max-w-[660px] md:max-w-[760px] lg:max-w-[820px] aspect-[16/9] object-contain cursor-grab active:cursor-grabbing transition-opacity duration-500"
        style={{
          opacity: isReady ? 1 : 0,
          filter: "drop-shadow(0 25px 45px rgba(11,11,20,0.22))",
          willChange: "transform",
        }}
      />

      {/* Horological Blueprint Component HUD Callouts */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
          {CALLOUTS.map((callout) => {
            const isVisible =
              scrubProgress >= callout.minProgress && scrubProgress <= callout.maxProgress;

            const posStyles: Record<string, string> = {
              "top-left": "top-6 left-0 text-left",
              "top-right": "top-10 right-0 text-right",
              "middle-left": "top-[48%] left-0 text-left",
              "bottom-left": "bottom-14 left-4 text-left",
              "bottom-right": "bottom-10 right-2 text-right",
            };

            return (
              <div
                key={callout.id}
                className={`absolute transition-all duration-500 ${posStyles[callout.position]} ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95"
                }`}
              >
                <div className="inline-flex flex-col p-2.5 px-3.5 rounded-xl bg-white/75 backdrop-blur-md border border-white/85 shadow-[0_8px_24px_rgba(11,11,20,0.06)]">
                  <ScrambleText
                    trigger={isVisible}
                    duration={0.5}
                    speed={0.02}
                    className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#2a4bd7] uppercase"
                  >
                    {callout.code}
                  </ScrambleText>
                  <ScrambleText
                    trigger={isVisible}
                    duration={0.6}
                    speed={0.025}
                    className="font-display text-xs font-bold text-[#0b0b14] tracking-tight"
                  >
                    {callout.name}
                  </ScrambleText>
                  <span className="font-mono text-[9px] text-[#0b0b14]/60">
                    {callout.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Interactive Explosion Stage Meter & Scroll Prompt */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 p-1.5 px-3.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2a4bd7] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2a4bd7]" />
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-[#0b0b14]/80 uppercase">
            {scrubProgress < 0.05
              ? "Scroll to Explode Assembly"
              : scrubProgress > 0.92
              ? "Full Deconstructed Architecture"
              : `Deconstructing · Frame ${currentFrame}/${TOTAL_FRAMES}`}
          </span>
        </div>

        {/* Micro progress hairline bar */}
        <div className="w-36 h-0.5 bg-[#0b0b14]/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2a4bd7] transition-all duration-150 ease-out"
            style={{ width: `${Math.round(scrubProgress * 100)}%` }}
          />
        </div>
      </div>

      {/* Fallback / Reduced-Motion Slider Control */}
      {prefersReducedMotion && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 p-2 px-4 rounded-full bg-white/85 backdrop-blur-md border border-white/95 shadow-md">
          <span className="font-mono text-[10px] text-[#0b0b14]/70 uppercase font-semibold">
            Manual Layer Inspector
          </span>
          <input
            type="range"
            min="1"
            max={TOTAL_FRAMES}
            value={currentFrame}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setCurrentFrame(val);
              setScrubProgress((val - 1) / (TOTAL_FRAMES - 1));
              drawFrame(val);
            }}
            className="w-36 accent-[#2a4bd7] cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
