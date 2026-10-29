import { Reveal } from "@/components/common/reveal";
import { SHOW_TESTIMONIAL } from "@/lib/constants";
import { testimonial } from "@/lib/site-data";

/**
 * Hidden until SHOW_TESTIMONIAL is true AND a real quote exists in site-data.ts.
 * Both guards are deliberate so a placeholder can never ship.
 */
export function Testimonial() {
  if (!SHOW_TESTIMONIAL || !testimonial) return null;

  return (
    <section id="testimonial" className="border-t border-border bg-surface/50">
      <div className="container-site py-[clamp(64px,8vw,112px)]">
        <Reveal>
          <figure className="mx-auto max-w-[820px]">
            <span className="block font-display text-[72px] leading-[0.6] text-accent" aria-hidden>
              &ldquo;
            </span>
            <blockquote className="mt-6 font-display text-[clamp(24px,2.8vw,38px)] font-medium leading-[1.25] tracking-[-0.02em] text-balance">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-8 text-[15px] text-muted">
              <span className="font-medium text-text">{testimonial.name}</span>, {testimonial.company}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
