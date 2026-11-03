"use client";

import { DemoFrame } from "./demo-frame";
import { Appear, Bar, FakeButton, Pill } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { useDemoPlayer } from "./use-demo-player";

/* Invented job. No real customer, address, technician, or job number. */
const JOB = {
  customer: "M. Whitfield",
  address: "18 Birch Ct, Summit, NJ",
  invoice: "#4821",
  scheduled: "Tue Nov 3, 9:30 AM to 11:30 AM",
  type: "GENERATOR",
};

type Step = {
  n: string;
  text: string;
  /** Evidence line shown under the Housecall Pro pill. Null means the step is manual. */
  fact: string | null;
  /** When the Y answer fills in. */
  confirmAt: number;
};

const STEPS: Step[] = [
  { n: "1", text: "Arrive to appointment 30 minutes early.", fact: "Started 9:02 AM, 28 min before the scheduled start", confirmAt: 1700 },
  { n: "11", text: "Collect the $100 scheduling deposit.", fact: "Payment of $100.00 on Oct 28, before the work date", confirmAt: 3300 },
  { n: "10", text: "Secure a projected date for the install.", fact: "Follow-up job booked for Nov 12", confirmAt: 4900 },
  { n: "27", text: "Invoice paid at closeout.", fact: "Invoice #4821 paid 11:14 AM", confirmAt: 6500 },
  { n: "23", text: "Did you conduct a QA/QC?", fact: null, confirmAt: 8700 },
];

/* Fixed step height so the auto-scroll math is deterministic. Three steps fit the list view. */
const STEP_H = 102;
const STRIDE = STEP_H + 6;
const VISIBLE_STEPS = 3;
const MAX_SCROLL = (STEPS.length - VISIBLE_STEPS) * STRIDE;

const T = {
  rows: 300,
  rowStep: 140,
  suggest: 1000,
  tap: 8300,
  submitPress: 10200,
  submitted: 10900,
  end: 11800,
};

export function QaqcDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(T.end, { isStatic });
  const { at, t } = player;

  const answered = STEPS.filter((s) => at(s.confirmAt)).length;
  /* The list scrolls like a thumb would, keeping the step being answered in view. */
  const current = Math.min(STEPS.length, answered + 1);
  const scroll = Math.min(MAX_SCROLL, Math.max(0, current - 2) * STRIDE);
  const submitted = at(T.submitted);
  const tapping = t >= T.tap && t < T.tap + 700;

  return (
    <DemoFrame
      player={player}
      title="QA/QC checklist app"
      summary="A phone shows one job checklist. Four steps are suggested from Housecall Pro data, each with the evidence, and fill in as confirmed. One step is answered by hand with a tap. The progress bar completes and the checklist is submitted."
      caption={hideCaption ? undefined : "Housecall Pro suggests. A person confirms."}
    >
      <div className="flex min-h-[560px] items-start justify-center">
        {/* Phone */}
        <div className="w-full max-w-[300px] rounded-[30px] border border-border bg-bg p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex h-[540px] flex-col overflow-hidden rounded-[22px] bg-surface">
            {/* Status bar */}
            <div className="flex shrink-0 items-center justify-between px-5 pt-2.5 text-[10px] text-muted">
              <span>9:41</span>
              <span className="h-4 w-16 rounded-full bg-bg" aria-hidden />
              <span>NJ</span>
            </div>

            {/* Header card */}
            <div className="mx-3 mt-2 shrink-0 rounded-[10px] border border-border bg-bg p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11.5px] font-semibold leading-[1.3]">Appointment/Service Call Checklist</span>
                <Pill tone={submitted ? "good" : "accent"}>{submitted ? "Submitted" : "In progress"}</Pill>
              </div>
              <dl className="mt-2 grid grid-cols-[62px_1fr] gap-x-2 gap-y-0.5 text-[10px] leading-[1.4]">
                <dt className="text-muted">Customer</dt>
                <dd className="m-0 truncate">{JOB.customer}</dd>
                <dt className="text-muted">Address</dt>
                <dd className="m-0 truncate">{JOB.address}</dd>
                <dt className="text-muted">Job / inv.</dt>
                <dd className="m-0 truncate">
                  {JOB.invoice} <span className="text-muted">{JOB.type}</span>
                </dd>
                <dt className="text-muted">Scheduled</dt>
                <dd className="m-0 truncate">{JOB.scheduled}</dd>
              </dl>
            </div>

            {/* Steps */}
            <div className="relative mt-2 min-h-0 flex-1 overflow-hidden px-3">
              <ol
                className="m-0 grid grid-cols-[minmax(0,1fr)] list-none gap-1.5 p-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                style={{ transform: `translateY(-${scroll}px)` }}
              >
                {STEPS.map((step, i) => {
                  const shown = at(T.rows + i * T.rowStep);
                  const suggested = step.fact !== null && at(T.suggest + i * 500);
                  const confirmed = at(step.confirmAt);
                  const manual = step.fact === null;
                  return (
                    <Appear
                      key={step.n}
                      show={shown}
                      as="li"
                      className="overflow-hidden rounded-[10px] border border-border bg-bg px-2.5 py-1.5"
                      style={{ height: STEP_H }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-px w-4 shrink-0 text-[10px] font-semibold text-muted">{step.n}</span>
                        <span className="truncate text-[11px] leading-[1.35]">{step.text}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 pl-6">
                        {manual ? (
                          <Pill>Manual</Pill>
                        ) : (
                          <Pill tone="info" className={`transition-opacity duration-300 ${suggested ? "opacity-100" : "opacity-0"}`}>
                            Housecall Pro · suggests Y
                          </Pill>
                        )}
                        <span
                          className={`text-[9.5px] font-semibold transition-opacity duration-300 ${confirmed ? "opacity-100" : "opacity-0"} ${
                            manual ? "text-text" : "text-[#9fd0a8]"
                          }`}
                        >
                          <span className="@max-[20rem]:hidden">{manual ? "answered" : "confirmed"}</span>
                          <span className="@min-[20rem]:hidden" aria-hidden>
                            ✓
                          </span>
                        </span>
                      </div>
                      <p
                        className={`m-0 mt-1 truncate pl-6 text-[9.5px] leading-[1.35] text-muted transition-opacity duration-300 ${
                          suggested ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {step.fact ?? "Answered by the office after the call"}
                      </p>
                      <div className="mt-1.5 grid grid-cols-3 gap-1 pl-6">
                        {(["Y", "N", "B"] as const).map((v) => {
                          const isY = v === "Y";
                          const filled = isY && confirmed;
                          const dashed = isY && suggested && !confirmed;
                          return (
                            <span
                              key={v}
                              className={`relative flex h-6 items-center justify-center rounded-[6px] border text-[10.5px] font-bold transition-colors duration-300 ${
                                filled
                                  ? "border-accent bg-accent text-on-accent"
                                  : dashed
                                    ? "border-dashed border-[#7aa7c7] text-[#a9cde6]"
                                    : "border-border text-muted"
                              }`}
                            >
                              {v}
                              {isY && manual && tapping ? (
                                <span className="demo-tap absolute inset-0 m-auto h-6 w-6 rounded-full bg-accent/60" aria-hidden />
                              ) : null}
                            </span>
                          );
                        })}
                      </div>
                    </Appear>
                  );
                })}
              </ol>
              {/* Fade at the bottom edge of the list */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-surface to-transparent" aria-hidden />
            </div>

            {/* Submit bar */}
            <div className="shrink-0 border-t border-border bg-surface px-3 pb-3 pt-2">
              <div className="flex items-center justify-between text-[10px] text-muted">
                <span>
                  <span className="font-semibold text-text">
                    {answered} of {STEPS.length}
                  </span>{" "}
                  answered
                </span>
                <span className={answered === STEPS.length ? "text-[#9fd0a8]" : ""}>
                  {submitted ? "Locked" : answered === STEPS.length ? "Saved" : "Saving..."}
                </span>
              </div>
              <Bar value={answered / STEPS.length} className="mt-1.5" tone={answered === STEPS.length ? "good" : "accent"} />
              <FakeButton
                className="mt-2 w-full"
                disabled={answered < STEPS.length}
                pressed={t >= T.submitPress && t < T.submitPress + 300}
              >
                {submitted ? "Submitted" : "Submit checklist"}
              </FakeButton>
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
