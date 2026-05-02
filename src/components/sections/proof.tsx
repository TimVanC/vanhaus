import { Eyebrow } from "@/components/common/eyebrow";
import { CheckIcon } from "@/components/common/icons";
import { Reveal } from "@/components/common/reveal";
import { SectionHead } from "@/components/common/section-head";
import { proofItems, proofStats } from "@/lib/site-data";

export function Proof() {
  return (
    <section id="work" className="section-block">
      <div className="container-site">
        <Reveal>
          <Eyebrow number="03" label="Proof" />
        </Reveal>
        <SectionHead
          title={
            <>
              Built on real work.
            </>
          }
          lead="Five years of building production systems for founders, operators, and growing teams. From initial build to long-term iteration, each system is designed to perform reliably in real-world use."
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div className="grid grid-cols-2 border-l border-t border-white/10">
              {proofStats.map((item) => (
                <div key={item.label} className="border-b border-r border-white/10 px-7 py-9">
                  <p className="mb-3 flex items-baseline gap-1 text-[clamp(38px,4.5vw,56px)] leading-none font-medium tracking-[-0.04em]">
                    {item.value}
                    <span className="text-[0.5em] text-[var(--accent)]">{item.unit}</span>
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.05em] text-zinc-400">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="d2">
            <ul className="flex list-none flex-col">
              {proofItems.map((item, index) => (
                <li
                  key={item.text}
                  className={`grid grid-cols-[32px_1fr_auto] items-center gap-4 border-t border-white/10 py-[22px] text-[15.5px] ${
                    index === proofItems.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(95,123,255,0.12)] text-[var(--accent)]">
                    <CheckIcon />
                  </span>
                  <span>{item.text}</span>
                  <span className="font-mono text-[11px] text-zinc-500">{item.meta}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
