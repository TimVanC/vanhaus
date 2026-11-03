"use client";

import { ArrowRight } from "@/components/common/icons";
import { DemoFrame } from "./demo-frame";
import { Appear, Chip, FakeButton, Field, Pill, Typed } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { easeOut, money, useDemoPlayer } from "./use-demo-player";

/* All data below is invented. No real customer, address, or price appears here. */
const JOB = {
  client: "Harrow Family Dental",
  address: "212 Linden Ave, Chatham, NJ",
  kw: "30",
  fuel: "Natural gas",
  ats: "200",
};

/* `short` is what phones show, so the proposal stays compact on a narrow screen. */
const EQUIPMENT = [
  { item: "Generator", desc: "30 kW standby generator, natural gas, liquid-cooled, sound-attenuated enclosure", short: "30 kW standby generator, natural gas", qty: 1 },
  { item: "Transfer switch", desc: "200A service-entrance rated automatic transfer switch, outdoor", short: "200A automatic transfer switch", qty: 1 },
  { item: "Monitoring", desc: "Remote monitoring kit with mobile app alerts", short: "Remote monitoring kit", qty: 1 },
  { item: "Pad", desc: "Composite mounting pad, pre-leveled", short: "Composite mounting pad", qty: 1 },
];

const SUMS = [
  { label: "Total Equipment & Accessories (incl. freight, startup & commissioning)", amount: 14_200 },
  { label: "Installation (electrical, gas, and mechanical labor)", amount: 7_900 },
  { label: "Materials", amount: 1_450 },
  { label: "Permit", amount: 600 },
  { label: "Sales tax", amount: 700 },
];
const TOTAL = SUMS.reduce((n, s) => n + s.amount, 0);

/* Timeline (ms). The whole thing runs 13 seconds. */
const T = {
  chip: 300,
  client: [600, 1500],
  address: [1500, 2500],
  kw: [2600, 2900],
  fuel: 3000,
  ats: [3200, 3500],
  press: 3800,
  paper: 4200,
  prepared: 4700,
  scope: 5100,
  eq: 5600,
  eqStep: 350,
  sums: 7200,
  sumStep: 400,
  total: [7200, 9300],
  sign: 9700,
  typed: [10200, 11000],
  accept: 11500,
  stamp: 11900,
  end: 13000,
};

export function ProposalDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(T.end, { isStatic });
  const { at, progress, t } = player;

  const pressed = t >= T.press && t < T.press + 250;
  const showPaper = at(T.paper);
  const totalShown = Math.round(TOTAL * easeOut(progress(T.total[0], T.total[1])));

  return (
    <DemoFrame
      player={player}
      title="Proposal generator"
      summary="A short job form fills itself in with a 30 kilowatt natural gas generator, equipment plus installation. A branded proposal then builds line by line, the total counts up, a signature is drawn, and an Accepted stamp lands."
      caption={
        hideCaption ? undefined : (
          <>
            <span className="text-text">Hours by hand</span>
            <ArrowRight className="h-3.5 w-3.5 text-accent" />
            <span className="text-text">minutes.</span>
          </>
        )
      }
      padded={false}
    >
      {/* On narrow frames the form and the proposal share one spot, and the proposal replaces the form. */}
      <div className="relative grid grid-cols-[minmax(0,1fr)] @xl:min-h-[480px] @xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Job intake form */}
        <div
          className={`relative border-border p-4 transition-opacity duration-500 @max-xl:[grid-area:1/1] @xl:border-r ${
            showPaper ? "@max-xl:pointer-events-none @max-xl:opacity-0 @xl:opacity-50" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[15px] font-bold tracking-[-0.01em]">New estimate</span>
            <Pill>Draft</Pill>
          </div>

          <div className="mt-3">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">Quote type</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <Chip selected={at(T.chip)}>Equipment + installation</Chip>
              <Chip>Equipment only</Chip>
              <Chip>Installation only</Chip>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2.5">
            <Field label="Client name" active={t >= T.client[0] && t < T.client[1]}>
              <Typed text={JOB.client} progress={progress(T.client[0], T.client[1])} />
            </Field>
            <Field label="Address" active={t >= T.address[0] && t < T.address[1]}>
              <Typed text={JOB.address} progress={progress(T.address[0], T.address[1])} />
            </Field>
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Generator kW" active={t >= T.kw[0] && t < T.kw[1]}>
                <Typed text={JOB.kw} progress={progress(T.kw[0], T.kw[1])} />
              </Field>
              <Field label="Fuel type" active={t >= T.fuel && t < T.fuel + 300}>
                <span className={`transition-opacity duration-200 ${at(T.fuel) ? "opacity-100" : "opacity-0"}`}>{JOB.fuel}</span>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="ATS amperage" active={t >= T.ats[0] && t < T.ats[1]}>
                <Typed text={JOB.ats} progress={progress(T.ats[0], T.ats[1])} />
              </Field>
              <Field label="Site type">
                <span className="text-muted">Commercial</span>
              </Field>
            </div>
          </div>

          <div className="mt-4">
            <FakeButton pressed={pressed} className="whitespace-nowrap">
              {at(T.press) && !showPaper ? "Generating..." : "Generate worksheet"}
            </FakeButton>
            <span className={`mt-2 block text-[11.5px] text-muted transition-opacity duration-300 ${at(T.press) ? "opacity-100" : "opacity-0"}`}>
              Pricing from the price sheet and past jobs
            </span>
          </div>
        </div>

        {/* Proposal paper */}
        <div className={`relative overflow-hidden p-3 @max-xl:[grid-area:1/1] @md:p-4 ${showPaper ? "" : "@max-xl:invisible"}`}>
          <div className="mb-2.5 flex h-6 items-center justify-between gap-2">
            <span className="text-[11.5px] text-muted">{showPaper ? "Proposal" : "Proposal preview"}</span>
            <Appear show={at(T.accept)} from="down">
              <Pill tone="good">Accepted online. Status: Won</Pill>
            </Appear>
          </div>

          <Appear show={showPaper} from="up" className="relative mx-auto max-w-[460px] rounded-[6px] bg-text px-5 py-5 text-bg shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] @md:px-6">
            {/* Letterhead */}
            <div className="flex items-start justify-between border-b border-bg/15 pb-3">
              <div>
                <span className="block font-display text-[15px] font-bold leading-none tracking-[-0.02em]">RIDGELINE POWER</span>
                <span className="mt-1 block text-[9px] uppercase tracking-[0.14em] text-bg/55">Generator sales and installation</span>
              </div>
              <span className="text-[9.5px] text-bg/55">Nov 3, 2026</span>
            </div>

            <Appear show={at(T.prepared)} className="mt-3 text-[10.5px] leading-[1.45]">
              <span className="font-semibold">Prepared for:</span> {JOB.client}
              <br />
              <span className="text-bg/70">{JOB.address}</span>
            </Appear>

            <Appear show={at(T.scope)} className="mt-3">
              <span className="block text-[9.5px] font-bold tracking-[0.1em]">SCOPE OF WORK</span>
              <p className="mt-1 text-[10px] leading-[1.5] text-bg/80 @max-md:line-clamp-2">
                Furnish and install one 30 kW natural gas standby generator with a 200A service-entrance transfer switch, gas
                piping from the meter, and a new composite pad. Includes startup, commissioning, and owner training.
              </p>
            </Appear>

            {/* Equipment table */}
            <div className="mt-3 overflow-hidden">
              <div className="grid grid-cols-[1fr_24px_48px] gap-2 border-b border-bg/20 pb-1 text-[9px] font-bold uppercase tracking-[0.06em] text-bg/70 @md:grid-cols-[64px_1fr_28px_52px]">
                <span className="hidden @md:block">Item</span>
                <span>Description</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Price</span>
              </div>
              {EQUIPMENT.map((row, i) => (
                <Appear
                  key={row.item}
                  show={at(T.eq + i * T.eqStep)}
                  from="left"
                  className="grid grid-cols-[1fr_24px_48px] gap-2 border-b border-bg/10 py-1 text-[10px] leading-[1.35] @md:grid-cols-[64px_1fr_28px_52px]"
                >
                  <span className="hidden font-semibold @md:block">{row.item}</span>
                  <span className="text-bg/80">
                    <span className="hidden @md:inline">{row.desc}</span>
                    <span className="@md:hidden">{row.short}</span>
                  </span>
                  <span className="text-right">{row.qty}</span>
                  <span className="text-right text-bg/60">included</span>
                </Appear>
              ))}
            </div>

            {/* Lump sums */}
            <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)] gap-0.5">
              {SUMS.map((row, i) => (
                <Appear
                  key={row.label}
                  show={at(T.sums + i * T.sumStep)}
                  from="right"
                  className={`flex items-baseline justify-between gap-3 text-[10px] ${i >= 2 ? "@max-md:hidden" : ""}`}
                >
                  <span className="min-w-0 truncate text-bg/80">{row.label}</span>
                  <span className="shrink-0 tabular-nums">{money(row.amount)}</span>
                </Appear>
              ))}
              {/* Phones fold the three small lines into one so the proposal stays short. */}
              <Appear show={at(T.sums + 2 * T.sumStep)} from="right" className="flex items-baseline justify-between gap-3 text-[10px] @md:hidden">
                <span className="min-w-0 truncate text-bg/80">Materials, permit, and sales tax</span>
                <span className="shrink-0 tabular-nums">{money(SUMS.slice(2).reduce((n, r) => n + r.amount, 0))}</span>
              </Appear>
              <div
                className={`mt-1.5 flex items-baseline justify-between border-t border-bg/25 pt-1.5 transition-opacity duration-300 ${
                  at(T.sums) ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-[11px] font-bold tracking-[0.06em]">TOTAL:</span>
                <span className="font-display text-[15px] font-bold tabular-nums tracking-[-0.01em]">{money(totalShown)}</span>
              </div>
              <span className={`truncate text-[8.5px] text-bg/55 transition-opacity duration-300 ${at(T.total[1]) ? "opacity-100" : "opacity-0"}`}>
                Quote includes freight and sales tax. Exclusions and clarifications on page 2.
              </span>
            </div>

            {/* Acceptance */}
            <div className="relative mt-3 grid grid-cols-[1fr_auto] items-end gap-3 border-t border-bg/15 pt-2.5">
              <div>
                <span className="block text-[8.5px] uppercase tracking-[0.08em] text-bg/55">Authorized signature</span>
                <div className="relative mt-0.5 h-9 border-b border-bg/40">
                  <svg viewBox="0 0 220 40" className="absolute inset-x-0 bottom-0 h-10 w-full overflow-visible" aria-hidden>
                    <path
                      d="M4 30 C 14 6, 22 8, 24 24 S 34 36, 42 18 S 56 4, 60 22 S 72 36, 82 22 S 96 8, 104 24 S 118 32, 130 20 S 150 10, 162 24 S 186 34, 214 14"
                      fill="none"
                      stroke="#1d3fb0"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      pathLength={1}
                      className={`demo-draw ${at(T.sign) ? "on" : ""}`}
                    />
                  </svg>
                </div>
                <span className="mt-1 block text-[10px] italic">
                  <Typed text="Priya Natarajan, Practice Manager" progress={progress(T.typed[0], T.typed[1])} caret={false} />
                </span>
              </div>
              <div className="text-right text-[8.5px] text-bg/55">
                Date
                <span className={`block text-[10px] text-bg transition-opacity duration-300 ${at(T.typed[1]) ? "opacity-100" : "opacity-0"}`}>
                  11/03/2026
                </span>
              </div>

              {at(T.stamp) ? (
                <span
                  className="demo-stamp pointer-events-none absolute -top-6 right-4 rounded-[4px] border-[3px] border-[#2f7d4a] px-3 py-1 font-display text-[22px] font-bold uppercase tracking-[0.12em] text-[#2f7d4a] opacity-90"
                  style={{ transform: "rotate(-9deg)" }}
                >
                  Accepted
                </span>
              ) : null}
            </div>
          </Appear>
        </div>
      </div>
    </DemoFrame>
  );
}
