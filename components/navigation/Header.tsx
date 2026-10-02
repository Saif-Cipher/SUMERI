"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Compass, Menu, X, ArrowUpRight } from "lucide-react";
import { ScrambleText } from "@/components/ui/scramble-text";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button effect on Contact pill (within 80px radius)
  useEffect(() => {
    const btn = contactBtnRef.current;
    if (!btn) return;

    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < 80) {
        targetX = dx * 0.35;
        targetY = dy * 0.35;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      btn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-sm"
            : "py-5 sm:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* SUMERI Wordmark with Scramble Text on Hover */}
          <Link href="/" className="flex items-center gap-2.5 group" data-cursor="link">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-[#0b0b14] text-white">
              <Compass className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </span>
            <ScrambleText
              scrambleOnHover={true}
              duration={0.6}
              speed={0.03}
              className="font-display text-2xl sm:text-3xl tracking-[0.24em] text-[#0b0b14] font-semibold uppercase leading-none"
            >
              SUMERI
            </ScrambleText>
          </Link>

          {/* Center Glass Pill Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill-nav">
            <Link
              href="/"
              data-cursor="link"
              className="px-4 py-1.5 rounded-full bg-[#0b0b14] text-white font-mono text-xs font-medium tracking-wider uppercase transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/collection"
              data-cursor="link"
              className="px-4 py-1.5 rounded-full text-[#0b0b14]/75 hover:text-[#0b0b14] hover:bg-black/5 font-mono text-xs tracking-wider uppercase transition-colors"
            >
              COLLECTION
            </Link>
            <Link
              href="/craft"
              data-cursor="link"
              className="px-4 py-1.5 rounded-full text-[#0b0b14]/75 hover:text-[#0b0b14] hover:bg-black/5 font-mono text-xs tracking-wider uppercase transition-colors"
            >
              CRAFT
            </Link>
            <Link
              href="/story"
              data-cursor="link"
              className="px-4 py-1.5 rounded-full text-[#0b0b14]/75 hover:text-[#0b0b14] hover:bg-black/5 font-mono text-xs tracking-wider uppercase transition-colors"
            >
              STORY
            </Link>
            <Link
              href="/journal"
              data-cursor="link"
              className="px-4 py-1.5 rounded-full text-[#0b0b14]/75 hover:text-[#0b0b14] hover:bg-black/5 font-mono text-xs tracking-wider uppercase transition-colors"
            >
              JOURNAL
            </Link>
          </nav>

          {/* Right Magnetic Contact Pill */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              ref={contactBtnRef}
              href="/contact"
              data-cursor="link"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-colors font-mono text-xs font-semibold tracking-widest uppercase shadow-sm"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#0b0b14] hover:opacity-80"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b0b14]/95 backdrop-blur-2xl flex flex-col justify-between p-8 text-white">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-[0.24em] font-semibold uppercase">
              SUMERI
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white hover:opacity-80"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 font-display text-3xl tracking-tight">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2a4bd7] transition-colors">
              Home
            </Link>
            <Link href="/collection" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2a4bd7] transition-colors">
              Collection
            </Link>
            <Link href="/craft" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2a4bd7] transition-colors">
              Craft & Precision
            </Link>
            <Link href="/story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2a4bd7] transition-colors">
              Brand Story
            </Link>
            <Link href="/journal" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2a4bd7] transition-colors">
              Journal
            </Link>
          </nav>

          <div className="pt-6 border-t border-white/20">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 py-3.5 rounded-full bg-white text-[#0b0b14] font-mono text-sm font-semibold tracking-wider uppercase"
            >
              <span>Enquire & Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
