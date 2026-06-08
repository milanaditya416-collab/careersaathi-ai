type Props = { className?: string; size?: number; opacity?: number };

export function Mandala({ className = "", size = 400, opacity = 0.08 }: Props) {
  return (
    <svg
      className={`pointer-events-none absolute animate-mandala-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.87 0.16 88)" />
          <stop offset="100%" stopColor="oklch(0.55 0.11 82)" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="url(#mg)" strokeWidth="0.5">
        <circle cx="100" cy="100" r="20" />
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="60" />
        <circle cx="100" cy="100" r="80" />
        <circle cx="100" cy="100" r="95" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          return (
            <g key={i} transform={`rotate(${(i * 360) / 12} 100 100)`}>
              <line x1="100" y1="20" x2="100" y2="95" />
              <circle cx="100" cy="30" r="3" />
              <circle cx="100" cy="50" r="5" />
              <path d="M100 70 Q110 80 100 95 Q90 80 100 70" />
            </g>
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`p${i}`} transform={`rotate(${(i * 360) / 8 + 22.5} 100 100)`}>
            <ellipse cx="100" cy="55" rx="8" ry="20" />
          </g>
        ))}
      </g>
    </svg>
  );
}
