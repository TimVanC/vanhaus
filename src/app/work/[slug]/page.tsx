import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCallLink } from "@/components/common/buttons";
import { ArrowRight, CheckIcon } from "@/components/common/icons";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { LazyDemo } from "@/components/demos/lazy-demo";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { ProjectBadges, Stat } from "@/components/work/project-card";
import { projectBySlug, projects } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: `https://vanhaus.dev/work/${project.slug}`,
      type: "article",
    },
  };
}

function Section({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border">
      <div className="container-site grid gap-8 py-[clamp(56px,7vw,96px)] lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(26px,2.8vw,38px)] font-bold leading-[1.1] tracking-[-0.02em] text-balance">
            {title}
          </h2>
        </Reveal>
        <Reveal className="d1 lg:col-span-7 lg:col-start-6">{children}</Reveal>
      </div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="grid gap-5 text-[17px] leading-[1.65] text-muted">
      {paragraphs.map((p) => (
        <p key={p} className="text-pretty">
          {p}
        </p>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <div className="grain" />
      <main className="relative z-10">
        <Header />

        {/* Intro */}
        <section className="container-site pb-[clamp(40px,5vw,64px)] pt-[clamp(40px,6vw,72px)]">
          <Reveal>
            <Link href="/work" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-text">
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              All work
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Kicker>{project.client}</Kicker>
              <ProjectBadges project={project} />
            </div>
            <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(38px,5.6vw,80px)] font-bold leading-[0.98] tracking-[-0.035em] text-balance">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[56ch] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-muted text-pretty">{project.summary}</p>
          </Reveal>
        </section>

        {/* Demo */}
        <section className="container-site pb-[clamp(56px,7vw,96px)]">
          <Reveal className="d1">
            <div className="mx-auto max-w-[920px]">
              <LazyDemo slug={project.slug} />
            </div>
          </Reveal>
        </section>

        <Section kicker="The problem" title="Where the time was going.">
          <Prose paragraphs={project.problem} />
        </Section>

        <Section kicker="What we built" title="The fix.">
          <Prose paragraphs={project.built} />
        </Section>

        <Section kicker="Results" title="What changed.">
          {project.stats.length ? (
            <div className="grid gap-8 sm:grid-cols-2">
              {project.stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} size="lg" />
              ))}
            </div>
          ) : null}
          <p className={`max-w-[48ch] text-[17px] leading-[1.6] text-pretty ${project.stats.length ? "mt-8 text-muted" : "text-text"}`}>
            {project.result}
          </p>
        </Section>

        <Section kicker="How it works" title="Stack and approach, in plain language.">
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {project.howItWorks.stack.map((item) => (
              <li key={item} className="rounded-full border border-border px-3 py-1 text-[13.5px] text-text">
                {item}
              </li>
            ))}
          </ul>
          <ol className="m-0 mt-8 grid list-none gap-5 p-0">
            {project.howItWorks.approach.map((step) => (
              <li key={step} className="grid grid-cols-[24px_1fr] gap-3 text-[16.5px] leading-[1.6] text-muted">
                <span className="mt-[5px] flex h-5 w-5 items-center justify-center rounded-full bg-accent text-on-accent">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <span className="text-pretty">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* CTA */}
        <section className="border-t border-border bg-surface/50">
          <div className="container-site py-[clamp(64px,8vw,112px)]">
            <Reveal>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <Kicker>Next step</Kicker>
                  <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(34px,4.6vw,64px)] font-bold leading-[0.98] tracking-[-0.035em] text-balance">
                    Got a similar problem?
                  </h2>
                  <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-muted">
                    Thirty minutes, no cost, no pitch deck. Tell us what is eating your time and we will tell you what we would build.
                  </p>
                </div>
                <BookCallLink className="shrink-0" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* More work */}
        <section className="border-t border-border">
          <div className="container-site py-[clamp(48px,6vw,80px)]">
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-[clamp(22px,2.4vw,30px)] font-bold tracking-[-0.02em]">More work</h2>
                <Link href="/work" className="inline-flex items-center gap-2 text-[14.5px] font-semibold underline-offset-4 hover:underline">
                  See everything
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
              </div>
              <ul className="m-0 mt-8 grid list-none gap-6 p-0 md:grid-cols-3">
                {others.map((other) => (
                  <li key={other.slug} className="border-t border-border pt-5">
                    <p className="text-[13px] text-muted">{other.client}</p>
                    <Link href={`/work/${other.slug}`} className="mt-2 block font-display text-[20px] font-bold leading-[1.15] tracking-[-0.02em] hover:text-accent">
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
