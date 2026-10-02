export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[800px] mx-auto bg-white/60 backdrop-blur-md rounded-[32px] p-8 sm:p-14 border border-white/80">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0b0b14] mb-8">
          Terms of Service
        </h1>
        <div className="font-sans text-sm text-[#0b0b14]/80 leading-relaxed flex flex-col gap-6">
          <p>
            Welcome to SUMERI. By accessing this platform and viewing our horological catalog,
            you agree to adhere to these terms.
          </p>
          <h2 className="font-display text-2xl font-medium text-[#0b0b14]">
            Authenticity & Pricing
          </h2>
          <p>
            All displayed timepieces are sourced authentically. Listed prices in Bangladeshi Taka (৳)
            reflect current market valuations and include inspection protocols.
          </p>
          <h2 className="font-display text-2xl font-medium text-[#0b0b14]">
            Warranty Coverage
          </h2>
          <p>
            Every piece carries a 1-year movement warranty covering caliber defects and water resistance seal failures.
          </p>
        </div>
      </div>
    </div>
  );
}
