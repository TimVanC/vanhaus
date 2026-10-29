import { ArrowRight } from "@/components/common/icons";
import { BOOKING_URL, CTA_LABEL } from "@/lib/constants";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-200 ease-out";

const sizes = {
  md: "h-11 px-5 text-[14px]",
  lg: "h-[54px] px-7 text-[15.5px]",
};

type Size = keyof typeof sizes;

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** The primary CTA. Points at BOOKING_URL, so swapping in a Cal.com link is a one-line change. */
export function BookCallLink({ size = "lg", className = "" }: { size?: Size; className?: string }) {
  const external = isExternal(BOOKING_URL);
  return (
    <a
      href={BOOKING_URL}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${base} ${sizes[size]} group bg-accent text-on-accent hover:bg-accent-hover ${className}`}
    >
      {CTA_LABEL}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

export function SecondaryLink({
  href,
  children,
  size = "lg",
  className = "",
}: {
  href: string;
  children: ReactNode;
  size?: Size;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${base} ${sizes[size]} border border-border text-text hover:border-muted ${className}`}
    >
      {children}
    </a>
  );
}
