"use client";

const SPECS = [
  { value: "200 M", label: "HYDROSTATIC DEPTH RATING" },
  { value: "316L", label: "SURGICAL STAINLESS STEEL" },
  { value: "60 C", label: "UNIDIRECTIONAL ROTARY BEZEL" },
  { value: "3 H", label: "ANALOGUE HANDS + DATE DISC" },
];

const MARQUEE_ITEMS = [
  "200-METER HYDROSTATIC RESISTANCE",
  "UNIDIRECTIONAL RATSET DIVER BEZEL",
  "SCREW-DOWN SECURITY CROWN",
  "HIGH-VISIBILITY PHOSPHOR LUME",
  "316L MARINE STAINLESS STEEL",
  "HEAVY-DUTY WATERPROOF RESIN",
  "JAPANESE QUARTZ TIMEKEEPING",
  "DUAL O-RING CHAMBER SEAL",
];

export function SpecsMarquee() {
  return (
    <section className="relative z-20 py-20 border-y border-[#0b0b14]/10 bg-white/20 backdrop-blur-md overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {SPECS.map((spec, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0b0b14] leading-none mb-2">
                {spec.value}
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-widest text-[#0b0b14]/60 uppercase">
                {spec.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Running Marquee */}
      <div className="flex w-full overflow-hidden select-none border-t border-[#0b0b14]/10 pt-6">
        <div className="flex shrink-0 animate-marquee items-center gap-12 whitespace-nowrap">
          {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span className="font-display text-xl sm:text-2xl tracking-[0.18em] text-[#0b0b14]/80 font-medium uppercase">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#2a4bd7]" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
