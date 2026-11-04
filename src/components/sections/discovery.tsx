import { BookCallLink } from "@/components/common/buttons";
import { CheckIcon } from "@/components/common/icons";
import { Reveal } from "@/components/common/reveal";

const points = ["30 minutes on a call", "No cost, no obligation", "A fixed price before we build", "You talk to the people building it"];

/** A slim band right under the hero that makes the free discovery call impossible to miss. */
export function Discovery() {
  return (
    <section aria-label="Free discovery call">
      <div className="container-site py-[clamp(8px,2vw,24px)]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius)] border border-accent/70 bg-accent/[0.14] p-6 md:p-8">
            <span className="absolute inset-y-0 left-0 w-1.5 bg-accent" aria-hidden />
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-hover">Free discovery call</p>
                <h2 className="mt-2 font-display text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.02em] text-balance">
                  Discovery is always free.
                </h2>
                <p className="mt-2 max-w-[60ch] text-[15.5px] leading-[1.6] text-muted text-pretty">
                  Tell us where your time and money go. We&apos;ll tell you what we&apos;d automate, what we&apos;d build, and
                  what it would cost. No pitch deck.
                </p>
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
                  {points.map((point) => (
                    <li key={point} className="inline-flex items-center gap-2 text-[14px] text-text">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <BookCallLink compact className="justify-self-start max-sm:w-full" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
