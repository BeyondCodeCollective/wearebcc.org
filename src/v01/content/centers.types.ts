import type { BreadcrumbItem } from "./programs.types";
import type { FormMessages, ImageRef, LinkRef, PageChrome, StickerRef, SubscribeConfig } from "./types";

export type CentersHeroContent = {
  breadcrumb: BreadcrumbItem[];
  headline: { text: string; highlight?: boolean }[];
  lede: string;
  primary: LinkRef;
  secondary: LinkRef;
  sticker: StickerRef;
};

export type CenterCity = {
  name: string;
  /** Open cities are set solid, coming ones in outline. */
  status: "open" | "soon";
  statusLabel: string;
};

export type CentersLocationsContent = { headline: string; cities: CenterCity[] };

export type CenterStrip = {
  title: string;
  text: string;
  image: ImageRef;
  /** Extra zoom the design applied to this crop. */
  zoom?: number;
};

export type CentersInsideContent = {
  headline: string[];
  promise: { title: string; note: string };
  stripsLabel: string;
  strips: CenterStrip[];
};

export type CentersStatsContent = {
  stats: { value: string; text: string; surface: "cobalt" | "lemon" }[];
};

export type CentersQuoteContent = { image: ImageRef; text: string; attribution: string };

export type CentersJoinContent = {
  id: string;
  sticker: StickerRef;
  headline: string[];
  body: string;
  email: { label: string; placeholder: string };
  want: { label: string; options: string[] };
  zip: { label: string; placeholder: string };
  submit: string;
  subscribe: SubscribeConfig;
  messages: FormMessages;
};

export type CentersBringContent = { headline: string; cta: LinkRef };

/** Content for the Centers page. Its sections take these types as props and nothing else. */
export type CentersPageContent = PageChrome & {
  hero: CentersHeroContent;
  locations: CentersLocationsContent;
  inside: CentersInsideContent;
  stats: CentersStatsContent;
  quote: CentersQuoteContent;
  join: CentersJoinContent;
  bring: CentersBringContent;
};
