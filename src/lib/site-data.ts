import { FIRST_YEAR, PROJECT_COUNT } from "@/lib/constants";

export const hero = {
  headline: "Every task has a smarter way to do it. We find it and build it.",
  sub: "VanHaus builds custom software and AI for small businesses. Tell us what's eating your time. We'll automate it, streamline it, and make it run without you.",
  secondaryCta: "See our work",
};

export const painPoints = {
  intro: "You know your business. You know what's broken. Tell us the pain point and we'll build the fix.",
  pairs: [
    { pain: "Missing calls and leads", fix: "AI receptionist that answers every call" },
    { pain: "Quotes take hours", fix: "Proposal generator that prices jobs in minutes" },
    { pain: "Typing the same data into 3 systems", fix: "Integrations that sync it automatically" },
    { pain: "Reports built by hand", fix: "Dashboards that update themselves" },
    { pain: "Staff chasing info and checklists", fix: "Internal tools built around your workflow" },
    { pain: "Old or slow website", fix: "A fast site that actually brings in customers" },
  ],
  outro: "Don't see yours? That's normal. Most of what we build didn't exist until someone asked.",
};

export type CaseStudy = {
  id: string;
  client: string;
  title: string;
  problem: string;
  built: string;
  result: string;
  /** TODO: drop a screenshot or demo video path here. Null renders the placeholder slot. */
  media: { type: "image" | "video"; src: string; alt: string } | null;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-receptionist",
    client: "HVAC & generator company, NJ",
    title: "An AI receptionist that picks up every call",
    problem:
      "Calls came in while the crew was on job sites. Voicemails piled up and some leads never called back.",
    built:
      "An AI phone receptionist built on Twilio and OpenAI Realtime. It answers every call, collects job details, routes urgent calls to a person, and emails a summary after each one.",
    result: "598+ calls handled in its first four months.",
    media: null,
  },
  {
    id: "proposal-tool",
    client: "Same HVAC & generator company",
    title: "Generator proposals in minutes, not hours",
    problem:
      "Every generator quote was built by hand. Pricing lived in old proposals and in people's heads, and each one took hours.",
    built:
      "A proposal tool trained on their past proposals and pricing. Enter the job, get a priced, branded proposal the client can sign online.",
    result: "Priced, branded proposals in minutes instead of hours. Clients sign online.",
    media: null,
  },
  {
    id: "accounting-automation",
    client: "E-commerce manufacturer",
    title: "Nightly accounting exports that run themselves",
    problem:
      "Inventory and journal entries were pulled together by hand for their accounting system, every reporting cycle.",
    built:
      "An accounting automation plugin that exports inventory and journal entries to their accounting system every night.",
    result: "80 to 90% less time spent on reporting.",
    media: null,
  },
];

export const stats = [
  { value: `${PROJECT_COUNT}+`, label: "projects shipped" },
  { value: `Since ${FIRST_YEAR}`, label: "building for businesses" },
  { value: "598+", label: "calls answered by our AI" },
  { value: "80 to 90%", label: "less reporting time for one client" },
];

export const trustPoints = [
  {
    title: "You talk to the person building it",
    body: "No account managers in the middle. Questions go straight to the engineer.",
  },
  {
    title: "A fixed price before we start",
    body: "You get a clear scope and a number up front. The number doesn't move unless the scope does.",
  },
  {
    title: "You own the code",
    body: "Everything we build lives in your accounts and your repo. Leave whenever you want and take it with you.",
  },
  {
    title: "Support if you want it",
    body: "An optional monthly retainer keeps things running and adds what you need next. No pressure either way.",
  },
];

export const processSteps = [
  {
    number: "1",
    title: "Free discovery",
    body: "We talk for 30 minutes about where your time and money go. No cost, no pitch deck.",
  },
  {
    number: "2",
    title: "Build",
    body: "We build it with you, with demos along the way so there are no surprises.",
  },
  {
    number: "3",
    title: "Launch and support",
    body: "We launch it, train your team, and stick around to keep it running.",
  },
];

export const founders = {
  intro:
    "We're Tim and Joe. We met freshman year at Monmouth University, lived together all four years, and have been best friends since. Now we build things for businesses together.",
  photo: {
    src: "/images/founders.webp",
    alt: "Tim Van Cauwenberge and Joe Chiusano, co-founders of VanHaus.",
  },
  people: [
    {
      name: "Tim Van Cauwenberge",
      role: "Builds it.",
      bio: "CS degree, former D1 track captain, and four years building custom software and AI tools for real businesses.",
      linkedinKey: "tim" as const,
    },
    {
      name: "Joe Chiusano",
      role: "Makes sure we solve the right problem.",
      bio: "Years in B2B sales and account management. He'll be the one asking the questions that get to what's actually slowing you down.",
      linkedinKey: "joe" as const,
    },
  ],
};

/**
 * TODO: add a real quote here, then set SHOW_TESTIMONIAL to true in constants.ts.
 * Intentionally empty so nothing made up can ship.
 */
export const testimonial: { quote: string; name: string; company: string } | null = null;

export const contact = {
  heading: "Book a free discovery call.",
  sub: "Tell us what's slowing you down. We'll get back to you within one business day.",
};
