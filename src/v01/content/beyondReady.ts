import type { BeyondReadyPageContent } from "./beyondReady.types";
import { siteFooter, siteHeader } from "./site";

/**
 * BeyondReady, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-BeyondReady-nflv.dc.html.
 */
export const beyondReady: BeyondReadyPageContent = {
  header: siteHeader({ current: "Programs", spanishHref: "/es/field-ready" }),
  footer: siteFooter(),
};
