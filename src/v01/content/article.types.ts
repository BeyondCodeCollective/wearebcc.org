import type { NewsInline } from "@/lib/news";
import type { PageChrome } from "./types";
import type { BreadcrumbContent, PostCard } from "./news.types";

export type ArticleLink = { label: string; description?: string; href: string; external: boolean };

/** Content for the Article page. Its sections take these types as props and nothing else. */
export type ArticlePageContent = PageChrome & {
  breadcrumb: BreadcrumbContent;
  post: PostCard & {
    /** For example "3 min read". */
    readTime: string;
    author?: string;
    /** Each paragraph as runs of text and links. */
    paragraphs: NewsInline[][];
    /** Link list and external link from the post, in that order. */
    links: ArticleLink[];
  };
  share: {
    label: string;
    linkedin: { label: string; href: string };
    instagram: { label: string; href: string };
    copy: { label: string; copied: string; url: string };
  };
  /** The post's film. When a post has one, its card takes the place of the closing card. */
  video?: {
    src: string;
    poster: string;
    headline: string[];
    body: string;
    play: { label: string; ariaLabel: string };
    cta: { label: string; href: string };
  };
  closing: {
    headline: string[];
    body: string;
    cta: { label: string; href: string };
    image?: PostCard["image"];
  };
  more: { headline: string; posts: PostCard[] };
};
