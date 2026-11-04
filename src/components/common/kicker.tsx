/** Small section label: a short, thick accent rule and accent text. */
export function Kicker({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[14px] font-medium tracking-[0.01em] text-accent ${className}`}>
      <span className="h-[3px] w-10 shrink-0 rounded-full bg-accent" aria-hidden />
      {children}
    </p>
  );
}
