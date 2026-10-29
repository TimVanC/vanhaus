import { DirectionLabel, HeroPicker } from "@/components/dev/hero-picker";
import { Header } from "@/components/sections/header";
import { HeroA } from "@/components/sections/hero-a";
import { HeroB } from "@/components/sections/hero-b";

type HomeProps = {
  searchParams: Promise<{ hero?: string }>;
};

/**
 * Hero review build. Shows both directions stacked by default;
 * ?hero=a or ?hero=b shows one on its own. The rest of the page comes after the pick.
 */
export default async function Home({ searchParams }: HomeProps) {
  const { hero } = await searchParams;
  const active = hero === "a" || hero === "b" ? hero : "both";

  return (
    <>
      <div className="grain" />
      <main className="relative z-10">
        <Header />

        {active !== "b" ? (
          <>
            {active === "both" ? <DirectionLabel>Direction A: Editorial (Fraunces)</DirectionLabel> : null}
            <HeroA />
          </>
        ) : null}

        {active !== "a" ? (
          <>
            {active === "both" ? (
              <DirectionLabel>Direction B: Workshop (Bricolage Grotesque)</DirectionLabel>
            ) : null}
            <HeroB />
          </>
        ) : null}

        <div className="container-site border-t border-border py-10 text-[14px] text-muted">
          Remaining sections are built after a hero direction is chosen.
        </div>
      </main>
      <HeroPicker active={active} />
    </>
  );
}
