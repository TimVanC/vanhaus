import Link from "next/link";
import { ArrowRight } from "@/components/common/icons";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { LazyDemo } from "@/components/demos/lazy-demo";
import { ProjectBadges, ProjectCard } from "@/components/work/project-card";
import { featuredProjects, tileProjects } from "@/lib/projects";

/**
 * Homepage Work section: two featured live demos with their story beside them,
 * two smaller tiles with a static final state and one stat, then a link to /work.
 */
export function Work() {
  return (
    <section id="work" className="border-t border-border">
      <div className="container-site py-[clamp(72px,9vw,128px)]">
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

        <div className="mt-14 flex flex-col gap-[clamp(56px,7vw,96px)] md:mt-20">
          {featuredProjects.map((project, index) => {
            const flip = index % 2 === 1;
            const stat = project.stats[0];
            return (
              <Reveal key={project.slug}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                    <LazyDemo slug={project.slug} />
                  </div>
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <p className="text-[14px] text-muted">{project.client}</p>
                      <ProjectBadges project={project} />
                    </div>
                    <h3 className="mt-3 font-display text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.02em] text-balance">
                      {project.title}
                    </h3>
                    <p className="mt-5 text-[16px] leading-[1.6] text-muted">{project.summary}</p>
                    {stat ? (
                      <p className="mt-6 border-l-2 border-accent pl-4 text-[15.5px] leading-[1.5]">
                        <span className="font-display text-[30px] font-bold leading-none tracking-[-0.03em]">{stat.value}</span>
                        <span className="ml-2 text-muted">{stat.label}</span>
                      </p>
                    ) : (
                      <p className="mt-6 border-l-2 border-accent pl-4 text-[15.5px] leading-[1.5] text-text">{project.result}</p>
                    )}
                    <Link
                      href={`/work/${project.slug}`}
                      className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold underline-offset-4 hover:underline"
                    >
                      Read the case study
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-[clamp(56px,7vw,96px)] grid gap-10 border-t border-border pt-12 md:grid-cols-2 md:gap-8">
            {tileProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 flex justify-center md:mt-16">
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
