"use client";

import { Eyebrow } from "@/components/common/eyebrow";
import { ArrowRight } from "@/components/common/icons";
import { Reveal } from "@/components/common/reveal";
import { useEffect, useState, type FormEvent } from "react";

export function Cta() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const handleStartProject = () => setShowForm(true);
    window.addEventListener("vanhaus:start-project", handleStartProject);
    return () => window.removeEventListener("vanhaus:start-project", handleStartProject);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const timeline = String(formData.get("timeline") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setSubmitError("Please complete all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          timeline,
          message,
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setSubmitError(data?.error ?? "Could not send your request. Please try again.");
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="about" className="pb-[clamp(80px,10vw,140px)] pt-[clamp(80px,10vw,140px)]">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[#14141A] px-6 py-10 sm:px-[clamp(48px,7vw,96px)] sm:py-[clamp(48px,7vw,96px)]">
            <div
              className={`cta-gradient absolute inset-0 transition-opacity duration-300 ease-out ${
                showForm ? "opacity-100" : "opacity-85"
              }`}
            />
            <div className="cta-grid-mask absolute inset-0 pointer-events-none" />

            <div className="relative z-10">
              <Eyebrow number="05" label="Next step" />
              <h2 className="mb-6 max-w-[14ch] text-balance text-[clamp(40px,6vw,80px)] font-semibold leading-[0.98] tracking-[-0.04em]">
                Start a <span className="text-[var(--accent)]">project.</span>
              </h2>
              <p className="mb-10 max-w-[540px] text-lg leading-[1.55] text-zinc-400">
                We&apos;ll talk through your goals, what needs to be built, and how to move forward.
                If it&apos;s a fit, we&apos;ll define the next steps clearly.
              </p>
              <div
                className={`relative w-full sm:max-w-[640px] transition-[min-height] duration-300 ease-out ${
                  showForm
                    ? submitted
                      ? "min-h-[118px] sm:min-h-[132px]"
                      : "min-h-[500px] sm:min-h-[430px]"
                    : "min-h-[132px]"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 transition-all duration-300 ease-out ${
                    showForm ? "pointer-events-none translate-y-[-6px] opacity-0" : "translate-y-0 opacity-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="group inline-flex h-[50px] items-center gap-2.5 rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] px-[22px] text-[14.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_0_0_1px_var(--accent),0_8px_30px_-8px_var(--accent-glow)] transition hover:-translate-y-px hover:bg-[var(--accent-2)]"
                  >
                    Start a project
                    <ArrowRight className="transition-transform group-hover:translate-x-[3px]" />
                  </button>
                  <div className="mt-4 font-mono text-[13px] text-zinc-400">
                    <span className="text-zinc-500">or email </span>
                    <a className="text-zinc-300 transition-colors hover:text-white" href="mailto:hello@vanhaus.dev">
                      hello@vanhaus.dev
                    </a>
                  </div>
                </div>

                <div
                  className={`absolute inset-x-0 top-0 transition-all duration-300 ease-out ${
                    showForm ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {!submitted ? (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5 rounded-[12px] border border-white/10 bg-[#1A1A22]/55 p-4 sm:space-y-4 sm:bg-[#1A1A22]/70 sm:p-5"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-2 sm:gap-1.5">
                          <span className="font-mono text-[11px] text-zinc-500">Name</span>
                          <input
                            required
                            name="name"
                            className="h-12 rounded-[8px] border border-white/10 bg-[#14141A] px-3.5 text-sm text-white outline-none transition focus:border-white/30 sm:h-11 sm:px-3"
                          />
                        </label>
                        <label className="flex flex-col gap-2 sm:gap-1.5">
                          <span className="font-mono text-[11px] text-zinc-500">Email</span>
                          <input
                            required
                            type="email"
                            name="email"
                            className="h-12 rounded-[8px] border border-white/10 bg-[#14141A] px-3.5 text-sm text-white outline-none transition focus:border-white/30 sm:h-11 sm:px-3"
                          />
                        </label>
                      </div>

                      <label className="flex flex-col gap-2 sm:gap-1.5">
                        <span className="font-mono text-[11px] text-zinc-500">Message</span>
                        <textarea
                          required
                          name="message"
                          rows={5}
                          className="min-h-[132px] rounded-[8px] border border-white/10 bg-[#14141A] px-3.5 py-3 text-sm text-white outline-none transition focus:border-white/30 sm:min-h-0 sm:px-3 sm:py-2.5"
                        />
                      </label>

                      <label className="flex flex-col gap-2 sm:gap-1.5">
                        <span className="font-mono text-[11px] text-zinc-500">Timeline (optional)</span>
                        <select
                          name="timeline"
                          defaultValue=""
                          className="h-12 rounded-[8px] border border-white/10 bg-[#14141A] px-3.5 text-sm text-zinc-300 outline-none transition focus:border-white/30 sm:h-11 sm:px-3"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">As soon as possible</option>
                          <option value="month">Within 1 month</option>
                          <option value="quarter">Within 2-3 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </label>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] border border-[var(--accent)] bg-[var(--accent)] px-4 text-[14.5px] font-semibold tracking-[-0.01em] text-white transition hover:bg-[var(--accent-2)] sm:h-[44px] sm:w-auto sm:text-[14px]"
                      >
                        {isSubmitting ? "Sending..." : "Send request"}
                      </button>
                      {submitError ? (
                        <p className="font-mono text-[12px] text-red-300">{submitError}</p>
                      ) : null}
                    </form>
                  ) : (
                    <p className="rounded-[12px] border border-white/10 bg-[#1A1A22]/70 p-5 font-mono text-sm text-zinc-300">
                      We&apos;ll be in touch shortly.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
