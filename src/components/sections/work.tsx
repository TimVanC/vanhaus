import Image from "next/image";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { caseStudies, type CaseStudy } from "@/lib/site-data";

function MediaSlot({ study, index }: { study: CaseStudy; index: number }) {
  if (study.media?.type === "image") {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-surface">
        <Image
          src={study.media.src}
          alt={study.media.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (study.media?.type === "video") {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-surface">
        <video
          className="h-full w-full object-cover"
          src={study.media.src}
          controls
          playsInline
          preload="metadata"
          aria-label={study.media.alt}
        />
      </div>
    );
  }

  /* TODO: media slot. Fill study.media in site-data.ts with a screenshot or demo video. */
  return (
    <div
      className="relative flex aspect-[16/10] items-end overflow-hidden rounded-[var(--radius)] border border-border bg-surface p-6"
      role="img"
      aria-label={`Demo for ${study.title} coming soon`}
    >
      <span
        className="pointer-events-none absolute -right-2 -top-5 font-display text-[clamp(96px,18vw,220px)] font-bold leading-none tracking-[-0.05em] text-text/[0.05]"
        aria-hidden
      >
        0{index + 1}
      </span>
      <p className="relative text-[13.5px] text-muted">Demo coming soon</p>
    </div>
  );
}

function Detail({ label, children, highlight = false }: { label: string; children: string; highlight?: boolean }) {
  return (
    <div className={`grid gap-1.5 py-5 sm:grid-cols-[120px_1fr] sm:gap-6 ${highlight ? "border-l-2 border-accent pl-4 sm:pl-5" : ""}`}>
      <dt className="text-[13px] uppercase tracking-[0.08em] text-muted">{label}</dt>
      <dd className={`text-[16px] leading-[1.6] ${highlight ? "font-medium text-text" : "text-muted"}`}>
        {children}
      </dd>
    </div>
  );
}

/** Three case studies, media and text swapping sides each row. Clients named by industry only. */
export function Work() {
  return (
    <section id="work" className="border-t border-border">
      <div className="container-site py-[clamp(72px,9vw,128px)]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>Work</Kicker>
              <h2 className="mt-6 font-display text-[clamp(34px,4.4vw,60px)] font-bold leading-[1] tracking-[-0.03em]">
                Things we&apos;ve built.
              </h2>
            </div>
            <p className="max-w-[36ch] text-[15px] leading-[1.6] text-muted">
              Real tools for real businesses. Clients are described by industry until they say
              it&apos;s fine to use their name.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-[clamp(56px,7vw,96px)] md:mt-20">
          {caseStudies.map((study, index) => {
            const flip = index % 2 === 1;
            return (
              <Reveal key={study.id}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                    <MediaSlot study={study} index={index} />
                  </div>
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                    <p className="text-[14px] text-muted">{study.client}</p>
                    <h3 className="mt-3 font-display text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.02em] text-balance">
                      {study.title}
                    </h3>
                    <dl className="mt-6 divide-y divide-border border-t border-border">
                      <Detail label="Problem">{study.problem}</Detail>
                      <Detail label="What we built">{study.built}</Detail>
                      <Detail label="Result" highlight>
                        {study.result}
                      </Detail>
                    </dl>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
