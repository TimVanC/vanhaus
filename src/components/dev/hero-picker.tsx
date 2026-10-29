/**
 * TEMPORARY. Review-only switcher for the two hero directions.
 * Delete this file and its import in page.tsx once a direction is chosen.
 */
const options = [
  { href: "/", label: "Both" },
  { href: "/?hero=a", label: "A: Editorial" },
  { href: "/?hero=b", label: "B: Workshop" },
];

export function HeroPicker({ active }: { active: "a" | "b" | "both" }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-border bg-surface p-1 text-[13px] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      {options.map((option) => {
        const key = option.href.includes("hero=a") ? "a" : option.href.includes("hero=b") ? "b" : "both";
        const isActive = key === active;
        return (
          <a
            key={option.href}
            href={option.href}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              isActive ? "bg-accent text-on-accent" : "text-muted hover:text-text"
            }`}
          >
            {option.label}
          </a>
        );
      })}
    </div>
  );
}

export function DirectionLabel({ children }: { children: string }) {
  return (
    <div className="border-y border-dashed border-border bg-surface/60">
      <div className="container-site flex h-10 items-center text-[12px] uppercase tracking-[0.12em] text-muted">
        {children}
      </div>
    </div>
  );
}
