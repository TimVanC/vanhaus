import { QAQC_IN_PROGRESS, SHOW_AVA_DEMO } from "@/lib/constants";

/**
 * Every project shown on the homepage, on /work, and on /work/[slug].
 * Clients are described by industry only. Stats are limited to the ones the
 * client has agreed to; anything missing is a TODO rather than a guess.
 */

export type ProjectSlug =
  | "ai-receptionist"
  | "proposal-generator"
  | "qaqc-checklist"
  | "accounting-automation"
  | "influencer-importer"
  | "mailchimp-reporter";

export type ProjectStat = { value: string; label: string };

export type Project = {
  slug: ProjectSlug;
  /** Short product name used in tiles and the demo window title. */
  name: string;
  /** Case study headline. */
  title: string;
  /** Industry-only client description. */
  client: string;
  /** One line for cards. */
  summary: string;
  /** Shown as a badge. "In progress" projects are still being built. */
  status: "live" | "in-progress";
  /** Whether the animated demo is ready to show. */
  demo: "ready" | "coming-soon";
  /** Featured demos get the big slots on the homepage. */
  featured: boolean;
  /** Short labeled rows shown beside the demo on the homepage and /work. The last row is highlighted. */
  home: { label: string; text: string }[];
  problem: string[];
  built: string[];
  /** Only client-approved numbers. Empty means none yet. */
  stats: ProjectStat[];
  /** Plain-language result line shown under the stats. */
  result: string;
  howItWorks: { stack: string[]; approach: string[] };
  /** Caption under the demo frame. */
  caption: string;
  seo: { title: string; description: string };
};

export const projects: Project[] = [
  {
    slug: "ai-receptionist",
    name: "AI receptionist",
    title: "An AI receptionist that picks up every call",
    client: "HVAC & generator company, NJ",
    summary: "Answers every call, collects the job details, routes urgent calls to a person, and emails a summary.",
    status: "live",
    demo: SHOW_AVA_DEMO ? "ready" : "coming-soon",
    featured: true,
    home: [
      {
        label: "Problem",
        text: "Calls came in while the crew was on job sites. Voicemails piled up and some leads never called back.",
      },
      {
        label: "What we built",
        text: "An AI phone receptionist built on Twilio and OpenAI Realtime. It answers every call, collects job details, routes urgent calls to a person, and emails a summary after each one.",
      },
      { label: "Result", text: "598+ calls handled in its first four months." },
    ],
    problem: [
      "Calls came in while the crew was on job sites. Voicemails piled up and some leads never called back.",
      "Hiring a full-time receptionist did not make sense for the call volume, but every missed call was a missed job.",
    ],
    built: [
      "An AI phone receptionist, named Ava, built on Twilio and the OpenAI Realtime API. She answers every call, asks the questions a dispatcher would ask, and collects the name, address, and what is going on.",
      "Urgent calls get routed to a real person. Everything else ends with a summary email to the office so nothing has to be transcribed from voicemail.",
    ],
    stats: [{ value: "598+", label: "calls handled in the first four months" }],
    result: "No more voicemail backlog. Every lead gets a callback with the details already written down.",
    howItWorks: {
      /* TODO: confirm hosting and the email provider for Ava's summaries. */
      stack: ["Twilio Voice", "OpenAI Realtime API", "Node.js", "Email summaries after every call"],
      approach: [
        "Twilio receives the call and streams the audio to the OpenAI Realtime API, which listens and talks back in real time.",
        "Ava follows a script written with the office: greet, collect the job details, check for emergencies, confirm the callback number.",
        "When a call is urgent she transfers it to the on-call person. Otherwise the call ends and a summary email lands in the office inbox within seconds.",
      ],
    },
    caption: "Every call answered. Summary in the inbox before the caller hangs up.",
    seo: {
      title: "AI Receptionist for HVAC Companies | VanHaus",
      description:
        "How VanHaus built Ava, an AI phone receptionist for a New Jersey HVAC and generator company. Answers every call, collects job details, and emails a summary. 598+ calls handled in four months.",
    },
  },
  {
    slug: "proposal-generator",
    name: "Proposal generator",
    title: "Generator proposals in minutes, not hours",
    client: "Tri-state area HVAC & generator company",
    summary: "Enter the job, get a priced, branded proposal the customer can sign online.",
    status: "live",
    demo: "ready",
    featured: true,
    home: [
      {
        label: "Problem",
        text: "Every generator proposal was built by hand. Pricing lived in old quotes and in people's heads, so each one took hours. Slow quotes meant missed bids and jobs lost to faster competitors.",
      },
      {
        label: "What we built",
        text: "A proposal generator. The team enters the job once and gets a priced, branded proposal the customer can sign online.",
      },
      {
        label: "How it learns",
        text: "It's built on their full history of hand-built quotes, and every new proposal is added back in. Each job is priced against their most similar past jobs, so quotes stay consistent and match what they actually charge.",
      },
      { label: "Result", text: "Hours by hand became minutes. Customers sign online and the job is marked won." },
    ],
    problem: [
      "Every generator proposal was built by hand in Word. Pricing lived in a dealer price sheet, in years of old proposals, and in people's heads, so each quote took hours.",
      "While a quote was being put together, bids were missed and some jobs went to competitors who answered faster. Two estimators could also price the same job differently.",
    ],
    built: [
      "A web app where the team describes the job once: quote type, site, generator size and fuel, transfer switch, and install details. They can also upload a site survey or an old proposal and let the assistant fill in the form.",
      "It's built on the company's full history of hand-built proposals. Equipment is priced from the dealer price sheet and their own markups. Installation is priced from their most similar past jobs, which are cited right on the worksheet. Anything it can't price is flagged for a person to approve.",
      "Every new proposal goes back into that history, and jobs they win count the most. Each quote has more of their own real jobs to compare against than the one before it.",
      "The finished proposal exports to Word or PDF, goes to the customer by email, and gets accepted online with a typed or drawn signature.",
    ],
    stats: [],
    result: "Hours by hand became minutes. Customers sign online and the job is marked won automatically.",
    howItWorks: {
      stack: ["Next.js", "Neon Postgres", "Claude (Anthropic API)", "docx and pdf-lib", "Resend", "Vercel"],
      approach: [
        "The job comes in through a form, a document upload, or a short chat. Claude reads surveys and photos, runs the chat, and writes the scope of work narrative.",
        "The AI never sets a price. A rules engine prices equipment from the dealer price sheet and markup workbook, and prices installation from the median of similar past jobs, which are cited on the worksheet.",
        "Assumptions and allowances are tinted and need a checkbox before export. The proposal is generated as Word or PDF, emailed with a private acceptance link, and signed online. Won jobs feed back in as comparables.",
      ],
    },
    caption: "Hours by hand to minutes.",
    seo: {
      title: "AI Proposal Generator for Generator Installers | VanHaus",
      description:
        "How VanHaus built a proposal generator for a tri-state area HVAC and generator company. Built on years of past quotes, it turns a job into a priced, branded proposal in minutes that customers sign online.",
    },
  },
  {
    slug: "qaqc-checklist",
    name: "QA/QC checklist app",
    title: "A QA/QC checklist that checks itself against Housecall Pro",
    client: "HVAC & generator company, NJ",
    summary: "A mobile checklist for every job. Housecall Pro fills in what it knows, a person confirms the rest.",
    status: QAQC_IN_PROGRESS ? "in-progress" : "live",
    demo: "ready",
    featured: false,
    home: [
      {
        label: "Problem",
        text: "Quality checks lived in a spreadsheet the office filled in after the fact. Half the answers were already sitting in Housecall Pro, but someone still had to look each one up.",
      },
      {
        label: "What we built",
        text: "A mobile checklist for every job. Housecall Pro data suggests the answers and shows the facts behind them, and a person confirms each one with a tap.",
      },
      { label: "Status", text: "Being built now. Results will be added once it's live." },
    ],
    problem: [
      "Quality checks lived in a spreadsheet that the office filled in after the fact, one call at a time.",
      "Half the questions could be answered from data the company already had in Housecall Pro, but someone still had to look it up.",
    ],
    built: [
      "A mobile-first web app with a call queue for the day and one checklist per job. Each step is answered Y, N, or B (call back) with one tap.",
      "Jobs, invoices, and payments sync from Housecall Pro through webhooks. Where the data answers a step, the app suggests the answer and shows the facts behind it. A person confirms or overrides it.",
      "A score panel, a completion tracker by pay period, and exports for the office.",
    ],
    stats: [],
    /* TODO: add results once the app is live and the client signs off on numbers. */
    result: "In progress. Results will be added once the app is live.",
    howItWorks: {
      stack: ["Next.js", "Neon Postgres", "Drizzle ORM", "Housecall Pro API and webhooks", "Vercel"],
      approach: [
        "Housecall Pro sends a webhook whenever a job, invoice, or customer changes. The app verifies it, stores it, and re-syncs that job.",
        "Rules compare the synced data with each checklist step: did the tech start early, was the deposit collected, is the invoice paid, is a follow-up job booked. Matches show up as suggestions with the evidence.",
        "The office confirms each suggestion with a tap. Submitted checklists lock, and managers can reopen them. A nightly reconcile catches anything a webhook missed.",
      ],
    },
    caption: "Housecall Pro suggests. A person confirms.",
    seo: {
      title: "QA/QC Checklist App for Field Service Companies | VanHaus",
      description:
        "How VanHaus is building a mobile QA/QC checklist app for a New Jersey HVAC and generator company, synced with Housecall Pro so steps are suggested from real job data.",
    },
  },
  {
    slug: "accounting-automation",
    name: "Accounting automation",
    title: "Website sales into their accounting system, without retyping a thing",
    client: "E-commerce football pad maker, supplier to the NFL",
    summary:
      "Their accounting system couldn't connect to their website, so every online sale was rebuilt by hand. Now import-ready files land every night at midnight.",
    status: "live",
    demo: "ready",
    featured: false,
    home: [
      {
        label: "Problem",
        text: "Years of their books live in Sage 50, an older desktop accounting system, so switching wasn't an option. But it couldn't connect to their website, so every online sale was re-entered by hand.",
      },
      {
        label: "What we built",
        text: "A WordPress plugin that turns each day's orders, with all their options, add-ons, coupons, and refunds, into files Sage 50 accepts. They import cleanly, exactly as if someone had keyed them in.",
      },
      { label: "Result", text: "80 to 90% less time spent on reporting. The files are in the inbox every morning." },
    ],
    problem: [
      "This team makes football pads, supplies the NFL, and sells direct online through WooCommerce. Their accounting has run on Sage 50, an older desktop system, for years. All of that history lives there, so moving to a newer service wasn't worth what they would lose.",
      "Sage 50 has no way to connect to the website. Every online sale had to be rebuilt by hand: product options turned into SKUs, add-ons split out, coupons and refunds netted, and sales tax split by state, until the debits and credits finally matched.",
    ],
    built: [
      "A WordPress plugin that reads each day's WooCommerce orders and never changes them. It turns product options into real inventory SKUs, splits add-ons into their own lines, and nets out coupons, refunds, shipping, and state sales tax.",
      "At midnight it builds two files, an inventory export and a journal entry, in the exact layout Sage 50 expects, and emails them to the accounting team. They import cleanly, and the result looks exactly like it was entered by hand.",
      "If debits and credits don't match, it stops and says why instead of sending bad numbers. An admin page runs any date range on demand, plus a monthly state summary.",
    ],
    stats: [{ value: "80 to 90%", label: "less time spent on reporting" }],
    result: "They kept the accounting system they trust. Reporting went from a recurring chore to an email that is waiting in the morning.",
    howItWorks: {
      stack: ["WordPress plugin", "PHP", "WooCommerce", "PhpSpreadsheet", "WP-Cron", "Sage 50 import"],
      approach: [
        "The plugin only reads orders. It never changes anything in WooCommerce.",
        "A dictionary maps option labels to SKUs and add-ons. Coupons become negative rows, refunds mirror the original items on the refund date, and sales tax is credited per state.",
        "At midnight Eastern the scheduler builds both Excel files and emails them. A 4 AM check re-runs the export if the midnight run failed.",
      ],
    },
    caption: "80 to 90% less reporting time.",
    seo: {
      title: "WooCommerce to Sage 50 Accounting Automation | VanHaus",
      description:
        "How VanHaus connected a football pad maker's WooCommerce store to Sage 50 with nightly import-ready files, cutting reporting time by 80 to 90% without changing accounting systems.",
    },
  },
  {
    slug: "influencer-importer",
    name: "Influencer importer",
    title: "Hundreds of profile pages from one spreadsheet",
    client: "NJ business news publisher",
    summary:
      "Influencer lists with more than 700 people, each with a page of their own. Drop in the master spreadsheet and every article is built, formatted, and in order.",
    status: "live",
    demo: "ready",
    featured: false,
    home: [
      {
        label: "Problem",
        text: "The publisher runs influencer lists across many categories, some with more than 700 people. A page for each person makes the list far more shareable and brings in more page views and revenue, but it meant building hundreds of articles by hand.",
      },
      {
        label: "What we built",
        text: "A WordPress importer. Drop in the master spreadsheet and it creates every article with the same formatting and the matching headshot, in alphabetical order so the list pages through cleanly.",
      },
      { label: "Result", text: "A list with hundreds of people goes from spreadsheet to scheduled articles in one sitting." },
    ],
    problem: [
      "This publisher runs influencer lists across a range of categories. Some lists have more than 700 people on them.",
      "Giving every person their own article makes the list easy to share, since honorees and their companies pass their own page around. That means more page views and more revenue. The catch was building hundreds of individual articles by hand, each with the same formatting, headshot, and place in the list.",
    ],
    built: [
      "A WordPress plugin with a five-step wizard: upload the master spreadsheet, map the columns, set the title, author, category, and publish schedule, check the headshots, and run the import.",
      "Every article gets the same layout and the matching headshot from the media library. People are sorted alphabetically, and each article is scheduled a few minutes after the one before, so the list pages through in order.",
      "Re-running an import never creates duplicates, and a missing photo never stops the run. It's listed at the end so it can be added later.",
    ],
    stats: [{ value: "700+", label: "people on the largest lists, each with their own article" }],
    result: "A list with hundreds of people goes from spreadsheet to scheduled articles in one sitting.",
    howItWorks: {
      stack: ["WordPress plugin", "PHP", "WordPress media library", "Batched imports"],
      approach: [
        "The plugin reads the spreadsheet, cleans up the text encoding, and guesses which column holds which field. The editor confirms the mapping.",
        "Titles, alphabetical order, and publish times are worked out ahead of time, and each headshot is matched by filename. Any photo can be swapped before the import runs.",
        "Articles are created ten at a time with a progress bar, so a 700-person list never times out. Each article carries a batch ID and a fingerprint so a re-run skips rows that already exist.",
      ],
    },
    caption: "One spreadsheet in. Hundreds of articles out.",
    seo: {
      title: "WordPress Importer for Influencer Lists | VanHaus",
      description:
        "How VanHaus built a WordPress importer for a New Jersey business news publisher that turns a 700+ person influencer list into individual, formatted, alphabetized articles.",
    },
  },
  {
    slug: "mailchimp-reporter",
    name: "Mailchimp reporter",
    title: "Ad performance reports in one click",
    client: "NJ business news publisher",
    summary: "Pick an advertiser and a date range, click once, and get a clean report of opens, clicks, and CTR.",
    status: "live",
    demo: "ready",
    featured: false,
    problem: [
      "Advertisers wanted to know how their newsletter placements performed. Pulling that meant opening every campaign in Mailchimp and copying link clicks into a spreadsheet.",
      "Each report took a chunk of someone's day, and the numbers were easy to get wrong.",
    ],
    built: [
      "A small desktop app. Choose the newsletter type, the advertiser, their ad links or keywords, a date range, and the metrics you want.",
      "One click pulls every campaign in range from Mailchimp, finds the advertiser's links in each one, and totals opens, recipients, clicks, and CTR by send date. The result opens in Excel or saves as CSV.",
    ],
    home: [
      {
        label: "Problem",
        text: "Advertisers wanted to know how their newsletter placements performed. Answering meant opening every campaign in Mailchimp and copying link clicks into a spreadsheet.",
      },
      {
        label: "What we built",
        text: "A small desktop app. Pick the advertiser, their ad links, and a date range, click once, and get opens, clicks, and CTR by send date, ready for Excel.",
      },
      { label: "Result", text: "95% less time on reporting." },
    ],
    stats: [{ value: "95%", label: "less time on reporting" }],
    result: "A report that took most of a morning now takes about as long as a coffee refill.",
    howItWorks: {
      stack: ["Tauri", "React", "Rust", "Mailchimp Marketing API"],
      approach: [
        "The app lists every campaign sent in the date range and keeps the ones whose title matches the newsletter type.",
        "For each campaign it reads opens and recipients, then fetches the per-link click report and adds up clicks on any link that contains the advertiser's URL or keyword.",
        "CTR is ad clicks over unique opens. Dates with no ad clicks are dropped, and the finished table is saved to history and exported with only the columns that were checked.",
      ],
    },
    caption: "95% less time on reporting.",
    seo: {
      title: "Mailchimp Ad Reporting Tool for Publishers | VanHaus",
      description:
        "How VanHaus built a one-click Mailchimp ad performance reporter for a New Jersey business news publisher, cutting reporting time by 95%.",
    },
  },
];

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);

/** Homepage rows, in order: the two featured demos, then two more projects. */
export const homeProjects = [
  ...featuredProjects,
  ...projects.filter((p) => p.slug === "accounting-automation" || p.slug === "influencer-importer"),
];

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
};
