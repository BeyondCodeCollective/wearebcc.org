import type { FormMessages, ImageRef, LinkRef, PageChrome, SubscribeConfig } from "./types";

/** Text with an optional highlighted run, for headlines that mark a word. */
export type MarkedText = { text: string; mark?: boolean }[];

export type CodeAlongHeroContent = {
  breadcrumbLabel: string;
  breadcrumb: { label: string; href?: string }[];
  badge: string;
  logo: { src: string; alt: string; size: number };
  headline: MarkedText;
  credit: string;
  /** The phrase in the credit that is set loudest. */
  creditEmphasis: string;
  /** Two paragraphs: the design separates them with a blank line. */
  lede: string[];
  primaryCta: LinkRef;
  secondaryCta: LinkRef;
  still: ImageRef;
};

export type NowStreamingContent = {
  badge: string;
  headline: string;
  playLabel: string;
  playHref: string;
  image: ImageRef;
  cta: LinkRef;
};

export type StatContent = { badge: string; value: string; caption: string };

export type EpisodeContent = {
  id: string;
  badge: string;
  title: string;
  href: string;
  watch: string;
  image: ImageRef;
};

export type EpisodesContent = {
  badge: string;
  headline: string;
  lede: string;
  episodes: EpisodeContent[];
};

export type CodeToken = { text: string; kind?: "comment" | "keyword" | "string" };

export type AboutShowContent = {
  badge: string;
  headline: MarkedText;
  body: string[];
  cta: LinkRef;
  codeLabel: string;
  /** One array of tokens per line of the sample. */
  code: CodeToken[][];
};

export type HostContent = { name: string; role: string; image: ImageRef };

export type HostsContent = {
  badge: string;
  headline: string;
  lede: string;
  hosts: HostContent[];
};

export type TeachContent = {
  badge: string;
  headline: MarkedText;
  lede: string;
  cta: LinkRef;
};

export type BeFirstContent = {
  badge: string;
  headline: string;
  lede: string;
  label: string;
  placeholder: string;
  submit: string;
  fine: string;
  /** The phrase in the fine print that is set heavier. */
  fineEmphasis: string;
  subscribe: SubscribeConfig;
  messages: FormMessages;
};

/** Content for the CodeAlong page. Its sections take these types as props and nothing else. */
export type CodeAlongPageContent = PageChrome & {
  hero: CodeAlongHeroContent;
  streaming: NowStreamingContent;
  stat: StatContent;
  episodes: EpisodesContent;
  about: AboutShowContent;
  hosts: HostsContent;
  teach: TeachContent;
  beFirst: BeFirstContent;
};
