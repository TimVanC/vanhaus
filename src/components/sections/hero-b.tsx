import { BookCallLink, SecondaryLink } from "@/components/common/buttons";
import { Reveal } from "@/components/common/reveal";
import { StatusDot } from "@/components/common/status-dot";
import { hero } from "@/lib/site-data";

/**
 * Direction B: "Workshop".
 * A distinctive grotesk set very large across the full width, one hand-drawn copper
 * underline, and a plain facts column instead of imagery. The photo stays exclusive
 * to the founders section.
 */
export function HeroB() {
  return (
    <section className="dir-b relative">
      <div className="container-site pb-[clamp(64px,8vw,112px)] pt-[clamp(44px,6vw,80px)]">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="flex items-center gap-3 text-[14px] text-muted">
              <span className="h-px w-8 bg-accent" aria-hidden />
              Custom software and AI for small businesses
            </p>
            <StatusDot />
          </div>
        </Reveal>

        <Reveal className="d1">
          <h1 className="mt-10 font-display text-[clamp(44px,8.2vw,122px)] font-bold leading-[0.96] tracking-[-0.035em] md:mt-14">
            <span className="md:block">Every task has a</span>{" "}
            <span className="md:block">
              <span className="relative inline-block">
                smarter
                <svg
                  className="absolute left-0 top-full -mt-[0.14em] h-[0.16em] w-full text-accent"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M3 15 C 50 5, 120 3, 197 11"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              way to do it.
            </span>
            {" "}
            <span className="md:block">We find it and build it.</span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal className="d2">
              <p className="max-w-[48ch] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-muted text-pretty">
                {hero.sub}
              </p>
            </Reveal>
            <Reveal className="d3">
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookCallLink />
                <SecondaryLink href="#work">{hero.secondaryCta}</SecondaryLink>
              </div>
            </Reveal>
          </div>

          <Reveal className="d3 lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-border border-y border-border text-[15px]">
              <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                <dt className="text-muted">Based in</dt>
                <dd className="text-text">Madison, NJ</dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                <dt className="text-muted">Serving</dt>
                <dd className="text-text">New Jersey and the NYC area</dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                <dt className="text-muted">Discovery</dt>
                <dd className="text-text">Always free. 30 minutes, no pitch deck.</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
