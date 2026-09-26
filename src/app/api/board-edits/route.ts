import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put, list } from "@vercel/blob";

/**
 * Live text edits for board report decks. The deck HTML stays static; edits
 * are stored as one JSON map per deck ({ key: { html, by, at } }) in Blob and
 * applied on load, so the CEO and team can edit in the browser without a
 * deploy. Reading needs the board cookie; writing also needs the edit code
 * (BOARD_EDIT_PASSWORD), so board members can view but not change it.
 */

type Edit = { html: string; by: string; at: string };
type Edits = Record<string, Edit>;

const DECK_RE = /^[a-z0-9-]{1,40}$/;
const pathFor = (deck: string) => `board-edits/${deck}.json`;

async function hasBoardCookie() {
  return (await cookies()).get("bcc-board-gate")?.value === "1";
}

async function readEdits(deck: string): Promise<Edits> {
  const { blobs } = await list({ prefix: pathFor(deck), limit: 1 });
  if (!blobs.length) return {};
  const res = await fetch(`${blobs[0].url}?t=${Date.now()}`, { cache: "no-store" });
  return res.ok ? ((await res.json()) as Edits) : {};
}

export async function GET(request: Request) {
  if (!(await hasBoardCookie())) return NextResponse.json({ ok: false }, { status: 401 });
  const deck = new URL(request.url).searchParams.get("deck") ?? "";
  if (!DECK_RE.test(deck)) return NextResponse.json({ ok: false }, { status: 400 });
  return NextResponse.json({ ok: true, edits: await readEdits(deck) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await hasBoardCookie())) return NextResponse.json({ ok: false }, { status: 401 });
  const key = process.env.BOARD_EDIT_PASSWORD;
  if (!key || request.headers.get("x-edit-key") !== key) {
    return NextResponse.json({ ok: false, error: "edit code" }, { status: 403 });
  }

  let body: { deck?: string; changes?: Record<string, string>; by?: string; reset?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const deck = body.deck ?? "";
  if (!DECK_RE.test(deck)) return NextResponse.json({ ok: false }, { status: 400 });

  const by = (body.by ?? "").toString().slice(0, 60) || "Someone";
  const at = new Date().toISOString();
  const edits = await readEdits(deck);
  for (const [k, html] of Object.entries(body.changes ?? {})) {
    if (typeof html !== "string" || k.length > 80 || html.length > 20000) continue;
    edits[k] = { html, by, at };
  }
  for (const k of body.reset ?? []) delete edits[k];

  await put(pathFor(deck), JSON.stringify(edits), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
  return NextResponse.json({ ok: true, edits });
}
