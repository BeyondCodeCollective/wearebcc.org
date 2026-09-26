import { NextResponse } from "next/server";

// Board-only gate. Separate from the partner portal on purpose: partners must
// not be able to open board reports. Set BOARD_PASSWORD in Vercel; with no
// env var set the gate stays locked.
export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through with empty password
  }

  const expected = process.env.BOARD_PASSWORD;
  if (expected && password === expected) {
    const res = NextResponse.json({ ok: true });
    // Session cookie so the gated deck files under /decks/board/ can be served
    // by the middleware without re-prompting.
    res.cookies.set("bcc-board-gate", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
