export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[800px] mx-auto bg-white/60 backdrop-blur-md rounded-[32px] p-8 sm:p-14 border border-white/80">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0b0b14] mb-8">
          Cookie Policy
        </h1>
        <div className="font-sans text-sm text-[#0b0b14]/80 leading-relaxed flex flex-col gap-6">
          <p>
            SUMERI utilizes minimal, functional cookies to preserve session state,
            such as preloader status, colorway selections, and UI preferences.
          </p>
          <p>
            No third-party behavioral profiling trackers are active without explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
}
