export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[800px] mx-auto bg-white/60 backdrop-blur-md rounded-[32px] p-8 sm:p-14 border border-white/80">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0b0b14] mb-8">
          Privacy Policy
        </h1>
        <div className="font-sans text-sm text-[#0b0b14]/80 leading-relaxed flex flex-col gap-6">
          <p>
            At SUMERI, we honor the privacy of every client and collector.
            Any personal information collected during inquiry, consultation, or acquisition
            is handled with absolute discretion.
          </p>
          <h2 className="font-display text-2xl font-medium text-[#0b0b14]">
            Data Collection & Usage
          </h2>
          <p>
            We collect only essential details necessary to facilitate product inquiries,
            authenticity verification, and direct courier dispatch. We do not sell or monetize client data.
          </p>
          <h2 className="font-display text-2xl font-medium text-[#0b0b14]">
            Security Protocols
          </h2>
          <p>
            All electronic communications and order records are encrypted using industry-standard protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
