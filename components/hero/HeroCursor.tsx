"use client";

import { useEffect, useRef, useState } from "react";

export type CursorState = "default" | "link" | "view" | "drag" | "play" | "read";

export function HeroCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Touch detection - desktop only cursor
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorState | null;
        const labelAttr = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");

        if (cursorAttr) {
          setCursorState(cursorAttr);
          setCursorLabel(labelAttr || cursorAttr.toUpperCase());
        } else if (target.closest("button, a, input, select, [role='button']")) {
          setCursorState("link");
          setCursorLabel("");
        } else {
          setCursorState("default");
          setCursorLabel("");
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth trailing ring lerp (0.18)
    const updateRing = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
      animId = requestAnimationFrame(updateRing);
    };
    animId = requestAnimationFrame(updateRing);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isView = cursorState === "view";
  const isLink = cursorState === "link";
  const isDrag = cursorState === "drag";
  const isPlay = cursorState === "play";
  const isRead = cursorState === "read";

  const size = isView || isDrag || isPlay || isRead ? 72 : isLink ? 48 : 36;
  const half = size / 2;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 8px Sharp Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#0b0b14] transition-opacity duration-200"
        style={{ opacity: isView || isDrag || isPlay || isRead ? 0 : 0.85 }}
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-300"
        style={{
          width: size,
          height: size,
          marginLeft: -half,
          marginTop: -half,
          borderColor: isView
            ? "rgba(42, 75, 215, 0.85)"
            : isLink
            ? "rgba(11, 11, 20, 0.65)"
            : "rgba(11, 11, 20, 0.28)",
          backgroundColor: isView
            ? "rgba(42, 75, 215, 0.12)"
            : isLink
            ? "rgba(11, 11, 20, 0.05)"
            : "transparent",
          backdropFilter: isView || isPlay || isRead ? "blur(4px)" : "none",
        }}
      >
        {cursorLabel && (
          <span className="font-mono text-[9px] font-semibold tracking-widest text-[#0b0b14] uppercase select-none">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}
