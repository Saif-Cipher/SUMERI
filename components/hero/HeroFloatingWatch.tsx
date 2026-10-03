"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { WatchRecord } from "@/data/watch-data";

interface HeroFloatingWatchProps {
  watches: WatchRecord[];
  activeId: string;
  onMorphComplete?: () => void;
}

/**
 * SUMERI hero centerpiece — one large floating product watch.
 *
 * Transform hierarchy (each layer owns exactly one concern, so nothing fights):
 *   stage            → perspective only
 *   └ tiltLayer      → pointer parallax (rAF + lerp, written directly to style)
 *     └ floatLayer   → idle suspension (CSS keyframes: y, z, tiny rotation, breathing)
 *       └ morphStack → SVG displacement filter, only attached during a switch
 *         └ layer×3  → GSAP owns opacity / scale / rotate / blur per watch
 */
export function HeroFloatingWatch({ watches, activeId, onMorphComplete }: HeroFloatingWatchProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const layerRefs = useRef(new Map<string, HTMLDivElement>());
  const prevIdRef = useRef(activeId);
  const initialIdRef = useRef(activeId);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const onCompleteRef = useRef(onMorphComplete);
  onCompleteRef.current = onMorphComplete;

  const filterId = `sumeri-morph-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Initial visibility: only the active watch is shown.
  useLayoutEffect(() => {
    layerRefs.current.forEach((el, id) => {
      gsap.set(el, { autoAlpha: id === prevIdRef.current ? 1 : 0 });
    });
  }, []);

  // ───────────── Morph transition on product switch ─────────────
  useEffect(() => {
    const prevId = prevIdRef.current;
    if (prevId === activeId) return;
    prevIdRef.current = activeId;

    const outgoing = layerRefs.current.get(prevId);
    const incoming = layerRefs.current.get(activeId);
    const stack = stackRef.current;
    const disp = dispRef.current;
    if (!outgoing || !incoming || !stack) {
      onCompleteRef.current?.();
      return;
    }

    // Settle any in-flight morph instantly before starting a new one.
    tlRef.current?.progress(1).kill();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      tlRef.current = gsap
        .timeline({ onComplete: () => onCompleteRef.current?.() })
        .to(outgoing, { autoAlpha: 0, duration: 0.25, ease: "none" }, 0)
        .to(incoming, { autoAlpha: 1, duration: 0.25, ease: "none" }, 0);
      return;
    }

    // Fresh noise seed each switch so the liquid distortion never repeats exactly.
    turbRef.current?.setAttribute("seed", String(Math.floor(Math.random() * 1000)));
    const warp = { v: 0 };
    const writeWarp = () => disp?.setAttribute("scale", warp.v.toFixed(2));
    stack.style.filter = `url(#${filterId})`;

    tlRef.current = gsap
      .timeline({
        onComplete: () => {
          stack.style.filter = "";
          gsap.set(outgoing, { clearProps: "transform,filter" });
          gsap.set(incoming, { clearProps: "filter" });
          onCompleteRef.current?.();
        },
      })
      // Liquid displacement: swell, then resolve to zero.
      .to(warp, { v: 34, duration: 0.3, ease: "power2.in", onUpdate: writeWarp }, 0)
      .to(warp, { v: 0, duration: 0.44, ease: "power3.out", onUpdate: writeWarp }, 0.3)
      // Outgoing watch dissolves forward and away.
      .to(
        outgoing,
        {
          autoAlpha: 0,
          scale: 1.06,
          rotate: -5,
          yPercent: -1.5,
          filter: "blur(10px)",
          duration: 0.42,
          ease: "power2.in",
        },
        0
      )
      // Incoming watch condenses out of the distortion into full clarity.
      .fromTo(
        incoming,
        { autoAlpha: 0, scale: 0.92, rotate: 6, yPercent: 2, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.58,
          ease: "expo.out",
        },
        0.16
      );

    // Ground shadow tightens and re-grounds with the new watch.
    if (shadowRef.current) {
      tlRef.current.fromTo(
        shadowRef.current,
        { opacity: 0.35 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0.12
      );
    }
  }, [activeId, filterId]);

  useEffect(() => () => void tlRef.current?.kill(), []);

  // ───────────── Pointer parallax (restrained, lerped) ─────────────
  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!stage || !tilt) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return;

    const MAX_ROT_X = 5; // deg
    const MAX_ROT_Y = 8; // deg
    const MAX_SHIFT_X = 22; // px
    const MAX_SHIFT_Y = 16; // px
    const MAX_DEPTH = 26; // px toward the viewer
    const LERP = 0.075;

    const s = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let visible = true;

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      s.tx = clamp((e.clientX - cx) / (window.innerWidth * 0.5));
      s.ty = clamp((e.clientY - cy) / (window.innerHeight * 0.5));
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
    };

    const tick = () => {
      s.x += (s.tx - s.x) * LERP;
      s.y += (s.ty - s.y) * LERP;
      const depth = Math.min(1, Math.hypot(s.x, s.y)) * MAX_DEPTH;
      tilt.style.transform =
        `translate3d(${(s.x * MAX_SHIFT_X).toFixed(2)}px, ${(s.y * MAX_SHIFT_Y).toFixed(2)}px, ${depth.toFixed(2)}px) ` +
        `rotateX(${(-s.y * MAX_ROT_X).toFixed(3)}deg) rotateY(${(s.x * MAX_ROT_Y).toFixed(3)}deg)`;
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${(-s.x * 28).toFixed(2)}px, 0, 0)`;
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) raf = requestAnimationFrame(tick);
    });
    io.observe(stage);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const active = watches.find((w) => w.id === activeId) ?? watches[0];

  return (
    <div
      ref={stageRef}
      className="relative h-full w-full"
      role="img"
      aria-label={`${active.name} — ${active.model}`}
    >
      {/* Hidden SVG filter used only while morphing */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.011 0.016" numOctaves={2} seed={3} result="noise" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale={0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Square watch box — sized to the stage height, centered, may overflow the column (transparent) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-full -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "1400px" }}
      >
        {/* Contact shadow on the hero background — soft ellipse, never a box */}
        <div ref={shadowRef} aria-hidden="true" className="absolute bottom-[3%] left-[28%] h-[7%] w-[44%]">
          <div
            className="sumeri-float-shadow h-full w-full rounded-[50%]"
            style={{
              background: "radial-gradient(closest-side, rgba(11,11,20,0.26), rgba(11,11,20,0.08) 60%, transparent)",
              filter: "blur(10px)",
            }}
          />
        </div>

        <div ref={tiltRef} className="absolute inset-0 will-change-transform" style={{ transformStyle: "preserve-3d" }}>
          <div className="sumeri-float absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            <div ref={stackRef} className="absolute inset-0">
              {watches.map((watch, i) => (
                <div
                  key={watch.id}
                  ref={(el) => {
                    if (el) layerRefs.current.set(watch.id, el);
                    else layerRefs.current.delete(watch.id);
                  }}
                  aria-hidden={watch.id !== activeId}
                  className="absolute inset-0 will-change-[transform,opacity,filter]"
                  style={{
                    opacity: watch.id === initialIdRef.current ? 1 : 0,
                    visibility: watch.id === initialIdRef.current ? "visible" : "hidden",
                  }}
                >
                  <div className="absolute inset-0 drop-shadow-[0_38px_42px_rgba(11,11,20,0.22)]">
                    {/* Native 800×800 transparent PNG served untouched for maximum sharpness */}
                    <Image
                      src={watch.image}
                      alt=""
                      fill
                      unoptimized
                      priority={i === 0}
                      draggable={false}
                      sizes="800px"
                      className="select-none object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
