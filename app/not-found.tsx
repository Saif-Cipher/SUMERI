import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#2a4bd7] uppercase mb-4">
        ERROR · 404
      </span>
      <h1 className="font-display text-6xl sm:text-8xl font-normal tracking-tight text-[#0b0b14] leading-none mb-6">
        Lost at{" "}
        <span className="font-serif italic font-medium accent-gradient-text">
          Depth.
        </span>
      </h1>
      <p className="font-sans text-sm text-[#0b0b14]/75 max-w-sm mb-8 leading-relaxed">
        The coordinate you are searching for does not exist in the SUMERI horological catalog.
      </p>
      <Link
        href="/"
        data-cursor="link"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0b0b14] text-white hover:bg-[#1a1a2e] transition-colors font-mono text-xs font-semibold uppercase shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Surface</span>
      </Link>
    </div>
  );
}
