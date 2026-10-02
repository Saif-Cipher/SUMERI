"use client";

import Link from "next/link";
import { Compass, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#0b0b14] text-[#f5f5fd] pt-24 pb-12 px-6 sm:px-10 lg:px-14 overflow-hidden z-20">
      {/* Background radial accent glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, #2a4bd7 0%, #7b3fd9 50%, transparent 70%)",
        }}
      />

      <div className="max-w-[1560px] mx-auto">
        {/* Giant Closing Statement */}
        <div className="border-b border-white/10 pb-16 mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#2a4bd7] uppercase block mb-3">
              ACQUISITIONS & INQUIRIES
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[0.95] max-w-xl">
              Let&apos;s find your{" "}
              <span className="font-serif italic font-normal text-[#2a4bd7]">
                timepiece.
              </span>
            </h2>
          </div>

          {/* Newsletter Input */}
          <div className="w-full max-w-md">
            <p className="font-sans text-xs text-[#8a8d9e] mb-3">
              Receive private notifications for limited caliber releases and new catalog drops.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#2a4bd7] font-mono text-xs transition-colors"
              />
              <button
                type="submit"
                data-cursor="link"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-[#0b0b14] hover:bg-[#2a4bd7] hover:text-white transition-colors flex-shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-20 border-b border-white/10">
          {/* Brand & Purpose (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white text-[#0b0b14]">
                <Compass className="w-3.5 h-3.5" />
              </span>
              <span className="font-display text-2xl tracking-[0.2em] font-semibold text-white uppercase">
                SUMERI
              </span>
            </div>

            <p className="font-sans text-[#8a8d9e] text-sm leading-relaxed max-w-sm">
              SUMERI automatic precision horology. Engineered for 200-meter hydrostatic pressure,
              finished with architectural restraint and enduring physical presence.
            </p>

            <div className="flex flex-col gap-2 font-mono text-xs text-[#b0b4c8] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#2a4bd7]" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2a4bd7]" />
                <span>Concierge: +880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2a4bd7]" />
                <span>curator@sumeri.com</span>
              </div>
            </div>
          </div>

          {/* Collections (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase mb-1">
              COLLECTIONS
            </h4>
            <div className="flex flex-col gap-2 font-sans text-sm text-[#8a8d9e]">
              <Link href="/collection" className="hover:text-white transition-colors">Diver 200M Series</Link>
              <Link href="/collection" className="hover:text-white transition-colors">Forged Carbon</Link>
              <Link href="/collection" className="hover:text-white transition-colors">Super Titanium</Link>
              <Link href="/collection" className="hover:text-white transition-colors">Marlin GMT Series</Link>
              <Link href="/collection" className="hover:text-white transition-colors">All 15 Timepieces</Link>
            </div>
          </div>

          {/* Navigation (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase mb-1">
              EXPERIENCE
            </h4>
            <div className="flex flex-col gap-2 font-sans text-sm text-[#8a8d9e]">
              <Link href="/" className="hover:text-white transition-colors">Hero Exhibition</Link>
              <Link href="/#waterfall" className="hover:text-white transition-colors">Waterfall Deck</Link>
              <Link href="/craft" className="hover:text-white transition-colors">Craft & Materials</Link>
              <Link href="/story" className="hover:text-white transition-colors">Brand Story</Link>
              <Link href="/journal" className="hover:text-white transition-colors">Horological Journal</Link>
            </div>
          </div>

          {/* Assurance (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase mb-1">
              ASSURANCE
            </h4>
            <div className="flex flex-col gap-2 font-sans text-xs text-[#b0b4c8]">
              <span>200M Pressure Tested</span>
              <span>1-Year Official Warranty</span>
              <span>Authenticity Certified</span>
              <span>Secure Nationwide Delivery</span>
              <span>Physical Inspection Policy</span>
            </div>
          </div>

          {/* Legal (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase mb-1">
              LEGAL
            </h4>
            <div className="flex flex-col gap-2 font-sans text-xs text-[#8a8d9e]">
              <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/legal/cookies" className="hover:text-white transition-colors">Cookie Manager</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Giant Wordmark */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8a8d9e]">
          <p>
            &copy; {new Date().getFullYear()} SUMERI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[#b0b4c8] tracking-wider text-[11px]">
            <span className="hover:text-[#2a4bd7] cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-[#2a4bd7] cursor-pointer transition-colors">TWITTER / X</span>
            <span className="hover:text-[#2a4bd7] cursor-pointer transition-colors">LINKEDIN</span>
          </div>
        </div>

        {/* Giant Monolithic SUMERI Typography Parallax */}
        <div className="w-full text-center mt-12 select-none pointer-events-none opacity-[0.04]">
          <span className="font-display text-[15vw] font-bold tracking-[0.22em] leading-none text-white block">
            SUMERI
          </span>
        </div>
      </div>
    </footer>
  );
}
