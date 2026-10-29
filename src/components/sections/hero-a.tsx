import Image from "next/image";
import { BookCallLink, SecondaryLink } from "@/components/common/buttons";
import { Reveal } from "@/components/common/reveal";
import { StatusDot } from "@/components/common/status-dot";
import { LOCATION_LINE } from "@/lib/constants";
import { hero } from "@/lib/site-data";

/**
 * Direction A: "Editorial".
 * Warm serif, a headline that reads like a magazine opener, and the founders photo
 * doing the talking. Asymmetric two-column row under the headline.
 */
export function HeroA() {
  return (
    <section className="dir-a relative">
      <div className="container-site pb-[clamp(64px,8vw,112px)] pt-[clamp(48px,7vw,96px)]">
        <Reveal>
          <StatusDot />
        </Reveal>

        <Reveal className="d1">
          <h1 className="mt-7 max-w-[17ch] font-display text-[clamp(42px,6.4vw,92px)] font-medium leading-[1.02] tracking-[-0.015em] text-balance">
            Every task has a{" "}
            <em className="font-normal italic text-accent">smarter</em> way to do it. We find it and
            build it.
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pt-4">
            <Reveal className="d2">
              <p className="max-w-[46ch] text-[clamp(17px,1.35vw,19px)] leading-[1.6] text-muted text-pretty">
                {hero.sub}
              </p>
            </Reveal>

            <Reveal className="d3">
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookCallLink />
                <SecondaryLink href="#work">{hero.secondaryCta}</SecondaryLink>
              </div>
            </Reveal>

            <Reveal className="d4">
              <p className="mt-10 border-t border-border pt-5 text-[14px] leading-[1.6] text-muted">
                {LOCATION_LINE}
                <br />
                <span className="text-text">Discovery is always free.</span>
              </p>
            </Reveal>
          </div>

          <Reveal className="d2 lg:col-span-7">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-surface">
                <Image
                  src="/images/founders-hero.webp"
                  alt="Tim Van Cauwenberge and Joe Chiusano, co-founders of VanHaus."
                  fill
                  priority
                  sizes="(min-width: 1024px) 660px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[13.5px] text-muted">
                Tim and Joe, the two people you&apos;ll actually work with.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
