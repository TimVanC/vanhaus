"use client";

import { useEffect, useRef, useState } from "react";
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
 * The AI receptionist demo. A large waveform built from the real recording scrolls past a
 * center playhead, the line being spoken is overlaid on it as a caption, and when the call
 * ends the wave fades out and the office summary email fades in.
 *
 * On scroll it plays silently on the shared timeline, like the other demos. Pressing play
 * starts the recording from the top, and the audio element then drives the clock.
 */

const LEN = AVA_CALL_LENGTH;
const SUMMARY_DELAY = 700;
const END = LEN + 2600;

/* Bars on screen at once, each one AVA_ENVELOPE_STEP ms of audio. The playhead sits in the middle. */
const BARS = 72;
const HALF = BARS / 2;

/* Who is speaking during each 100 ms slice, so played bars take that speaker's color. */
const speakerAt = AVA_ENVELOPE.map((_, k) => {
  const ms = k * AVA_ENVELOPE_STEP + AVA_ENVELOPE_STEP / 2;
  return AVA_TRANSCRIPT.find((l) => ms >= l.start - 120 && ms <= l.end + 120)?.who ?? null;
});

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor" aria-hidden>
      <path d="M7 4v16l13-8z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  );
}

export function AvaDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(END, { isStatic });
  const audioRef = useRef<HTMLAudioElement>(null);

  /* Once the visitor presses play, the audio drives everything below. */
  const [listening, setListening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioMs, setAudioMs] = useState(0);
  const [audioEnded, setAudioEnded] = useState(false);

  const finalState = (isStatic || player.reduced) && !listening;
  const ms = listening ? audioMs : finalState ? LEN : Math.min(player.t, LEN);
  const showSummary = listening ? audioEnded : finalState || player.t >= LEN + SUMMARY_DELAY;

  /* Smooth sync while the recording plays. timeupdate below is the fallback for background tabs. */
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setAudioMs(audio.currentTime * 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      return;
    }
    if (!listening || audioEnded) {
      audio.currentTime = 0;
      setAudioMs(0);
      setAudioEnded(false);
      setListening(true);
    }
    void audio.play().catch(() => setPlaying(false));
  };

  const resetAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setListening(false);
    setPlaying(false);
    setAudioEnded(false);
    setAudioMs(0);
  };

  /* The waveform window: bars from HALF slices before the playhead to HALF after. */
  const position = ms / AVA_ENVELOPE_STEP;
  const first = Math.floor(position) - HALF;
  const fraction = position - Math.floor(position);
  const windowBars = Array.from({ length: BARS + 1 }, (_, j) => {
    const k = first + j;
    const level = k >= 0 && k < AVA_ENVELOPE.length ? AVA_ENVELOPE[k] : 0;
    return { k, level, played: k * AVA_ENVELOPE_STEP <= ms, who: k >= 0 ? speakerAt[k] : null };
  });

  /* The caption is the line most recently started, held until the next one begins. */
  const currentIndex = AVA_TRANSCRIPT.reduce((idx, line, i) => (ms >= line.start ? i : idx), -1);
  const currentLine = currentIndex >= 0 ? AVA_TRANSCRIPT[currentIndex] : null;

  const status = !listening ? "Press play to hear the call" : playing ? "Playing with sound" : audioEnded ? "Call ended" : "Paused";

  return (
    <DemoFrame
      player={player}
      title="Ava, AI receptionist"
      summary="A sample call to Ava, the AI receptionist. A waveform of the recording scrolls by with each line of the conversation shown as a caption, then the summary email for the office appears. Press play to hear the recording."
      caption={hideCaption ? undefined : "Every detail read back to the caller. The summary lands in the office inbox."}
      interactive
      onReplay={resetAudio}
      padded={false}
    >
      {AVA_AUDIO_SRC ? (
        <audio
          ref={audioRef}
          src={AVA_AUDIO_SRC}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setAudioMs(e.currentTarget.currentTime * 1000)}
          onEnded={() => {
            setPlaying(false);
            setAudioEnded(true);
            setAudioMs(LEN);
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

      <div className="relative h-[450px] overflow-hidden @md:h-[400px]">
        <p className="absolute left-4 right-4 top-3 m-0 text-[11.5px] text-muted">{AVA_CONTEXT}</p>

        {/* The call: scrolling waveform with the caption on top */}
        <div
          className={`absolute inset-x-0 bottom-16 top-9 flex items-center transition-[opacity,transform] duration-700 ease-out ${
            showSummary ? "pointer-events-none scale-[0.97] opacity-0" : "scale-100 opacity-100"
          }`}
          aria-hidden
        >
          <div className="relative h-[200px] w-full @md:h-[230px]">
            <div
              className="absolute inset-y-0 left-0 flex items-center gap-[2px] px-0"
              style={{ width: `${((BARS + 1) / BARS) * 100}%`, transform: `translateX(-${(fraction / (BARS + 1)) * 100}%)` }}
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
                    className={`min-w-0 flex-1 rounded-full ${color} ${near && bar.level > 0 ? "brightness-125" : ""}`}
                    style={{ height: `${Math.max(2, bar.level * 100)}%` }}
                  />
                );
              })}
            </div>

            {/* Playhead and soft edges */}
            <span className="absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_2px_rgba(147,173,133,0.45)]" />
            <span className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-surface to-transparent" />
            <span className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-surface to-transparent" />

            {/* Caption overlaid on the wave */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              {currentLine ? (
                <div
                  key={currentIndex}
                  className="demo-caption max-w-[min(92%,560px)] rounded-[14px] border border-border/70 bg-bg/80 px-4 py-3 text-center shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-sm @md:px-6"
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

        {/* After the call: the summary email takes the same spot */}
        <div
          className={`absolute inset-x-0 bottom-16 top-9 flex items-center justify-center px-3 transition-[opacity,transform] duration-700 ease-out @md:px-4 ${
            showSummary ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
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
              {AVA_SUMMARY.fields.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="text-bg/55">{label}</dt>
                  <dd className="m-0">{value}</dd>
                </div>
              ))}
              <dt className="text-bg/55">Next step</dt>
              <dd className="m-0 font-semibold">{AVA_SUMMARY.nextStep}</dd>
            </dl>
          </EmailCard>
        </div>

        {/* Controls */}
        <div className="absolute inset-x-4 bottom-3 flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-colors hover:bg-accent-hover"
            aria-label={playing ? "Pause the call recording" : "Play the call recording with sound"}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="min-w-0 flex-1">
            <span className="block truncate text-[12px] text-text" aria-live="polite">
              {status}
            </span>
            <span className="mt-0.5 flex items-center gap-3 text-[10.5px] text-muted" aria-hidden>
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
