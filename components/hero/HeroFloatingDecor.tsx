"use client";

import { useEffect, useRef } from "react";

interface DecorParticle {
  id: number;
  type: "ring" | "lume" | "gear" | "pip" | "droplet";
  layer: "fg" | "bg" | "far";
  initialX: number;
  initialY: number;
  size: number;
  rotation: number;
}

const PARTICLES: DecorParticle[] = [
  { id: 1, type: "ring", layer: "fg", initialX: 28, initialY: 32, size: 28, rotation: 15 },
  { id: 2, type: "lume", layer: "bg", initialX: 72, initialY: 26, size: 14, rotation: 0 },
  { id: 3, type: "gear", layer: "fg", initialX: 30, initialY: 70, size: 30, rotation: 45 },
  { id: 4, type: "pip", layer: "far", initialX: 68, initialY: 64, size: 18, rotation: -20 },
  { id: 5, type: "droplet", layer: "bg", initialX: 24, initialY: 54, size: 20, rotation: 10 },
  { id: 6, type: "ring", layer: "far", initialX: 75, initialY: 48, size: 22, rotation: -35 },
  { id: 7, type: "lume", layer: "fg", initialX: 66, initialY: 76, size: 12, rotation: 0 },
];

export function HeroFloatingDecor({ isSwitching = false }: { isSwitching?: boolean }) {
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId: number;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, clientX: -1000, clientY: -1000 };

    const onPointerMove = (e: MouseEvent) => {
      mouse.clientX = e.clientX;
      mouse.clientY = e.clientY;
      mouse.targetX = e.clientX / window.innerWidth - 0.5;
      mouse.targetY = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    const update = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!isSwitching) {
        particleRefs.current.forEach((el, idx) => {
          if (!el) return;
          const p = PARTICLES[idx];
          if (!p) return;

          const mult = p.layer === "fg" ? 60 : p.layer === "bg" ? -30 : -15;
          let px = mouse.x * mult;
          let py = mouse.y * mult;

          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - mouse.clientX;
          const dy = cy - mouse.clientY;
          const dist = Math.hypot(dx, dy);

          if (dist < 400 && dist > 1) {
            const force = (1 - dist / 400) * -80;
            const angle = Math.atan2(dy, dx);
            px += Math.cos(angle) * force;
            py += Math.sin(angle) * force;
          }

          el.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${p.rotation + mouse.x * 20}deg)`;
        });
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, [isSwitching]);

  return (
    <div className="pointer-events-none absolute inset-0 z-15 overflow-hidden">
      {PARTICLES.map((p, idx) => (
        <div
          key={p.id}
          ref={(el) => {
            particleRefs.current[idx] = el;
          }}
          className={`absolute transition-all duration-500 ${
            isSwitching ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
          style={{
            left: `${p.initialX}%`,
            top: `${p.initialY}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          {p.type === "ring" && (
            <div className="h-full w-full rounded-full border border-[#2a4bd7]/30 bg-white/10 backdrop-blur-[2px] shadow-sm" />
          )}
          {p.type === "lume" && (
            <div className="h-full w-full rounded-full bg-radial from-white via-[#d4e4ff] to-[#2a4bd7]/40 shadow-[0_0_12px_rgba(42,75,215,0.4)]" />
          )}
          {p.type === "gear" && (
            <div className="h-full w-full rounded-full border border-dashed border-[#0b0b14]/20 bg-white/20 backdrop-blur-[1px]" />
          )}
          {p.type === "pip" && (
            <div className="h-full w-full rotate-45 border border-[#2a4bd7]/40 bg-white/30 backdrop-blur-[2px]" />
          )}
          {p.type === "droplet" && (
            <div className="h-full w-full rounded-full bg-gradient-to-tr from-white/40 to-[#c8cff0]/20 backdrop-blur-[3px] border border-white/60 shadow-sm" />
          )}
        </div>
      ))}
    </div>
  );
}
