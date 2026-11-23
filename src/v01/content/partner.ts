import type { PartnerPageContent } from "./partner.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Partner, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Partner-7sg4.dc.html.
 */
export const partner: PartnerPageContent = {
  header: siteHeader({ current: "Hire & partner", spanishHref: "/es/partners" }),
  footer: siteFooter(),
};
