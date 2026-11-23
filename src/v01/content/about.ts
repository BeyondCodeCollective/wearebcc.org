import type { AboutPageContent } from "./about.types";
import { siteFooter, siteHeader } from "./site";

/**
 * About, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-About-yep3.dc.html.
 */
export const about: AboutPageContent = {
  header: siteHeader({ current: "About" }),
  footer: siteFooter(),
};
