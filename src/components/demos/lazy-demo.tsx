"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { SHOW_AVA_DEMO } from "@/lib/constants";
import type { ProjectSlug } from "@/lib/projects";

export type DemoProps = {
  /** Render the final state only. Used for small tiles and the /work grid. */
  isStatic?: boolean;
  /** Hide the caption under the frame. */
  hideCaption?: boolean;
};

/** Reserved heights so the page doesn't jump when a demo chunk loads. Keep in sync with each demo's stage. */
export const demoHeights: Record<ProjectSlug, string> = {
  "ai-receptionist": "min-h-[420px]",
  "proposal-generator": "min-h-[520px]",
  "qaqc-checklist": "min-h-[624px]",
  "accounting-automation": "min-h-[510px]",
  "influencer-importer": "min-h-[500px]",
  "mailchimp-reporter": "min-h-[440px]",
  "operations-manager": "min-h-[560px]",
};

function Skeleton({ slug }: { slug: ProjectSlug }) {
  return (
    <div className={`${demoHeights[slug]} rounded-[var(--radius)] border border-border bg-surface`} aria-hidden>
      <div className="h-10 border-b border-border/80" />
    </div>
  );
}

const registry: Record<ProjectSlug, ComponentType<DemoProps>> = {
  "ai-receptionist": dynamic(() => import("./ava-demo").then((m) => m.AvaDemo), {
    ssr: false,
    loading: () => <Skeleton slug="ai-receptionist" />,
  }),
  "proposal-generator": dynamic(() => import("./proposal-demo").then((m) => m.ProposalDemo), {
    ssr: false,
    loading: () => <Skeleton slug="proposal-generator" />,
  }),
  "qaqc-checklist": dynamic(() => import("./qaqc-demo").then((m) => m.QaqcDemo), {
    ssr: false,
    loading: () => <Skeleton slug="qaqc-checklist" />,
  }),
  "accounting-automation": dynamic(() => import("./accounting-demo").then((m) => m.AccountingDemo), {
    ssr: false,
    loading: () => <Skeleton slug="accounting-automation" />,
  }),
  "influencer-importer": dynamic(() => import("./importer-demo").then((m) => m.ImporterDemo), {
    ssr: false,
    loading: () => <Skeleton slug="influencer-importer" />,
  }),
  "operations-manager": dynamic(() => import("./ops-demo").then((m) => m.OpsDemo), {
    ssr: false,
    loading: () => <Skeleton slug="operations-manager" />,
  }),
  "mailchimp-reporter": dynamic(() => import("./mailchimp-demo").then((m) => m.MailchimpDemo), {
    ssr: false,
    loading: () => <Skeleton slug="mailchimp-reporter" />,
  }),
};

/** Shown in the receptionist slot until SHOW_AVA_DEMO is flipped on. */
function ComingSoon() {
  return (
    <div
      className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[var(--radius)] border border-border bg-surface p-6 md:min-h-[420px]"
      role="img"
      aria-label="Demo for the AI receptionist coming soon"
    >
      <span
        className="pointer-events-none absolute -right-2 -top-6 font-display text-[clamp(120px,22vw,260px)] font-bold leading-none tracking-[-0.05em] text-text/[0.05]"
        aria-hidden
      >
        Ava
      </span>
      <div className="relative flex items-end gap-1 overflow-hidden" aria-hidden>
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            className={`w-1.5 shrink-0 rounded-full ${i % 3 === 0 ? "bg-accent/50" : "bg-border"}`}
            style={{ height: 6 + ((i * 37) % 23) }}
          />
        ))}
      </div>
      <p className="relative mt-5 text-[13.5px] text-muted">Call recording and live transcript coming soon.</p>
    </div>
  );
}

/**
 * Mounts a demo only once it is within ~500px of the viewport, so the homepage
 * never downloads demo code it doesn't need yet.
 */
export function LazyDemo({
  slug,
  isStatic = false,
  hideCaption = false,
  className = "",
}: DemoProps & { slug: ProjectSlug; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  /* Browsers without IntersectionObserver just get the demo right away. */
  const [near, setNear] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (slug === "ai-receptionist" && !SHOW_AVA_DEMO) {
    return (
      <div className={className}>
        <ComingSoon />
      </div>
    );
  }

  const Demo = registry[slug];
  return (
    <div ref={ref} className={className}>
      {near ? <Demo isStatic={isStatic} hideCaption={hideCaption} /> : <Skeleton slug={slug} />}
    </div>
  );
}
