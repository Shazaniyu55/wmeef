type StarProps = {
  className?: string;
  strokeWidth?: number;
};

/**
 * Eight-point star (khatam) — the foundation's signature geometric motif,
 * drawn from Islamic ornamental tradition. Used as a divider and watermark.
 */
export function StarMotif({ className = "", strokeWidth = 1.5 }: StarProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {/* Two overlaid squares form the eight-point star */}
      <rect x="22" y="22" width="56" height="56" />
      <rect
        x="22"
        y="22"
        width="56"
        height="56"
        transform="rotate(45 50 50)"
      />
      <circle cx="50" cy="50" r="38" strokeOpacity="0.5" />
      <circle cx="50" cy="50" r="6" />
    </svg>
  );
}

/** A horizontal divider centred on the star motif. */
export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 text-gold ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
      <StarMotif className="h-7 w-7" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}
