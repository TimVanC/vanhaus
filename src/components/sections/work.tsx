import Link from "next/link";
import { ArrowRight } from "@/components/common/icons";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { ProjectRow } from "@/components/work/project-card";
import { homeProjects } from "@/lib/projects";

/**
 * Homepage Work section: four projects, one per row, with the demo and the story
 * swapping sides each row. Then a link to /work for the rest.
 */
export function Work() {
  return (
    <section id="work">
      <div className="container-site py-[clamp(48px,7vw,104px)]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>Work</Kicker>
              <h2 className="mt-6 font-display text-[clamp(34px,4.4vw,60px)] font-bold leading-[1] tracking-[-0.03em]">
                Things we&apos;ve built.
              </h2>
            </div>
            <p className="max-w-[36ch] text-[15px] leading-[1.6] text-muted">
              Live recreations of real tools, with made-up data. Clients are described by industry until they say
              it&apos;s fine to use their name.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-[clamp(56px,7vw,104px)] md:mt-16">
          {homeProjects.map((project, index) => (
            <Reveal key={project.slug}>
              <ProjectRow project={project} flip={index % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex justify-center md:mt-20">
            <Link
              href="/work"
              className="group inline-flex h-[54px] items-center gap-2.5 rounded-full border border-border px-7 text-[15.5px] font-semibold tracking-[-0.01em] text-text transition-colors hover:border-muted"
            >
              See all our work
              <ArrowRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
