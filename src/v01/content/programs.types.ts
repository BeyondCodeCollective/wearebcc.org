import type { LinkRef, PageChrome } from "./types";

export type BreadcrumbItem = { label: string; href?: string };

export type ProgramRowContent = {
  /** The sentence a learner would say about themselves. */
  line: string;
  name: string;
  /** Colour of the dot before the name: the program's family. */
  dot: "cobalt" | "forest" | "crimson";
  summary: string;
  tags: string[];
  cta: LinkRef;
};

export type ProgramsIntroContent = {
  breadcrumb: BreadcrumbItem[];
  headline: { text: string; highlight?: boolean }[];
  lede: string;
  promise: { title: string; note: string };
};

export type ProgramsStillUnsureContent = { headline: string; cta: LinkRef };

/** Content for the Programs page. Its sections take these types as props and nothing else. */
export type ProgramsPageContent = PageChrome & {
  intro: ProgramsIntroContent;
  programs: { ariaLabel: string; rows: ProgramRowContent[] };
  unsure: ProgramsStillUnsureContent;
};
