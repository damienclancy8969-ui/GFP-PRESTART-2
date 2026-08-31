import type { SwatchOption } from "../types";
import { ProductIcon } from "./ProductIcon";
import { contrastText } from "../utils/color";

interface Props {
  option: SwatchOption;
  selected: boolean;
  onClick: () => void;
}

export function SwatchCard({ option, selected, onClick }: Props) {
  const fg = contrastText(option.hex);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex flex-col overflow-hidden rounded-lg border bg-white/70 text-left transition
        ${selected ? "border-gold-500 ring-2 ring-gold-400/70" : "border-brand-200/70 hover:border-brand-400"}`}
    >
      <span
        className={`absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded border-2 transition
          ${selected ? "border-gold-500 bg-gold-500" : "border-gold-500/80 bg-white/70"}`}
      >
        {selected && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M2 6l2.5 3L10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>

      {option.hex && (
        <div
          className="flex h-16 w-full items-center justify-center"
          style={{ backgroundColor: option.hex, color: fg }}
        >
          {option.icon && <ProductIcon icon={option.icon} className="h-7 w-7 opacity-80" />}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-0.5 px-2.5 py-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[13px] font-medium leading-tight text-stone-900">{option.name}</span>
        </div>
        {option.code && <span className="text-[11px] text-stone-500">{option.code}</span>}
        {option.description && (
          <span className="text-[11px] leading-snug text-stone-500">{option.description}</span>
        )}
        {option.priceNote && (
          <span
            className={`mt-1 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide
              ${option.priceNote === "Included" ? "bg-brand-100 text-brand-700" : "bg-gold-500/15 text-gold-600"}`}
          >
            {option.priceNote}
          </span>
        )}
      </div>
    </button>
  );
}
