"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Compass, Menu, X, ArrowUpRight } from "lucide-react";
import { ScrambleText } from "@/components/ui/scramble-text";
import { MorphButton } from "@/components/ui/MorphButton";

const NAV_ITEMS = [
  { name: "HOME", href: "/" },
  { name: "COLLECTION", href: "/collection" },
  { name: "CRAFT", href: "/craft" },
  { name: "STORY", href: "/story" },
  { name: "JOURNAL", href: "/journal" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactBtnRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  // Determine which nav item is active based on current path
  const getActiveItem = () => {
    if (!pathname || pathname === "/") return "HOME";
    if (pathname.startsWith("/collection") || pathname.startsWith("/watch")) return "COLLECTION";
    if (pathname.startsWith("/craft")) return "CRAFT";
    if (pathname.startsWith("/story")) return "STORY";
    if (pathname.startsWith("/journal")) return "JOURNAL";
    return "HOME";
  };

  const activeItem = getActiveItem();

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
            ? "py-3 bg-white/45 dark:bg-[#181819]/70 backdrop-blur-xl border-b border-white/60 dark:border-white/10 shadow-sm"
            : "py-5 sm:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* SUMERI Wordmark with Scramble Text on Hover */}
          <Link href="/" className="flex items-center gap-2.5 group" data-cursor="link">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-[#0b0b14] dark:bg-white text-white dark:text-[#181819] shadow-sm transition-colors">
              <Compass className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </span>
            <ScrambleText
              scrambleOnHover={true}
              duration={0.6}
              speed={0.03}
              className="font-display text-2xl sm:text-3xl tracking-[0.24em] text-[#0b0b14] dark:text-white font-semibold uppercase leading-none transition-colors"
            >
              SUMERI
            </ScrambleText>
          </Link>

          {/* Center Liquid Glass Pill Navigation with Shared Sliding Active Indicator */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full glass-pill-nav relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.name;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-cursor="link"
                  className={`relative px-4 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-colors z-10 ${
                    isActive
                      ? "text-white font-medium"
                      : "text-[#0b0b14]/70 hover:text-[#0b0b14] dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  {/* Shared Liquid Glass Sliding Active Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLiquidPill"
                      className="absolute inset-0 rounded-full bg-[#0b0b14] dark:bg-[#1f1f7d] shadow-[0_4px_16px_rgba(11,11,20,0.22)] dark:shadow-[0_4px_16px_rgba(31,31,125,0.4)] -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                        mass: 0.75,
                      }}
                    >
                      {/* Subtle Inner Highlight for Liquid Glass Feel */}
                      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                      <div className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                    </motion.div>
                  )}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: MorphButton Theme Switcher + Magnetic Contact Pill */}
          <div className="hidden md:flex items-center gap-3">
            {/* Morphing Theme Button */}
            <MorphButton />

            <Link
              ref={contactBtnRef}
              href="/contact"
              data-cursor="link"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0b0b14] dark:bg-white text-white dark:text-[#181819] hover:bg-[#1a1a2e] dark:hover:bg-white/90 transition-colors font-mono text-xs font-semibold tracking-widest uppercase shadow-sm"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Right Controls: Compact MorphButton + Hamburger Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <MorphButton showLabel={false} />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#0b0b14] dark:text-white hover:opacity-80 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b0b14]/95 dark:bg-[#0d1a41]/95 backdrop-blur-2xl flex flex-col justify-between p-8 text-white">
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
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`transition-colors ${
                  activeItem === item.name ? "text-[#2a4bd7] dark:text-[#3b82f6]" : "hover:text-[#2a4bd7] dark:hover:text-[#3b82f6]"
                }`}
              >
                {item.name.charAt(0) + item.name.slice(1).toLowerCase()}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-white/70 uppercase tracking-wider">Appearance</span>
              <MorphButton />
            </div>

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
