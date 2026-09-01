import type { SwatchOption } from "../types";
import { ProductIcon } from "./ProductIcon";
import { contrastText } from "../utils/color";
import { useLightboxStore } from "../state/useLightboxStore";

interface Props {
  option: SwatchOption;
  selected: boolean;
  onClick: () => void;
}

function pinterestUrl(query: string): string {
  return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
}

export function SwatchCard({ option, selected, onClick }: Props) {
  const fg = contrastText(option.hex);
  const openLightbox = useLightboxStore((s) => s.open);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-pressed={selected}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-white/70 text-left transition
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

      {option.image ? (
        <div className="relative h-32 w-full overflow-hidden p-2" style={{ backgroundColor: option.hex ?? "#f4f2ec" }}>
          <img src={option.image} alt={option.name} className="h-full w-full object-contain" loading="lazy" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox({ src: option.image!, alt: option.name });
            }}
            aria-label={`Expand image of ${option.name}`}
            className="absolute bottom-1.5 left-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-stone-600 opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM20 20l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 7v6M7 10h6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : (
        option.hex && (
          <div
            className="flex h-16 w-full items-center justify-center"
            style={{ backgroundColor: option.hex, color: fg }}
          >
            {option.icon && <ProductIcon icon={option.icon} className="h-7 w-7 opacity-80" />}
          </div>
        )
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
        {option.inspoQuery && (
          <a
            href={pinterestUrl(option.inspoQuery)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-1.5 inline-flex w-fit items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Click here for inspo
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
        {option.inspoNote && <span className="mt-1 text-[10.5px] italic leading-snug text-stone-400">{option.inspoNote}</span>}
      </div>
    </div>
  );
}
