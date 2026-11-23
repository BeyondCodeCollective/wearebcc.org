import type { BeyondTheGamePageContent } from "./beyondTheGame.types";
import { siteFooter, siteHeader } from "./site";

/**
 * BeyondTheGame, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-BeyondTheGame-ttzv.dc.html.
 */
export const beyondTheGame: BeyondTheGamePageContent = {
  header: siteHeader({ current: "Programs", spanishHref: "/es/beyond-the-game" }),
  footer: siteFooter(),
};
