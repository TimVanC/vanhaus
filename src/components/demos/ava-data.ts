/**
 * Placeholder content for the AI receptionist demo.
 *
 * TODO: replace all three constants with the real recording and transcript, then set
 * SHOW_AVA_DEMO to true in src/lib/constants.ts. Until then the demo stays hidden and
 * the homepage shows a "coming soon" slot.
 *
 * - AVA_AUDIO_SRC: path under /public (for example "/audio/ava-sample.mp3") or null to run
 *   the demo on its internal clock with no sound.
 * - AVA_TRANSCRIPT: one entry per line of speech, with start/end in milliseconds that match
 *   the recording. "ai" lines are drawn in copper, "caller" lines in the muted tone.
 * - AVA_SUMMARY: the summary email that slides in when the call ends.
 */

export type TranscriptLine = { who: "ai" | "caller"; start: number; end: number; text: string };

export const AVA_AUDIO_SRC: string | null = null;

export const AVA_TRANSCRIPT: TranscriptLine[] = [
  { who: "ai", start: 0, end: 2600, text: "Thanks for calling. This is Ava. How can I help you today?" },
  { who: "caller", start: 2800, end: 6200, text: "Hi, our generator didn't kick on during the storm last night." },
  { who: "ai", start: 6400, end: 9800, text: "Sorry to hear that. Can I get your name and the address of the unit?" },
  { who: "caller", start: 10000, end: 13600, text: "Sure, it's Marisol Vega, 48 Juniper Road in Madison." },
  { who: "ai", start: 13800, end: 17800, text: "Got it. Is anyone without power right now, or is this a repair for the next available slot?" },
  { who: "caller", start: 18000, end: 20400, text: "Power's back. Next available is fine." },
  { who: "ai", start: 20600, end: 24600, text: "Perfect. A technician will call you back today to schedule. Anything else I can note for them?" },
  { who: "caller", start: 24800, end: 26400, text: "No, that's it. Thanks." },
];

/** Total length of the placeholder call, in ms. Replace with the real recording length. */
export const AVA_CALL_LENGTH = 27_000;

export const AVA_SUMMARY = {
  subject: "Call summary: generator no-start, Madison",
  caller: "Marisol Vega",
  phone: "(973) 555-0142",
  address: "48 Juniper Road, Madison, NJ",
  issue: "Standby generator did not start during last night's outage. Power has since returned.",
  urgency: "Not urgent. Caller requested next available appointment.",
  nextStep: "Technician to call back today to schedule a service visit.",
};
