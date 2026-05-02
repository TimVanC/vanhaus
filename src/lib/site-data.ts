export const heroMeta = [
  { key: "// BASED IN", value: "Ghent, BE ", accent: "↗" },
  { key: "// FOUNDED", value: "2021" },
  { key: "// PROJECTS", value: "40", accent: "+ shipped" },
  { key: "// ENGAGEMENT", value: "Project · Retainer" },
];

export const services = [
  {
    id: "01 / WEB",
    title: "Web Development",
    description:
      "Marketing sites, landing pages and product surfaces engineered for speed, SEO and conversion. Component-driven, accessible, and a joy to maintain.",
    bullets: [
      "Next.js · Astro · Tailwind",
      "Headless CMS · MDX",
      "Edge hosting · Analytics",
    ],
    icon: "web",
  },
  {
    id: "02 / SOFTWARE",
    title: "Software Development",
    description:
      "Internal tools, dashboards, APIs and full product builds. Typed end-to-end, tested where it matters, and architected so the second version costs less than the first.",
    bullets: [
      "TypeScript · Node · Postgres",
      "REST · GraphQL · tRPC",
      "Auth · Billing · Multi-tenant",
    ],
    icon: "software",
  },
  {
    id: "03 / AUTOMATION",
    title: "Automation & AI",
    description:
      "Take the repetitive work off your team. Workflow automations, internal copilots and AI integrations that plug into the tools you already use - and pay for themselves.",
    bullets: [
      "OpenAI · Anthropic · RAG",
      "n8n · Make · Zapier",
      "Custom agents · Pipelines",
    ],
    icon: "automation",
  },
] as const;

export const proofStats = [
  { value: "40", unit: "+", label: "// PROJECTS SHIPPED" },
  { value: "5", unit: "yrs", label: "// IN BUSINESS" },
  { value: "98", unit: "%", label: "// ON-TIME DELIVERY" },
  { value: "12", unit: "k", label: "// HOURS WRITTEN" },
];

export const proofItems = [
  { text: "Direct access to the engineer building it", meta: "no PMs" },
  { text: "Fixed-scope quotes, weekly demos, no surprises", meta: "contract" },
  { text: "Code you own - clean repo, full handoff, no lock-in", meta: "your IP" },
  { text: "Optional retainer for maintenance and iteration", meta: "post-launch" },
];

export const processSteps = [
  {
    step: "STEP / 01",
    title: "Plan",
    body: "Discovery call, written brief, fixed-scope quote. We agree on what success looks like before a single line of code gets written.",
    tags: ["scope", "timeline", "quote"],
  },
  {
    step: "STEP / 02",
    title: "Build",
    body: "Weekly demos in a private staging environment. You watch the thing get made - and steer it as it does. No black-box agency drama.",
    tags: ["staging", "demos", "iteration"],
  },
  {
    step: "STEP / 03",
    title: "Ship",
    body: "Production deploy, full repo handoff, written documentation, and a 30-day warranty on everything we built. Then optional retainer.",
    tags: ["deploy", "handoff", "support"],
  },
];
