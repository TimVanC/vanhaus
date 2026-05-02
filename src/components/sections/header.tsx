import { ArrowRight } from "@/components/common/icons";
import { BrandLogo } from "@/components/common/brand-logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0d0db8] backdrop-blur-[14px]">
      <div className="container-site flex h-[68px] items-center justify-between">
        <a href="#" aria-label="Vanhaus home">
          <BrandLogo />
        </a>

        <nav className="hidden items-center gap-9 text-sm text-zinc-400 md:flex">
          <a className="transition-colors hover:text-white" href="#services">
            Services
          </a>
          <a className="transition-colors hover:text-white" href="#work">
            Work
          </a>
          <a className="transition-colors hover:text-white" href="#process">
            Process
          </a>
          <a className="transition-colors hover:text-white" href="#about">
            About
          </a>
        </nav>

        <button className="group inline-flex h-9 items-center gap-2 rounded-lg bg-white px-4 text-[13.5px] font-semibold tracking-[-0.01em] text-black transition hover:bg-[var(--accent)] hover:text-white">
          Work with me
          <ArrowRight className="h-[14px] w-[14px] transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
}
