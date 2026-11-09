/**
 * Content for the AI receptionist demo.
 *
 * The audio is the studio take of the last 40 seconds of a sample call to Ava (a test caller
 * reporting no heat). It covers the availability question, Ava's read-back, and the caller's
 * confirmation. The company greeting and sign-off, which name the client, are outside this clip.
 *
 * Transcript times are in milliseconds from the start of the clip. They were placed from the
 * call's transcript and the pauses in this recording, and the per-line audio lengths in the
 * studio take confirm the order. All caller details are fictional (555 number, example.com).
 */

export type TranscriptLine = { who: "ai" | "caller"; start: number; end: number; text: string };

export const AVA_AUDIO_SRC: string | null = "/audio/ava-sample-call-studio.mp3";

/** Length of the clip in ms. */
export const AVA_CALL_LENGTH = 40_200;

/** Shown above the player so the clip has context. */
export const AVA_CONTEXT = "Sample call: no heat. The last 40 seconds.";

export const AVA_TRANSCRIPT: TranscriptLine[] = [
  { who: "ai", start: 360, end: 3500, text: "Thanks. What days and times usually work best for you?" },
  { who: "caller", start: 5150, end: 6900, text: "Weekday mornings work best for me." },
  { who: "ai", start: 8650, end: 12100, text: "Let me read that back. I have your name as Daniel Brooks." },
  { who: "ai", start: 12550, end: 17200, text: "Your phone number is 973-555-0142." },
  { who: "ai", start: 17500, end: 20450, text: "Your email is daniel@example.com." },
  { who: "ai", start: 20950, end: 26200, text: "The address is 27 Maple Avenue, Montclair, NJ 07042." },
  { who: "ai", start: 26750, end: 30100, text: "For the system, I have furnace, about 10 years old." },
  { who: "ai", start: 30500, end: 32700, text: "The issue I noted is completely out." },
  { who: "ai", start: 33100, end: 35400, text: "And for availability, weekday mornings." },
  { who: "ai", start: 35800, end: 36650, text: "Is everything correct?" },
  { who: "caller", start: 38300, end: 39750, text: "Yep, that's all correct." },
];

/** Loudness of the clip every 100 ms (0 to 1), measured from the audio. Drives the scrolling waveform. */
export const AVA_ENVELOPE_STEP = 100;
export const AVA_ENVELOPE = [
  0, 0, 0, 0.33, 0.91, 0.58, 0.15, 0, 0, 0, 0, 0.41, 0.59, 0.63, 0.82, 1, 0.58, 0.73, 0.16, 0.8, 0.87, 0.99, 0.37,
  0.79, 0.64, 1, 0.59, 0.42, 0.47, 0.48, 0.06, 0.48, 0.52, 0.33, 0.12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0.14, 0.89, 0.63, 0.12, 1, 0.84, 1, 0.96, 0.81, 0.32, 0.9, 0.65, 0.51, 0.83, 0.1, 0.29, 0.35, 0.18, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.27, 0.84, 1, 0.55, 0.49, 0.98, 0.29, 0.55, 0.5, 0.27, 0.06, 0, 0, 0, 0,
  0.53, 0.42, 0.87, 0.41, 0.69, 0.86, 0.77, 0.67, 0.68, 0.85, 0.31, 0.08, 0.86, 0.68, 0.56, 0.37, 0.12, 0.63, 0.1,
  0, 0, 0, 0, 0, 0, 0.87, 0.08, 1, 0.71, 0.73, 0.77, 0.98, 0.57, 0.98, 0.56, 0.13, 0.52, 0.69, 0.36, 0.5, 0.41,
  0.26, 0.37, 0.58, 0.42, 0.32, 0, 0, 0.59, 1, 0.27, 1, 0.55, 0.35, 0.97, 0.56, 0.44, 0, 0, 0, 1, 1, 0.76, 0.58,
  0.27, 0.24, 0.52, 0.1, 0.27, 0.55, 0.19, 0, 0, 0, 0, 0, 0.99, 0.97, 0.61, 0.75, 0.83, 0.92, 0.51, 0.62, 0.59,
  0.07, 0.5, 0.92, 0.69, 0.72, 0.51, 0.39, 0.69, 0.44, 0.39, 0.63, 0.18, 0.35, 0.64, 0.15, 0.27, 0.37, 0.21, 0.08,
  0, 0, 0, 0, 0, 0.72, 0.89, 0.71, 0.93, 0.73, 0.11, 0.37, 0.63, 0.2, 0.1, 0.38, 0.67, 0.38, 0.56, 0.71, 0.74, 0.67,
  0.5, 0.51, 0.6, 0.81, 0.28, 0.41, 0.38, 0.28, 0, 0.2, 1, 0.32, 0.24, 0.73, 0.79, 0.59, 0.61, 0.71, 0.23, 0.45,
  0.19, 0, 0.55, 0.8, 0.16, 0.64, 0.5, 0.48, 0.34, 0.1, 0.48, 0.13, 0.37, 0.28, 0.06, 0, 0, 0, 0, 0, 0, 0.56, 0.9,
  0.33, 0.48, 0, 0.68, 0.66, 0.52, 0.69, 0.41, 0.82, 0.83, 0.42, 0, 0, 0, 1, 0.89, 0.24, 0, 0, 0, 0, 0.48, 1, 0.51,
  0.35, 0.72, 0.58, 0.33, 0.47, 0.33, 0.13, 0, 0, 0, 0, 0.57, 0.66, 0.48, 0.46, 0.95, 0.59, 0.53, 0.64, 0.82, 0.42,
  0.8, 0.23, 0.09, 0.31, 0.13, 0.25, 0.77, 0.28, 0.32, 0.57, 0.4, 0, 0, 0, 0, 0, 0, 0.73, 0.45, 0.45, 0.99, 0.85,
  0.97, 0.57, 0.95, 0.7, 0.46, 0.26, 0, 0, 0.13, 0.91, 0.18, 0.96, 0.7, 0.49, 0.31, 0.16, 0.1, 0, 0, 0, 0, 0.36,
  0.89, 0.55, 0.51, 0.44, 0.82, 0.72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 0.97, 0, 0, 0, 0,
  0, 0.75, 0.34, 0.84, 0.35, 0.87, 0.56, 0, 0, 0, 0, 0, 0,
];

/** The summary email the office gets after the call, built from the details in the full call. */
export const AVA_SUMMARY = {
  subject: "New service request: no heat, Montclair",
  fields: [
    ["Caller", "Daniel Brooks"],
    ["Phone", "(973) 555-0142"],
    ["Email", "daniel@example.com"],
    ["Address", "27 Maple Avenue, Montclair, NJ 07042"],
    ["System", "Gas furnace, about 10 years old"],
    ["Issue", "Completely out since last night. No heat."],
    ["Safety", "No smoke, gas smell, or sparks reported."],
    ["Availability", "Weekday mornings"],
  ] as [string, string][],
  nextStep: "A team member will call back to schedule.",
};
