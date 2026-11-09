"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DemoFrame } from "./demo-frame";
import { EmailCard } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import {
  AVA_AUDIO_SRC,
  AVA_CALL_LENGTH,
  AVA_CONTEXT,
  AVA_ENVELOPE,
  AVA_ENVELOPE_STEP,
  AVA_SUMMARY,
  AVA_TRANSCRIPT,
} from "./ava-data";
import { useDemoPlayer } from "./use-demo-player";

/**
 * The AI receptionist demo. It starts playing, muted, when it scrolls into view, pauses when it
 * scrolls away, and resumes when it comes back. A sound button turns the audio on. The
 * recording drives a large waveform scrolling past a center playhead, with the line being
 * spoken overlaid as a caption. When the call ends the wave fades out and the office summary
 * email fades in. The title bar control reads Pause and Resume, then animates into Replay.
 * Visitors who prefer reduced motion get a play button instead of auto-play.
 */

const LEN = AVA_CALL_LENGTH;

/* Bars on screen at once, each one AVA_ENVELOPE_STEP ms of audio. The playhead sits in the middle. */
const BARS = 72;
const HALF = BARS / 2;

/* Who is speaking during each 100 ms slice, so played bars take that speaker's color. */
const speakerAt = AVA_ENVELOPE.map((_, k) => {
  const ms = k * AVA_ENVELOPE_STEP + AVA_ENVELOPE_STEP / 2;
  return AVA_TRANSCRIPT.find((l) => ms >= l.start - 120 && ms <= l.end + 120)?.who ?? null;
});

type Phase = "idle" | "playing" | "paused" | "ended";

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const iconClass = (on: boolean) =>
  `absolute inset-0 transition-[opacity,transform] duration-300 ease-out ${on ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`;

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 4v16l13-8z" />
    </svg>
  );
}

function PauseGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  );
}

function ReplayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

function SpeakerGlyph({ off, className = "" }: { off: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" />
      {off ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
    </svg>
  );
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export function AvaDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  /* The shared player only provides the frame's scroll hook here; this demo runs on its own clock. */
  const player = useDemoPlayer(LEN, { isStatic: true });
  const audioRef = useRef<HTMLAudioElement>(null);

  const [phase, setPhase] = useState<Phase>(isStatic ? "ended" : "idle");
  const [ms, setMs] = useState(isStatic ? LEN : 0);
  /* If the browser refuses to play the audio, the animation still runs, silently. */
  const [silent, setSilent] = useState(false);
  const silentClock = useRef({ start: 0, offset: 0 });
  /* Sound is off until the visitor turns it on. */
  const [muted, setMuted] = useState(true);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
  /* The frame node, watched so the call starts in view and pauses out of view. */
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const autoPaused = useRef(false);

  /* Drive the visuals from the audio (or the silent clock) while playing. */
  useEffect(() => {
    if (phase !== "playing") return;
    let raf = 0;
    const tick = (now: number) => {
      if (silent) {
        const t = silentClock.current.offset + (now - silentClock.current.start);
        if (t >= LEN) {
          setMs(LEN);
          setPhase("ended");
          return;
        }
        setMs(t);
      } else {
        const audio = audioRef.current;
        if (audio) setMs(audio.currentTime * 1000);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, silent]);

  const runSilently = (from: number) => {
    silentClock.current = { start: performance.now(), offset: from };
    setSilent(true);
  };

  const start = (withSound = !muted) => {
    setMs(0);
    setSilent(false);
    setPhase("playing");
    autoPaused.current = false;
    const audio = audioRef.current;
    if (!audio) {
      runSilently(0);
      return;
    }
    audio.muted = !withSound;
    audio.currentTime = 0;
    audio.play().catch(() => runSilently(0));
  };

  const pause = () => {
    if (silent) silentClock.current.offset = ms;
    else audioRef.current?.pause();
    setPhase("paused");
  };

  const resume = () => {
    setPhase("playing");
    if (silent) {
      silentClock.current.start = performance.now();
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    audio.play().catch(() => runSilently(ms));
  };

  /* Jump to any point in the call. Seeking back after the end hides the summary and pauses there. */
  const seek = (target: number) => {
    const t = Math.min(Math.max(target, 0), LEN);
    setMs(t);
    const audio = audioRef.current;
    if (silent || !audio) silentClock.current = { start: performance.now(), offset: t };
    else audio.currentTime = t / 1000;
    if ((phase === "ended" || phase === "idle") && t < LEN) {
      autoPaused.current = false;
      setPhase("paused");
    }
  };

  /* Drag the wave like a voice memo: pull right to go back, left to skip ahead. */
  const drag = useRef<{ x: number; from: number; width: number } | null>(null);
  const onWavePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isStatic) return;
    drag.current = { x: e.clientX, from: ms, width: e.currentTarget.getBoundingClientRect().width };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onWavePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const pitch = d.width / BARS;
    seek(d.from - ((e.clientX - d.x) / pitch) * AVA_ENVELOPE_STEP);
  };
  const endDrag = () => {
    drag.current = null;
  };

  const onControl = () => {
    autoPaused.current = false;
    if (phase === "playing") pause();
    else if (phase === "paused") resume();
    else start();
  };

  const playWithSound = () => {
    setMuted(false);
    start(true);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = next;
    /* If the audio had been refused and we fell back to the silent clock, try the real audio now. */
    if (!next && silent && phase === "playing") {
      audio.currentTime = ms / 1000;
      audio
        .play()
        .then(() => setSilent(false))
        .catch(() => undefined);
    }
  };

  /* Latest state for the scroll watcher, which is set up once per frame node. */
  const latest = useRef({ phase, reduced, start, pause, resume });
  useEffect(() => {
    latest.current = { phase, reduced, start, pause, resume };
  });

  useEffect(() => {
    if (isStatic || !node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        const { phase: current, reduced: prefersReduced, start: begin, pause: hold, resume: carryOn } = latest.current;
        if (visible) {
          if (current === "idle" && !prefersReduced) begin(false);
          else if (current === "paused" && autoPaused.current) {
            autoPaused.current = false;
            carryOn();
          }
        } else if (current === "playing") {
          autoPaused.current = true;
          hold();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, isStatic]);

  const label = phase === "idle" ? "Play" : phase === "playing" ? "Pause" : phase === "paused" ? "Resume" : "Replay";
  const showSummary = phase === "ended";

  /* The waveform window: bars from HALF slices before the playhead to HALF after. */
  const position = ms / AVA_ENVELOPE_STEP;
  const first = Math.floor(position) - HALF;
  const fraction = position - Math.floor(position);
  const windowBars = Array.from({ length: BARS + 1 }, (_, j) => {
    const k = first + j;
    const level = k >= 0 && k < AVA_ENVELOPE.length ? AVA_ENVELOPE[k] : 0;
    return { k, level, played: k * AVA_ENVELOPE_STEP <= ms && phase !== "idle", who: k >= 0 ? speakerAt[k] : null };
  });

  /* The caption is the line most recently started, held until the next one begins. */
  const currentIndex = phase === "idle" ? -1 : AVA_TRANSCRIPT.reduce((idx, line, i) => (ms >= line.start ? i : idx), -1);
  const currentLine = currentIndex >= 0 ? AVA_TRANSCRIPT[currentIndex] : null;

  const status =
    phase === "idle"
      ? "Press play to hear the call"
      : phase === "playing"
        ? "Playing"
        : phase === "paused"
          ? "Paused"
          : "Call ended. Summary sent to the office.";

  const control = isStatic ? null : (
    <button
      type="button"
      onClick={onControl}
      aria-label={`${label} the call recording`}
      className={`inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-medium transition-colors duration-300 ${
        phase === "ended" ? "border-accent text-accent hover:bg-accent/20" : "border-border text-text hover:border-muted"
      }`}
    >
      <span className="relative h-3.5 w-3.5" aria-hidden>
        <PlayGlyph className={iconClass(phase === "idle" || phase === "paused")} />
        <PauseGlyph className={iconClass(phase === "playing")} />
        <ReplayGlyph className={iconClass(phase === "ended")} />
      </span>
      <span key={label} className="demo-label">
        {label}
      </span>
    </button>
  );

  return (
    <DemoFrame
      player={{ ...player, attach: setNode }}
      title="Ava, AI receptionist"
      summary="A sample call to Ava, the AI receptionist. It plays with the sound off when it scrolls into view; use the sound button to hear it. A waveform scrolls by with each line of the conversation shown as a caption, then the summary email for the office appears."
      caption={hideCaption ? undefined : "Every detail read back to the caller. The summary lands in the office inbox."}
      interactive
      control={control}
      padded={false}
    >
      {AVA_AUDIO_SRC ? (
        <audio
          ref={audioRef}
          src={AVA_AUDIO_SRC}
          preload="none"
          onTimeUpdate={(e) => {
            if (phase === "playing" && !silent) setMs(e.currentTarget.currentTime * 1000);
          }}
          onEnded={() => {
            setMs(LEN);
            setPhase("ended");
          }}
        />
      ) : null}

      {/* The full transcript for screen readers; the captions below are visual only. */}
      <ol className="sr-only">
        {AVA_TRANSCRIPT.map((line) => (
          <li key={line.start}>
            {line.who === "ai" ? "Ava" : "Caller"}: {line.text}
          </li>
        ))}
      </ol>

      <div className="relative h-[470px] overflow-hidden @md:h-[400px]">
        <p className="absolute left-4 right-4 top-3 m-0 text-[11.5px] text-muted">{AVA_CONTEXT}</p>

        {/* The call: scrolling waveform with the caption (or the play button) on top */}
        <div
          className={`absolute inset-x-0 bottom-[88px] top-9 flex items-center transition-[opacity,transform] duration-500 ease-out ${
            showSummary ? "pointer-events-none scale-[0.97] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div
            className={`relative h-[200px] w-full touch-pan-y select-none @md:h-[230px] ${isStatic ? "" : "cursor-grab active:cursor-grabbing"}`}
            onPointerDown={onWavePointerDown}
            onPointerMove={onWavePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className="absolute inset-y-0 left-0 flex items-center gap-[2px]"
              style={{ width: `${((BARS + 1) / BARS) * 100}%`, transform: `translateX(-${(fraction / (BARS + 1)) * 100}%)` }}
              aria-hidden
            >
              {windowBars.map((bar) => {
                const near = Math.abs(bar.k - Math.floor(position)) <= 1;
                const color = !bar.played
                  ? "bg-text/15"
                  : bar.who === "ai"
                    ? "bg-accent"
                    : bar.who === "caller"
                      ? "bg-text/85"
                      : "bg-text/30";
                return (
                  <span
                    key={bar.k}
                    className={`min-w-0 flex-1 rounded-full ${color} ${near && bar.played && bar.level > 0 ? "brightness-125" : ""}`}
                    style={{ height: `${Math.max(2, bar.level * 100)}%` }}
                  />
                );
              })}
            </div>

            {/* Playhead and soft edges */}
            <span className="absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_2px_rgba(147,173,133,0.45)]" aria-hidden />
            <span className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-surface to-transparent" aria-hidden />
            <span className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-surface to-transparent" aria-hidden />

            <div className="absolute inset-0 flex items-center justify-center px-4">
              {phase === "idle" && !isStatic ? (
                <button
                  type="button"
                  onClick={playWithSound}
                  className="group flex flex-col items-center gap-3 rounded-[18px] border border-border/70 bg-bg/80 px-6 py-5 text-center shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                  aria-label="Play the call recording with sound"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-200 group-hover:scale-105">
                    <PlayGlyph className="h-6 w-6 translate-x-[2px]" />
                  </span>
                  <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-text">Play the call</span>
                  <span className="-mt-2 text-[12px] text-muted">40 seconds, with sound</span>
                </button>
              ) : currentLine ? (
                <div
                  key={currentIndex}
                  className="demo-caption max-w-[min(92%,560px)] rounded-[14px] border border-border/70 bg-bg/80 px-4 py-3 text-center shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-sm @md:px-6"
                  aria-hidden
                >
                  <span
                    className={`block text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
                      currentLine.who === "ai" ? "text-accent" : "text-muted"
                    }`}
                  >
                    {currentLine.who === "ai" ? "Ava" : "Caller"}
                  </span>
                  <span className="mt-1 block font-display text-[clamp(16px,4.4cqw,22px)] font-semibold leading-[1.3] tracking-[-0.01em] text-text text-balance">
                    {currentLine.text}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* After the call: the summary email takes the same spot, just after the wave fades */}
        <div
          className={`absolute inset-x-0 bottom-[88px] top-9 flex items-center justify-center px-3 transition-[opacity,transform] duration-700 ease-out @md:px-4 ${
            showSummary ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-3 opacity-0"
          }`}
          aria-live="polite"
        >
          <EmailCard
            show={showSummary}
            from="Ava <ava@company.example>"
            to="office@company.example"
            subject={AVA_SUMMARY.subject}
            className="w-full max-w-[460px]"
          >
            <dl className="m-0 grid grid-cols-[78px_1fr] gap-x-2 gap-y-0.5">
              {AVA_SUMMARY.fields.map(([fieldLabel, value]) => (
                <div key={fieldLabel} className="contents">
                  <dt className="text-bg/55">{fieldLabel}</dt>
                  <dd className="m-0">{value}</dd>
                </div>
              ))}
              <dt className="text-bg/55">Next step</dt>
              <dd className="m-0 font-semibold">{AVA_SUMMARY.nextStep}</dd>
            </dl>
          </EmailCard>
        </div>

        {/* Seek bar: the visible track, with an invisible range input on top for mouse, touch, and keyboard */}
        {!isStatic ? (
          <div className="absolute inset-x-4 bottom-[60px] h-5">
            <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" aria-hidden />
            <span
              className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-accent"
              style={{ width: `${(ms / LEN) * 100}%` }}
              aria-hidden
            />
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent shadow-[0_0_0_3px_rgba(147,173,133,0.25)]"
              style={{ left: `${(ms / LEN) * 100}%` }}
              aria-hidden
            />
            <input
              type="range"
              min={0}
              max={LEN}
              step={100}
              value={Math.round(ms)}
              onChange={(e) => seek(Number(e.currentTarget.value))}
              aria-label="Seek through the call"
              aria-valuetext={`${fmt(ms)} of ${fmt(LEN)}`}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        ) : null}

        {/* Sound toggle and status line */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
          {!isStatic ? (
            <button
              type="button"
              onClick={toggleMute}
              aria-pressed={!muted}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors duration-300 ${
                muted ? "border-accent bg-accent/15 text-accent hover:bg-accent/25" : "border-border text-text hover:border-muted"
              }`}
            >
              <SpeakerGlyph off={muted} className="h-4 w-4" />
              <span key={muted ? "off" : "on"} className="demo-label">
                {muted ? "Turn sound on" : "Sound on"}
              </span>
            </button>
          ) : null}
          <div className="min-w-0 flex-1">
            <span className="block truncate text-[12px] text-text" aria-live="polite">
              {status}
            </span>
            <span className="mt-1 flex items-center gap-3 text-[10.5px] text-muted" aria-hidden>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" /> Ava
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-text/85" /> Caller
              </span>
            </span>
          </div>
          <span className="shrink-0 text-[11px] tabular-nums text-muted" aria-hidden>
            {fmt(ms)} / {fmt(LEN)}
          </span>
        </div>
      </div>
    </DemoFrame>
  );
}
