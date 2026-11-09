"use client";

import type { ReactNode } from "react";
import type { DemoPlayer } from "./use-demo-player";

type Props = {
  player: DemoPlayer;
  /** Short label for the fake window's title bar, e.g. "Proposal generator". */
  title: string;
  /** Plain-language summary of what the animation shows, read by screen readers. */
  summary: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Tone of the stage behind the demo. "app" is the dark app surface; "paper" adds no padding. */
  padded?: boolean;
  /**
   * Set when the demo contains real controls (like an audio play button). The content is then
   * exposed to assistive tech instead of being hidden as decoration.
   */
  interactive?: boolean;
  /** Runs alongside the player's own replay, for demos that also need to reset media. */
  onReplay?: () => void;
  /** Replaces the title bar's Replay button, for demos that run their own play, pause, and replay. */
  control?: ReactNode;
};

function ReplayIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

/**
 * The window chrome every demo sits in. Dark surface, hairline border, a title bar with a
 * replay button, and an optional caption underneath. The player attaches to the root so
 * the IntersectionObserver watches the whole frame.
 */
export function DemoFrame({
  player,
  title,
  summary,
  caption,
  children,
  className = "",
  padded = true,
  interactive = false,
  onReplay,
  control,
}: Props) {
  const { attach, replay: replayTimeline, done, isStatic, reduced } = player;
  const replay = () => {
    onReplay?.();
    replayTimeline();
  };
  const showReplay = !isStatic && !reduced;
  return (
    <figure className={`m-0 ${className}`}>
      <div
        ref={attach}
        className="demo-stage @container relative overflow-hidden rounded-[var(--radius)] border border-border bg-surface"
      >
        <div className="flex h-10 items-center justify-between gap-3 border-b border-border/80 px-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex shrink-0 gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </span>
            <span className="truncate text-[12.5px] font-medium tracking-[0.01em] text-muted">{title}</span>
          </div>
          {control ? (
            control
          ) : showReplay ? (
            <button
              type="button"
              onClick={replay}
              className={`inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-medium transition-colors ${
                done
                  ? "border-accent text-accent hover:bg-accent/20"
                  : "border-border text-muted hover:border-muted hover:text-text"
              }`}
              aria-label={`Replay the ${title} demo`}
            >
              <ReplayIcon className="h-3.5 w-3.5" />
              Replay
            </button>
          ) : null}
        </div>
        <div className={`relative ${padded ? "p-3 @md:p-4" : ""}`}>
          <p className="sr-only">{summary}</p>
          {interactive ? children : <div aria-hidden>{children}</div>}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
