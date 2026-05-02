import { Eyebrow } from "@/components/common/eyebrow";
import { ArrowRight } from "@/components/common/icons";
import { Reveal } from "@/components/common/reveal";

export function Cta() {
  return (
    <section id="about" className="pb-[clamp(80px,10vw,140px)] pt-[clamp(80px,10vw,140px)]">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[#14141A] px-[clamp(48px,7vw,96px)] py-[clamp(48px,7vw,96px)]">
            <div className="cta-gradient absolute inset-0" />
            <div className="cta-grid-mask absolute inset-0 pointer-events-none" />

            <div className="relative z-10">
              <Eyebrow number="05" label="Next step" />
              <h2 className="mb-6 max-w-[14ch] text-balance text-[clamp(40px,6vw,80px)] font-semibold leading-[0.98] tracking-[-0.04em]">
                Start a <span className="text-[var(--accent)]">project.</span>
              </h2>
              <p className="mb-10 max-w-[540px] text-lg leading-[1.55] text-zinc-400">
                We&apos;ll talk through your goals, what needs to be built, and how to move forward.
                If it&apos;s a fit, we&apos;ll define the next steps clearly.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <button className="group inline-flex h-[50px] items-center gap-2.5 rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] px-[22px] text-[14.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_0_0_1px_var(--accent),0_8px_30px_-8px_var(--accent-glow)] transition hover:-translate-y-px hover:bg-[var(--accent-2)]">
                  Book a call
                  <ArrowRight className="transition-transform group-hover:translate-x-[3px]" />
                </button>
                <span className="font-mono text-[13px] text-zinc-400">
                  <span className="text-zinc-500">or email </span>
                  <a className="text-zinc-300 transition-colors hover:text-white" href="mailto:hello@vanhaus.dev">
                    hello@vanhaus.dev
                  </a>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
