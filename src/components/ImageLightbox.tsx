import { useEffect } from "react";
import { useLightboxStore } from "../state/useLightboxStore";

export function ImageLightbox() {
  const image = useLightboxStore((s) => s.image);
  const close = useLightboxStore((s) => s.close);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [image, close]);

  if (!image) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        onClick={close}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
      />
      {image.alt && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-[12.5px] text-white">
          {image.alt}
        </p>
      )}
    </div>
  );
}
