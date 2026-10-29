import { STATUS_LINE } from "@/lib/constants";

/** Small availability indicator. No glow, no animation. */
export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[14px] text-muted ${className}`}>
      <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden>
        <span className="absolute inset-0 rounded-full bg-accent/30" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {STATUS_LINE}
    </span>
  );
}
