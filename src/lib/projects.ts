import { OPS_MANAGER_IN_PROGRESS, QAQC_IN_PROGRESS, SHOW_AVA_DEMO } from "@/lib/constants";

/**
 * Every project shown on the homepage, on /work, and on /work/[slug].
 * Clients are described by industry only. Stats are limited to the ones the
 * client has agreed to; anything missing is a TODO rather than a guess.
 */

export type ProjectSlug =
  | "ai-receptionist"
  | "proposal-generator"
  | "qaqc-checklist"
  | "operations-manager"
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
      { label: "Result", text: "1,000+ calls answered so far." },
    ],
    problem: [
      "Calls came in while the crew was on job sites. Voicemails piled up and some leads never called back.",
      "Hiring a full-time receptionist did not make sense for the call volume, but every missed call was a missed job.",
    ],
    built: [
      "An AI phone receptionist, named Ava, built on Twilio and the OpenAI Realtime API. She answers every call, asks the questions a dispatcher would ask, and collects the name, address, and what is going on.",
      "Urgent calls get routed to a real person. Everything else ends with a summary email to the office so nothing has to be transcribed from voicemail.",
    ],
    stats: [{ value: "1,000+", label: "calls answered so far" }],
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
        "How VanHaus built Ava, an AI phone receptionist for a New Jersey HVAC and generator company. Answers every call, collects job details, and emails a summary. 1,000+ calls answered so far.",
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
        text: "Every quote was rebuilt by hand from a spreadsheet, a Word template, and the owner's memory. Slow quotes meant missed bids and jobs lost to faster competitors.",
      },
      {
        label: "What we built",
        text: "A proposal generator. Describe the job by form, chat, photos, or a bid PDF, and get a priced, branded proposal the customer signs online.",
      },
      {
        label: "How it learns",
        text: "Built on 121 of their past proposals, with every new one added back in. Repeated price edits become new pricing rules the owner approves.",
      },
      {
        label: "Result",
        text: "Hours by hand became minutes. Tested against a real job they had won, it landed on the exact same total.",
      },
    ],
    problem: [
      "Every quote was rebuilt by hand: a spreadsheet for the math, a Word template for the document, and the owner's memory for everything in between. Each one took hours.",
      "Three years of past proposals sat in about 45 customer folders that nobody could search. Installs were quoted as one lump sum, so there was nothing to compare a new job against, and the generator size was often picked by feel.",
      "While a quote was being put together, bids were missed and some jobs went to competitors who answered faster.",
    ],
    built: [
      "A web app where the team describes a job whichever way is easiest: the site survey form, a short chat or dictation, job photos, an uploaded PDF, or a public bid package of 100+ pages. Techs can start an estimate from their phone on site.",
      "We read and structured 121 of their past proposals. Installs are now split into materials, mechanical, and electrical, and each part, like a crane lift, a new pad, or a gas run, is priced from the same element on similar past jobs. Those jobs are cited on every line.",
      "Built-in sizing uses NEC load calculations to pick the smallest unit that covers the demand. A second-reader check flags easy-to-miss problems before export, like a transfer switch smaller than the service or a diesel unit with no fuel tank.",
      "Every new proposal goes back in. Won jobs rank first as comparables, and when the team keeps making the same price edit, the tool proposes a new pricing rule for the owner to approve.",
      "The finished proposal exports to Word or PDF in their own layout and goes to the customer with a signing link. They draw or type a signature, and a signed copy comes back automatically.",
    ],
    stats: [
      { value: "121", label: "past proposals turned into pricing data" },
      { value: "18 days", label: "from kickoff to delivery" },
    ],
    result:
      "Hours by hand became minutes. In an accuracy check, a 20 kW residential job priced by the tool landed on the exact total of a real proposal the company had won, and the equipment matched the owner's own workbook to the cent.",
    howItWorks: {
      stack: ["Next.js", "Neon Postgres", "Claude (Anthropic API)", "docx, pdf-lib, and pdf.js", "Resend", "Vercel"],
      approach: [
        "The job comes in through a form, a chat, photos, or a document. Claude reads surveys and bid packages, runs the chat, reviews the worksheet like a second estimator, and writes the scope of work. Large PDFs are read right in the browser.",
        "The AI never sets a price. Every line is tagged with where its number came from: the price list, a past job, a public bid, an assumption, or an allowance. Export stays blocked until a person signs off on anything not backed by hard data.",
        "When the manufacturer's price sheet changes each year, an admin uploads the new one, reviews a line-by-line diff, and applies it. No re-keying.",
        "Proposals are generated as Word or PDF, emailed with a private signing link, and signed online. Won and lost outcomes feed back in, so the next quote has more to go on.",
      ],
    },
    caption: "Hours by hand to minutes.",
    seo: {
      title: "AI Proposal Generator for Generator Installers | VanHaus",
      description:
        "How VanHaus built a proposal generator for a tri-state area HVAC and generator company. Built on 121 past quotes, it turns a job into a priced, branded proposal in minutes that customers sign online.",
    },
  },
  {
    slug: "qaqc-checklist",
    name: "QA/QC checklist app",
    title: "A QA/QC checklist that checks itself against Housecall Pro",
    client: "HVAC & generator company, NJ",
    summary:
      "Monthly Excel checklist workbooks replaced by one app. Jobs flow in from Housecall Pro, and managers see every missing checklist before a pay period closes.",
    status: QAQC_IN_PROGRESS ? "in-progress" : "live",
    demo: "ready",
    featured: false,
    home: [
      {
        label: "Problem",
        text: "Every employee had a locked Excel checklist workbook per month, filled in by a call team overseas. Jobs were typed in by hand, and nobody could see which checklists were still missing before payroll.",
      },
      {
        label: "What we built",
        text: "One app for every job. Jobs sync from Housecall Pro, the call team works a daily queue, Housecall Pro data suggests answers a person confirms, and managers track completion per technician and pay period.",
      },
      QAQC_IN_PROGRESS
        ? { label: "Status", text: "In final rollout. Results will be added once it's fully live." }
        : {
            label: "Result",
            text: "Every job's checklist in one place, scored exactly like the old workbook, with no more typing jobs in by hand.",
          },
    ],
    problem: [
      "Every employee had a locked Excel workbook per month, with 35 checklist tabs and 10 call back tabs, filled in by a call team working overseas. Each job's customer, date, location, and invoice number were typed in by hand from Housecall Pro.",
      "Nobody could see from one place which jobs still needed a checklist before a pay period closed, and a missing checklist had real consequences at payroll. Half the questions asked things Housecall Pro already knew, and there was no record of who answered what, or when.",
    ],
    built: [
      "A web app for the call team, managers, and admins. Jobs sync from Housecall Pro through webhooks, and the call team works one New Jersey day at a time, with jobs grouped by technician and the checklist header already filled in.",
      "Each checklist has 44 items answered Y, N, or B with a tap or a keystroke, and it saves on every answer. Where Housecall Pro already knows the answer, like the arrival time, the deposit, or a paid invoice, the app suggests it with the evidence and a person confirms it.",
      "Managers get a completion tracker per pay period and production numbers per technician, using the old workbook's formulas, with a 60/40 split when two technicians share a job.",
      "Every answer, submit, and reopen goes to an audit log. Any N answer gets a follow-up with an owner and a due date, and the company can export all of its data in one click.",
    ],
    stats: QAQC_IN_PROGRESS ? [] : [{ value: "10 days", label: "from first commit to live" }],
    /* TODO: add client-approved results once the app is fully live. */
    result: QAQC_IN_PROGRESS
      ? "In final rollout. Results will be added once it's fully live."
      : "One place to see every job's checklist, scores that match the old workbook exactly, and no more typing jobs in by hand.",
    howItWorks: {
      stack: ["Next.js", "Neon Postgres", "Drizzle ORM", "Housecall Pro API and webhooks", "Resend", "Vercel"],
      approach: [
        "Housecall Pro sends a webhook whenever a job, invoice, or customer changes. The app verifies it, stores it, and re-syncs that job. It only ever reads from Housecall Pro and never writes back.",
        "Rules compare the synced data with each checklist step: did the tech start early, was the deposit collected, is the invoice paid, is a follow-up job booked. Matches show up as suggestions with the evidence, and nothing is ever submitted on its own.",
        "Scoring runs on every save using the old workbook's formulas. The expected results were made by filling in the real workbook and recalculating it in Excel, so Excel is the referee.",
        "Every day and pay period is worked out in Eastern time on the server, since the call team works from another time zone. A nightly reconcile catches anything a webhook missed.",
      ],
    },
    caption: "Housecall Pro suggests. A person confirms.",
    seo: {
      title: "QA/QC Checklist App for Field Service Companies | VanHaus",
      description:
        "How VanHaus replaced monthly Excel QA/QC workbooks with a mobile checklist app for a New Jersey HVAC and generator company, synced with Housecall Pro so steps are suggested from real job data.",
    },
  },
  {
    slug: "operations-manager",
    name: "Operations manager",
    title: "An AI operations manager that watches 18 systems at once",
    client: "Tri-state area HVAC & generator company",
    summary:
      "Eighteen business systems, from Housecall Pro to QuickBooks to three Outlook inboxes, feed one private command center. Every morning it briefs the owner on what needs attention, and it texts him when something can't wait.",
    status: OPS_MANAGER_IN_PROGRESS ? "in-progress" : "live",
    demo: "ready",
    featured: false,
    home: [
      {
        label: "Problem",
        text: "The owner's picture of the business was spread across more than a dozen systems: jobs, money, sales, email, meetings, and timesheets. He checked each one by hand, and problems surfaced late, usually by accident.",
      },
      {
        label: "What we built",
        text: "A private AI command center connected read-only to 18 systems, including the receptionist, proposal tool, and QA/QC app we built for them. It sends a morning briefing, flags what needs attention, and texts critical alerts.",
      },
      OPS_MANAGER_IN_PROGRESS
        ? { label: "Status", text: "In development and rolling out in phases. Results will be added once it's live." }
        : /* TODO: replace with a client-approved result once it's live. */
          { label: "Result", text: "One morning briefing instead of a dozen systems to check." },
    ],
    problem: [
      "This company's picture of the business lived in more than a dozen disconnected places. Jobs were in Housecall Pro, vehicles in Smart Fleet, quality checks in the QA/QC app, money and payroll in QuickBooks Online, and sales split across HubSpot, the proposal tool, government bid alerts, and the AI receptionist's call log.",
      "Communication was spread across three Outlook inboxes, a Gmail account, and Teams meetings. The business plan and certifications sat in standalone documents, and timesheets were per-person Excel files.",
      "No single place showed what needed attention today: missed checklists, unpaid invoices, stalled estimates, bid deadlines, or certification renewals. The owner checked each system by hand, and problems surfaced late, usually after someone noticed by accident.",
    ],
    built: [
      "A private command center that pulls from 18 systems on a schedule into its own database. That covers the field, the books, the sales pipeline, every inbox, and meeting transcripts, plus the receptionist, proposal tool, and QA/QC app we built for them earlier.",
      "Dashboards for today's jobs and technicians, QA/QC scoring and missing checklists, revenue and receivables, and the full sales pipeline. Timesheets move from per-person Excel files into the app.",
      "Every morning, Claude turns it all into one briefing: what happened, what needs attention, and suggested next steps, grounded in the company's own business plan. Missed checklists, overdue invoices, stalled estimates, bid deadlines, and certification renewals go straight to the owner's phone by email and text, and he can ask plain-language questions about the business.",
      "It presents and never decides. Every connection is read-only, nothing flows back to the source systems, and every decision stays with the owner.",
    ],
    stats: [{ value: "18", label: "business systems feeding one read-only view" }],
    /* TODO: add client-approved results once it's live. */
    result: OPS_MANAGER_IN_PROGRESS
      ? "In development and rolling out in three phases, each one usable on its own. Results will be added once it's live."
      : "One morning briefing instead of a dozen systems to check, with critical issues on the owner's phone the day they happen.",
    howItWorks: {
      stack: [
        "Next.js",
        "Neon Postgres",
        "Claude (Anthropic API)",
        "Microsoft Graph",
        "Housecall Pro, QuickBooks, HubSpot, and Gmail APIs",
        "Twilio SMS",
        "Vercel",
      ],
      approach: [
        "Each source connects read-only through its most reliable path: an official API, webhooks, a Microsoft 365 app limited to named mailboxes, a scheduled report export, or parsed alert emails. Where an API only offers read and write access together, writes are blocked in code.",
        "Everything lands in the operations manager's own database. The AI layer reads only from that copy, never from the live systems.",
        "Scheduled jobs run the syncs and build the morning briefing. Critical alerts go out by email and by text.",
        "It shipped in three phases, each usable on its own: the core dashboard and AI layer, then communications and documents, then outside accounts and timesheets. The company owns all of its data and can export it at any time.",
      ],
    },
    caption: "Eighteen systems in. One morning briefing out.",
    seo: {
      title: "AI Operations Manager for HVAC Companies | VanHaus",
      description:
        "How VanHaus built a private AI operations manager for a tri-state area HVAC and generator company, connecting 18 business systems into one read-only view with a daily briefing and critical alerts.",
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
        text: "Years of their books live in Sage 50, an older desktop accounting system, so switching wasn't an option. But it couldn't connect to their website, so 4,500 to 5,000 online orders a year were re-keyed by hand.",
      },
      {
        label: "What we built",
        text: "A WordPress plugin that turns each day's orders into files Sage 50 accepts, including custom shoulder pads where one product stands for 360 possible inventory SKUs. They import cleanly, as if someone had keyed them in.",
      },
      { label: "Result", text: "80 to 90% less time spent on reporting. The files are in the inbox every morning." },
    ],
    problem: [
      "This team makes football pads, supplies the NFL, and sells direct online through WooCommerce. Their accounting has run on Sage 50, an older desktop system, for years. All of that history lives there, so moving to a newer service wasn't worth what they would lose.",
      "Sage 50 has no way to connect to the website. Each of the 4,500 to 5,000 online orders a year was re-keyed by hand as a sales order, an invoice, and a payment. Mistakes crept in: missed orders, the wrong SKU, the wrong tax, and refunds handled differently each time.",
      "Custom shoulder pads were the hardest part. Customers build them from options like size, arch, and cup, so one product on the website stands for hundreds of physical inventory items, and the choices only live inside each order.",
    ],
    built: [
      "A WordPress plugin that reads each day's WooCommerce orders and never changes them. It reads the builder choices on every custom pad and assembles the exact inventory SKU, out of 360 possible combinations. Add-ons like backplates and rib guards become their own rows, with their price moved off the pad so revenue is never counted twice.",
      "Coupons, refunds, shipping, and state sales tax are all netted out. Refunds land on the refund date, and partial refunds are split fairly between a pad and its add-ons.",
      "At midnight it builds two files, an inventory export and a journal entry, in the exact layout Sage 50 expects, and emails them to the accounting team. A monthly sales summary by state goes out on the 1st.",
      "It never invents a balancing entry. If a day's debits and credits don't match, it stops, names the exact order behind the problem, and emails a plain-language note on what to do next. The controller handles day-to-day exceptions, like a new tax state or an unmapped product, from the admin pages without calling a developer.",
    ],
    stats: [
      { value: "80 to 90%", label: "less time spent on reporting" },
      { value: "4,500+", label: "orders a year no longer re-keyed by hand" },
      { value: "360", label: "possible SKUs behind one custom pad, worked out automatically" },
    ],
    result:
      "They kept the accounting system they trust, and the team's daily work is now checking numbers instead of typing them. It has run every night since February 2026, and every problem so far was caught by its own safety checks before bad numbers reached the books.",
    howItWorks: {
      stack: ["WordPress plugin", "PHP", "WooCommerce", "PhpSpreadsheet", "WP-Cron", "Sage 50 import"],
      approach: [
        "The plugin only reads orders. It never changes anything in WooCommerce.",
        "A dictionary maps option labels to SKUs and add-ons. Coupons become negative rows, refunds mirror the original items on the refund date, and sales tax is credited per state.",
        "At midnight Eastern the scheduler builds both Excel files and emails them. A 4 AM check re-runs any day that didn't succeed, and every run is logged with its result.",
        "Both files are built from the same set of orders, so they always agree. Unmapped products and unbalanced days show up as warnings in the email instead of being quietly guessed at.",
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
    title: "Advertiser reports that credit the right ad",
    client: "NJ business news publisher",
    summary:
      "Pick an advertiser, a date range, and the newsletters. Get opens and ad clicks for every send, credited to whoever actually held that ad slot that day.",
    status: "live",
    demo: "ready",
    featured: false,
    home: [
      {
        label: "Problem",
        text: "Advertisers buy slots in the publisher's newsletters and are owed a report. Mailchimp only logs clicks against links, the ad slots rotate between advertisers, and the old report script ran on one computer.",
      },
      {
        label: "What we built",
        text: "A web app any authorized staffer can open. Pick the advertiser, dates, and newsletters, and it credits every click to whoever held that ad slot on the send date, then hands back a CSV per newsletter.",
      },
      {
        label: "Result",
        text: "95% less time on reporting. Checked against a known advertiser report, all 204 rows matched.",
      },
    ],
    problem: [
      "The publisher sells ad slots in its email newsletters and owes each advertiser a report: how many readers opened the newsletters their ad ran in, and how many clicked the ad. Mailchimp has the raw numbers, but turning them into a per-advertiser, per-day report was a manual grind on a desktop script that only ran on one machine.",
      "The numbers were also hard to get right. Mailchimp logs clicks against links, not advertisers, and the ad links point at ad slots that rotate. One slot held five different advertisers between June and October, so following the link today credits whoever is in the slot now, not who was there on the send date.",
      "Reports often span months and hundreds of campaigns, far more work than a single web request can finish.",
    ],
    built: [
      "A web app for invited staff. Pick an advertiser, a date range, and any mix of newsletters, choose the columns, and run it. One run produces a CSV per newsletter, in the same layout the team already used, with monthly subtotals and a grand total.",
      "Clicks are credited using the ad server's own placement history. A click only counts when that advertiser held that ad slot on the send date, and older plain links to the advertiser's site still count too. Every report includes an attribution log showing which advertiser held each slot, and when.",
      "Long reports run as resumable jobs. They survive a page reload, a closed tab, or a server timeout and pick up from the last saved campaign. A progress bar shows campaigns processed and time left, and any past report can be re-run with the same settings.",
    ],
    stats: [
      { value: "95%", label: "less time on reporting" },
      { value: "204", label: "rows checked against a known advertiser report, matched row for row" },
    ],
    result:
      "Reports any staffer can run from a browser, with every click credited to the advertiser who actually held the slot.",
    howItWorks: {
      stack: ["Next.js", "Supabase (auth and Postgres)", "Mailchimp Marketing API", "Broadstreet ad server API", "Vercel"],
      approach: [
        "The app pulls the campaign list from Mailchimp once, tags each campaign with every newsletter type it matches using whole-word matching, and reads opens, recipients, and per-link clicks for each send.",
        "Ad placement history is synced from the ad server every few hours. For each ad link, the app checks which advertiser held that slot on the send date and only counts the clicks that belong to them.",
        "Work runs in 30-second steps that save their place in the database, so a months-long report never times out. Send dates are handled in Eastern time, so a 9 PM blast lands on the right day.",
        "API keys stay on the server and never reach the browser. CTR is total clicks over total opens, the same formula on every row and total.",
      ],
    },
    caption: "95% less time on reporting.",
    seo: {
      title: "Mailchimp Ad Reporting Tool for Publishers | VanHaus",
      description:
        "How VanHaus built a web app for a New Jersey business news publisher that turns Mailchimp data into advertiser reports, crediting every ad click to the right advertiser and cutting reporting time by 95%.",
    },
  },
];

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);


/** Homepage rows, in order: the two featured demos, the operations manager, then two more projects. */
const HOME_ORDER: ProjectSlug[] = [
  "ai-receptionist",
  "proposal-generator",
  "operations-manager",
  "accounting-automation",
  "influencer-importer",
];
export const homeProjects = HOME_ORDER.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p),
);

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
};
