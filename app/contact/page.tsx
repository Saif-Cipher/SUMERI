"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[#0b0b14]/30" />
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase">
            CONCIERGE & INQUIRIES
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#0b0b14] leading-[0.92] mb-12">
          Private{" "}
          <span className="font-serif italic font-medium accent-gradient-text">
            Acquisitions.
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white/50 backdrop-blur-xl p-8 sm:p-12 rounded-[32px] border border-white/80 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-12 h-12 text-[#2a4bd7] mb-4" />
                <h3 className="font-display text-3xl font-medium text-[#0b0b14] mb-2">
                  Inquiry Dispatched
                </h3>
                <p className="font-sans text-sm text-[#0b0b14]/70 max-w-sm">
                  Our private horological concierge will contact you within 24 hours regarding stock allocation and delivery arrangements.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold tracking-wider text-[#0b0b14]/70 uppercase">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Tariq Ahmed"
                      className="px-4 py-3 rounded-xl bg-white/70 border border-white text-sm text-[#0b0b14] focus:outline-none focus:border-[#2a4bd7]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-semibold tracking-wider text-[#0b0b14]/70 uppercase">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="tariq@example.com"
                      className="px-4 py-3 rounded-xl bg-white/70 border border-white text-sm text-[#0b0b14] focus:outline-none focus:border-[#2a4bd7]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs font-semibold tracking-wider text-[#0b0b14]/70 uppercase">
                    Interested Timepiece / Reference
                  </label>
                  <input
                    type="text"
                    defaultValue="Casio Duro Marlin Batman (MDV-106B-1A1V)"
                    className="px-4 py-3 rounded-xl bg-white/70 border border-white text-sm text-[#0b0b14] focus:outline-none focus:border-[#2a4bd7]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs font-semibold tracking-wider text-[#0b0b14]/70 uppercase">
                    Message / Delivery City
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify any questions or delivery instructions..."
                    className="px-4 py-3 rounded-xl bg-white/70 border border-white text-sm text-[#0b0b14] focus:outline-none focus:border-[#2a4bd7]"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="link"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-colors font-mono text-xs font-semibold tracking-wider uppercase shadow-md mt-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-semibold text-[#0b0b14]">
                Concierge Protocols
              </h3>
              <p className="font-sans text-sm text-[#0b0b14]/75 leading-relaxed">
                All timepieces are sealed and pressure-tested prior to release.
                Orders nationwide include physical package inspection upon receipt
                before acceptance.
              </p>

              <div className="flex flex-col gap-4 font-mono text-xs text-[#0b0b14]/80 pt-4 border-t border-black/10">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#2a4bd7]" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#2a4bd7]" />
                  <span>+880 1700-000000 (10 AM - 8 PM)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#2a4bd7]" />
                  <span>curator@sumeri.com</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/30 border border-white/60 font-mono text-[11px] text-[#0b0b14]/70">
              <span className="font-bold text-[#0b0b14] block mb-1">
                AUTHENTICITY PLEDGE
              </span>
              Every piece carries our 1-year mechanical caliber warranty and 200M pressure verification seal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
