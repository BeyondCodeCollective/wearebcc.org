import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const BTG_DECK = "/decks/beyond-the-game_2026-08.html";

// Decks that are shareable with no gate at all. Everything else under /decks
// is partner-only. Add a path here ONLY when the deck is cleared to be public:
// there is no second check behind this, and no gate page fronting it.
const UNGATED_DECKS = new Set([BTG_DECK]);

export default function middleware(request: NextRequest) {
  // The Beyond the Game deck is shared as /beyond-the-game-deck. Rewritten, not
  // redirected, so the clean path is what stays in the address bar. Handled here
  // rather than in next.config because middleware runs before config rewrites,
  // so the intl locale redirect would otherwise claim the path first.
  const bare = request.nextUrl.pathname.replace(/^\/(en|es)(?=\/|$)/, "");
  if (bare === "/beyond-the-game-deck") {
    return NextResponse.rewrite(new URL(BTG_DECK, request.url));
  }
  // The six month impact report is a public static page, shared as /impact-report.
  if (bare === "/impact-report") {
    return NextResponse.rewrite(new URL("/impact-report.html", request.url));
  }
  // The dated path the filename used to imply, for links already sent.
  if (bare === "/beyond-the-game_2026-08") {
    return NextResponse.redirect(new URL("/beyond-the-game-deck", request.url));
  }

  // Partner-only static decks: require the gate cookie set by
  // /api/partner-gate, otherwise bounce to the gated viewer page.
  // Board reports have their own gate: the partner cookie must never open them.
  if (request.nextUrl.pathname.startsWith("/decks/board/")) {
    if (request.cookies.get("bcc-board-gate")?.value === "1") {
      return NextResponse.next();
    }
    const deck = request.nextUrl.pathname.split("/")[3] ?? "";
    return NextResponse.redirect(new URL(`/board/${deck}`, request.url));
  }
  if (request.nextUrl.pathname.startsWith("/decks/")) {
    if (UNGATED_DECKS.has(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    if (request.cookies.get("bcc-partner-gate")?.value === "1") {
      return NextResponse.next();
    }
    // Bounce to the viewer page that fronts this deck, so the gate a visitor
    // lands on matches the deck they asked for.
    const slug = request.nextUrl.pathname
      .replace("/decks/", "")
      .replace(/\.html$/, "");
    return NextResponse.redirect(new URL(`/${slug}`, request.url));
  }
  // The overview PDF: same idea, separate cookie, so the wider overview
  // audience does not also get the partner decks.
  if (request.nextUrl.pathname.startsWith("/overview/")) {
    if (request.cookies.get("bcc-overview-gate")?.value === "1") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/beyond-overview", request.url));
  }

  // Serve English at "/" with a 200 instead of a 307 to /en. Ad platforms and
  // crawlers treat a redirecting landing URL as a destination mismatch, and
  // Google Ad Grants disallow a submitted domain that redirects. /en stays the
  // canonical URL (see page metadata), so this is not duplicate content. A
  // visitor who has already chosen Spanish (NEXT_LOCALE cookie) still goes
  // through the intl middleware and lands on /es.
  if (
    request.nextUrl.pathname === "/" &&
    request.cookies.get("NEXT_LOCALE")?.value !== "es"
  ) {
    return NextResponse.rewrite(new URL("/en", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Match everything except API routes, Next internals, and files with an
  // extension, so bare paths like /partners or /code-along get a locale.
  // /decks/:path* is matched explicitly (despite the extension) so the
  // partner-gate cookie check above runs for gated static decks.
  // icon/apple-icon are Next's extensionless metadata routes — the intl
  // redirect must not touch them or the favicon 404s on every page.
  matcher: [
    "/((?!api|_next|_vercel|icon|apple-icon|.*\\..*).*)",
    "/decks/:path*",
    // Matched explicitly despite the extension, so the cookie check above runs
    // before the PDF is served.
    "/overview/:path*",
  ],
};
