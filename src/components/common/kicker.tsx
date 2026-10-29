/** Small section label: a short copper rule and plain text. */
export function Kicker({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[14px] text-muted ${className}`}>
      <span className="h-px w-8 shrink-0 bg-accent" aria-hidden />
      {children}
    </p>
  );
}
