import type { WaysContent } from "./donate.types";
import type { ImageRef, LinkRef, PageChrome, Surface } from "./types";

/**
 * A plain information page: a headline, one or two buttons, then ruled rows.
 * Volunteer, Contact and Beyond the Music use it.
 */
export type SimplePageContent = PageChrome & {
  hero: {
    breadcrumb: { home: LinkRef; current: string; ariaLabel: string };
    /** One entry per line. The last line is set in the accent colour. */
    headline: string[];
    lede: string;
  };
  actions?: (LinkRef & { variant: "ink" | "ghost" })[];
  /** A real photo under the headline. */
  image?: ImageRef;
  sections: (WaysContent & { surface?: Surface })[];
  closing: { headline: string; cta: LinkRef };
};
