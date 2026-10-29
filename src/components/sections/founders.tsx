import Image from "next/image";
import { ArrowUpRight } from "@/components/common/icons";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { JOE_LINKEDIN, TIM_LINKEDIN } from "@/lib/constants";
import { founders } from "@/lib/site-data";

const linkedin = { tim: TIM_LINKEDIN, joe: JOE_LINKEDIN };

/** Who we are: the photo, cropped chest-up, and two short bios. */
export function Founders() {
  return (
    <section id="who-we-are" className="border-t border-border">
      <div className="container-site py-[clamp(72px,9vw,128px)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-surface">
              <Image
                src={founders.photo.src}
                alt={founders.photo.alt}
                fill
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal className="d1">
              <Kicker>Who we are</Kicker>
              <h2 className="mt-6 font-display text-[clamp(34px,4.4vw,56px)] font-bold leading-[1] tracking-[-0.03em]">
                Two friends who build things.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.6] text-muted text-pretty">{founders.intro}</p>
            </Reveal>

            <Reveal className="d2">
              <ul className="mt-10 list-none divide-y divide-border border-y border-border">
                {founders.people.map((person) => (
                  <li key={person.name} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em]">
                        {person.name}
                      </h3>
                      <a
                        href={linkedin[person.linkedinKey]}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[14px] text-muted transition-colors hover:text-accent"
                      >
                        LinkedIn
                        <ArrowUpRight />
                      </a>
                    </div>
                    <p className="mt-1 text-[15px] font-medium text-accent">{person.role}</p>
                    <p className="mt-2 text-[15.5px] leading-[1.6] text-muted">{person.bio}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
