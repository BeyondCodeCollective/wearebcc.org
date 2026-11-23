import type { CodeAlongPageContent } from "./codeAlong.types";
import { siteFooter, siteHeader } from "./site";

/**
 * CodeAlong, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-CodeAlong-90o1.dc.html.
 */
export const codeAlong: CodeAlongPageContent = {
  header: siteHeader({ spanishHref: "/es/code-along" }),
  footer: siteFooter(),
};
