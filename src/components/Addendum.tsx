import { useMemo } from "react";
import { useSelectionStore, totalSubsectionCount, completedSubsectionCount } from "../state/useSelectionStore";
import { buildAddendum, estimateUpgradeTotal } from "../utils/addendum";
import { groupOrder } from "../data/catalogue";
import { GfpLogo } from "./GfpLogo";

export function Addendum() {
  const selections = useSelectionStore((s) => s.selections);
  const clientName = useSelectionStore((s) => s.clientName);
  const jobNumber = useSelectionStore((s) => s.jobNumber);

  const categories = useMemo(() => buildAddendum(selections), [selections]);
  const { total, hasPoa } = useMemo(() => estimateUpgradeTotal(categories), [categories]);
  const done = completedSubsectionCount(selections);
  const totalFields = totalSubsectionCount();
  const today = useMemo(() => new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }), []);

  return (
    <section id="addendum" className="page-card scroll-mt-24">
      <header className="flex items-stretch justify-between bg-brand-600">
        <div className="flex flex-col justify-center px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-200">Auto-generated</p>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Construction Addendum</h2>
        </div>
        <div className="flex w-40 shrink-0 items-center justify-center bg-white/95 px-3 py-3 sm:w-48">
          <GfpLogo className="h-16 w-16" />
        </div>
      </header>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-brand-200/60 pb-5">
          <div className="text-[13px] text-stone-700">
            <p>
              <span className="font-semibold">Client:</span> {clientName || "—"}
            </p>
            <p>
              <span className="font-semibold">Job No#:</span> {jobNumber || "—"}
            </p>
            <p>
              <span className="font-semibold">Date generated:</span> {today}
            </p>
          </div>
          <div className="text-right text-[13px] text-stone-700">
            <p className="font-semibold">{done} / {totalFields} selections recorded</p>
            <p className="text-stone-500">
              Estimated upgrade total: <span className="font-semibold text-gold-600">${total.toLocaleString()}</span>
              {hasPoa && <span className="text-stone-400"> + POA items</span>}
            </p>
          </div>
        </div>

        <div className="no-print mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => window.print()}
            className="rounded-md bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-700"
          >
            Print / Export as PDF
          </button>
          <p className="flex items-center text-[12px] text-stone-500">
            This document is generated live from the client's pre-start selections and is intended to be attached to
            the building contract as an addendum.
          </p>
        </div>

        {categories.length === 0 && (
          <p className="rounded-lg border border-dashed border-brand-300 bg-white/50 px-4 py-6 text-center text-[13px] text-stone-500">
            No selections recorded yet. As the client works through each category above, their choices will appear
            here automatically.
          </p>
        )}

        {groupOrder.map((group) => {
          const cats = categories.filter((c) => c.group === group);
          if (cats.length === 0) return null;
          return (
            <div key={group} className="mb-7 break-inside-avoid">
              <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">{group}</h3>
              <div className="overflow-hidden rounded-lg border border-brand-200/60">
                {cats.map((cat, ci) => (
                  <div key={cat.title} className={ci > 0 ? "border-t border-brand-200/60" : ""}>
                    <div className="bg-brand-50 px-4 py-2 text-[12.5px] font-semibold text-brand-800">{cat.title}</div>
                    <table className="w-full text-[12.5px]">
                      <tbody>
                        {cat.lines.map((line, i) => (
                          <tr key={i} className={i > 0 ? "border-t border-brand-100" : ""}>
                            <td className="w-1/3 px-4 py-2 align-top text-stone-500">{line.label}</td>
                            <td className="px-4 py-2 align-top text-stone-800">
                              {line.value}
                              {line.tier === "upgrade" && (
                                <span className="ml-2 rounded-full bg-gold-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-gold-600">
                                  Upgrade
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-right align-top font-medium text-stone-600">
                              {line.priceNote ?? ""}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-8 border-t border-brand-200/60 pt-4 text-[11px] italic text-stone-400">
          Items selected at pre-start are subject to final confirmation. Please refer to this Addendum for finalised
          selections — changes made after the pre-start meeting may incur an admin fee.
        </div>
      </div>
    </section>
  );
}
