import type { DonatePageContent } from "./donate.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Donate, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Donate-wdd7.dc.html.
 */
export const donate: DonatePageContent = {
  header: siteHeader({ spanishHref: "/es/donate" }),
  footer: siteFooter(),
};
