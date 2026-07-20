import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureTables } from "@/lib/db";
import {
  DECK_SESSION_COOKIE,
  SESSION_TTL_MS,
  hashInviteToken,
  signSession,
} from "@/lib/deck-access";

/** Decks a link may drop someone into. Keeps `to` from becoming an open redirect. */
const DESTINATIONS: Record<string, string> = {
  platform: "/en/platform",
  "rancho-cordova": "/en/rancho-cordova",
  partners: "/en/partners",
};
const DEFAULT_DESTINATION = "/en/platform";

/**
 * Opening a partner's invite link exchanges it for a signed session cookie,
 * then forwards to the deck. The link is reusable until revoked so the same
 * person can come back on another device.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const to = request.nextUrl.searchParams.get("to");
  const destination =
    (to && DESTINATIONS[to]) || DEFAULT_DESTINATION;

  const deny = (reason: string) =>
    NextResponse.redirect(
      new URL(`${DEFAULT_DESTINATION}?invite=${reason}`, request.url),
    );

  if (!token || token.length > 128) return deny("invalid");
  if (!process.env.DECK_SESSION_SECRET) {
    console.error("invite: DECK_SESSION_SECRET is not set");
    return deny("unavailable");
  }

  try {
    await ensureTables();

    const tokenHash = await hashInviteToken(token);
    const { rows } = await sql`
      SELECT id, name, email, organization, revoked_at
      FROM deck_invites WHERE token_hash = ${tokenHash}
      LIMIT 1
    `;
    const invite = rows[0];
    if (!invite || invite.revoked_at) return deny("invalid");

    const { rows: viewers } = await sql`
      INSERT INTO deck_viewers (email, name, organization, invite_id)
      VALUES (${invite.email}, ${invite.name}, ${invite.organization}, ${invite.id})
      ON CONFLICT (email) DO UPDATE SET
        last_seen_at = NOW(),
        name = EXCLUDED.name,
        organization = EXCLUDED.organization,
        invite_id = EXCLUDED.invite_id
      RETURNING id
    `;

    await sql`
      UPDATE deck_invites
      SET use_count = use_count + 1, last_used_at = NOW()
      WHERE id = ${invite.id}
    `;

    const sessionToken = await signSession({
      vid: viewers[0].id as number,
      email: invite.email as string,
      exp: Date.now() + SESSION_TTL_MS,
    });

    const res = NextResponse.redirect(new URL(destination, request.url));
    res.cookies.set(DECK_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    });
    return res;
  } catch (err) {
    console.error("invite redeem failed", err);
    return deny("error");
  }
}
