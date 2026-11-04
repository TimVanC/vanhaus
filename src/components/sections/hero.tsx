import { BookCallLink, SecondaryLink } from "@/components/common/buttons";
import { FIRST_YEAR, PROJECT_COUNT } from "@/lib/constants";
import { hero } from "@/lib/site-data";

/**
 * A distinctive grotesk set very large across the full width, one hand-drawn copper
 * underline, and a plain facts column instead of imagery. Everything here is above the
 * fold, so it renders immediately with no scroll reveal.
 */
export function Hero() {
  return (
    <section className="relative">
      <div className="container-site pb-[clamp(40px,6vw,88px)] pt-[clamp(32px,5vw,72px)]">
        <h1 className="font-display text-[clamp(42px,8.2vw,122px)] font-bold leading-[1.06] tracking-[-0.025em] md:leading-[0.96] md:tracking-[-0.035em]">
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
          </span>{" "}
          <span className="md:block">We find it and build it.</span>
        </h1>

        <div className="mt-8 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="max-w-[48ch] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-muted text-pretty">{hero.sub}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-9">
              <BookCallLink />
              <SecondaryLink href="#work">{hero.secondaryCta}</SecondaryLink>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-border border-y border-border text-[15px]">
              <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                <dt className="text-muted">Serving</dt>
                <dd className="text-text">New Jersey, the NYC area, and clients anywhere</dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                <dt className="text-muted">Building</dt>
                <dd className="text-text">
                  Since {FIRST_YEAR}. {PROJECT_COUNT}+ projects shipped.
                </dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                <dt className="text-muted">Discovery</dt>
                <dd className="text-text">Always free. 30 minutes, no pitch deck.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
