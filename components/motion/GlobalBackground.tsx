"use client";

import { SoffitCanvas } from "./SoffitCanvas";

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. Underlying WebGL2 Dynamic Soffit Gradient Canvas */}
      <SoffitCanvas className="w-full h-full" />

      {/* 2. Soft atmospheric vignette for optical depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(11, 11, 20, 0.08) 100%)",
        }}
      />
    </div>
  );
}
