import type { ReactNode } from "react";

type SectionHeadProps = {
  title: ReactNode;
  lead: string;
};

export function SectionHead({ title, lead }: SectionHeadProps) {
  return (
    <div className="mb-10 grid gap-6 md:mb-16 md:grid-cols-2 md:gap-16">
      <h2 className="text-balance text-[clamp(32px,4.2vw,56px)] font-semibold leading-[1.02] tracking-[-0.035em]">
        {title}
      </h2>
      <p className="max-w-[460px] self-end text-[17px] leading-[1.55] text-zinc-400">
        {lead}
      </p>
    </div>
  );
}
