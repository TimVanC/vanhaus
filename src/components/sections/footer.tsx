import { BrandLogo } from "@/components/common/brand-logo";

export function Footer() {
  return (
    <footer className="pb-16 pt-12">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-9 font-mono text-xs text-zinc-400">
          <div>
            <BrandLogo size="sm" />
          </div>
          <div className="flex gap-6">
            <a className="transition-colors hover:text-white" href="#">
              GitHub
            </a>
            <a className="transition-colors hover:text-white" href="#">
              LinkedIn
            </a>
            <a className="transition-colors hover:text-white" href="#">
              RSS
            </a>
            <a className="transition-colors hover:text-white" href="#">
              Imprint
            </a>
          </div>
          <p className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5BD37A] shadow-[0_0_6px_#5BD37A]" />
            All systems operational · v2026.05
          </p>
        </div>
      </div>
    </footer>
  );
}
