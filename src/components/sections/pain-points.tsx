import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { painPoints } from "@/lib/site-data";

/**
 * Pain on the left, fix on the right, one hairline row per pair.
 * The intro sits in a narrow column so the list gets the width.
 */
export function PainPoints() {
  return (
    <section id="what-we-fix" className="border-t border-border">
      <div className="container-site py-[clamp(72px,9vw,128px)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <Kicker>Where to start</Kicker>
              <h2 className="mt-6 font-display text-[clamp(34px,4.4vw,60px)] font-bold leading-[1] tracking-[-0.03em] text-balance">
                Tell us what&apos;s slowing you down.
              </h2>
              <p className="mt-6 max-w-[38ch] text-[17px] leading-[1.6] text-muted text-pretty">
                {painPoints.intro}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="d1">
              <ul className="list-none divide-y divide-border border-y border-border">
                {painPoints.pairs.map((pair) => (
                  <li
                    key={pair.pain}
                    className="grid gap-2 py-6 sm:grid-cols-[1fr_28px_1fr] sm:items-baseline sm:gap-6"
                  >
                    <p className="text-[17px] leading-[1.45] text-muted">{pair.pain}</p>
                    <span className="hidden h-px w-7 translate-y-[-0.3em] bg-accent sm:block" aria-hidden />
                    <p className="font-display text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-text">
                      {pair.fix}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="d2">
              <p className="mt-10 max-w-[44ch] font-display text-[clamp(22px,2.2vw,30px)] font-medium leading-[1.25] tracking-[-0.02em] text-text text-balance">
                {painPoints.outro}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
