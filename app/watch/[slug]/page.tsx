import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { WATCH_CATALOG } from "@/data/watch-data";
import { ArrowLeft, ArrowRight, ShieldCheck, Droplets, Compass, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return WATCH_CATALOG.map((w) => ({
    slug: w.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const watch = WATCH_CATALOG.find((w) => w.slug === slug);

  if (!watch) {
    notFound();
  }

  const relatedWatches = WATCH_CATALOG.filter((w) => w.id !== watch.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1560px] mx-auto">
        
        {/* Back Link */}
        <Link
          href="/collection"
          data-cursor="link"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#0b0b14]/60 hover:text-[#0b0b14] uppercase mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </Link>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Visual Stage */}
          <div className="lg:col-span-7 bg-white/45 backdrop-blur-xl rounded-[32px] p-8 sm:p-14 border border-white/80 shadow-[0_20px_50px_rgba(11,11,20,0.06)] flex items-center justify-center min-h-[520px] sm:min-h-[620px] relative overflow-hidden">
            <div className="relative w-full max-w-[460px] h-[440px] sm:h-[540px]">
              <Image
                src={watch.image}
                alt={watch.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain drop-shadow-[0_25px_40px_rgba(11,11,20,0.22)]"
              />
            </div>

            {/* Spec Badge */}
            <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-white/80 border border-white font-mono text-xs font-semibold text-[#0b0b14]">
              {watch.waterResistance}
            </div>
          </div>

          {/* Right Column: Specs & Inquiry */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold tracking-widest text-[#2a4bd7] uppercase">
                {watch.brand}
              </span>
              <span className="text-[#0b0b14]/30">/</span>
              <span className="font-mono text-xs text-[#0b0b14]/60 uppercase">
                {watch.category}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0b0b14] leading-[0.95] mb-4">
              {watch.model}
            </h1>

            <span className="font-mono text-2xl font-bold text-[#0b0b14] mb-6 block">
              {watch.price}
            </span>

            <p className="font-sans text-sm sm:text-base text-[#0b0b14]/75 leading-relaxed mb-8">
              {watch.description}
            </p>

            {/* Acquisition CTA */}
            <div className="flex flex-col gap-4 mb-10 pb-10 border-b border-black/10">
              <Link
                href="/contact"
                data-cursor="link"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-colors font-mono text-xs font-semibold tracking-wider uppercase shadow-md"
              >
                <span>Enquire about this timepiece</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-[10px] text-[#0b0b14]/50 text-center">
                IN STOCK · SHIPS NATIONWIDE WITH PHYSICAL INSPECTION
              </span>
            </div>

            {/* Horological Specifications Table */}
            <div className="flex flex-col gap-3 font-sans text-xs">
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-[#0b0b14]/60">Case Material</span>
                <span className="font-medium text-[#0b0b14]">{watch.caseMaterial}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-[#0b0b14]/60">Bezel Architecture</span>
                <span className="font-medium text-[#0b0b14]">{watch.bezel}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-[#0b0b14]/60">Crystal</span>
                <span className="font-medium text-[#0b0b14]">{watch.crystal}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-[#0b0b14]/60">Caliber / Movement</span>
                <span className="font-medium text-[#0b0b14]">{watch.movement}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5">
                <span className="text-[#0b0b14]/60">Strap / Bracelet</span>
                <span className="font-medium text-[#0b0b14]">{watch.strap}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Watches */}
        <div className="border-t border-black/10 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0b0b14]">
              Related Timepieces
            </h3>
            <Link
              href="/collection"
              data-cursor="link"
              className="font-mono text-xs font-semibold text-[#2a4bd7] uppercase"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedWatches.map((rw) => (
              <Link
                key={rw.id}
                href={`/watch/${rw.slug}`}
                data-cursor="view"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/40 hover:bg-white/70 border border-white transition-all"
              >
                <div className="relative h-20 w-16 flex-shrink-0">
                  <Image
                    src={rw.image}
                    alt={rw.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#0b0b14]/50 uppercase">{rw.brand}</span>
                  <span className="font-display text-base font-medium text-[#0b0b14] leading-tight group-hover:text-[#2a4bd7] transition-colors">{rw.model}</span>
                  <span className="font-mono text-xs font-semibold text-[#0b0b14] mt-1">{rw.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
