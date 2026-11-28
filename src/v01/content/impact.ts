import type { ImpactPageContent } from "./impact.types";
import { routes, siteFooter, siteHeader } from "./site";

const IMG = "/images/v01";

/**
 * Impact, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Impact-w1jf.dc.html.
 *
 * One typo in the design is corrected: "steos" in the Beyond the Game story reads "steps".
 * The stories carry months ("Mar–Aug 2026", "Sep–Oct 2026") as plain text. They are not events and
 * nothing hides after them, but the dates are not confirmed.
 *
 * HIDDEN, design notes: "MICA TO REVISIT OPENER COPY", "MICA TO REVISIT NUMBERS", "NEEEDS NEW PHOTOS",
 * "MICA TO REVISIT - DIFFERENT STORY HERE", "MICA TO REVISIT - ADD 2 QUOTES", the "Sources: [6-Month
 * Report, Sep 2026] · [Program records]" line, quote slides 2 and 3 ("[Learner quote to add.]",
 * "[Name] · [Program]") and the "[Partner logo]" tile.
 */
export const impact: ImpactPageContent = {
  header: siteHeader({ current: "Impact" }),
  footer: siteFooter(),

  hero: {
    breadcrumb: { homeLabel: "Home", homeHref: routes.home, current: "Impact" },
    headline: [{ text: "Free seats." }, { text: "Real skills." }, { text: "Passed on.", accent: true }],
    lede: "In eight months, Beyond Code opened its doors to 510+ learners. Here is how far that went.",
  },

  network: {
    ariaLabel:
      "Impact as a network: 510 learners at the center, 100 percent of Center learners passing it on, 2.3 million views reaching further",
    hub: { value: "510+", label: "learners" },
    passed: { value: "100%", label: "passed it on" },
    reach: { value: "2.3M", label: "views in month one" },
    captions: [
      {
        title: "They came in.",
        body: "510+ learners took a free seat in our first eight months, across Beyond Centers, Beyond Labs and Beyond the Game.",
        tone: "cobalt",
      },
      {
        title: "They passed it on.",
        body: "Every Beyond Centers learner in Atlanta taught what they learned to someone else.",
        tone: "forest",
      },
      {
        title: "It reached further.",
        body: "Code Along Beyond drew 2.3M views in its first month, and 9M+ since.",
        tone: "ink",
      },
    ],
  },

  stories: {
    headline: ["Three groups,", "one story."],
    lede: "Nobody here learns alone. These are the rooms, cohorts and seasons behind the numbers.",
    stories: [
      {
        surface: "forest",
        image: { src: `${IMG}/video-thumb.jpg`, alt: "" },
        imageSide: "left",
        meta: "Beyond the Game · Cohort 1",
        title: "The Beyond the Game cohort",
        body: "A group of athletes leaving their sport took their first steps into tech. Kleon Penn passed CompTIA Tech+ on his first try; Carla Cortijo Sánchez built an app using AI; the cohort’s head, Ramon Clemente, earned two IT certifications alongside them.",
        link: { label: "See Beyond the Game", href: routes.beyondTheGame },
      },
      {
        surface: "cobalt",
        image: { src: `${IMG}/smiling-group.jpg`, alt: "" },
        imageSide: "right",
        meta: "Beyond Centers · Atlanta · Mar–Aug 2026",
        title: "A room in Atlanta",
        body: "A group of school youth, with little to no tech backgrounds, joined a nine-week program to learn AI fundamentals and gain entrepreneurship skills. Every one of them went home and taught someone else.",
        stats: "100% taught someone else · 80% more confident with technology",
        link: { label: "Visit Beyond Centers", href: routes.centers },
      },
      {
        surface: "crimson",
        image: { src: `${IMG}/headphones.jpg`, alt: "" },
        imageSide: "left",
        meta: "Code Along Beyond: Music · Sep–Oct 2026",
        title: "A season of builders",
        body: "Four episodes, one playlist app, and a generation of first-time builders coding along from home.",
        stats: "2.3M views in month one · 9M+ total views · 150K+ subscribers",
        link: { label: "Watch the season", href: routes.codeAlong },
      },
    ],
  },

  quotes: {
    groupLabel: "Learner quotes",
    dotsLabel: "Choose a quote",
    dotLabel: "Show quote",
    slides: [
      {
        quote: "“This program has given me confidence in ways I did not think were even possible.”",
        caption: "TY · Home for the summer",
      },
    ],
  },

  // The design's "#" download link points at the six-month report already in /public.
  report: {
    id: "report",
    coverTop: "Beyond Code Collective · 2026",
    coverTitle: ["There’s a", "seat for you."],
    coverBottom: "Six-month report",
    headline: "The report.",
    paragraphs: ["The first six months.", "Who came through the door, what they built, and what we learned."],
    spaced: true,
    cta: { label: "Download the report", href: "/impact-report.html", external: true },
    // NOT IN DESIGN: funders asked for a short download beside the full report (run 6, 2026-11-27).
    also: { label: "Or the one-page summary (PDF)", href: "/resources/Beyond-Code-Collective-One-Pager.pdf", external: true },
  },

  partners: {
    headline: ["Who makes", "it free."],
    aside: { title: "Free to learners", note: "Thanks to our partners" },
    partners: [
      { logo: { src: `${IMG}/logos/take-two.png`, alt: "Take-Two Interactive", width: 500, height: 420, maxHeight: 56 } },
      { logo: { src: `${IMG}/logos/zapier.png`, alt: "Zapier", width: 800, height: 221, maxHeight: 40 } },
      { logo: { src: `${IMG}/logos/nextera.png`, alt: "NextEra Energy", width: 224, height: 103, maxHeight: 56 } },
      { logo: { src: `${IMG}/logos/nba-foundation.png`, alt: "NBA Foundation", width: 800, height: 382, maxHeight: 52 } },
      { logo: { src: `${IMG}/logos/atdc.png`, alt: "Georgia Tech ATDC", width: 379, height: 181, maxHeight: 56 } },
      { name: "Spelman College" },
      { name: "Apple" },
    ],
  },
};
