import { catalogue, groupOrder } from "../data/catalogue";
import { useSelectionStore, completedSubsectionCount, totalSubsectionCount } from "../state/useSelectionStore";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SideNav() {
  const selections = useSelectionStore((s) => s.selections);
  const done = completedSubsectionCount(selections);
  const total = totalSubsectionCount();
  const pct = Math.round((done / total) * 100);

  return (
    <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-64 shrink-0 flex-col overflow-y-auto pb-10 pr-2 lg:flex">
      <button
        onClick={() => scrollTo("visualiser")}
        className="mb-4 flex items-center gap-2 rounded-lg border border-brand-300 bg-white/70 px-3 py-2.5 text-left text-[13px] font-semibold text-brand-700 hover:border-brand-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M3 16.5V7.5L12 3l9 4.5v9L12 21l-9-4.5Z" strokeLinejoin="round" />
          <path d="M3 7.5 12 12l9-4.5M12 12v9" strokeLinejoin="round" />
        </svg>
        3D Design Visualiser
      </button>

      <div className="mb-4 rounded-lg border border-brand-200/70 bg-white/60 px-3 py-2.5">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-brand-700">
          <span>Selections progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
          <div className="h-full rounded-full bg-gold-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {groupOrder.map((group) => (
        <div key={group} className="mb-4">
          <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">{group}</p>
          <ul className="flex flex-col gap-0.5">
            {catalogue
              .filter((c) => c.group === group)
              .map((c) => {
                const catDone = c.subsections.some((s) => {
                  const v = selections[s.id];
                  return v && (v.optionId || (v.optionIds && v.optionIds.length > 0) || v.otherText);
                });
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => scrollTo(c.id)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12.5px] text-stone-600 hover:bg-brand-100/60 hover:text-brand-800"
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${catDone ? "bg-gold-500" : "bg-stone-300"}`} />
                      {c.title}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}

      <button
        onClick={() => scrollTo("addendum")}
        className="mt-1 flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-2.5 text-left text-[13px] font-semibold text-white hover:bg-brand-700"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M6 3h9l5 5v13H6zM14 3v6h6" strokeLinejoin="round" />
        </svg>
        Construction Addendum
      </button>
    </nav>
  );
}
