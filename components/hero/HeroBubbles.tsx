"use client";

import { useEffect, useRef, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  leftPercent: number;
  durationSec: number;
  driftPx: number;
  opacity: number;
}

export function HeroBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= 16) return prev;

        const id = nextId.current++;
        const leftPercent = 25 + Math.random() * 50; // Centralized around watch
        const size = 10 + Math.random() * 20; // 10px to 30px
        const durationSec = 4.5 + Math.random() * 5.0; // 4.5s to 9.5s
        const driftPx = (Math.random() - 0.3) * 60; // Up to ~+30px drift
        const opacity = 0.2 + Math.random() * 0.4; // 0.2 to 0.6

        const newBubble: Bubble = {
          id,
          size,
          leftPercent,
          durationSec,
          driftPx,
          opacity,
        };

        setTimeout(() => {
          setBubbles((current) => current.filter((b) => b.id !== id));
        }, durationSec * 1000);

        return [...prev, newBubble];
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-[-30px] rounded-full"
          style={{
            left: `${b.leftPercent}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            background:
              "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.35) 30%, rgba(200, 220, 255, 0.15) 70%, rgba(42, 75, 215, 0.35) 100%)",
            boxShadow:
              "inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(42, 75, 215, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            animation: `riseBubble ${b.durationSec}s cubic-bezier(0.35, 0, 0.25, 1) forwards`,
            transform: `translateX(${b.driftPx}px)`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes riseBubble {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.5;
            transform: translateY(-60px) scale(1);
          }
          85% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) scale(1.15);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
