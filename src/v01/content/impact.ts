import type { ImpactPageContent } from "./impact.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Impact, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Impact-w1jf.dc.html.
 */
export const impact: ImpactPageContent = {
  header: siteHeader({ current: "Impact" }),
  footer: siteFooter(),
};
