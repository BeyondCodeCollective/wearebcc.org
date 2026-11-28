import type { SimplePageContent } from "./simple.types";
import { articleRoute, routes, signupFor, siteFooter, siteHeader } from "./site";

/**
 * Beyond the Music, v0.1. NOT IN DESIGN: the design has no page for this program,
 * and its links opened a dated news post (run 6, 2026-11-27).
 * Every fact is from that post (beyond-the-music, 2026-11-22). The post gives no
 * dates and no way to apply for a next cohort, so the page says so.
 */
export const beyondTheMusic: SimplePageContent = {
  header: siteHeader({ current: "Programs" }),
  footer: siteFooter(),
  hero: {
    breadcrumb: { ariaLabel: "Breadcrumb", home: { label: "Home", href: routes.home }, current: "Beyond the Music" },
    headline: ["Beyond", "the Music."],
    lede: "AI education for the people who power entertainment, so they can grow their careers and help shape the technology instead of being shaped by it.",
  },
  actions: [
    { label: "Tell me when the next cohort opens", href: signupFor("beyond-the-music"), variant: "ink" },
    { label: "Read the announcement", href: articleRoute("beyond-the-music"), variant: "ghost" },
  ],
  image: {
    src: "/images/news/beyond-the-music.jpg",
    alt: "Jerry Clark, Expert in Residence for Beyond the Music, smiling in a classroom",
    position: "center 25%",
  },
  sections: [
    {
      headline: ["The", "program."],
      items: [
        {
          kind: "text",
          title: "Who it’s for",
          body: "Artists, creatives and executives: the people who make the music, run labels, manage artists, build audiences and produce shows. Nobody needs to become an engineer.",
        },
        {
          kind: "link",
          title: "What you learn",
          body: "Learners take Beyond Ready, our applied AI program, along with modules tailored to the music industry.",
          link: { label: "See Beyond Ready", href: routes.beyondReady },
        },
        {
          kind: "text",
          title: "Who leads it",
          body: "Jerry Clark, known to many as “Legendary Jerry,” is our Expert in Residence and helped design the program. He is an award-winning Atlanta executive with 30+ years in the business, including VP of Promotions roles at SRC/Universal and Island Def Jam.",
        },
        {
          kind: "link",
          title: "Where and when",
          body: "The first cohort is an Atlanta-based group of music and culture leaders. Dates for the next cohort are still to be announced.",
          link: { label: "Tell me when it opens", href: signupFor("beyond-the-music") },
        },
      ],
    },
    {
      headline: ["Start", "today."],
      items: [
        {
          kind: "link",
          title: "Code Along Beyond: Music",
          body: "Free on YouTube. Build your own music playlist app, step by step, with hosts who code alongside you.",
          link: { label: "Watch Code Along", href: routes.codeAlong },
        },
        {
          kind: "link",
          title: "Live sessions",
          body: "Online workshops and conversations, always at no cost to you.",
          link: { label: "See what’s upcoming", href: routes.events },
        },
      ],
    },
  ],
  closing: { headline: "In sports instead? Beyond the Game is built for athletes.", cta: { label: "Explore Beyond the Game", href: routes.beyondTheGame } },
};
