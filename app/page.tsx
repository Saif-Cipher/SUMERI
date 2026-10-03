import { Hero } from "@/components/hero/Hero";
import { Statement } from "@/components/sections/Statement";
import { WaterfallShowcase } from "@/components/sections/WaterfallShowcase";
import { EngineeringArchitecture } from "@/components/sections/EngineeringArchitecture";
import { CraftSection } from "@/components/sections/CraftSection";
import { SpecsMarquee } from "@/components/sections/SpecsMarquee";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { JournalTeaser } from "@/components/sections/JournalTeaser";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* H2: HERO (3-Column Presentation · Floating Three-Watch Selector with Morph Transition) */}
      <Hero />

      {/* H3: STATEMENT (Sticky Full-Width Editorial Horological Creed) */}
      <Statement />

      {/* H4: WATERFALL SHOWCASE (Pinned Scroll-Driven Perspective Waterfall Deck) */}
      <WaterfallShowcase />

      {/* H5: ENGINEERING ARCHITECTURE (Second Watch: Citizen Zenshin 60 Super Titanium + 4 Technical Pillars) */}
      <EngineeringArchitecture />

      {/* H6: CRAFT (5-Card Cascading Staggered Deck · Physical Watch Craft Details) */}
      <CraftSection />

      {/* H7: SPECS & MARQUEE (Giant Numerals & Continuous Horological Marquee) */}
      <SpecsMarquee />

      {/* H8: REVIEWS (Editorial Field Evaluation & Critique Slider) */}
      <ReviewsSection />

      {/* H9: JOURNAL (3-Card Horological Dispatch Teaser) */}
      <JournalTeaser />
    </div>
  );
}
