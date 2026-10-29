import { BrandLogo } from "@/components/common/brand-logo";
import { CONTACT_EMAIL, JOE_LINKEDIN, LOCATION_LINE, TIM_LINKEDIN } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-site flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <BrandLogo size="lg" />
          <p className="mt-4 max-w-[36ch] text-[14.5px] leading-[1.6] text-muted">{LOCATION_LINE}</p>
        </div>

        <div className="flex flex-col gap-2 text-[14.5px] text-muted md:items-end">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-text underline-offset-4 hover:underline">
            {CONTACT_EMAIL}
          </a>
          <div className="flex gap-4">
            <a href={TIM_LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-text">
              Tim on LinkedIn
            </a>
            <a href={JOE_LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-text">
              Joe on LinkedIn
            </a>
          </div>
          <p className="mt-2">&copy; {new Date().getFullYear()} VanHaus</p>
        </div>
      </div>
    </footer>
  );
}
