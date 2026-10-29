import { BrandLogo } from "@/components/common/brand-logo";
import { BookCallLink } from "@/components/common/buttons";

const links = [
  { href: "#work", label: "Work" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#who-we-are", label: "Who we are" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <a href="#" aria-label="VanHaus home" className="shrink-0">
          <BrandLogo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] text-muted md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors duration-200 hover:text-text">
              {link.label}
            </a>
          ))}
        </nav>

        <BookCallLink size="md" className="shrink-0 max-sm:h-10 max-sm:px-4 max-sm:text-[13px]" />
      </div>
    </header>
  );
}
