import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  company_website?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled means a bot. Pretend it worked and drop it.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 },
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "admin@cheekymedia.co.za";
  const apiKey = process.env.RESEND_API_KEY;

  // Without a mail provider configured the submission is logged so nothing is
  // lost in development. Set RESEND_API_KEY in Vercel to turn delivery on.
  if (!apiKey) {
    console.info("[contact] no RESEND_API_KEY set, logging submission:", {
      name,
      email,
      phone: body.phone,
      company: body.company,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "website@cheekymedia.co.za",
      to: [to],
      reply_to: email,
      subject: `Website enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        body.phone ? `Phone: ${body.phone}` : null,
        body.company ? `Company: ${body.company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[contact] delivery failed", await res.text());
    return NextResponse.json(
      { error: "We could not send that. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
