/**
 * Content for the AI receptionist demo.
 *
 * The audio is the last 40 seconds of a sample call to Ava (a test caller reporting no heat).
 * It starts at 1:42.7 of the full recording and runs to 2:24.2, so it covers the availability
 * question, Ava's read-back, and the caller's confirmation. The company greeting and sign-off,
 * which name the client, are outside this clip.
 *
 * Transcript times are in milliseconds from the start of the clip. They were placed from the
 * call's own transcript and from the pauses in the audio, so lines highlight in sync.
 * All caller details are fictional (555 number, example.com email).
 */

export type TranscriptLine = { who: "ai" | "caller"; start: number; end: number; text: string };

export const AVA_AUDIO_SRC: string | null = "/audio/ava-sample-call.mp3";

/** Length of the clip in ms. */
export const AVA_CALL_LENGTH = 41_500;

/** Shown above the player so the clip has context. */
export const AVA_CONTEXT = "Sample call: no heat. The last 40 seconds.";

export const AVA_TRANSCRIPT: TranscriptLine[] = [
  { who: "ai", start: 300, end: 3800, text: "Got it. What days and times usually work best for you?" },
  { who: "caller", start: 5100, end: 7000, text: "Weekday mornings work best for me." },
  { who: "ai", start: 9100, end: 12400, text: "Let me read that back. I have your name as Daniel Brooks." },
  { who: "ai", start: 12700, end: 17900, text: "Your phone number is 973-555-0142." },
  { who: "ai", start: 18100, end: 21100, text: "Your email is daniel@example.com." },
  { who: "ai", start: 21200, end: 27300, text: "The address is 27 Maple Avenue, Montclair, NJ 07042." },
  { who: "ai", start: 27500, end: 31200, text: "For the system, I have furnace, about 10 years old." },
  { who: "ai", start: 31400, end: 34000, text: "The issue I noted is completely out." },
  { who: "ai", start: 34300, end: 36700, text: "And for availability, weekday mornings." },
  { who: "ai", start: 37000, end: 38300, text: "Is everything correct?" },
  { who: "caller", start: 39600, end: 41200, text: "Yep, that's all correct." },
];

/** Loudness of the clip every 100 ms (0 to 1), measured from the audio. Drives the scrolling waveform. */
export const AVA_ENVELOPE_STEP = 100;
export const AVA_ENVELOPE = [
  0, 0, 0, 0.21, 1, 0.58, 0.28, 0, 0, 0, 0, 0, 0.37, 0.7, 0.62, 0.16, 0.63, 0.56, 0.51, 0.65, 0.19, 0.7, 0.7, 0.47,
  0.17, 0.83, 0.56, 0.96, 0.49, 0.62, 0, 0.68, 0.1, 0, 0.51, 0.42, 0.2, 0.07, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0.24, 0.94, 0.08, 0.99, 0.93, 0.83, 0.79, 0.41, 0.21, 0.16, 0.75, 0.57, 0.09, 1, 0.46, 0.08, 0.39, 0.32, 0.16, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42, 0.69, 0.85, 0.55, 0.52, 0.85, 0.31, 0.56, 0.57,
  0.16, 0, 0, 0.55, 0.47, 0.95, 0.55, 0.71, 0.78, 0.75, 0.91, 0.47, 0.71, 0.57, 0.15, 0.16, 0.91, 0.67, 0.52, 0.19,
  0.56, 0.36, 0, 0.07, 0, 0, 0, 0.28, 1, 0.06, 1, 0.77, 0.79, 0.74, 1, 0.61, 1, 0.62, 0.13, 0.47, 0.71, 0.65, 0.37,
  0.64, 0.48, 0.37, 0.41, 0.63, 0.51, 0.3, 0, 0, 0, 0.62, 0.92, 0.26, 0.82, 0.81, 0.07, 0.79, 0.64, 0.54, 0.38, 0,
  0, 0, 0.18, 1, 1, 1, 0.71, 0.7, 0.29, 0.18, 0.61, 0.19, 0.35, 0.36, 0.13, 0, 0, 0.83, 0.89, 0.59, 0.89, 0.79,
  0.88, 0.61, 0.5, 0.6, 0.13, 1, 0.84, 0.73, 0.63, 0.53, 0.29, 0.77, 0.39, 0.35, 0.17, 0.75, 0.51, 0.39, 0.4, 0.62,
  0.09, 0.25, 0.27, 0.19, 0.09, 0, 0.56, 0.77, 1, 0.49, 0.87, 0.35, 0.14, 1, 0.44, 0.09, 0.33, 0.72, 0.43, 0.26,
  0.8, 0.68, 0.63, 0.55, 0.63, 0.42, 0.61, 0.8, 0.43, 0.34, 0.37, 0.35, 0.21, 0, 0.28, 1, 0.44, 0.09, 0.64, 0.73,
  0.66, 0.36, 0.79, 0.42, 0.4, 0.39, 0.16, 0, 0.11, 0.33, 1, 0.75, 0.22, 0.59, 0.46, 0.6, 0.33, 0.63, 0.69, 0.52, 0,
  0.4, 0.49, 0, 0.33, 0.46, 0.13, 0, 0, 0, 0.9, 0.45, 0.41, 0.5, 0.15, 0.7, 0.48, 0.65, 0.16, 0.68, 0.37, 0.69,
  0.71, 0.48, 0.07, 0, 0, 0.8, 0.88, 0.23, 0.11, 0.06, 0.06, 0, 0.3, 0.87, 0.83, 0, 0.09, 0.52, 0.7, 0.54, 0.31,
  0.45, 0.38, 0.24, 0, 0, 0.09, 0.71, 0.51, 0.35, 0.64, 0.75, 0.83, 0.81, 0.95, 0.78, 0.72, 0.33, 0.65, 0.1, 0.19,
  0.4, 0, 0.1, 0.56, 0.78, 0.36, 0.5, 0.46, 0.48, 0.21, 0.07, 0, 0, 0, 0.76, 0.27, 0.9, 0.64, 0.74, 0.68, 0.4, 0.62,
  0.83, 0.5, 0.46, 0.25, 0, 0, 0, 0.59, 0.56, 0.44, 0.87, 0.79, 0.52, 0.23, 0.19, 0, 0, 0, 0, 0.48, 0.94, 0.52,
  0.56, 0.44, 0.35, 0.54, 0.11, 0.63, 0.57, 0.23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.27, 0.72, 0.19,
  0, 0, 0, 0.1, 0.79, 0.21, 0.97, 0.82, 0.22, 0.67, 0.34, 0.07, 0, 0, 0,
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
