import { NextResponse } from "next/server";

// Simple shared password for the partner portal. Set PARTNER_PORTAL_PASSWORD
// in Vercel to rotate it without a deploy of new code.
const FALLBACK_PASSWORD = "BCCPartners2026";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through with empty password
  }

  const expected = process.env.PARTNER_PORTAL_PASSWORD || FALLBACK_PASSWORD;
  if (password === expected) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
