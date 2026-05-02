import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Proof } from "@/components/sections/proof";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-noise" />

      <main className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <Proof />
        <Process />
        <Cta />
        <Footer />
      </main>
    </>
  );
}
