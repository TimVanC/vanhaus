import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Founders } from "@/components/sections/founders";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Testimonial } from "@/components/sections/testimonial";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <div className="grain" />
      <main className="relative z-10">
        <Header />
        <Hero />
        <PainPoints />
        <Work />
        <Stats />
        <Process />
        <Founders />
        <Testimonial />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
