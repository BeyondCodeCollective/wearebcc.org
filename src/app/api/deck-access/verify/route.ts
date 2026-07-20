import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureTables } from "@/lib/db";
import {
  DECK_SESSION_COOKIE,
  EMAIL_REGEX,
  MAX_CODE_ATTEMPTS,
  SESSION_TTL_MS,
  hashCode,
  normalizeEmail,
  signSession,
} from "@/lib/deck-access";

export async function POST(request: Request) {
  let email = "";
  let code = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
    code = typeof body?.code === "string" ? body.code.trim() : "";
  } catch {
    // fall through, handled by the validation below
  }

  if (!EMAIL_REGEX.test(email) || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (!process.env.DECK_SESSION_SECRET) {
    console.error("deck-access/verify: DECK_SESSION_SECRET is not set");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  try {
    await ensureTables();

    const { rows } = await sql`
      SELECT id, code_hash, attempts FROM deck_access_codes
      WHERE email = ${email}
        AND consumed_at IS NULL
        AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const row = rows[0];
    if (!row) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
    }

    if (row.attempts >= MAX_CODE_ATTEMPTS) {
      await sql`UPDATE deck_access_codes SET consumed_at = NOW() WHERE id = ${row.id}`;
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
    }

    if ((await hashCode(email, code)) !== row.code_hash) {
      await sql`UPDATE deck_access_codes SET attempts = attempts + 1 WHERE id = ${row.id}`;
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
    }

    await sql`UPDATE deck_access_codes SET consumed_at = NOW() WHERE id = ${row.id}`;

    const { rows: viewers } = await sql`
      INSERT INTO deck_viewers (email) VALUES (${email})
      ON CONFLICT (email) DO UPDATE SET last_seen_at = NOW()
      RETURNING id
    `;
    const vid = viewers[0].id as number;

    const token = await signSession({
      vid,
      email,
      exp: Date.now() + SESSION_TTL_MS,
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(DECK_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    });
    return res;
  } catch (err) {
    console.error("deck-access/verify failed", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
