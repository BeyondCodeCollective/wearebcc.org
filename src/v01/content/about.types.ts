import type { ImageRef, LinkRef, PageChrome, Surface } from "./types";

export type Breadcrumb = { homeLabel: string; homeHref: string; current: string };

export type AboutHeroContent = {
  breadcrumb: Breadcrumb;
  /** One entry per line of the h1. */
  headline: string[];
  lede: string;
  mission: { label: string; body: string };
  link: LinkRef;
  /** Four photos, in the order of the collage slots. */
  photos: [ImageRef, ImageRef, ImageRef, ImageRef];
};

export type FounderContent = {
  ariaLabel: string;
  label: string;
  aside: string;
  image: ImageRef;
  quote: string;
  name: string;
  role: string;
};

export type WhatWeDoCard = {
  surface: Surface;
  image: ImageRef;
  title: string;
  number: string;
  body: string;
  links: LinkRef[];
};

export type WhatWeDoContent = {
  /** One entry per line of the h2. */
  headline: string[];
  lede: string;
  cards: WhatWeDoCard[];
};

export type WhyHereContent = {
  label: string;
  statement: { before: string; highlight: string; after: string };
  columns: { title: string; body: string }[];
  image: ImageRef;
  badge: { title: string; note: string };
};

export type TeamTone = "peach-warm" | "lemon" | "forest" | "cream" | "crimson";

export type TeamMember = {
  name: string;
  role: string;
  /** LinkedIn profile. */
  href: string;
  linkLabel: string;
  image: ImageRef;
  tone: TeamTone;
  /** Tilt of the flyer at rest, in degrees. */
  tilt: number;
};

export type TeamContent = {
  id: string;
  headline: string;
  listLabel: string;
  prevLabel: string;
  nextLabel: string;
  members: TeamMember[];
};

export type BoardContent = {
  id: string;
  headline: string;
  members: { name: string; role: string }[];
};

export type CouncilContent = {
  headline: string;
  lede: string;
  members: { name: string; affiliation: string }[];
};

export type ReportContent = {
  id: string;
  coverTop: string;
  /** One entry per line of the cover title. */
  coverTitle: string[];
  coverBottom: string;
  headline: string;
  paragraphs: string[];
  /** Adds a blank line between the paragraphs. */
  spaced?: boolean;
  cta: LinkRef;
};

export type BuildWithUsContent = {
  headline: string;
  actions: { label: string; href: string; variant: "ink" | "ghost" }[];
};

/** Content for the About page. Its sections take these types as props and nothing else. */
export type AboutPageContent = PageChrome & {
  hero: AboutHeroContent;
  founder: FounderContent;
  whatWeDo: WhatWeDoContent;
  whyHere: WhyHereContent;
  team: TeamContent;
  board: BoardContent;
  council: CouncilContent;
  report: ReportContent;
  build: BuildWithUsContent;
};
