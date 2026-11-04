"use client";

import type { CSSProperties, ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Small presentational pieces shared by the demos. Everything is driven by
   booleans or 0..1 progress values derived from the player's elapsed time, so
   CSS transitions do the actual animating.
   --------------------------------------------------------------------------- */

type AppearProps = {
  show: boolean;
  children: ReactNode;
  className?: string;
  /** Direction the element enters from. */
  from?: "up" | "down" | "left" | "right" | "scale" | "none";
  style?: CSSProperties;
  as?: "div" | "tr" | "li" | "span";
};

const fromClass: Record<NonNullable<AppearProps["from"]>, string> = {
  up: "translate-y-2",
  down: "-translate-y-2",
  left: "-translate-x-3",
  right: "translate-x-3",
  scale: "scale-95",
  none: "",
};

/** Fades and slides children in once `show` flips to true. */
export function Appear({ show, children, className = "", from = "up", style, as = "div" }: AppearProps) {
  const Tag = as;
  return (
    <Tag
      className={`transition-[opacity,transform] duration-500 ease-out ${
        show ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${fromClass[from]}`
      } ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

/** Text that types itself out as `progress` moves from 0 to 1. */
export function Typed({
  text,
  progress,
  caret = true,
  className = "",
}: {
  text: string;
  progress: number;
  caret?: boolean;
  className?: string;
}) {
  const count = Math.round(text.length * progress);
  const typing = progress > 0 && progress < 1;
  return (
    <span className={className}>
      {text.slice(0, count)}
      {caret && typing ? (
        <span className="demo-caret ml-px inline-block h-[1em] w-px translate-y-[0.15em] bg-current" aria-hidden />
      ) : null}
    </span>
  );
}

/** Dark app style input with a small uppercase label, like the forms in the real tools. */
export function Field({
  label,
  children,
  className = "",
  active = false,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span className={`block min-w-0 ${className}`}>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">{label}</span>
      <span
        className={`mt-1 flex h-8 items-center truncate rounded-[7px] border bg-bg px-2.5 text-[12.5px] text-text transition-colors duration-300 ${
          active ? "border-accent" : "border-border"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

/** A chip that lights up in the accent color when selected. */
export function Chip({
  children,
  selected = false,
  className = "",
}: {
  children: ReactNode;
  selected?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[11.5px] font-medium transition-colors duration-300 ${
        selected ? "border-accent bg-accent text-on-accent" : "border-border text-muted"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Small status pill. */
export function Pill({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "accent" | "good" | "info";
  className?: string;
}) {
  const tones = {
    muted: "border-border text-muted",
    accent: "border-accent/80 bg-accent/25 text-text",
    good: "border-[#7fb58a]/50 bg-[#7fb58a]/15 text-[#9fd0a8]",
    info: "border-[#7aa7c7]/50 bg-[#7aa7c7]/15 text-[#a9cde6]",
  };
  return (
    <span
      className={`inline-flex h-5 items-center gap-1 whitespace-nowrap rounded-full border px-2 text-[10px] font-semibold tracking-[0.02em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** A button that looks pressed when `pressed` is true. */
export function FakeButton({
  children,
  primary = true,
  pressed = false,
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  primary?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3.5 text-[12px] font-semibold transition-[transform,opacity,background-color] duration-200 ${
        primary ? "bg-accent text-on-accent" : "border border-border text-text"
      } ${pressed ? "scale-95 bg-accent-hover" : ""} ${disabled ? "opacity-40" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

/** Mouse pointer that glides between positions (percent of the stage). */
export function Cursor({ x, y, visible, pressed = false }: { x: number; y: number; visible: boolean; pressed?: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute z-20 transition-[left,top,opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        visible ? "opacity-100" : "opacity-0"
      } ${pressed ? "scale-90" : ""}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <path
          d="M2 1.5 15.5 11.4l-6 .9 3.3 6.3-2.6 1.3-3.3-6.3-4.3 4.2Z"
          fill="#f2ece4"
          stroke="#16130f"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** A light "paper" email card with a from line, subject, and body. */
export function EmailCard({
  show,
  from,
  to,
  subject,
  children,
  attachments = [],
  className = "",
}: {
  show: boolean;
  from: string;
  to: string;
  subject: string;
  children: ReactNode;
  attachments?: string[];
  className?: string;
}) {
  return (
    <Appear
      show={show}
      from="up"
      className={`rounded-[10px] bg-text text-bg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="border-b border-bg/10 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-3 text-[10.5px] text-bg/60">
          <span className="truncate">From: {from}</span>
          <span className="shrink-0">Just now</span>
        </div>
        <div className="mt-0.5 truncate text-[10.5px] text-bg/60">To: {to}</div>
        <div className="mt-1 truncate text-[12.5px] font-semibold">{subject}</div>
      </div>
      <div className="px-3.5 py-2.5 text-[11px] leading-[1.5] text-bg/85">{children}</div>
      {attachments.length ? (
        <div className="flex flex-wrap gap-1.5 border-t border-bg/10 px-3.5 py-2.5">
          {attachments.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 rounded-md border border-bg/15 bg-bg/5 px-2 py-0.5 text-[10px] font-medium"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21.4 11.1 12.3 20.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
              </svg>
              {name}
            </span>
          ))}
        </div>
      ) : null}
    </Appear>
  );
}

/** Progress bar in app style. */
export function Bar({ value, className = "", tone = "accent" }: { value: number; className?: string; tone?: "accent" | "good" }) {
  return (
    <span className={`block h-1.5 w-full overflow-hidden rounded-full bg-border ${className}`}>
      <span
        className={`block h-full rounded-full transition-[width] duration-300 ease-out ${tone === "good" ? "bg-[#7fb58a]" : "bg-accent"}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </span>
  );
}

/** Check mark in an accent circle. */
export function CheckBadge({ show, className = "" }: { show: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-300 ${
        show ? "scale-100" : "scale-0"
      } ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

/** Initials avatar used instead of any real photo. */
export function Avatar({ initials, size = 40, className = "" }: { initials: string; size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent/30 font-display font-bold text-text ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      aria-hidden
    >
      {initials}
    </span>
  );
}
