"use client";

import { useEffect, useRef, useState } from "react";
import { DemoFrame } from "./demo-frame";
import { EmailCard } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { AVA_AUDIO_SRC, AVA_CALL_LENGTH, AVA_CONTEXT, AVA_SUMMARY, AVA_TRANSCRIPT, AVA_WAVEFORM } from "./ava-data";
import { useDemoPlayer } from "./use-demo-player";

/**
 * The AI receptionist demo. A real sample call with a waveform in two colors (Ava in the
 * accent, the caller in the light tone), a transcript that highlights and scrolls in sync, and
 * the summary email that lands when the call ends.
 *
 * On scroll it plays silently on the shared timeline, like the other demos. Pressing play
 * starts the recording from the top, and the audio element then drives the clock.
 */

const LEN = AVA_CALL_LENGTH;
const SUMMARY_DELAY = 700;
const END = LEN + 2400;

const bars = AVA_WAVEFORM.map((h, i) => {
  const ms = ((i + 0.5) / AVA_WAVEFORM.length) * LEN;
  const line = AVA_TRANSCRIPT.find((l) => ms >= l.start - 150 && ms <= l.end + 150);
  return { h: Math.max(0.08, h), who: line?.who ?? null };
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
  const listRef = useRef<HTMLOListElement>(null);

  /* Once the visitor presses play, the audio drives everything below. */
  const [listening, setListening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioMs, setAudioMs] = useState(0);
  const [audioEnded, setAudioEnded] = useState(false);

  const finalState = (isStatic || player.reduced) && !listening;
  const ms = listening ? audioMs : finalState ? LEN : Math.min(player.t, LEN);
  const showSummary = listening ? audioEnded : finalState || player.t >= LEN + SUMMARY_DELAY;

  /* Smooth sync while the recording plays (timeupdate only fires a few times a second). */
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

  /* Keep the line being spoken in view. */
  const current = AVA_TRANSCRIPT.reduce((idx, line, i) => (ms >= line.start ? i : idx), -1);
  const activeIndex = AVA_TRANSCRIPT.findIndex((l) => ms >= l.start && ms <= l.end + 400);
  useEffect(() => {
    const list = listRef.current;
    const viewport = list?.parentElement;
    if (!list || !viewport) return;
    const item = current >= 0 ? (list.children[current] as HTMLElement | undefined) : undefined;
    const target = item ? Math.max(0, item.offsetTop - viewport.clientHeight * 0.3) : 0;
    const max = Math.max(0, list.scrollHeight - viewport.clientHeight);
    list.style.transform = `translateY(-${Math.min(target, max)}px)`;
  }, [current]);

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

  const played = ms / LEN;
  const status = !listening ? "Press play to hear the call" : playing ? "Playing with sound" : audioEnded ? "Call ended" : "Paused";

  return (
    <DemoFrame
      player={player}
      title="Ava, AI receptionist"
      summary="A sample call to Ava, the AI receptionist. The transcript highlights as each line is spoken, and a summary email for the office arrives when the call ends. Press play to hear the recording."
      caption={hideCaption ? undefined : "Every detail read back to the caller. The summary lands in the office inbox."}
      interactive
      onReplay={resetAudio}
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

      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 @xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] @xl:gap-4">
        {/* Player */}
        <div className="col-start-1 row-start-1">
          <p className="m-0 text-[11.5px] text-muted">{AVA_CONTEXT}</p>
          <div className="mt-2 rounded-[10px] border border-border bg-bg p-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggle}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-colors hover:bg-accent-hover"
                aria-label={playing ? "Pause the call recording" : "Play the call recording with sound"}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div className="flex h-10 min-w-0 flex-1 items-center gap-[2px]" aria-hidden>
                {bars.map((bar, i) => {
                  const isPlayed = (i + 0.5) / bars.length <= played;
                  const color =
                    bar.who === "ai"
                      ? isPlayed
                        ? "bg-accent"
                        : "bg-accent/35"
                      : bar.who === "caller"
                        ? isPlayed
                          ? "bg-text/80"
                          : "bg-text/25"
                        : "bg-border";
                  return (
                    <span
                      key={i}
                      className={`w-full max-w-[4px] rounded-full transition-colors duration-150 ${color}`}
                      style={{ height: `${Math.round(bar.h * 100)}%` }}
                    />
                  );
                })}
              </div>
              <span className="w-[74px] shrink-0 text-right text-[11px] tabular-nums text-muted" aria-hidden>
                {fmt(ms)} / {fmt(LEN)}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> Ava
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-text/80" aria-hidden /> Caller
              </span>
              <span className="ml-auto" aria-live="polite">
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div
          className={`relative col-start-1 row-start-2 h-[220px] overflow-hidden transition-opacity duration-500 @xl:h-[260px] ${
            showSummary ? "@max-xl:pointer-events-none @max-xl:opacity-0" : ""
          }`}
        >
          <ol ref={listRef} className="m-0 grid list-none gap-1 p-0 transition-transform duration-500 ease-out">
            {AVA_TRANSCRIPT.map((line, i) => {
              const spoken = ms >= line.start;
              const active = i === activeIndex;
              return (
                <li
                  key={line.start}
                  className={`grid grid-cols-[46px_1fr] gap-2 rounded-[8px] px-2 py-1.5 text-[12px] leading-[1.45] transition-[opacity,background-color] duration-300 ${
                    spoken ? "opacity-100" : "opacity-35"
                  } ${active ? "bg-accent/15" : ""}`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.06em] ${line.who === "ai" ? "text-accent" : "text-muted"}`}>
                    {line.who === "ai" ? "Ava" : "Caller"}
                  </span>
                  <span className={active ? "text-text" : "text-muted"}>{line.text}</span>
                </li>
              );
            })}
          </ol>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent" aria-hidden />
        </div>

        {/* Summary email: beside the call on wide frames, in the transcript's spot on narrow ones */}
        <div className="relative z-10 col-start-1 row-start-2 @xl:col-start-2 @xl:row-span-2 @xl:row-start-1">
          {!showSummary ? (
            <div className="hidden rounded-[10px] border border-dashed border-border p-4 text-[12px] text-muted @xl:block">
              The summary email for the office arrives when the call ends.
            </div>
          ) : null}
          <div aria-live="polite">
            <EmailCard show={showSummary} from="Ava <ava@company.example>" to="office@company.example" subject={AVA_SUMMARY.subject}>
              <dl className="m-0 grid grid-cols-[78px_1fr] gap-x-2 gap-y-1">
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
        </div>
      </div>
    </DemoFrame>
  );
}
