import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Partner-only static decks: require the gate cookie set by
  // /api/partner-gate, otherwise bounce to the gated viewer page.
  if (request.nextUrl.pathname.startsWith("/decks/")) {
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
  ],
};
