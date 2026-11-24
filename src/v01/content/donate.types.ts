import type { ImageRef, LinkRef, PageChrome, StickerRef } from "./types";

/** One paragraph of an expandable row: running text with optional links, or fixed lines. */
export type WayParagraph = { text: (string | LinkRef)[] } | { lines: string[] };

export type Way =
  | { kind: "link"; title: string; body: string; link: LinkRef }
  | { kind: "details"; title: string; paragraphs: WayParagraph[] };

/** Content for the Donate page. Its sections take these types as props and nothing else. */
export type DonatePageContent = PageChrome & {
  give: {
    breadcrumb: { home: LinkRef; current: string; ariaLabel: string };
    /** First line, then the line set in the accent colour. */
    headline: [string, string];
    tagline: string;
    /** Paragraphs, in order. */
    body: string[];
    trust: string;
    /** Opens the live Donorbox page in a new tab. */
    fallback: LinkRef;
    donorbox: { campaign: string; scriptSrc: string; ariaLabel: string };
  };
  statement: {
    segments: { text: string; tone?: "cobalt" | "forest" }[];
    sticker: StickerRef;
  };
  video: {
    href: string;
    ariaLabel: string;
    image: ImageRef;
    headline: string[];
    label: string;
  };
  ways: { headline: string[]; items: Way[] };
  questions: { headline: string; items: { question: string; answer: string }[] };
};
