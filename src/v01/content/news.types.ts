import type { ImageRef, LinkRef, SubscribeConfig, FormMessages, PageChrome } from "./types";

/** One post as the listing and article pages show it. Built from the real posts by content/newsPosts.ts. */
export type PostCard = {
  slug: string;
  href: string;
  /** ISO date, for the time element. */
  dateTime: string;
  /** Date as shown, for example "Oct 8, 2026". */
  dateLabel: string;
  category: string;
  title: string;
  excerpt: string;
  image: ImageRef;
};

export type BreadcrumbContent = { label: string; items: { label: string; href?: string }[] };

export type NewsPressContent = {
  headline: string;
  rows: { title: string; body: string; cta: LinkRef }[];
};

export type NewsletterContent = {
  headline: string[];
  label: string;
  placeholder: string;
  submit: string;
  subscribe: SubscribeConfig;
  messages: FormMessages;
};

/** Content for the News page. Its sections take these types as props and nothing else. */
export type NewsPageContent = PageChrome & {
  breadcrumb: BreadcrumbContent;
  featured: { cta: string };
  archive: {
    headline: string;
    filterLabel: string;
    allLabel: string;
    loadMore: string;
    /** Posts shown before "Load more", and added by each press of it. */
    pageSize: number;
  };
  press: NewsPressContent;
  newsletter: NewsletterContent;
  /** All published posts, newest first. The first is the featured one. */
  posts: PostCard[];
};
