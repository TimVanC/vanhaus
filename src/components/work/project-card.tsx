import Link from "next/link";
import { ArrowRight } from "@/components/common/icons";
import { LazyDemo } from "@/components/demos/lazy-demo";
import { statusLabel, type Project } from "@/lib/projects";

/** Status and demo-readiness badges, shared by project rows and case study pages. */
export function ProjectBadges({ project, className = "" }: { project: Project; className?: string }) {
  const inProgress = project.status === "in-progress";
  const comingSoon = project.demo === "coming-soon";
  if (!inProgress && !comingSoon) return null;
  return (
    <span className={`flex flex-wrap gap-2 ${className}`}>
      {inProgress ? (
        <span className="inline-flex h-6 items-center rounded-full border border-accent/60 bg-accent/10 px-2.5 text-[11.5px] font-semibold text-accent">
          {statusLabel[project.status]}
        </span>
      ) : null}
      {comingSoon ? (
        <span className="inline-flex h-6 items-center rounded-full border border-border px-2.5 text-[11.5px] font-medium text-muted">
          Demo coming soon
        </span>
      ) : null}
    </span>
  );
}

/** One stat, big number over a label. */
export function Stat({ value, label, size = "md" }: { value: string; label: string; size?: "md" | "lg" }) {
  return (
    <div>
      <span
        className={`block font-display font-bold leading-none tracking-[-0.03em] text-text ${
          size === "lg" ? "text-[clamp(40px,5vw,64px)]" : "text-[clamp(28px,3vw,40px)]"
        }`}
      >
        {value}
      </span>
      <span className="mt-2 block max-w-[22ch] text-[14px] leading-[1.4] text-muted">{label}</span>
    </div>
  );
}

/**
 * One project per row: the live demo on one side, the story on the other. `flip` puts the
 * demo on the right on large screens; on phones the demo always comes first.
 */
export function ProjectRow({
  project,
  flip = false,
  headingLevel = "h3",
}: {
  project: Project;
  flip?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <LazyDemo slug={project.slug} />
      </div>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[14px] text-muted">{project.client}</p>
          <ProjectBadges project={project} />
        </div>
        <Heading className="mt-3 font-display text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.02em] text-balance">
          {project.title}
        </Heading>
        <dl className="mt-6 divide-y divide-border border-t border-border">
          {project.home.map((row, i, rows) => {
            const last = i === rows.length - 1;
            return (
              <div
                key={row.label}
                className={`grid gap-1.5 py-4 sm:grid-cols-[112px_1fr] sm:gap-5 ${last ? "border-l-2 border-accent pl-4 sm:pl-5" : ""}`}
              >
                <dt className="text-[12.5px] uppercase tracking-[0.08em] text-muted">{row.label}</dt>
                <dd className={`m-0 text-[15.5px] leading-[1.6] ${last ? "font-medium text-text" : "text-muted"}`}>{row.text}</dd>
              </div>
            );
          })}
        </dl>
        <Link
          href={`/work/${project.slug}`}
          className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold underline-offset-4 hover:underline"
        >
          Read the case study
          <ArrowRight className="h-4 w-4 text-accent" />
        </Link>
      </div>
    </article>
  );
}
