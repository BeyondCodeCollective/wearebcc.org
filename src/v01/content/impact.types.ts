import type { Breadcrumb, ReportContent } from "./about.types";
import type { ImageRef, LinkRef, LogoRef, PageChrome, Surface } from "./types";

export type ImpactHeroContent = {
  breadcrumb: Breadcrumb;
  /** One entry per line of the h1. The accented line is colored. */
  headline: { text: string; accent?: boolean }[];
  lede: string;
};

export type NetworkCaption = {
  title: string;
  body: string;
  tone: "cobalt" | "forest" | "ink";
};

export type NetworkContent = {
  /** Read out for the diagram as a whole. */
  ariaLabel: string;
  hub: { value: string; label: string };
  passed: { value: string; label: string };
  reach: { value: string; label: string };
  captions: [NetworkCaption, NetworkCaption, NetworkCaption];
};

export type StoryContent = {
  surface: Surface;
  image: ImageRef;
  /** Which side the photo sits on at desktop widths. */
  imageSide: "left" | "right";
  meta: string;
  title: string;
  body: string;
  stats?: string;
  link: LinkRef;
};

export type StoriesContent = {
  /** One entry per line of the h2. */
  headline: string[];
  lede: string;
  stories: StoryContent[];
};

export type QuoteSlide = { quote: string; caption: string };

export type QuotesContent = {
  groupLabel: string;
  dotsLabel: string;
  /** Builds the label for dot number n, counted from 1. */
  dotLabel: string;
  slides: QuoteSlide[];
};

export type FreePartnersContent = {
  /** One entry per line of the h2. */
  headline: string[];
  aside: { title: string; note: string };
  partners: ({ logo: LogoRef } | { name: string })[];
};

/** Content for the Impact page. Its sections take these types as props and nothing else. */
export type ImpactPageContent = PageChrome & {
  hero: ImpactHeroContent;
  network: NetworkContent;
  stories: StoriesContent;
  quotes: QuotesContent;
  report: ReportContent;
  partners: FreePartnersContent;
};
