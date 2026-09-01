import type { ReactElement } from "react";
import type { IconKey } from "../types";

interface Props {
  icon: IconKey;
  className?: string;
}

// Minimal line-art glyphs used as stand-ins for real product photography.
// Swap for supplier images later by rendering an <img> when option.image is set.
const paths: Record<IconKey, ReactElement> = {
  cladding: (
    <g>
      <path d="M6 4v16M10 4v16M14 4v16M18 4v16" />
    </g>
  ),
  roof: <path d="M3 15 12 5l9 10M6 15v4h12v-4" />,
  paint: <path d="M6 3h8l2 4-2 3H8L6 10zM10 10v11" />,
  window: <path d="M4 4h16v16H4zM12 4v16M4 12h16" />,
  door: <path d="M6 3h9v18H6zM12.5 12h.01" />,
  handle: <path d="M6 4h3v6H6zM9 7h9M17 6.2a1.6 1.6 0 1 1 0 1.6" />,
  robe: <path d="M4 3h16v18H4zM12 3v18M8 12v.01M16 12v.01" />,
  downlight: <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />,
  switch: <path d="M7 3h10v18H7zM12 8v4" />,
  gpo: <path d="M5 6h14v12H5zM9.5 11v2M14.5 11v2" />,
  tap: <path d="M6 20V9a5 5 0 0 1 10 0M16 9v3M6 15h4M6 15v5" />,
  shower: <path d="M4 8a8 8 0 0 1 16 0M6 12v.01M9 12v.01M12 12v.01M15 12v.01M18 12v.01M7 16v.01M10 16v.01M13 16v.01M16 16v.01M8 20v.01M12 20v.01M16 20v.01" />,
  toilet: <path d="M7 3h8v6H7zM6 9h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" />,
  basin: <path d="M4 12h16M6 12V8h12v4M11 21h2M9 16a3 3 0 0 0 6 0" />,
  bath: <path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM5 12V8a2 2 0 0 1 2-2M17 21v1M7 21v1" />,
  mirror: <path d="M6 3h12v18H6z" />,
  sink: <path d="M3 9h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6zM12 9V4M12 4h3" />,
  laundry: <path d="M5 3h14v18H5zM12 14a4 4 0 1 0 0-.01M8 6h.01M11 6h.01" />,
  stone: <path d="M12 3 21 9l-3 9H6L3 9z" />,
  vanity: <path d="M4 4h16v14H4zM4 12h16M9 4v8M15 4v8" />,
  cabinet: <path d="M5 3h14v18H5zM12 3v18M9 12v.01M15 12v.01" />,
  oven: <path d="M4 4h16v16H4zM4 9h16M9 6h.01M12 6h.01" />,
  cooktop: <path d="M4 5h16v14H4zM8 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM13 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM8 15a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM13 15a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />,
  rangehood: <path d="M4 4h16l-3 6H7zM10 10v10M14 10v10" />,
  tile: <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />,
  cornice: <path d="M4 20 20 4M4 20h16M4 20V4" />,
  niche: <path d="M4 8h16v8H4z" />,
  skylight: <path d="M3 15 12 6l9 9M6 15v5h12v-5M10 10.5h4v4h-4z" />,
  skirting: <path d="M3 16h18v4H3zM3 16l2-3h14l2 3" />,
  paver: <path d="M3 5h8v6H3zM11 5h10v6H11zM3 13h6v6H3zM9 13h8v6H9zM17 13h4v6h-4z" />,
  towel: <path d="M5 6h14M6 6v11a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6M6 3v3" />,
};

export function ProductIcon({ icon, className = "w-6 h-6" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[icon]}
    </svg>
  );
}
