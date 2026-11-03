"use client";

import { DemoFrame } from "./demo-frame";
import { Appear, Avatar, Bar, Pill } from "./demo-ui";
import type { DemoProps } from "./lazy-demo";
import { useDemoPlayer } from "./use-demo-player";

/* Invented honorees. Avatars are initials, never photos. */
const PEOPLE = [
  { rank: 12, name: "Dana Okafor", title: "Chief Operating Officer", company: "Harbor & Pine Logistics" },
  { rank: 13, name: "Theo Lindqvist", title: "Founder", company: "Brightwater Health" },
  { rank: 14, name: "Amara Castellano", title: "Managing Partner", company: "Summit Row Capital" },
  { rank: 15, name: "Ruben Achebe", title: "President", company: "Meadowlark Foods" },
  { rank: 16, name: "Lena Moravec", title: "VP, Engineering", company: "Northgate Robotics" },
  { rank: 17, name: "Jonah Whitcombe", title: "Partner", company: "Ferris & Hale Law" },
];

const COLUMNS = ["LastName", "FirstName", "FullName", "Rank", "Title", "Company", "Category", "ImageFileName", "Writeup"];
const STEPS = ["Upload CSV", "Map Columns", "Configure", "Image Mapping", "Import & Results"];
const ROWS = 48;

const T = {
  fileIn: 400,
  hover: 1700,
  drop: 2400,
  uploaded: 2700,
  map: 3200,
  mapStep: 110,
  importStart: 4500,
  importEnd: 7600,
  card: 4700,
  cardStep: 420,
  results: 7900,
  end: 9600,
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export function ImporterDemo({ isStatic = false, hideCaption = false }: DemoProps) {
  const player = useDemoPlayer(T.end, { isStatic });
  const { at, progress, t } = player;

  const dropped = at(T.drop);
  const mapping = at(T.map) && !at(T.importStart);
  const importing = at(T.importStart);
  const rowsDone = Math.round(ROWS * progress(T.importStart, T.importEnd));
  const stepIndex = at(T.results) ? 4 : importing ? 4 : at(T.map) ? 1 : 0;
  const fileHovering = t >= T.hover && t < T.drop;

  return (
    <DemoFrame
      player={player}
      title="Influencer importer"
      summary="A CSV file drags onto a WordPress upload page. The columns are matched, an import runs with a progress bar, and a grid of finished profile posts appears, each with an initials avatar, rank, name, title, and company."
      caption={hideCaption ? undefined : "One CSV in. Every profile post out."}
    >
      <div className="relative min-h-[430px]">
        {/* Stepper */}
        <ol className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {STEPS.map((step, i) => (
            <li
              key={step}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors duration-300 ${
                i === stepIndex ? "border-accent bg-accent text-on-accent" : i < stepIndex ? "border-accent/50 text-accent" : "border-border text-muted"
              }`}
            >
              {step}
            </li>
          ))}
        </ol>

        {/* Dropzone */}
        <div
          className={`relative mt-3 overflow-hidden rounded-[10px] border transition-[border-color,background-color,height,opacity] duration-500 ${
            fileHovering ? "border-accent bg-accent/10" : "border-dashed border-border bg-bg"
          } ${dropped ? "h-11 opacity-100" : "h-[140px]"}`}
        >
          <div className={`flex h-full flex-col items-center justify-center gap-1.5 px-4 text-center transition-opacity duration-300 ${dropped ? "opacity-0" : "opacity-100"}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 16V4m0 0 5 5m-5-5-5 5M4 20h16" />
            </svg>
            <span className="text-[12.5px] font-semibold">Drag a CSV here</span>
            <span className="text-[10px] leading-[1.4] text-muted">Expected columns: {COLUMNS.join(", ")}</span>
          </div>
          <div className={`absolute inset-0 flex items-center justify-between px-3 text-[11px] transition-opacity duration-300 ${dropped ? "opacity-100" : "opacity-0"}`}>
            <span className="flex items-center gap-2">
              <FileIcon className="h-4 w-4 text-accent" />
              <span className="font-semibold">power-list-2026.csv</span>
              <span className="text-muted">{ROWS} rows detected</span>
            </span>
            <Pill tone="good">CSV uploaded</Pill>
          </div>

          {/* The file gliding in */}
          <div
            className={`absolute flex items-center gap-1.5 rounded-[8px] border border-border bg-surface px-2.5 py-1.5 text-[11px] font-semibold shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)] transition-[left,top,opacity,transform] duration-[1300ms] ease-[cubic-bezier(0.3,0.7,0.2,1)] ${
              dropped ? "opacity-0 scale-75" : at(T.fileIn) ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: at(T.fileIn) ? "calc(50% - 64px)" : "-10%",
              top: at(T.fileIn) ? "calc(50% - 16px)" : "-40%",
            }}
            aria-hidden
          >
            <FileIcon className="h-4 w-4 text-accent" />
            power-list-2026.csv
          </div>
        </div>

        {/* Column mapping */}
        <Appear show={mapping} from="up" className={`${mapping ? "" : "pointer-events-none absolute"} mt-3`}>
          <span className="text-[10.5px] font-semibold text-muted">Header columns found</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {COLUMNS.map((col, i) => (
              <span
                key={col}
                className={`inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-bg px-2 py-1 text-[10.5px] transition-opacity duration-300 ${
                  at(T.map + i * T.mapStep) ? "opacity-100" : "opacity-0"
                }`}
              >
                {col}
                <Pill tone="good">MATCHED</Pill>
              </span>
            ))}
          </div>
        </Appear>

        {/* Import progress + grid */}
        <Appear show={importing} from="up" className={`mt-3 ${importing ? "" : "pointer-events-none absolute inset-x-0"}`}>
          <div className="flex items-center justify-between text-[10.5px]">
            <span className="text-muted">
              Rows processed: <span className="font-semibold text-text tabular-nums">{rowsDone} / {ROWS}</span>
            </span>
            <Pill tone={at(T.results) ? "good" : "accent"}>
              {at(T.results) ? `${ROWS} posts created · ${ROWS} images assigned · 0 failed` : "Importing 10 rows per pass"}
            </Pill>
          </div>
          <Bar value={progress(T.importStart, T.importEnd)} className="mt-1.5" tone={at(T.importEnd) ? "good" : "accent"} />

          <div className="mt-3 grid grid-cols-2 gap-2 @md:grid-cols-3">
            {PEOPLE.map((person, i) => (
              <Appear key={person.name} show={at(T.card + i * T.cardStep)} from="scale" className="rounded-[10px] border border-border bg-bg p-2.5">
                <div className="flex items-center gap-2.5">
                  <Avatar initials={initials(person.name)} size={34} />
                  <div className="min-w-0">
                    <span className="block truncate text-[9.5px] text-muted">No. {person.rank} · 2026 Power List</span>
                    <span className="block truncate text-[12px] font-bold leading-[1.2]">{person.name}</span>
                  </div>
                </div>
                <span className="mt-2 block truncate text-[10.5px] text-muted">{person.title}</span>
                <span className="block truncate text-[10.5px] font-semibold italic">{person.company}</span>
                <div className="mt-2 grid gap-1" aria-hidden>
                  <span className="h-1 w-full rounded-full bg-border" />
                  <span className="h-1 w-4/5 rounded-full bg-border" />
                </div>
              </Appear>
            ))}
          </div>
        </Appear>
      </div>
    </DemoFrame>
  );
}

function FileIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h8" />
    </svg>
  );
}
