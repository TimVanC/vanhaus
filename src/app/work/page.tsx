import type { Metadata } from "next";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { ProjectRow } from "@/components/work/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Work | Custom Software & AI Case Studies | VanHaus",
  description:
    "Case studies from VanHaus: an AI receptionist, a proposal generator, a QA/QC checklist app, accounting automation, and publishing tools, all built for small businesses in New Jersey.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <div className="grain" />
      <main className="relative z-10">
        <Header />
        <section className="container-site pb-[clamp(48px,7vw,104px)] pt-[clamp(32px,5vw,72px)]">
          <Reveal>
            <Kicker>Work</Kicker>
            <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(40px,6vw,88px)] font-bold leading-[0.98] tracking-[-0.035em] text-balance">
              Real tools for real businesses.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-muted text-pretty">
              Each one below is a live recreation of the real product, running on made-up data. Clients are described by
              industry until they say it&apos;s fine to use their name.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-[clamp(56px,7vw,104px)] md:mt-16">
            {projects.map((project, index) => (
              <Reveal key={project.slug}>
                <ProjectRow project={project} flip={index % 2 === 1} headingLevel="h2" />
              </Reveal>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
