"use client";

import { DemoFrame } from "./demo-frame";
import { Appear, Pill, Typed } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { useDemoPlayer } from "./use-demo-player";

/* The 18 connected sources, by the names the owner would recognize. */
const SOURCES = [
  "Housecall Pro",
  "QA/QC app",
  "Smart Fleet",
  "Timesheets",
  "QuickBooks Online",
  "HubSpot",
  "Proposal tool",
  "AI receptionist",
  "Bid alerts",
  "Owner inbox",
  "Accounting inbox",
  "Operations inbox",
  "Gmail",
  "Teams transcripts",
  "Business plan",
  "Marketing docs",
  "Certifications",
  "Tasks",
];

/* Everything below is invented. */
const SUMMARY = "Good morning. 14 jobs on the board today and 3 techs already on site. Here is what needs you.";

const ATTENTION: { tag: string; text: string; critical?: boolean }[] = [
  { tag: "QA/QC", text: "3 checklists from yesterday are still missing" },
  { tag: "Finance", text: "4 invoices over 30 days, $18,240 open", critical: true },
  { tag: "Sales", text: "A 30 kW estimate has had no follow-up in 9 days" },
  { tag: "Bids", text: "County generator bid closes Friday at noon" },
  { tag: "Compliance", text: "Certification renewal due in 21 days" },
];

const QUESTION = "Which tech has the most missed checklists this month?";
const ANSWER = "Marcus D., with 3 of 41. Two were on multi-day jobs.";

const STEP = 220;
const T = {
  sync: 400,
  syncLength: 350,
  briefing: 4800,
  summary: [5000, 6500],
  attention: 6800,
  attentionStep: 450,
  suggestion: 9200,
  sms: 9900,
  ask: [10800, 11900],
  answer: 12400,
  end: 13600,
};
const SYNC_DONE = T.sync + (SOURCES.length - 1) * STEP + T.syncLength;

export function OpsDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(T.end, { isStatic });
  const { at, progress, t } = player;

  const synced = SOURCES.filter((_, i) => at(T.sync + i * STEP + T.syncLength)).length;

  return (
    <DemoFrame
      player={player}
      title="Operations manager"
      summary="Eighteen business systems sync one by one into a private command center. A morning briefing builds with five items that need attention, a critical text alert arrives on the owner's phone, and the owner asks a plain-language question and gets an answer."
      caption={hideCaption ? undefined : "Eighteen systems in. One morning briefing out."}
    >
      <div className="grid min-h-[520px] grid-cols-[minmax(0,1fr)] gap-3 @xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] @xl:grid-rows-[auto_1fr]">
        {/* Sources */}
        <div className="rounded-[10px] border border-border bg-bg p-3 @xl:col-start-1 @xl:row-start-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] font-semibold">Connected sources</span>
            <span className="shrink-0 text-[10.5px] tabular-nums text-muted">
              {synced} of {SOURCES.length} synced
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {SOURCES.map((name, i) => {
              const start = T.sync + i * STEP;
              const syncing = t >= start && t < start + T.syncLength;
              const done = at(start + T.syncLength);
              return (
                <span
                  key={name}
                  className={`inline-flex h-6 items-center gap-1.5 rounded-full border px-2 text-[10.5px] transition-colors duration-300 ${
                    syncing ? "border-accent text-text" : done ? "border-border text-text" : "border-border/70 text-muted/70"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${syncing ? "demo-pulse bg-accent" : done ? "bg-[#7fb58a]" : "bg-border"}`}
                    aria-hidden
                  />
                  {name}
                </span>
              );
            })}
          </div>
          <p className={`m-0 mt-2.5 text-[10px] text-muted transition-opacity duration-300 ${at(SYNC_DONE) ? "opacity-100" : "opacity-0"}`}>
            Read-only. Nothing is ever written back.
          </p>
        </div>

        {/* Briefing */}
        <Appear
          show={at(T.briefing)}
          from="up"
          className="flex flex-col rounded-[10px] border border-border bg-bg p-3 @xl:col-start-2 @xl:row-span-2 @xl:row-start-1 @md:p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-[14px] font-bold tracking-[-0.01em]">Morning briefing</span>
            <span className="shrink-0 text-[10.5px] text-muted">Tue, Nov 3 · 6:00 AM</span>
          </div>
          <p className="m-0 mt-2 min-h-[34px] text-[12px] leading-[1.45] text-text">
            <Typed text={SUMMARY} progress={progress(T.summary[0], T.summary[1])} />
          </p>

          <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">Needs attention</span>
          <ul className="m-0 mt-1.5 grid list-none gap-1.5 p-0">
            {ATTENTION.map((item, i) => (
              <Appear
                key={item.text}
                as="li"
                show={at(T.attention + i * T.attentionStep)}
                from="left"
                className={`flex items-center gap-2 rounded-[7px] border px-2.5 py-1.5 text-[11px] leading-[1.35] ${
                  item.critical ? "border-accent/60 bg-accent/10" : "border-border"
                }`}
              >
                <Pill tone={item.critical ? "accent" : "muted"} className="w-[74px] shrink-0 justify-center">
                  {item.tag}
                </Pill>
                <span className="min-w-0">{item.text}</span>
              </Appear>
            ))}
          </ul>

          <Appear show={at(T.suggestion)} className="mt-2.5 border-l-2 border-accent pl-2.5 text-[11px] leading-[1.45] text-muted">
            <span className="font-semibold text-text">Suggested next step:</span> follow up on the 30 kW estimate today. It
            matches three past jobs you won.
          </Appear>

          {/* Ask */}
          <div className="mt-auto pt-3">
            <div className="flex h-8 items-center rounded-[7px] border border-border bg-surface px-2.5 text-[11.5px]">
              {at(T.ask[0]) ? (
                <Typed text={QUESTION} progress={progress(T.ask[0], T.ask[1])} className="truncate" />
              ) : (
                <span className="text-muted">Ask about the business...</span>
              )}
            </div>
            <Appear show={at(T.answer)} className="mt-1.5 text-[11.5px] leading-[1.45]">
              <span className="text-accent">Answer:</span> {ANSWER}
            </Appear>
          </div>
        </Appear>

        {/* Text alert on the owner's phone */}
        <div className="@xl:col-start-1 @xl:row-start-2 @xl:self-end">
          <Appear
            show={at(T.sms)}
            from="up"
            className="ml-auto max-w-[300px] rounded-[14px] border border-border bg-[#2a241e] p-3 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] @xl:ml-0"
          >
            <div className="flex items-center justify-between text-[10px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#7fb58a] text-[9px] font-bold text-bg" aria-hidden>
                  ✉
                </span>
                Messages
              </span>
              <span>now</span>
            </div>
            <p className="m-0 mt-1.5 text-[11.5px] font-semibold">Operations manager</p>
            <p className="m-0 mt-0.5 text-[11.5px] leading-[1.4] text-text/90">
              Critical: 2 invoices just passed 60 days, $7,900 open. Details are in today&apos;s briefing.
            </p>
          </Appear>
        </div>
      </div>
    </DemoFrame>
  );
}
