type BrandLogoProps = {
  size?: "base" | "lg";
};

/** The wordmark. Shape stays; colors come from the palette. */
export function BrandLogo({ size = "base" }: BrandLogoProps) {
  return (
    <span
      className={`inline-block font-sans font-bold leading-none tracking-[-0.03em] ${
        size === "lg" ? "text-[32px]" : "text-[26px]"
      }`}
    >
      <span className="text-text">van</span>
      <span className="text-accent">haus</span>
    </span>
  );
}
