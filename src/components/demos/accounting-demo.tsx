"use client";

import { DemoFrame } from "./demo-frame";
import { Appear, Bar, EmailCard, Pill } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { money, useDemoPlayer } from "./use-demo-player";

/* Invented orders. No real customer, SKU, or price. */
const MESSY = [
  {
    order: "#10482",
    text: "Pro Shoulder Pad · Size: X-Large ✓ · Arch: High (+$12.00) · Cup: Hard · coupon FALL10 · ships to NJ",
  },
  {
    order: "#10483",
    text: "Rib Protector · Size: XXL · * Backplate (+$35.00) · ships to NY",
  },
  {
    order: "#10484",
    text: "Youth Pad · Size: Medium · UPS Ground $14.95 · ships to NJ",
  },
  {
    order: "#10479",
    text: "Refund · Pro Shoulder Pad · partial, -$45.00 · PA",
  },
];

const CLEAN = [
  {
    order: "10482",
    date: "2026-11-02",
    state: "NJ - Ecom",
    item: "PSP-XL-HI-HARD-STD",
    qty: 1,
    price: 189,
  },
  {
    order: "10482",
    date: "2026-11-02",
    state: "NJ - Ecom",
    item: "ADDON-ARCH-HIGH",
    qty: 1,
    price: 12,
  },
  {
    order: "10482",
    date: "2026-11-02",
    state: "NJ - Ecom",
    item: "COUPON-FALL10",
    qty: 1,
    price: -20.1,
  },
  {
    order: "10483",
    date: "2026-11-02",
    state: "NY - Ecom",
    item: "RIB-XXL",
    qty: 1,
    price: 159,
  },
  {
    order: "10483",
    date: "2026-11-02",
    state: "NY - Ecom",
    item: "ADDON-BACKPLATE",
    qty: 1,
    price: 35,
  },
  {
    order: "10484",
    date: "2026-11-02",
    state: "NJ - Ecom",
    item: "YTH-PAD-M",
    qty: 1,
    price: 129,
  },
  {
    order: "10484",
    date: "2026-11-02",
    state: "NJ - Ecom",
    item: "SHIP-UPS-GROUND",
    qty: 1,
    price: 14.95,
  },
  {
    order: "10479",
    date: "2026-11-02",
    state: "PA - Ecom",
    item: "PSP-L-STD-SOFT-STD",
    qty: -1,
    price: -45,
  },
];
const REVENUE = CLEAN.reduce((n, r) => n + r.price, 0);
const SHIPPING = 14.95;
const TAX = 31.19;

const STAGES = [
  "Building SKUs from product options",
  "Splitting add-ons into their own rows",
  "Netting coupons and refunds",
  "Checking debits equal credits",
];

const T = {
  messy: 300,
  messyStep: 280,
  process: [1700, 4600],
  clean: 2300,
  cleanStep: 290,
  balanced: 5000,
  clock: [5600, 7400],
  running: 7400,
  email: 8900,
  end: 10600,
};

const CLOCK_START = 11 * 3600 + 59 * 60 + 57; // 11:59:57 PM in seconds

function clockText(t: number) {
  if (t < T.clock[0]) return "11:59:57 PM";
  const p = Math.min(1, (t - T.clock[0]) / (T.clock[1] - T.clock[0]));
  const secs = CLOCK_START + Math.floor(p * 3);
  const total = secs % (12 * 3600);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const hour12 = h === 0 ? 12 : h;
  const pm = secs < 12 * 3600 ? "PM" : "AM";
  return `${hour12}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${pm}`;
}

export function AccountingDemo({
  isStatic = false,
  hideCaption = false,
}: DemoProps) {
  const player = useDemoPlayer(T.end, { isStatic });
  const { at, progress, t } = player;

  const stageIndex = Math.min(
    STAGES.length - 1,
    Math.floor(progress(T.process[0], T.process[1]) * STAGES.length),
  );
  const processing = t >= T.process[0] && t < T.process[1];
  const midnight = at(T.clock[1]);

  return (
    <DemoFrame
      player={player}
      title="Accounting automation"
      summary="Messy WooCommerce order rows with add-ons, coupons, and refunds sort into a clean inventory export table with order number, date, state, item ID, quantity, and price. A clock reaches midnight and a Daily export delivered email arrives with two spreadsheet attachments."
      caption={
        hideCaption ? undefined : (
          <span className="text-text">80 to 90% less reporting time.</span>
        )
      }
    >
      <div className="relative @xl:min-h-[440px]">
        {/* Clock */}
        <div className="absolute right-0 top-0 z-10 flex items-center gap-2 rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] tabular-nums text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full ${midnight ? "demo-pulse bg-accent" : "bg-border"}`}
            aria-hidden
          />
          {clockText(t)}
          <span className="hidden text-muted/70 @md:inline">ET</span>
        </div>

        {/* Messy orders */}
        <div className="pr-32">
          <span className="text-[11.5px] font-semibold text-muted">
            WooCommerce orders · Nov 2
          </span>
        </div>
        <ul className="m-0 mt-2 grid grid-cols-[minmax(0,1fr)] list-none gap-1 p-0">
          {MESSY.map((row, i) => (
            <Appear
              key={row.order}
              as="li"
              show={at(T.messy + i * T.messyStep)}
              from="left"
              className={`flex items-baseline gap-2 rounded-[7px] border border-border bg-bg px-2.5 py-1.5 text-[10.5px] leading-[1.35] transition-opacity duration-500 ${
                at(T.clean + i * 2 * T.cleanStep) ? "opacity-40" : ""
              }`}
            >
              <span className="shrink-0 font-semibold text-text">
                {row.order}
              </span>
              <span className="min-w-0 flex-1 truncate text-muted">{row.text}</span>
            </Appear>
          ))}
        </ul>

        {/* Processing strip */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10.5px]">
            <span
              className={`transition-opacity duration-300 ${at(T.process[0]) ? "opacity-100" : "opacity-0"} ${processing ? "text-accent" : "text-muted"}`}
            >
              {at(T.process[1]) ? "Export built" : STAGES[stageIndex]}
            </span>
            <Pill
              tone="good"
              className={`transition-opacity duration-300 ${at(T.balanced) ? "opacity-100" : "opacity-0"}`}
            >
              Debits = credits · balanced
            </Pill>
          </div>
          <Bar
            value={progress(T.process[0], T.process[1])}
            className="mt-1.5"
          />
        </div>

        {/* Clean export table. On wide screens the email lands to its right instead of over it. */}
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 @xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="overflow-hidden rounded-[10px] border border-border bg-bg">
            <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5 text-[10.5px]">
              <span className="font-semibold">Inventory export</span>
              <span className="text-muted">inventory_2026-11-02.xlsx</span>
            </div>
            <div className="grid grid-cols-[48px_1fr_36px_60px] gap-2 border-b border-border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-muted @md:grid-cols-[52px_72px_64px_1fr_40px_60px]">
              <span>Order Number</span>
              <span className="hidden @md:inline">Date</span>
              <span className="hidden @md:inline">State - Ecom</span>
              <span>Item ID</span>
              <span className="text-right">Qty Ordered</span>
              <span className="text-right">Price</span>
            </div>
            {CLEAN.map((row, i) => (
              <Appear
                key={`${row.order}-${row.item}`}
                show={at(T.clean + i * T.cleanStep)}
                from="down"
                className="grid grid-cols-[48px_1fr_36px_60px] gap-2 border-b border-border/60 px-2.5 py-[3px] text-[10.5px] tabular-nums last:border-b-0 @md:grid-cols-[52px_72px_64px_1fr_40px_60px]"
              >
                <span>{row.order}</span>
                <span className="hidden text-muted @md:inline">{row.date}</span>
                <span className="hidden text-muted @md:inline">{row.state}</span>
                <span className="truncate font-medium">{row.item}</span>
                <span
                  className={`text-right ${row.qty < 0 ? "text-accent" : ""}`}
                >
                  {row.qty}
                </span>
                <span
                  className={`text-right ${row.price < 0 ? "text-accent" : ""}`}
                >
                  {row.price.toFixed(2)}
                </span>
              </Appear>
            ))}
          </div>

          {/* Email */}
          {/* On narrow frames the email lands over the finished order list instead of the clean table. */}
          <div className="pointer-events-none @max-xl:absolute @max-xl:inset-x-0 @max-xl:top-7 @max-xl:z-10">
            <div>
              <EmailCard
                show={at(T.email)}
                from="Daily exports <exports@store.example>"
                to="accounting@store.example"
                subject="[Daily Export] 2026-11-02"
                attachments={[
                  "inventory_2026-11-02.xlsx",
                  "journal_2026-11-02.xlsx",
                ]}
              >
                <p className="m-0">
                  Your daily accounting files for November 2, 2026 have been
                  successfully generated.
                </p>
                <p className="m-0 mt-1.5">
                  Total revenue: {money(REVENUE)}
                  <br />
                  Sales tax: {money(TAX)}
                  <br />
                  Shipping: {money(SHIPPING)}
                </p>
                <p className="m-0 mt-1.5 text-bg/60">
                  The Inventory Export and Journal Entry files are attached.
                </p>
              </EmailCard>
            </div>
          </div>
        </div>

        {/* Running at midnight */}
        <Appear
          show={at(T.running) && !at(T.email)}
          from="none"
          className="pointer-events-none absolute inset-x-0 top-8 flex justify-center @xl:bottom-0 @xl:left-auto @xl:top-auto @xl:w-[280px]"
        >
          <span className="rounded-full border border-accent/50 bg-surface px-3 py-1 text-[11px] text-accent">
            Running daily export...
          </span>
        </Appear>
      </div>
    </DemoFrame>
  );
}
