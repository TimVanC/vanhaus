import { BookCallLink } from "@/components/common/buttons";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { processSteps } from "@/lib/site-data";

/* Each step sits higher than the one before it on desktop, so the row reads as a staircase going up. */
const rise = ["md:mt-16", "md:mt-8", ""];

/** Three steps climbing left to right, kept compact so the section stays tight. */
export function Process() {
  return (
    <section id="how-it-works">
      <div className="container-site py-[clamp(48px,7vw,104px)]">
        <Reveal>
          <Kicker>How it works</Kicker>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(32px,3.8vw,52px)] font-bold leading-[1] tracking-[-0.03em] text-balance">
            Three steps. The first one is free.
          </h2>
        </Reveal>

        <ol className="mt-10 grid list-none gap-8 p-0 md:mt-12 md:grid-cols-3 md:gap-8">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} className={`d${index + 1}`}>
              <li className={`border-t border-border pt-5 ${rise[index] ?? ""}`}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[clamp(44px,4.6vw,64px)] font-bold leading-none tracking-[-0.04em] text-accent">
                    {step.number}
                  </span>
                  <h3 className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em]">{step.title}</h3>
                </div>
                <p className="mt-3 max-w-[34ch] text-[15.5px] leading-[1.6] text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="d2">
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-12">
            <BookCallLink />
            <p className="text-[15px] text-muted">30 minutes. No cost, no obligation.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
