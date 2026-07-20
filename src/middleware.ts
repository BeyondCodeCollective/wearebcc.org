import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { DECK_SESSION_COOKIE, verifySession } from "./lib/deck-access";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Partner-only static decks: require a valid signed session from
  // /api/deck-access/verify, otherwise bounce to the gated viewer page.
  if (request.nextUrl.pathname.startsWith("/decks/")) {
    const token = request.cookies.get(DECK_SESSION_COOKIE)?.value;
    if (await verifySession(token)) {
      return NextResponse.next();
    }
    // Bounce to the viewer page that fronts this deck, so the gate a visitor
    // lands on matches the deck they asked for.
    const slug = request.nextUrl.pathname
      .replace("/decks/", "")
      .replace(/\.html$/, "");
    return NextResponse.redirect(new URL(`/${slug}`, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  // Match everything except API routes, Next internals, and files with an
  // extension, so bare paths like /partners or /code-along get a locale.
  // /decks/:path* is matched explicitly (despite the extension) so the
  // deck session check above runs for gated static decks.
  // icon/apple-icon are Next's extensionless metadata routes — the intl
  // redirect must not touch them or the favicon 404s on every page.
  matcher: [
    "/((?!api|_next|_vercel|icon|apple-icon|.*\\..*).*)",
    "/decks/:path*",
  ],
};
