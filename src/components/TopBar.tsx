import { GfpLogo } from "./GfpLogo";
import { useSelectionStore } from "../state/useSelectionStore";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function TopBar() {
  const clientName = useSelectionStore((s) => s.clientName);
  const jobNumber = useSelectionStore((s) => s.jobNumber);
  const setClientName = useSelectionStore((s) => s.setClientName);
  const setJobNumber = useSelectionStore((s) => s.setJobNumber);

  return (
    <div className="no-print sticky top-0 z-30 border-b border-brand-200/70 bg-[#f4f1e9]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="shrink-0">
          <GfpLogo className="h-9 origin-left scale-[0.55] sm:scale-[0.65]" />
        </button>

        <div className="hidden flex-1 items-center justify-center gap-3 sm:flex">
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client surname"
            className="w-40 rounded-md border border-brand-200 bg-white/70 px-2.5 py-1.5 text-[12.5px] focus:border-brand-400 focus:outline-none"
          />
          <input
            value={jobNumber}
            onChange={(e) => setJobNumber(e.target.value)}
            placeholder="Job No#"
            className="w-32 rounded-md border border-brand-200 bg-white/70 px-2.5 py-1.5 text-[12.5px] focus:border-brand-400 focus:outline-none"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => scrollTo("visualiser")}
            className="hidden rounded-md px-3 py-1.5 text-[12.5px] font-medium text-brand-700 hover:bg-brand-100 sm:block"
          >
            3D Visualiser
          </button>
          <button
            onClick={() => scrollTo("addendum")}
            className="rounded-md bg-brand-600 px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-brand-700"
          >
            Addendum
          </button>
        </div>
      </div>
    </div>
  );
}
