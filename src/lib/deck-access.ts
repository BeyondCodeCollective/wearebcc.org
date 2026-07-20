/**
 * Identity for the partner decks.
 *
 * Replaces the old shared password. Each partner gets their own invite link,
 * created in /admin and sent by us. Opening it exchanges the invite for a
 * signed cookie carrying that person's viewer id, so a deck view can be
 * attributed to a named human.
 *
 * The cookie is verified in middleware before any /decks/* asset is served,
 * so it has to work on the edge runtime: everything here uses Web Crypto,
 * no node:crypto.
 */

export const DECK_SESSION_COOKIE = "bcc-deck-session";

/** How long a redeemed session lasts before the link must be opened again. */
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface DeckSession {
  /** deck_viewers.id */
  vid: number;
  email: string;
  /** Expiry, epoch ms. */
  exp: number;
}

function secret(): string {
  const s = process.env.DECK_SESSION_SECRET;
  if (!s) {
    // Fail closed. A missing secret must deny access, never fall back to a
    // predictable value: that is the bug we are removing from the old gate.
    throw new Error("DECK_SESSION_SECRET is not configured");
  }
  return s;
}

const enc = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(pad + "=".repeat((4 - (pad.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function hmac(data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return new Uint8Array(sig);
}

/** Constant-time compare so signature checking does not leak via timing. */
function safeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function signSession(session: DeckSession): Promise<string> {
  const body = b64urlEncode(enc.encode(JSON.stringify(session)));
  const sig = b64urlEncode(await hmac(body));
  return `${body}.${sig}`;
}

/** Returns the session, or null if the token is absent, forged, or expired. */
export async function verifySession(
  token: string | undefined,
): Promise<DeckSession | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  let expected: Uint8Array;
  try {
    expected = await hmac(body);
  } catch {
    // Missing secret. Deny.
    return null;
  }
  if (!safeEqual(b64urlDecode(sig), expected)) return null;

  try {
    const session = JSON.parse(new TextDecoder().decode(b64urlDecode(body)));
    if (typeof session?.vid !== "number" || typeof session?.email !== "string") {
      return null;
    }
    if (typeof session?.exp !== "number" || session.exp < Date.now()) return null;
    return session as DeckSession;
  } catch {
    return null;
  }
}

/**
 * Invite token: 32 bytes of CSPRNG, base64url. This is the secret in the
 * link we send a partner, so it has to be long enough that guessing is
 * hopeless. Only its hash is stored.
 */
export function generateInviteToken(): string {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return b64urlEncode(buf);
}

/** Invites are stored hashed, so a database leak does not hand out access. */
export async function hashInviteToken(token: string): Promise<string> {
  return b64urlEncode(await hmac(`invite:${token}`));
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
