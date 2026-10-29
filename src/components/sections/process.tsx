import { BookCallLink } from "@/components/common/buttons";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { processSteps } from "@/lib/site-data";

/** Three steps, stepping down the page on desktop so it reads as a path rather than a card row. */
export function Process() {
  return (
    <section id="how-it-works" className="border-t border-border">
      <div className="container-site py-[clamp(72px,9vw,128px)]">
        <Reveal>
          <Kicker>How it works</Kicker>
          <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(34px,4.4vw,60px)] font-bold leading-[1] tracking-[-0.03em] text-balance">
            Three steps. The first one is free.
          </h2>
        </Reveal>

        <ol className="mt-14 grid list-none gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} className={`d${index + 1}`}>
              <li
                className={`border-t border-border pt-6 ${index === 1 ? "md:mt-12" : index === 2 ? "md:mt-24" : ""}`}
              >
                <span className="font-display text-[clamp(56px,7vw,96px)] font-bold leading-none tracking-[-0.04em] text-accent">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[16px] leading-[1.6] text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="d2">
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-20">
            <BookCallLink />
            <p className="text-[15px] text-muted">30 minutes. No cost, no obligation.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
