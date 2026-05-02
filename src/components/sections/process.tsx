import { Eyebrow } from "@/components/common/eyebrow";
import { Reveal } from "@/components/common/reveal";
import { SectionHead } from "@/components/common/section-head";
import { processSteps } from "@/lib/site-data";

export function Process() {
  return (
    <section id="process" className="section-block">
      <div className="container-site">
        <Reveal>
          <Eyebrow number="04" label="Process" />
        </Reveal>
        <SectionHead
          title={
            <>
              Three steps.
              <br />
              No theatre.
            </>
          }
          lead="A predictable rhythm tuned for momentum. Most engagements move from kickoff to launch in four to eight weeks."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal key={step.step} className={`d${Math.min(index + 1, 4)}`}>
              <article className="group relative h-full overflow-hidden rounded-[14px] border border-white/10 bg-[#14141A] p-8 transition hover:-translate-y-0.5 hover:border-white/15">
                <div className="absolute bottom-0 left-0 top-0 w-0.5 origin-top scale-y-0 bg-[var(--accent)] transition group-hover:scale-y-100" />
                <p className="mb-6 font-mono text-xs tracking-[0.02em] text-[var(--accent)]">{step.step}</p>
                <h3 className="mb-3 text-[26px] font-semibold tracking-[-0.025em]">{step.title}</h3>
                <p className="mb-7 text-[14.5px] leading-[1.6] text-zinc-400">{step.body}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
