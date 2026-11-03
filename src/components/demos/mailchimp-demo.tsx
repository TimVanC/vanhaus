"use client";

import { DemoFrame } from "./demo-frame";
import { Appear, Bar, Cursor, FakeButton, Field, Pill } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { useDemoPlayer } from "./use-demo-player";

/* Invented advertiser and numbers. */
const ADVERTISER = "Northfield Credit Union";
const TYPES = ["AM", "PM", "Energy", "HC", "Real Estate", "Events", "News Alert", "Breaking News"];
const CHECKED_TYPES = new Set(["AM", "PM"]);
const METRICS = [
  { label: "Unique Opens", on: true },
  { label: "Total Opens", on: true },
  { label: "Total Recipients", on: false },
  { label: "Total Clicks", on: true },
  { label: "Unique Clicks", on: false },
  { label: "CTR", on: true },
];

const ROWS = [
  { date: "2026-10-02", unique: 8412, opens: 13108, clicks: 61 },
  { date: "2026-10-07", unique: 8097, opens: 12655, clicks: 54 },
  { date: "2026-10-14", unique: 8655, opens: 13477, clicks: 73 },
  { date: "2026-10-21", unique: 8230, opens: 12841, clicks: 58 },
  { date: "2026-10-28", unique: 8904, opens: 13862, clicks: 80 },
];
const TOTAL = ROWS.reduce(
  (n, r) => ({ unique: n.unique + r.unique, opens: n.opens + r.opens, clicks: n.clicks + r.clicks }),
  { unique: 0, opens: 0, clicks: 0 },
);
/* CTR is total clicks over total opens, the same formula on every row and total. */
const ctr = (clicks: number, opens: number) => ((clicks / opens) * 100).toFixed(2);

const CAMPAIGNS = 22;
const MESSAGES: [number, string][] = [
  [0, "Fetching the campaign list from Mailchimp..."],
  [12, "Syncing ad placement history..."],
  [24, "Matching AM and PM campaigns..."],
  [32, "Processing campaigns"],
  [92, "Saving one report per newsletter..."],
  [100, "Done. 2 reports ready."],
];

const T = {
  cursorIn: 500,
  click: 1500,
  run: [1700, 5300],
  report: 5600,
  toast: 6300,
  end: 8800,
};

const grid = "grid grid-cols-[1fr_64px_52px_44px] @md:grid-cols-[1fr_88px_88px_80px_60px] gap-2 px-3";

export function MailchimpDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(T.end, { isStatic });
  const { at, progress, t } = player;

  const pct = Math.round(progress(T.run[0], T.run[1]) * 100);
  const stage = [...MESSAGES].reverse().find(([p]) => pct >= p)?.[1] ?? MESSAGES[0][1];
  const processing = stage === "Processing campaigns";
  const done = Math.min(CAMPAIGNS, Math.max(1, Math.round(((pct - 32) / 60) * CAMPAIGNS)));
  const secondsLeft = Math.max(5, Math.round(((100 - pct) / 100) * 75));
  const message = processing ? `Campaigns processed: ${done} of ${CAMPAIGNS} · about ${secondsLeft}s left` : stage;
  const running = at(T.run[0]) && !at(T.report);
  const pressed = t >= T.click && t < T.click + 250;

  return (
    <DemoFrame
      player={player}
      title="Mailchimp reporter"
      summary="A Run Report form has an advertiser, the AM and PM newsletters, a date range, and metrics selected. A cursor clicks Run report, a progress bar counts through the campaigns, and a finished report appears with opens, ad clicks, and click-through rate for each send date, a monthly total, and one report per newsletter."
      caption={hideCaption ? undefined : <span className="text-text">95% less time on reporting.</span>}
      padded={false}
    >
      <div className="relative min-h-[420px] overflow-hidden">
        {/* App nav strip */}
        <div className="flex items-center gap-1.5 border-b border-border bg-bg px-3 py-2 text-[10.5px] font-semibold">
          <span className="mr-2 font-display text-[12px] font-bold tracking-[-0.02em]">Reporter</span>
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-text">Run Report</span>
          <span className="px-2.5 py-0.5 text-muted">Reports</span>
          <span className="px-2.5 py-0.5 text-muted">Settings</span>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium transition-opacity duration-300 ${
              running ? "text-[#9fd0a8] opacity-100" : "opacity-0"
            }`}
          >
            <span className="demo-pulse h-2 w-2 rounded-full bg-[#7fb58a]" aria-hidden />
            <span className="hidden @md:inline">Report running</span>
          </span>
        </div>

        {/* Form */}
        <div className={`p-3 transition-opacity duration-500 @md:p-4 ${at(T.report) ? "opacity-30" : "opacity-100"}`}>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">Newsletter types</span>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {TYPES.map((type) => (
              <Check key={type} on={CHECKED_TYPES.has(type)} label={type} />
            ))}
          </div>

          <div className="mt-3 grid gap-2.5 @md:grid-cols-2">
            <Field label="Advertiser">{ADVERTISER}</Field>
            <Field label="Tracking URLs (optional)">
              <span className="text-muted">Using ad placements</span>
            </Field>
            <Field label="Start date">10/01/2026</Field>
            <Field label="End date">10/31/2026</Field>
          </div>

          <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">Metrics</span>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {METRICS.map((m) => (
              <Check key={m.label} on={m.on} label={m.label} />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <FakeButton pressed={pressed}>{running ? "Running..." : "Run report"}</FakeButton>
            <span className={`text-[11px] text-muted transition-opacity duration-300 ${running ? "opacity-100" : "opacity-0"}`}>Cancel</span>
          </div>

          <div className={`mt-3 transition-opacity duration-300 ${running ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center justify-between gap-3 text-[10.5px]">
              <span className="truncate text-muted">{message}</span>
              <span className="shrink-0 tabular-nums">{pct}%</span>
            </div>
            <Bar value={pct / 100} className="mt-1.5" />
          </div>
        </div>

        <Cursor x={at(T.click) ? 11 : 70} y={at(T.click) ? 77 : 40} visible={at(T.cursorIn) && !at(T.report)} pressed={pressed} />

        {/* Report */}
        <Appear show={at(T.report)} from="up" className="absolute inset-x-3 top-12 @md:inset-x-4">
          <div className="flex flex-col overflow-hidden rounded-[10px] border border-border bg-bg shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="rounded-full bg-surface px-2.5 py-0.5 text-[10.5px] font-semibold">AM report</span>
                <span className="px-1.5 text-[10.5px] text-muted">PM report</span>
              </div>
              <Pill>Download all CSVs</Pill>
            </div>
            <div className={`${grid} border-b border-border py-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-muted`}>
              <span>Date</span>
              <span className="text-right">Unique Opens</span>
              <span className="hidden text-right @md:inline">Total Opens</span>
              <span className="text-right">Total Clicks</span>
              <span className="text-right">CTR</span>
            </div>
            {ROWS.map((row, i) => (
              <Appear
                key={row.date}
                show={at(T.report + 150 + i * 110)}
                from="left"
                className={`${grid} border-b border-border/60 py-1.5 text-[11px] tabular-nums`}
              >
                <span>{row.date}</span>
                <span className="text-right">{row.unique.toLocaleString("en-US")}</span>
                <span className="hidden text-right @md:inline">{row.opens.toLocaleString("en-US")}</span>
                <span className="text-right">{row.clicks}</span>
                <span className="text-right">{ctr(row.clicks, row.opens)}</span>
              </Appear>
            ))}
            <Appear
              show={at(T.report + 150 + ROWS.length * 110)}
              from="left"
              className={`${grid} border-b border-border bg-surface/60 py-1.5 text-[11px] font-semibold tabular-nums`}
            >
              <span>October total</span>
              <span className="text-right">{TOTAL.unique.toLocaleString("en-US")}</span>
              <span className="hidden text-right @md:inline">{TOTAL.opens.toLocaleString("en-US")}</span>
              <span className="text-right">{TOTAL.clicks}</span>
              <span className="text-right">{ctr(TOTAL.clicks, TOTAL.opens)}</span>
            </Appear>
            <div className="flex items-center justify-between gap-2 px-3 py-2 text-[10.5px] text-muted">
              <span className="truncate">Clicks credited from ad placement history</span>
              <Appear show={at(T.toast)} from="up" className="shrink-0">
                <Pill tone="good">2 reports ready</Pill>
              </Appear>
            </div>
          </div>
        </Appear>
      </div>
    </DemoFrame>
  );
}

function Check({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px]">
      <span
        className={`flex h-3 w-3 items-center justify-center rounded-[3px] border ${on ? "border-accent bg-accent text-on-accent" : "border-border"}`}
        aria-hidden
      >
        {on ? (
          <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : null}
      </span>
      {label}
    </span>
  );
}
