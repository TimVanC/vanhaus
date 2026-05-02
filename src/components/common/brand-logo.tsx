type BrandLogoProps = {
  size?: "base" | "sm";
};

export function BrandLogo({ size = "base" }: BrandLogoProps) {
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-3 tracking-[-0.02em] ${isSmall ? "text-base" : "text-[19px]"} font-bold`}
    >
      <span className="rounded-md border border-zinc-700 bg-white/[0.02] px-2 py-1 font-mono text-sm leading-none font-medium text-white">
        &lt;v<span className="text-[var(--accent)]">/</span>h&gt;
      </span>
      <span>
        <span className="text-white">van</span>
        <span className="text-[var(--accent)]">haus</span>
      </span>
    </span>
  );
}
