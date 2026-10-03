import { EngineeringArchitecture } from "@/components/sections/EngineeringArchitecture";
import { CraftSection } from "@/components/sections/CraftSection";
import { SpecsMarquee } from "@/components/sections/SpecsMarquee";

export default function CraftPage() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <EngineeringArchitecture />
      <CraftSection />
      <SpecsMarquee />
    </div>
  );
}
