import Link from "next/link";
import { ArrowRight } from "@/components/common/icons";
import { LazyDemo } from "@/components/demos/lazy-demo";
import { statusLabel, type Project } from "@/lib/projects";

/** Status and demo-readiness badges, shared by tiles, cards, and case study pages. */
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
 * A project card for the /work grid and the smaller homepage tiles: the demo's final
 * state as a static snapshot, then the client, title, one line, a stat if there is one,
 * and a link to the case study.
 */
export function ProjectCard({ project }: { project: Project }) {
  const stat = project.stats[0];
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/work/${project.slug}`} className="block rounded-[var(--radius)]" aria-label={`${project.title}: read the case study`}>
        <LazyDemo slug={project.slug} isStatic hideCaption />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13.5px] text-muted">{project.client}</p>
          <ProjectBadges project={project} />
        </div>
        <h3 className="mt-2 font-display text-[clamp(22px,2.2vw,28px)] font-bold leading-[1.12] tracking-[-0.02em] text-balance">
          <Link href={`/work/${project.slug}`} className="transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-muted">{project.summary}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
          {stat ? (
            <p className="text-[15px] leading-[1.4]">
              <span className="font-display text-[26px] font-bold leading-none tracking-[-0.03em]">{stat.value}</span>{" "}
              <span className="text-muted">{stat.label}</span>
            </p>
          ) : (
            <span />
          )}
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-text underline-offset-4 hover:underline"
          >
            Case study
            <ArrowRight className="h-4 w-4 text-accent" />
          </Link>
        </div>
      </div>
    </article>
  );
}
