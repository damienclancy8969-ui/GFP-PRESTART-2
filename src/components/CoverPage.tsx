import { GfpLogo } from "./GfpLogo";
import { useSelectionStore } from "../state/useSelectionStore";

export function CoverPage() {
  const clientName = useSelectionStore((s) => s.clientName);
  const jobNumber = useSelectionStore((s) => s.jobNumber);
  const setClientName = useSelectionStore((s) => s.setClientName);
  const setJobNumber = useSelectionStore((s) => s.setJobNumber);

  return (
    <section className="page-card">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <label className="flex items-center gap-2 text-[13px] text-stone-700">
          <span className="font-semibold">Client Surname:</span>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-40 border-b border-stone-400 bg-transparent px-1 py-0.5 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <label className="flex items-center gap-2 text-[13px] text-stone-700">
          <span className="font-semibold">Job No#:</span>
          <input
            value={jobNumber}
            onChange={(e) => setJobNumber(e.target.value)}
            className="w-32 border-b border-stone-400 bg-transparent px-1 py-0.5 focus:border-brand-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="relative mx-4 mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br from-stone-300 via-stone-200 to-amber-100 sm:mx-8 sm:mb-8">
        <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="250" fill="#cfd6ce" />
          <rect y="150" width="400" height="100" fill="#8a9a86" opacity="0.5" />
          <polygon points="20,150 380,150 320,60 90,60" fill="#efe6d5" />
          <polygon points="20,150 90,150 90,60" fill="#d8cbae" />
          <rect x="90" y="60" width="230" height="8" fill="#2c2c2c" />
          <rect x="150" y="95" width="120" height="55" fill="#20242a" opacity="0.85" />
          <rect x="270" y="70" width="14" height="80" fill="#2c2c2c" />
          <rect x="60" y="90" width="18" height="40" fill="#20242a" opacity="0.6" />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-6">
          <span className="rounded-full bg-black/40 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
            Concept render — your finished design will be shown here once selections are complete
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 px-8 pb-14 pt-4 text-center sm:pb-20">
        <GfpLogo className="scale-125" />
        <div>
          <p className="font-display text-2xl font-semibold text-brand-700 sm:text-3xl">Specification Selection Book</p>
          <div className="mx-auto mt-3 h-px w-40 bg-brand-400/60" />
        </div>
        <p className="max-w-md text-[13px] text-stone-600">Your one-stop-shop for all things granny flats &amp; tiny homes</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">Digital Edition</p>
      </div>
    </section>
  );
}
