"use client";

import { Eyebrow } from "@/components/common/eyebrow";
import { ArrowRight } from "@/components/common/icons";
import { Reveal } from "@/components/common/reveal";
import { heroMeta } from "@/lib/site-data";
import { useEffect, useMemo, useState } from "react";

const WORDS = ["scale.", "perform.", "automate.", "ship.", "grow."];
const TYPE_SPEED_MS = 70;
const DELETE_SPEED_MS = 42;
const PAUSE_AFTER_TYPE_MS = 950;
const PAUSE_AFTER_DELETE_MS = 180;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = WORDS[wordIndex];
  const typedWord = useMemo(() => currentWord.slice(0, typedLength), [currentWord, typedLength]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedLength < currentWord.length) {
      timeoutId = setTimeout(() => setTypedLength((length) => length + 1), TYPE_SPEED_MS);
      return () => clearTimeout(timeoutId);
    }

    if (!isDeleting && typedLength === currentWord.length) {
      timeoutId = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE_MS);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && typedLength > 0) {
      timeoutId = setTimeout(() => setTypedLength((length) => length - 1), DELETE_SPEED_MS);
      return () => clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setIsDeleting(false);
      setWordIndex((index) => (index + 1) % WORDS.length);
    }, PAUSE_AFTER_DELETE_MS);

    return () => clearTimeout(timeoutId);
  }, [currentWord.length, isDeleting, typedLength]);

  return (
    <section className="relative border-b border-white/10 pb-[clamp(80px,12vw,140px)] pt-[clamp(72px,12vw,140px)]">
      <div className="hero-glow pointer-events-none absolute inset-x-0 bottom-[-20%] h-[600px]" />
      <div className="container-site relative z-10">
        <div className="grid items-end gap-16">
          <div>
            <Reveal className="d1">
              <Eyebrow number="01" label="Studio · Taking on new projects" />
            </Reveal>

            <Reveal className="d2">
              <h1 className="mb-8 text-balance text-[clamp(44px,7.5vw,104px)] font-semibold leading-[1.03] tracking-[-0.045em]">
                <span className="block">Building digital systems</span>
                <span className="mt-[0.15em] block">
                  that{" "}
                  <span className="inline-flex min-w-[9ch] items-baseline text-[var(--accent)]">
                    <span>{typedWord}</span>
                    <span className="ml-[0.06em] inline-block h-[0.82em] w-[0.55ch] shrink-0 animate-blink bg-[var(--accent)] align-[-0.03em]" />
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal className="d3">
              <p className="mb-10 max-w-[560px] text-pretty text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-zinc-400">
                Web development, software systems, and automation for modern businesses. Built for
                performance, scalability, and real-world use.
              </p>
            </Reveal>

            <Reveal className="d4">
              <div className="flex flex-wrap items-center gap-3.5">
                <button className="group inline-flex h-[50px] items-center gap-2.5 rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] px-[22px] text-[14.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_0_0_1px_var(--accent),0_8px_30px_-8px_var(--accent-glow)] transition hover:-translate-y-px hover:bg-[var(--accent-2)]">
                  Work with me
                  <ArrowRight className="transition-transform group-hover:translate-x-[3px]" />
                </button>
                <button className="inline-flex h-[50px] items-center gap-2.5 rounded-[10px] border border-white/15 px-[22px] text-[14.5px] font-semibold tracking-[-0.01em] text-white transition hover:border-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5BD37A] shadow-[0_0_8px_#5BD37A]" />
                  Taking on new projects
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-20 grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
            {heroMeta.map((item, index) => (
              <div
                key={item.key}
                className={`border-white/10 px-4 py-8 md:px-6 md:py-9 ${index !== heroMeta.length - 1 ? "border-r" : ""} ${
                  index < 2 ? "max-md:border-b" : ""
                } ${index === 1 ? "max-md:border-r-0" : ""}`}
              >
                <p className="mb-3 font-mono text-[10px] tracking-[0.06em] text-zinc-500">{item.key}</p>
                <p className="text-[19px] font-medium leading-tight tracking-[-0.02em]">
                  {item.value}
                  {item.accent ? <span className="text-[var(--accent)]">{item.accent}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
