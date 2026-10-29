import { CheckIcon } from "@/components/common/icons";
import { Reveal } from "@/components/common/reveal";
import { stats, trustPoints } from "@/lib/site-data";

/**
 * Big numbers in a hairline row, then the four plain-language promises.
 * Numbers come from site-data.ts; two are TODO placeholders until confirmed.
 */
export function Stats() {
  return (
    <section id="numbers" className="border-t border-border bg-surface/50">
      <div className="container-site py-[clamp(64px,8vw,112px)]">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <dd
                  className={`font-display text-[clamp(34px,4vw,56px)] font-bold leading-none tracking-[-0.03em] text-text ${
                    stat.value.includes("[") ? "break-all text-[clamp(22px,2.4vw,32px)]" : ""
                  }`}
                >
                  {stat.value}
                </dd>
                <dt className="mt-3 max-w-[18ch] text-[14.5px] leading-[1.4] text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="d1">
          <div className="mt-16 grid gap-10 border-t border-border pt-12 md:mt-20 lg:grid-cols-12">
            <h2 className="font-display text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.02em] lg:col-span-4">
              How we work with you.
            </h2>
            <ul className="list-none grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
              {trustPoints.map((point) => (
                <li key={point.title} className="grid grid-cols-[24px_1fr] gap-3">
                  <span className="mt-[3px] flex h-5 w-5 items-center justify-center rounded-full bg-accent text-on-accent">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold leading-[1.35] tracking-[-0.01em]">{point.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.6] text-muted">{point.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
