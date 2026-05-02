import { Eyebrow } from "@/components/common/eyebrow";
import { ArrowRight } from "@/components/common/icons";
import { Reveal } from "@/components/common/reveal";
import { heroMeta } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative border-b border-white/10 pb-[clamp(80px,12vw,140px)] pt-[clamp(72px,12vw,140px)]">
      <div className="hero-glow pointer-events-none absolute inset-x-0 bottom-[-20%] h-[600px]" />
      <div className="container-site relative z-10">
        <div className="grid items-end gap-16">
          <div>
            <Reveal className="d1">
              <Eyebrow number="01" label="Solo studio · Available Q3 2026" />
            </Reveal>

            <Reveal className="d2">
              <h1 className="mb-8 text-balance text-[clamp(44px,7.5vw,104px)] font-semibold leading-[0.98] tracking-[-0.045em]">
                Building digital systems
                <br />
                that <span className="text-[var(--accent)]">scale.</span>
                <span className="ml-[0.05em] inline-block h-[0.85em] w-[0.55ch] animate-blink align-[-0.06em] bg-[var(--accent)]" />
              </h1>
            </Reveal>

            <Reveal className="d3">
              <p className="mb-10 max-w-[560px] text-pretty text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-zinc-400">
                Web development, software systems, and automation for modern businesses. One developer.
                Studio-grade execution. No agency overhead.
              </p>
            </Reveal>

            <Reveal className="d4">
              <div className="flex flex-wrap items-center gap-3.5">
                <button className="group inline-flex h-[50px] items-center gap-2.5 rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] px-[22px] text-[14.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_0_0_1px_var(--accent),0_8px_30px_-8px_var(--accent-glow)] transition hover:-translate-y-px hover:bg-[var(--accent-2)]">
                  Work with me
                  <ArrowRight className="transition-transform group-hover:translate-x-[3px]" />
                </button>
                <button className="inline-flex h-[50px] items-center gap-2.5 rounded-[10px] border border-white/15 px-[22px] text-[14.5px] font-semibold tracking-[-0.01em] text-white transition hover:border-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5BD37A] shadow-[0_0_8px_#5BD37A]" />
                  Booking 2 projects this quarter
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-20 grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
            {heroMeta.map((item, index) => (
              <div
                key={item.key}
                className={`border-white/10 py-7 pr-6 ${index !== heroMeta.length - 1 ? "border-r" : ""} ${
                  index < 2 ? "max-md:border-b" : ""
                } ${index === 1 ? "max-md:border-r-0" : ""}`}
              >
                <p className="mb-2.5 font-mono text-[11px] tracking-[0.05em] text-zinc-500">{item.key}</p>
                <p className="text-lg font-medium tracking-[-0.02em]">
                  {item.value}
                  {item.accent ? <span className="text-[var(--accent)]">{item.accent}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
