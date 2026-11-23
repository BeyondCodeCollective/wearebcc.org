import type { CentersPageContent } from "./centers.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Centers, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Centers-e17q.dc.html.
 */
export const centers: CentersPageContent = {
  header: siteHeader({ spanishHref: "/es/beyond-code-centers" }),
  footer: siteFooter(),
};
