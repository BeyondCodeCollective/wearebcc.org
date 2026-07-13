import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match everything except API routes, Next internals, and files with an
  // extension, so bare paths like /partners or /code-along get a locale.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
