import type { EventsPageContent } from "./events.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Events, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Events-u237.dc.html.
 */
export const events: EventsPageContent = {
  header: siteHeader({ current: "Events" }),
  footer: siteFooter(),
};
