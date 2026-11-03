"use client";

import { DemoFrame } from "./demo-frame";
import { Appear, Bar, Cursor, FakeButton, Field, Pill } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { useDemoPlayer } from "./use-demo-player";

/* Invented advertiser and numbers. */
const ADVERTISER = "Northfield Credit Union";
const KEYWORD = "northfieldcu.com/fall-rates";
const TYPES = ["AM", "PM", "Energy", "Health Care", "Breaking News", "Military Matters"];
const METRICS = [
  { label: "Unique Opens", on: true },
  { label: "Total Opens", on: false },
  { label: "Total Recipients", on: true },
  { label: "Total Clicks", on: true },
  { label: "CTR", on: true },
];

const ROWS = [
  { date: "2026-10-02", opens: 8412, recipients: 21350, clicks: 61 },
  { date: "2026-10-07", opens: 8097, recipients: 21318, clicks: 54 },
  { date: "2026-10-14", opens: 8655, recipients: 21402, clicks: 73 },
  { date: "2026-10-21", opens: 8230, recipients: 21377, clicks: 58 },
  { date: "2026-10-28", opens: 8904, recipients: 21455, clicks: 80 },
];

const MESSAGES: [number, string][] = [
  [0, "Starting report generation..."],
  [10, "Connecting to Mailchimp API..."],
  [20, "Fetching campaign data from Mailchimp..."],
  [30, "Found 22 campaigns. Filtering by newsletter type..."],
  [40, "Processing campaign 9 of 22"],
  [80, "Processing complete. Organizing report data..."],
  [90, "Finalizing and saving report..."],
  [100, "Report generation complete!"],
];

const T = {
  cursorIn: 500,
  click: 1500,
  run: [1700, 5300],
  report: 5600,
  toast: 5900,
  end: 8600,
};

export function MailchimpDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(T.end, { isStatic });
  const { at, progress, t } = player;

  const pct = Math.round(progress(T.run[0], T.run[1]) * 100);
  const message = [...MESSAGES].reverse().find(([p]) => pct >= p)?.[1] ?? MESSAGES[0][1];
  const running = at(T.run[0]) && !at(T.report);
  const pressed = t >= T.click && t < T.click + 250;

  return (
    <DemoFrame
      player={player}
      title="Mailchimp reporter"
      summary="A Run Report form is already filled in with a newsletter type, advertiser, ad link, date range, and metrics. A cursor clicks Generate Report, a progress bar steps through Mailchimp messages, and a finished table of dates, opens, recipients, clicks, and click-through rate appears."
      caption={hideCaption ? undefined : <span className="text-text">95% less time on reporting.</span>}
      padded={false}
    >
      <div className="relative min-h-[400px] overflow-hidden">
        {/* App nav strip */}
        <div className="flex items-center gap-1.5 border-b border-border bg-bg px-3 py-2 text-[10.5px] font-semibold">
          <span className="mr-2 font-display text-[12px] font-bold tracking-[-0.02em]">Reporter</span>
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-text">Run Report</span>
          <span className="px-2.5 py-0.5 text-muted">Reports</span>
          <span className="px-2.5 py-0.5 text-muted">Settings</span>
          <span className={`ml-auto h-2 w-2 rounded-full ${running ? "demo-pulse bg-[#7fb58a]" : "bg-border"}`} aria-hidden />
        </div>

        {/* Form */}
        <div className={`p-3 transition-opacity duration-500 @md:p-4 ${at(T.report) ? "opacity-30" : "opacity-100"}`}>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">Newsletter type</span>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {TYPES.map((type) => (
              <span key={type} className="inline-flex items-center gap-1.5 text-[11px]">
                <span className={`h-3 w-3 rounded-full border ${type === "AM" ? "border-accent bg-accent shadow-[inset_0_0_0_2px_var(--surface)]" : "border-border"}`} aria-hidden />
                {type}
              </span>
            ))}
          </div>

          <div className="mt-3 grid gap-2.5 @md:grid-cols-2">
            <Field label="Advertiser">{ADVERTISER}</Field>
            <Field label="Advertisement URL or Keyword">{KEYWORD}</Field>
            <Field label="Start Date">10/01/2026</Field>
            <Field label="End Date">10/31/2026</Field>
          </div>

          <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">Metrics</span>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {METRICS.map((m) => (
              <span key={m.label} className="inline-flex items-center gap-1.5 text-[11px]">
                <span
                  className={`flex h-3 w-3 items-center justify-center rounded-[3px] border ${m.on ? "border-accent bg-accent text-on-accent" : "border-border"}`}
                  aria-hidden
                >
                  {m.on ? (
                    <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : null}
                </span>
                {m.label}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <FakeButton pressed={pressed}>{running ? "Generating..." : "Generate Report"}</FakeButton>
            <span className={`text-[11px] text-muted transition-opacity duration-300 ${running ? "opacity-100" : "opacity-0"}`}>Cancel</span>
          </div>

          <div className={`mt-3 transition-opacity duration-300 ${at(T.run[0]) && !at(T.report) ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="truncate text-muted">{message}</span>
              <span className="shrink-0 tabular-nums">{pct}%</span>
            </div>
            <Bar value={pct / 100} className="mt-1.5" />
          </div>
        </div>

        <Cursor x={at(T.click) ? 11 : 70} y={at(T.click) ? 74 : 40} visible={at(T.cursorIn) && !at(T.report)} pressed={pressed} />

        {/* Report */}
        <Appear show={at(T.report)} from="up" className="absolute inset-x-3 top-14 @md:inset-x-4">
          <div className="flex flex-col overflow-hidden rounded-[10px] border border-border bg-bg shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
              <span className="min-w-0 truncate text-[10.5px] text-muted">Northfield_Credit_Union_AM_2026-10-01_2026-10-31.csv</span>
              <div className="flex shrink-0 gap-1.5">
                <Pill>Open in Excel</Pill>
                <Pill>Download</Pill>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_64px_56px_44px] @md:grid-cols-[1fr_88px_100px_80px_64px] gap-2 border-b border-border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-muted">
              <span>Date</span>
              <span className="text-right">Unique Opens</span>
              <span className="hidden text-right @md:inline">Total Recipients</span>
              <span className="text-right">Total Clicks</span>
              <span className="text-right">CTR</span>
            </div>
            {ROWS.map((row, i) => (
              <Appear
                key={row.date}
                show={at(T.report + 150 + i * 120)}
                from="left"
                className="grid grid-cols-[1fr_64px_56px_44px] @md:grid-cols-[1fr_88px_100px_80px_64px] gap-2 border-b border-border/60 px-3 py-1.5 text-[11px] tabular-nums"
              >
                <span>{row.date}</span>
                <span className="text-right">{row.opens.toLocaleString("en-US")}</span>
                <span className="hidden text-right @md:inline">{row.recipients.toLocaleString("en-US")}</span>
                <span className="text-right">{row.clicks}</span>
                <span className="text-right">{((row.clicks / row.opens) * 100).toFixed(2)}</span>
              </Appear>
            ))}
            <div className="flex items-center justify-between px-3 py-2 text-[10.5px] text-muted">
              <span className="truncate">{ROWS.length} send dates with ad clicks</span>
              <Appear show={at(T.toast)} from="up">
                <Pill tone="good">Report generated successfully!</Pill>
              </Appear>
            </div>
          </div>
        </Appear>
      </div>
    </DemoFrame>
  );
}
