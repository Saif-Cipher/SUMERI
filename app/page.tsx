import { Hero } from "@/components/hero/Hero";
import { Statement } from "@/components/sections/Statement";
import { WaterfallShowcase } from "@/components/sections/WaterfallShowcase";
import { CraftSection } from "@/components/sections/CraftSection";
import { SpecsMarquee } from "@/components/sections/SpecsMarquee";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { JournalTeaser } from "@/components/sections/JournalTeaser";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* H2: HERO (3-Column Luxury Presentation with Remotion-Rendered 3D Watch Video) */}
      <Hero />

      {/* H3: STATEMENT (Sticky Full-Width Editorial Horological Creed) */}
      <Statement />

      {/* H4: WATERFALL SHOWCASE (Pinned Scroll-Driven Perspective Waterfall Deck) */}
      <WaterfallShowcase />

      {/* H5: CRAFT (Interactive Exploded View & Engineering Architecture) */}
      <CraftSection />

      {/* H6: SPECS & MARQUEE (Giant Numerals & Continuous Horological Marquee) */}
      <SpecsMarquee />

      {/* H7: REVIEWS (Editorial Field Evaluation & Critique Slider) */}
      <ReviewsSection />

      {/* H8: JOURNAL (3-Card Horological Dispatch Teaser) */}
      <JournalTeaser />
    </div>
  );
}
