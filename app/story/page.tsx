import { Statement } from "@/components/sections/Statement";

export default function StoryPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[#0b0b14]/30" />
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0b0b14]/70 uppercase">
            BRAND FOUNDATION
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#0b0b14] leading-[0.92] mb-12">
          The Architecture of{" "}
          <span className="font-serif italic font-medium accent-gradient-text">
            Endurance.
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-base text-[#0b0b14]/80 leading-relaxed mb-16">
          <p>
            SUMERI was conceived on a singular premise: horological credibility should not require
            compromise between functional pressure limits and architectural restraint.
            A diver watch must remain true to its nautical origins—capable of withstanding 200 meters of
            hydrostatic tension—while possessing the refined proportionality demanded of contemporary dress horology.
          </p>
          <p>
            We curate and assemble pieces that reject ephemeral trends. By utilizing solid 316L surgical steel,
            forged carbon composites, and individually tested dual-gasket crowns, each SUMERI caliber
            stands as a permanent record of mechanical integrity.
          </p>
        </div>

        <Statement />
      </div>
    </div>
  );
}
