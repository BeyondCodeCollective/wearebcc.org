import type { LinkRef, PageChrome, SignupContent, Surface } from "./types";

/** Content for the Signup page. Its sections take these types as props and nothing else. */
export type SignupPageContent = PageChrome & {
  breadcrumb: { home: LinkRef; current: string; ariaLabel: string };
  /** The sentence form. Same shape as the one on Home. */
  form: SignupContent;
  next: {
    headline: string;
    steps: { title: string; body: string }[];
  };
  tiles: {
    /** The headline, one entry per line. */
    lines: string[];
    link: LinkRef;
    surface: Extract<Surface, "cobalt" | "forest">;
  }[];
};
