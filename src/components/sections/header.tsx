"use client";

import { ArrowRight } from "@/components/common/icons";
import { useEffect, useState } from "react";

export function Header() {
  const [isServicesActive, setIsServicesActive] = useState(false);

  useEffect(() => {
    const servicesSection = document.getElementById("services");
    if (!servicesSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const servicesEntry = entries[0];
        setIsServicesActive(servicesEntry.isIntersecting && servicesEntry.intersectionRatio > 0.32);
      },
      {
        threshold: [0.2, 0.35, 0.55],
        rootMargin: "-18% 0px -52% 0px",
      },
    );

    observer.observe(servicesSection);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0d0db8] backdrop-blur-[14px]">
      <div className="container-site flex h-[68px] items-center justify-between">
        <a
          href="#"
          aria-label="Vanhaus home"
          className="text-[28px] font-bold tracking-[-0.03em] leading-none"
        >
          <span className="text-white">van</span>
          <span className="text-[var(--accent)]">haus</span>
        </a>

        <nav className="hidden items-center gap-9 text-[15px] text-zinc-400 md:flex">
          <a
            className={`transition-colors duration-200 hover:text-white ${isServicesActive ? "text-white" : ""}`}
            href="#services"
          >
            Services
          </a>
          <a
            className="transition-colors duration-200 hover:text-white"
            href="#work"
          >
            Work
          </a>
          <a
            className="transition-colors duration-200 hover:text-white"
            href="#process"
          >
            Process
          </a>
          <a
            className="transition-colors duration-200 hover:text-white"
            href="#about"
          >
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
