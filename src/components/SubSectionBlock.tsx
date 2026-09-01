import type { SubSection } from "../types";
import { useSelectionStore } from "../state/useSelectionStore";
import { SwatchCard } from "./SwatchCard";

export function SubSectionBlock({ sub }: { sub: SubSection }) {
  const selections = useSelectionStore((s) => s.selections);
  const chooseSingle = useSelectionStore((s) => s.chooseSingle);
  const setOtherText = useSelectionStore((s) => s.setOtherText);
  const setNote = useSelectionStore((s) => s.setNote);
  const setQty = useSelectionStore((s) => s.setQty);
  const toggleLineItem = useSelectionStore((s) => s.toggleLineItem);
  const setItemNote = useSelectionStore((s) => s.setItemNote);

  const value = selections[sub.id] ?? {};

  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        {sub.heading && (
          <h3 className="font-display text-[15px] font-semibold text-stone-900">{sub.heading}</h3>
        )}
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider
            ${sub.tier === "standard" ? "bg-brand-100 text-brand-700" : "bg-gold-500/15 text-gold-600"}`}
        >
          {sub.tier === "standard" ? "Included" : "Optional Upgrade"}
        </span>
      </div>
      {sub.body && <p className="mb-3 max-w-2xl text-[13px] leading-relaxed text-stone-600">{sub.body}</p>}

      {sub.warning && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-gold-500/40 bg-gold-500/10 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-stone-700">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M12 9v4M12 16.5v.01M10.3 4.5 2.9 17.2a1.8 1.8 0 0 0 1.56 2.7h15.1a1.8 1.8 0 0 0 1.56-2.7L13.7 4.5a1.8 1.8 0 0 0-3.4 0Z" strokeLinejoin="round" />
          </svg>
          <p>{sub.warning}</p>
        </div>
      )}

      {(sub.mode === "single" || sub.mode === "multiple") && sub.options && (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
          {sub.options.map((opt) => (
            <SwatchCard
              key={opt.id}
              option={opt}
              selected={value.optionId === opt.id || !!value.optionIds?.includes(opt.id)}
              onClick={() => chooseSingle(sub.id, opt.id)}
            />
          ))}
        </div>
      )}

      {sub.allowOther && (
        <div className="mt-3 flex items-center gap-2">
          <span className="h-4 w-4 shrink-0 rounded border-2 border-gold-500/80" />
          <input
            type="text"
            placeholder={sub.otherLabel ?? "Other"}
            value={value.otherText ?? ""}
            onChange={(e) => setOtherText(sub.id, e.target.value)}
            className="w-full max-w-sm rounded-md border border-brand-200 bg-white/70 px-2.5 py-1.5 text-[13px] text-stone-800 placeholder:text-stone-400 focus:border-brand-400 focus:outline-none"
          />
        </div>
      )}

      {sub.mode === "lineItems" && sub.lineItems && (
        <div className="flex flex-col divide-y divide-brand-200/60 overflow-hidden rounded-lg border border-brand-200/60 bg-white/60">
          {sub.lineItems.map((li) => {
            const checked = value.optionIds?.includes(li.id) ?? false;
            const qty = value.qty?.[li.id] ?? 0;
            return (
              <div key={li.id} className="flex flex-col gap-2 px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => toggleLineItem(sub.id, li.id)}
                    className="flex flex-1 items-center gap-2.5 text-left"
                  >
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border-2 ${
                        checked ? "border-gold-500 bg-gold-500" : "border-gold-500/80"
                      }`}
                    >
                      {checked && (
                        <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M2 6l2.5 3L10 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[13px] text-stone-800">{li.label}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    {li.priceNote && (
                      <span className="whitespace-nowrap text-[11px] font-semibold text-gold-600">{li.priceNote}</span>
                    )}
                    {li.hasQty && (
                      <input
                        type="number"
                        min={0}
                        value={qty}
                        onChange={(e) => setQty(sub.id, li.id, Math.max(0, Number(e.target.value)))}
                        className="w-14 rounded-md border border-brand-200 bg-white px-1.5 py-1 text-center text-[12px]"
                        placeholder="Qty"
                      />
                    )}
                  </div>
                </div>
                {sub.allowNotes && checked && (
                  <input
                    type="text"
                    value={value.itemNotes?.[li.id] ?? ""}
                    onChange={(e) => setItemNote(sub.id, li.id, e.target.value)}
                    placeholder="Where should this go? (optional note)"
                    className="ml-[26px] rounded-md border border-brand-200 bg-white px-2.5 py-1.5 text-[12px] text-stone-800 placeholder:text-stone-400 focus:border-brand-400 focus:outline-none"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {sub.mode === "text" && sub.allowNote && (
        <textarea
          value={value.note ?? ""}
          onChange={(e) => setNote(sub.id, e.target.value)}
          placeholder="Notes for this category (optional)"
          rows={2}
          className="w-full max-w-xl rounded-md border border-brand-200 bg-white/70 px-2.5 py-2 text-[13px] text-stone-800 placeholder:text-stone-400 focus:border-brand-400 focus:outline-none"
        />
      )}
    </div>
  );
}
