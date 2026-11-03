"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type DemoPlayer = {
  /** Pass as the `ref` of the element that should trigger playback when scrolled into view. */
  attach: (node: HTMLDivElement | null) => void;
  /** Elapsed milliseconds, clamped to the duration. Every demo derives its state from this. */
  t: number;
  duration: number;
  done: boolean;
  /** True when the visitor prefers reduced motion. The demo then shows its final state. */
  reduced: boolean;
  /** True when the demo is rendered as a static final-state snapshot (tiles, grids). */
  isStatic: boolean;
  replay: () => void;
  /** t >= ms */
  at: (ms: number) => boolean;
  /** 0..1 linear progress between two timestamps. */
  progress: (start: number, end: number) => number;
};

type Options = {
  /** Render the final state immediately and never animate. */
  isStatic?: boolean;
  threshold?: number;
};

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A tiny timeline player. Starts when the element is at least `threshold` visible,
 * pauses when it scrolls away, resumes when it comes back, and can be replayed.
 * Re-renders at most ~30 times a second while playing and not at all once done.
 */
export function useDemoPlayer(duration: number, { isStatic = false, threshold = 0.35 }: Options = {}): DemoPlayer {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [t, setT] = useState(isStatic ? duration : 0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(0);
  const offsetRef = useRef(isStatic ? duration : 0);

  useEffect(() => {
    if (isStatic) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        offsetRef.current = duration;
        setT(duration);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [duration, isStatic]);

  useEffect(() => {
    if (isStatic || !node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, isStatic]);

  useEffect(() => {
    if (isStatic || reduced || !visible) return;
    if (offsetRef.current >= duration) {
      setT(duration);
      return;
    }
    let raf = 0;
    let last = -1;
    const start = performance.now() - offsetRef.current;
    const tick = (now: number) => {
      const elapsed = Math.min(duration, now - start);
      offsetRef.current = elapsed;
      if (elapsed - last >= 33 || elapsed === duration) {
        last = elapsed;
        setT(elapsed);
      }
      if (elapsed < duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, run, reduced, duration, isStatic]);

  const replay = useCallback(() => {
    if (isStatic || reduced) return;
    offsetRef.current = 0;
    setT(0);
    setRun((r) => r + 1);
  }, [isStatic, reduced]);

  const at = useCallback((ms: number) => t >= ms, [t]);
  const progress = useCallback((start: number, end: number) => clamp01((t - start) / (end - start)), [t]);

  return { attach: setNode, t, duration, done: t >= duration, reduced, isStatic, replay, at, progress };
}

/** Eases a 0..1 value for nicer count-ups. */
export const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** Formats a dollar amount the way the real tools do: $24,850.00 */
export const money = (n: number, cents = true) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
