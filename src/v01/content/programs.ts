import type { ProgramsPageContent } from "./programs.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Programs, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Programs-ybhi.dc.html.
 */
export const programs: ProgramsPageContent = {
  header: siteHeader({ current: "Programs" }),
  footer: siteFooter(),
};
