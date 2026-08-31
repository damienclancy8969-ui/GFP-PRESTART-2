interface Props {
  className?: string;
  mono?: boolean;
}

export function GfpLogo({ className = "", mono = false }: Props) {
  const mountain = mono ? "currentColor" : "#5f7a68";
  const text = mono ? "currentColor" : "#1a1a1a";
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 120 46" width="1em" height="0.38em" className="w-24" aria-hidden>
        <path
          d="M6 40 L34 10 L48 26 L62 6 L94 40"
          fill="none"
          stroke={mountain}
          strokeWidth={3.2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="mt-1 font-sans font-semibold tracking-[0.35em] text-[0.85em] leading-none"
        style={{ color: text }}
      >
        GRANNY
      </div>
      <div className="relative -mt-0.5 flex items-baseline">
        <span
          className="font-sans font-semibold tracking-[0.35em] text-[0.85em] leading-none"
          style={{ color: text }}
        >
          FLATS
        </span>
        <span
          className="ml-1 text-[1.3em] leading-none"
          style={{ fontFamily: "var(--font-script)", color: mountain }}
        >
          Perth
        </span>
      </div>
    </div>
  );
}
