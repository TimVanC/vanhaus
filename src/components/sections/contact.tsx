"use client";

import { ArrowRight } from "@/components/common/icons";
import { Kicker } from "@/components/common/kicker";
import { Reveal } from "@/components/common/reveal";
import { CONTACT_EMAIL, LOCATION_LINE } from "@/lib/constants";
import { contact } from "@/lib/site-data";
import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-[var(--radius-sm)] border border-border bg-bg px-4 text-[15.5px] text-text outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

const labelClass = "flex flex-col gap-2 text-[14px] text-muted";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const timeline = String(formData.get("timeline") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setSubmitError("Please fill in your name, email, and a short message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError("That email address doesn't look right.");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, timeline, message }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setSubmitError(data?.error ?? "Couldn't send that. Please try again or email us directly.");
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("Network error. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t border-border">
      <div className="container-site py-[clamp(72px,9vw,128px)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <Kicker>Next step</Kicker>
              <h2 className="mt-6 font-display text-[clamp(36px,5vw,68px)] font-bold leading-[0.98] tracking-[-0.035em] text-balance">
                {contact.heading}
              </h2>
              <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.6] text-muted text-pretty">{contact.sub}</p>
            </Reveal>

            <Reveal className="d1">
              <dl className="mt-10 divide-y divide-border border-y border-border text-[15px]">
                <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                  <dt className="text-muted">Email</dt>
                  <dd>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-text underline-offset-4 hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                  <dt className="text-muted">Where</dt>
                  <dd className="text-text">{LOCATION_LINE}</dd>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-4 py-4">
                  <dt className="text-muted">Cost</dt>
                  <dd className="text-text">Discovery is always free.</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal className="d1 lg:col-span-6 lg:col-start-7">
            {submitted ? (
              <div className="rounded-[var(--radius)] border border-border bg-surface p-8" role="status">
                <p className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em]">Got it. Thanks.</p>
                <p className="mt-3 text-[16px] leading-[1.6] text-muted">
                  We&apos;ll read it and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid gap-5 rounded-[var(--radius)] border border-border bg-surface p-5 sm:p-7"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    Name
                    <input required name="name" autoComplete="name" className={`${fieldClass} h-12`} />
                  </label>
                  <label className={labelClass}>
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={`${fieldClass} h-12`}
                    />
                  </label>
                </div>

                <label className={labelClass}>
                  What&apos;s slowing you down?
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className={`${fieldClass} min-h-[140px] py-3`}
                    placeholder="A sentence or two is plenty."
                  />
                </label>

                <label className={labelClass}>
                  Timeline (optional)
                  <span className="relative block">
                    <select name="timeline" defaultValue="" className={`${fieldClass} h-12 appearance-none pr-12`}>
                      <option value="">Not sure yet</option>
                      <option value="asap">As soon as possible</option>
                      <option value="month">Within 1 month</option>
                      <option value="quarter">Within 2 to 3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </label>

                <div className="mt-1 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-accent px-7 text-[15.5px] font-semibold tracking-[-0.01em] text-on-accent transition-colors hover:bg-accent-hover disabled:opacity-60 max-sm:w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send it over"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="text-[13.5px] text-muted">We reply within one business day.</p>
                </div>

                {submitError ? (
                  <p className="text-[14px] text-[#f0a080]" role="alert">
                    {submitError}
                  </p>
                ) : null}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
