export const heroMeta = [
  { key: "// BASED IN", value: "NYC Metro Area" },
  { key: "// FOUNDED", value: "2021" },
  { key: "// PROJECTS", value: "40", accent: "+ shipped" },
  { key: "// ENGAGEMENT", value: "Fixed Projects & Ongoing Support" },
];

export const services = [
  {
    id: "01 / WEB",
    title: "Web Development",
    description:
      "Marketing sites, landing pages and product surfaces engineered for speed, SEO and conversion. Component-driven, accessible, and a joy to maintain.",
    bullets: [
      "Custom websites & rebuilds",
      "Performance & SEO optimization",
      "Analytics & conversion tracking",
    ],
    icon: "web",
  },
  {
    id: "02 / SOFTWARE",
    title: "Software Development",
    description:
      "Internal tools, dashboards, APIs and full product builds. Typed end-to-end, tested where it matters, and architected so the second version costs less than the first.",
    bullets: [
      "Internal tools & dashboards",
      "APIs & system integrations",
      "Scalable application architecture",
    ],
    icon: "software",
  },
  {
    id: "03 / AUTOMATION",
    title: "AI Automation",
    description:
      "Take the repetitive work off your team. Workflow automations, internal copilots and AI integrations that plug into the tools you already use - and pay for themselves.",
    bullets: [
      "Workflow automation",
      "Custom reporting systems",
      "AI integrations & tools",
    ],
    icon: "automation",
  },
] as const;

export const proofStats = [
  { value: "40", unit: "+", label: "// projects shipped" },
  { value: "5", unit: "yrs", label: "// building systems" },
  { value: "98", unit: "%", label: "// on-time delivery" },
  { value: "12", unit: "k+", label: "// hours shipped" },
];

export const proofItems = [
  { text: "Direct access to the engineer building it", meta: "hands-on" },
  { text: "Fixed-scope quotes, weekly demos, no surprises", meta: "predictable" },
  { text: "Code you own - clean repo, full handoff, no lock-in", meta: "ownership" },
  { text: "Optional retainer for maintenance and iteration", meta: "post-launch" },
];

export const processSteps = [
  {
    step: "STEP / 01",
    title: "Plan",
    body: "Discovery call, clear scope, and a defined plan. We align on goals, timeline, and deliverables before any build begins.",
    tags: ["scope", "timeline", "alignment"],
  },
  {
    step: "STEP / 02",
    title: "Build",
    body: "The system is built in a private environment with regular updates. You stay involved through demos and feedback as the project progresses.",
    tags: ["progress", "feedback", "iteration"],
  },
  {
    step: "STEP / 03",
    title: "Ship",
    body: "Production deployment, full handoff, and documentation. Everything is delivered cleanly, with optional support after launch.",
    tags: ["deploy", "handoff", "support"],
  },
];
