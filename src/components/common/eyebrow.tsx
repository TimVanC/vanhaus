type EyebrowProps = {
  number: string;
  label: string;
};

export function Eyebrow({ number, label }: EyebrowProps) {
  return (
    <div className="mb-7 inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.02em] text-zinc-400">
      <span className="text-[var(--accent)]">[</span>
      <span className="text-zinc-500">{number}</span>
      <span>{label}</span>
      <span className="text-[var(--accent)]">]</span>
    </div>
  );
}
