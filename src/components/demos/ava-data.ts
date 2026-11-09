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

/** Loudness of the clip in 72 slices (0 to 1), measured from the audio. */
export const AVA_WAVEFORM = [
  0.65, 0.17, 0.63, 0.71, 0.76, 0.56, 0.3, 0, 0.1, 1, 0.57, 0.63, 0.07, 0, 0, 0.29, 0.8, 0.47, 0.87, 0.75, 0.7, 0.18,
  0.91, 0.99, 0.67, 0.58, 0.58, 0.8, 0.3, 1, 0.43, 0.75, 0.85, 0.87, 0.6, 0.53, 0.42, 0.85, 0.78, 0.74, 0.66, 0.63,
  0.64, 0.56, 0.76, 0.71, 0.42, 0.5, 0.59, 0.67, 0.56, 0.48, 0.64, 0.62, 0.46, 0.88, 0.72, 0.55, 0.46, 0.58, 0.79,
  0.48, 0.77, 0.29, 0.7, 0.56, 0.05, 0, 0.1, 0.39, 0.8, 0.33,
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
