import { ArrowRight, ServiceIcon } from "@/components/common/icons";
import { Eyebrow } from "@/components/common/eyebrow";
import { Reveal } from "@/components/common/reveal";
import { SectionHead } from "@/components/common/section-head";
import { services } from "@/lib/site-data";

export function Services() {
  return (
    <section id="services" className="section-block">
      <div className="container-site relative z-10">
        <Reveal>
          <Eyebrow number="02" label="Services" />
        </Reveal>
        <SectionHead
          title={
            <>
              Three core systems.
              <br />
              Built end-to-end.
            </>
          }
          lead="End-to-end ownership across the stack. From the marketing site that earns the lead to the system that delivers the product to the automation that runs it on autopilot."
        />

        <Reveal className="d1">
          <div className="grid overflow-hidden rounded-[14px] border border-white/10 bg-[#14141A] md:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.id}
                className={`group relative flex min-h-[360px] flex-col gap-[22px] px-8 pb-9 pt-10 transition hover:bg-[#1A1A22] ${
                  index !== services.length - 1 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""
                }`}
              >
                <p className="font-mono text-[11px] tracking-[0.05em] text-zinc-500">{service.id}</p>
                <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/15 bg-[rgba(95,123,255,0.06)] text-[var(--accent)]">
                  <ServiceIcon type={service.icon} />
                </div>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{service.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-zinc-400">{service.description}</p>
                <ul className="mt-auto flex list-none flex-col gap-2.5 border-t border-white/10 pt-6">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 font-mono text-xs">
                      <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <ArrowRight className="absolute right-7 top-7 h-[18px] w-[18px] -rotate-45 text-zinc-500 opacity-40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
