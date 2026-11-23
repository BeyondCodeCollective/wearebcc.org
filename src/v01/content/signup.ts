import type { SignupPageContent } from "./signup.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Signup, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Signup-zdvm.dc.html.
 */
export const signup: SignupPageContent = {
  header: siteHeader(),
  footer: siteFooter(),
};
