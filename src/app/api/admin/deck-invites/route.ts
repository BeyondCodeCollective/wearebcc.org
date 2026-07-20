import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureTables } from "@/lib/db";
import {
  EMAIL_REGEX,
  generateInviteToken,
  hashInviteToken,
  normalizeEmail,
} from "@/lib/deck-access";

function authed(request: NextRequest): boolean {
  const pw = request.nextUrl.searchParams.get("password");
  return !!process.env.DASHBOARD_PASSWORD && pw === process.env.DASHBOARD_PASSWORD;
}

/** List invites with how often each has been opened. */
export async function GET(request: NextRequest) {
  if (!authed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await ensureTables();
    const { rows } = await sql`
      SELECT id, name, email, organization, note, created_at,
             revoked_at, last_used_at, use_count
      FROM deck_invites ORDER BY created_at DESC LIMIT 500
    `;
    return NextResponse.json({ invites: rows });
  } catch (err) {
    console.error("deck-invites list failed", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/** Create an invite. The raw token is returned once, here, and never stored. */
export async function POST(request: NextRequest) {
  if (!authed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.DECK_SESSION_SECRET) {
    return NextResponse.json(
      { error: "DECK_SESSION_SECRET is not configured" },
      { status: 503 },
    );
  }

  let name = "";
  let email = "";
  let organization: string | null = null;
  let note: string | null = null;
  let to = "platform";
  try {
    const body = await request.json();
    name = typeof body?.name === "string" ? body.name.trim().slice(0, 200) : "";
    email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
    organization = body?.organization
      ? String(body.organization).trim().slice(0, 200)
      : null;
    note = body?.note ? String(body.note).trim().slice(0, 2000) : null;
    if (typeof body?.to === "string") to = body.to;
  } catch {
    // handled by validation below
  }

  if (!name || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "A name and a valid email are required" },
      { status: 400 },
    );
  }

  try {
    await ensureTables();
    const token = generateInviteToken();
    const tokenHash = await hashInviteToken(token);
    const { rows } = await sql`
      INSERT INTO deck_invites (token_hash, name, email, organization, note)
      VALUES (${tokenHash}, ${name}, ${email}, ${organization}, ${note})
      RETURNING id, created_at
    `;

    const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const url = `${origin}/invite/${token}?to=${encodeURIComponent(to)}`;

    return NextResponse.json({
      id: rows[0].id,
      name,
      email,
      organization,
      // Shown once. Only the hash is stored, so this cannot be recovered later.
      url,
    });
  } catch (err) {
    console.error("deck-invite create failed", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/** Revoke an invite. The link stops working immediately. */
export async function PATCH(request: NextRequest) {
  if (!authed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let id = 0;
  try {
    const body = await request.json();
    id = Number(body?.id) || 0;
  } catch {
    // handled below
  }
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  try {
    await ensureTables();
    await sql`UPDATE deck_invites SET revoked_at = NOW() WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("deck-invite revoke failed", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
