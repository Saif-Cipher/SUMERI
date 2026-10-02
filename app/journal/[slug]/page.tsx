import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return [
    { slug: "hydrostatic-testing-200m" },
    { slug: "forged-carbon-dial-architecture" },
    { slug: "super-titanium-duratect-chronicle" },
  ];
}

const ARTICLES_MAP: Record<
  string,
  { title: string; category: string; date: string; content: string[]; image: string }
> = {
  "hydrostatic-testing-200m": {
    title: "The Physics of 200-Meter Water Resistance and Gasket Integrity",
    category: "HOROLOGY LOG",
    date: "OCTOBER 2026",
    image: "/images_nobg/01_watchzone_Casio_Duro_Marlin_Diver_s_Batman_Black_Dial_Men_s_Watch.png",
    content: [
      "At a depth of 200 meters, hydrostatic pressure reaches 20 atmospheres—roughly 290 pounds per square inch exerted uniformly across every millimeter of the watch case.",
      "To prevent moisture intrusion into the sensitive quartz movement and dial chamber, the Duro Marlin utilizes a screw-down threaded crown equipped with dual internal nitrile gaskets. As the crown threads into the case sleeve, the O-rings compress against precision-machined steel stops.",
      "Furthermore, the screw-down caseback features continuous helical threading. The caseback gasket compresses into a recessed channel, ensuring that increasing external oceanic pressure actually forces the steel plate tighter against the seal rather than dislodging it.",
    ],
  },
  "forged-carbon-dial-architecture": {
    title: "Structural Density: Forged Carbon Composites in Modern Tool Calibers",
    category: "MATERIALS SCIENCE",
    date: "SEPTEMBER 2026",
    image: "/images_nobg/02_watchzone_Casio_Edifice_Automatic_Forged_Carbon_Black_Dial_Men_s_.png",
    content: [
      "Forged carbon differs fundamentally from traditional woven carbon fiber sheets. Instead of layered fabric impregnated with resin, forged carbon utilizes chopped carbon filaments suspended in high-grade liquid polymer.",
      "Subjected to extreme heat and over 60 tons of compression force per square inch, the filaments orient randomly in three dimensions. This yields a material that boasts exceptional torsional rigidity with a distinctly marbled, non-repeating visual signature on every dial.",
    ],
  },
  "super-titanium-duratect-chronicle": {
    title: "Super Titanium and Duratect: The Evolution of Scratch-Resistant Space Metals",
    category: "METALLURGY",
    date: "AUGUST 2026",
    image: "/images_nobg/04_watchzone_Citizen_Zenshin_60_Automatic_Copper_Dial_Super_Titanium.png",
    content: [
      "Pure titanium offers remarkable strength-to-weight ratios and hypoallergenic properties, but possesses a relatively soft natural surface susceptible to hairline desk-diver scratches.",
      "Through patented surface hardening technology, Super Titanium ion-plates the substrate with a specialized gas-phase plasma treatment. The resulting hardness exceeds 1,000 Vickers—five times harder than 316L stainless steel—while remaining 40% lighter on the wrist.",
    ],
  },
};

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES_MAP[slug] || ARTICLES_MAP["hydrostatic-testing-200m"];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[900px] mx-auto">
        <Link
          href="/journal"
          data-cursor="link"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#0b0b14]/60 hover:text-[#0b0b14] uppercase mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[#0b0b14]/60">
          <span className="font-bold text-[#2a4bd7] uppercase tracking-widest">
            {article.category}
          </span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0b0b14] leading-[1.02] mb-12">
          {article.title}
        </h1>

        <div className="relative h-80 sm:h-96 w-full rounded-[28px] overflow-hidden bg-white/60 p-8 mb-12 border border-white/80 shadow-sm flex items-center justify-center">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="font-sans text-base sm:text-lg text-[#0b0b14]/85 leading-relaxed flex flex-col gap-6">
          {article.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
