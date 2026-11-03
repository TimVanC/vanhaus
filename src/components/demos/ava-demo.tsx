"use client";

import { useEffect, useRef, useState } from "react";
import { DemoFrame } from "./demo-frame";
import { Appear, EmailCard } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { AVA_AUDIO_SRC, AVA_CALL_LENGTH, AVA_SUMMARY, AVA_TRANSCRIPT } from "./ava-data";
import { useDemoPlayer } from "./use-demo-player";

/**
 * Shell for the AI receptionist demo. Audio player with a two-color waveform (caller in
 * the muted tone, Ava in copper), transcript lines that highlight in sync, and a summary
 * email that slides in when the call ends.
 *
 * With AVA_AUDIO_SRC set, the real <audio> element drives the clock. Without it, the demo
 * runs on the shared timeline player so the layout can be reviewed before the recording lands.
 */

const BAR_COUNT = 72;
const SUMMARY_DELAY = 600;
const END = AVA_CALL_LENGTH + 2400;

/** Deterministic bar heights so the waveform is the same on every render. */
const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
  const ms = (i / BAR_COUNT) * AVA_CALL_LENGTH;
  const line = AVA_TRANSCRIPT.find((l) => ms >= l.start && ms <= l.end);
  const seed = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return { who: line?.who ?? null, h: line ? 0.3 + seed * 0.7 : 0.08 + seed * 0.1 };
});

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export function AvaDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(END, { isStatic });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioMs, setAudioMs] = useState(0);
  const [audioEnded, setAudioEnded] = useState(false);

  const usingAudio = Boolean(AVA_AUDIO_SRC) && !isStatic && !player.reduced;
  const ms = isStatic || player.reduced ? AVA_CALL_LENGTH : usingAudio ? audioMs : Math.min(player.t, AVA_CALL_LENGTH);
  const ended = isStatic || player.reduced ? true : usingAudio ? audioEnded : player.t >= AVA_CALL_LENGTH;
  const showSummary = isStatic || player.reduced ? true : usingAudio ? audioEnded : player.t >= AVA_CALL_LENGTH + SUMMARY_DELAY;

  /* When a real recording exists, play it once the frame scrolls into view. */
  useEffect(() => {
    if (!usingAudio) return;
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setAudioMs(audio.currentTime * 1000);
    const onEnd = () => setAudioEnded(true);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [usingAudio]);

  const activeIndex = AVA_TRANSCRIPT.findIndex((l) => ms >= l.start && ms <= l.end);
  const playedFraction = ms / AVA_CALL_LENGTH;

  return (
    <DemoFrame
      player={player}
      title="Ava, AI receptionist"
      summary="A recorded call plays with a waveform in two colors, one for the caller and one for Ava. The transcript highlights each line as it is spoken. When the call ends, a summary email slides in with the caller's details and the next step."
      caption={hideCaption ? undefined : "Every call answered. Summary in the inbox before the caller hangs up."}
    >
      {usingAudio && AVA_AUDIO_SRC ? <audio ref={audioRef} src={AVA_AUDIO_SRC} preload="metadata" /> : null}

      <div className="grid min-h-[380px] gap-4 @xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          {/* Player */}
          <div className="rounded-[10px] border border-border bg-bg p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent" aria-hidden>
                {ended ? (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M7 4v16l13-8z" />
                  </svg>
                )}
              </span>
              <div className="flex h-10 flex-1 items-center gap-[2px]">
                {bars.map((bar, i) => {
                  const played = i / BAR_COUNT <= playedFraction;
                  const color =
                    bar.who === "ai" ? (played ? "bg-accent" : "bg-accent/30") : bar.who === "caller" ? (played ? "bg-muted" : "bg-muted/35") : "bg-border";
                  return <span key={i} className={`w-full max-w-[4px] rounded-full ${color}`} style={{ height: `${Math.round(bar.h * 100)}%` }} />;
                })}
              </div>
              <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-muted">{fmt(ms)}</span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-[10.5px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" /> Ava
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted" /> Caller
              </span>
              <span className="ml-auto">{AVA_AUDIO_SRC ? "Recording" : "Placeholder transcript"}</span>
            </div>
          </div>

          {/* Transcript */}
          <ol className="mt-3 grid list-none gap-1.5 p-0">
            {AVA_TRANSCRIPT.map((line, i) => {
              const spoken = ms >= line.start;
              const active = i === activeIndex;
              return (
                <li
                  key={line.start}
                  className={`grid grid-cols-[44px_1fr] gap-2 rounded-[8px] px-2 py-1.5 text-[12px] leading-[1.45] transition-[opacity,background-color] duration-300 ${
                    spoken ? "opacity-100" : "opacity-30"
                  } ${active ? "bg-accent/10" : ""}`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.06em] ${line.who === "ai" ? "text-accent" : "text-muted"}`}>
                    {line.who === "ai" ? "Ava" : "Caller"}
                  </span>
                  <span className={active ? "text-text" : "text-muted"}>{line.text}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Summary email */}
        <div className="relative flex items-end @xl:items-start">
          <Appear show={!showSummary} from="none" className={`absolute inset-x-0 top-0 ${showSummary ? "pointer-events-none" : ""}`}>
            <div className="rounded-[10px] border border-dashed border-border p-4 text-[12px] text-muted">
              Summary email arrives when the call ends.
            </div>
          </Appear>
          <EmailCard
            show={showSummary}
            from="Ava <ava@company.example>"
            to="office@company.example"
            subject={AVA_SUMMARY.subject}
            className="w-full"
          >
            <dl className="grid grid-cols-[72px_1fr] gap-x-2 gap-y-1">
              <dt className="text-bg/55">Caller</dt>
              <dd className="m-0">{AVA_SUMMARY.caller}</dd>
              <dt className="text-bg/55">Phone</dt>
              <dd className="m-0">{AVA_SUMMARY.phone}</dd>
              <dt className="text-bg/55">Address</dt>
              <dd className="m-0">{AVA_SUMMARY.address}</dd>
              <dt className="text-bg/55">Issue</dt>
              <dd className="m-0">{AVA_SUMMARY.issue}</dd>
              <dt className="text-bg/55">Urgency</dt>
              <dd className="m-0">{AVA_SUMMARY.urgency}</dd>
              <dt className="text-bg/55">Next step</dt>
              <dd className="m-0 font-semibold">{AVA_SUMMARY.nextStep}</dd>
            </dl>
          </EmailCard>
        </div>
      </div>
    </DemoFrame>
  );
}
