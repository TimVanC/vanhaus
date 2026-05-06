import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_DESTINATION = "timvancau@gmail.com";
const CONTACT_FROM = "Vanhaus <hello@vanhaus.dev>";

type ContactPayload = {
  name?: string;
  email?: string;
  timeline?: string;
  message?: string;
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const timeline = payload.timeline?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_DESTINATION],
      replyTo: email,
      subject: "New Vanhaus Project Request",
      text: [
        "New project request submitted via vanhaus.dev",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Timeline: ${timeline || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      // Temporary: expose exact provider error during development while keeping production generic.
      console.error("Resend API error response:", error);
      return NextResponse.json(
        {
          error: "Unable to send message right now.",
          details: process.env.NODE_ENV === "development" ? error : undefined,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected contact API error:", error);
    return NextResponse.json(
      {
        error: "Unexpected error while sending message.",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 },
    );
  }
}
