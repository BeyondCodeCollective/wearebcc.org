import { NextResponse } from "next/server";

/**
 * Gate for the Beyond Code overview at /beyond-overview.
 *
 * Its own password and its own cookie, deliberately separate from the partner
 * deck gate: the overview goes to a wider audience, so unlocking it must not
 * hand anyone the partner decks as well.
 *
 * Set BEYOND_OVERVIEW_PASSWORD in Vercel to rotate without a deploy. The
 * fallback below exists so the page works the moment it ships, and it is the
 * password that was shared with the team.
 */
const FALLBACK_PASSWORD = "BeyondPartner26";

export const OVERVIEW_COOKIE = "bcc-overview-gate";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through with an empty password
  }

  const expected = process.env.BEYOND_OVERVIEW_PASSWORD || FALLBACK_PASSWORD;

  // Case-insensitive and trimmed: this gets read off a phone screen and typed
  // by hand, and a capital letter is not the security boundary here.
  if (password.trim().toLowerCase() === expected.toLowerCase()) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(OVERVIEW_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
