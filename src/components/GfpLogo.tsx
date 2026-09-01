interface Props {
  className?: string;
}

export function GfpLogo({ className = "h-16 w-16" }: Props) {
  return (
    <img src="/products/gfp-logo.jpg" alt="Granny Flats Perth" className={`object-contain mix-blend-multiply ${className}`} />
  );
}
