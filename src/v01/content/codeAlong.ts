import type { CodeAlongPageContent } from "./codeAlong.types";
import { home } from "./home";
import { routes, siteFooter, siteHeader } from "./site";

/**
 * CodeAlong, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-CodeAlong-90o1.dc.html.
 */

const IMG = "/images/v01";
const CHANNEL = "https://www.youtube.com/@BeyondCodeCollective";

export const codeAlong: CodeAlongPageContent = {
  header: siteHeader({ spanishHref: "/es/code-along" }),
  footer: siteFooter(),
  hero: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumb: [
      { label: "Home", href: routes.home },
      { label: "Programs", href: routes.homePrograms },
      { label: "Code Along Beyond" },
    ],
    badge: "Season airing now",
    logo: { src: `${IMG}/ca-logo-music.png`, alt: "Code Along Beyond: Music", size: 240 },
    headline: [{ text: "Code Along " }, { text: "Beyond: Music", mark: true }],
    credit: "Powered by Beyond Code Collective · With support from Apple",
    // NOT IN DESIGN: Apple is set larger and bolder (Mica, 2026-11-23).
    creditEmphasis: "Apple",
    lede: [
      "Code Along is the free, video-based coding academy created by Beyond Code Collective: real projects, built step by step, with hosts who code right alongside you.",
      "This season: build your own music playlist app, with support from Apple.",
    ],
    primaryCta: { label: "Subscribe on YouTube", href: `${CHANNEL}?sub_confirmation=1`, external: true },
    secondaryCta: { label: "See the episodes", href: "#episodes" },
    still: {
      src: `${IMG}/ca-hero-still.jpg`,
      alt: "Destiney Williams and Daniel Ray on the Code Along set",
      position: "center",
    },
  },
  streaming: {
    badge: "Now streaming · Episode 02",
    headline: "How to Code an App (Part 1)",
    playLabel: "Play episode 2 on YouTube",
    playHref: "https://www.youtube.com/watch?v=GCTxKNXo4uQ&list=PLFTeSfUZ5rlQ",
    image: { src: `${IMG}/ca-playlist-card.jpg`, alt: "Code Along Beyond: Music, Episode 2", position: "center" },
    cta: { label: "Subscribe on YouTube", href: `${CHANNEL}?sub_confirmation=1`, external: true },
  },
  stat: { badge: "First month on YouTube", value: "2.5M", caption: "Views of Code Along Beyond" },
  episodes: {
    badge: "Season airing now",
    headline: "Code Along Beyond: Music",
    lede: "Four episodes. One music playlist app, built from scratch.",
    episodes: [
      {
        id: "ep-1",
        badge: "Episode 01 · 09.12",
        title: "Who Has the Best Music Taste?",
        href: "https://www.youtube.com/watch?v=eBKPc2M7Zwo&list=PLFTeSfUZ5rlQ",
        watch: "Watch on YouTube",
        image: { src: `${IMG}/ca-ep-1.jpg`, alt: "Episode 1 still", position: "center 20%" },
      },
      {
        id: "ep-2",
        badge: "Episode 02 · 09.19",
        title: "How to Code an App (Part 1)",
        href: "https://www.youtube.com/watch?v=GCTxKNXo4uQ&list=PLFTeSfUZ5rlQ",
        watch: "Watch on YouTube",
        image: { src: `${IMG}/ca-ep-2.jpg`, alt: "Episode 2 still", position: "center" },
      },
      {
        id: "ep-3",
        badge: "Episode 03 · 09.26",
        title: "How to Code an App (Part 2)",
        href: "https://www.youtube.com/playlist?list=PLFTeSfUZ5rlQ",
        watch: "Watch on YouTube",
        image: { src: `${IMG}/ca-ep-3.jpg`, alt: "Episode 3 still", position: "center 30%" },
      },
      {
        id: "ep-4",
        badge: "Episode 04 · 10.03",
        title: "Code Along with a Real-Life Role Model",
        href: "https://www.youtube.com/playlist?list=PLFTeSfUZ5rlQ",
        watch: "Watch on YouTube",
        image: { src: `${IMG}/ca-ep-4.jpg`, alt: "Episode 4 still", position: "center 30%" },
      },
    ],
  },
  about: {
    badge: "About the show",
    headline: [{ text: "Learn by " }, { text: "building", mark: true }],
    body: [
      "You don’t just watch someone code. You code along. Each episode walks through a real project step by step, at a pace made for first-time builders.",
      "This season, hosts Destiney Williams and Daniel Ray turn a friendly rivalry over music taste into a coding challenge: a music playlist app, built from scratch.",
    ],
    cta: { label: "Watch on YouTube", href: CHANNEL, external: true },
    codeLabel: "Sample code from episode 2",
    // The sample carries two bracketed stand-ins, "[Your favorite song]" and "[Artist]".
    // They are part of the code as designed, so they stay. Flagged in the report.
    code: [
      [{ text: "// Episode 2: your first function", kind: "comment" }],
      [{ text: "const", kind: "keyword" }, { text: " playlist = [];" }],
      [],
      [{ text: "function", kind: "keyword" }, { text: " addSong(title, artist) {" }],
      [{ text: "  playlist.push({ title, artist });" }],
      [{ text: "}" }],
      [],
      [
        { text: "addSong(" },
        { text: "\"[Your favorite song]\"", kind: "string" },
        { text: ", " },
        { text: "\"[Artist]\"", kind: "string" },
        { text: ");" },
      ],
    ],
  },
  hosts: {
    badge: "Your hosts",
    headline: "Meet the season’s crew",
    lede: "Creators from the same generation as the Code Along audience, writing every line of code with you: mistakes, debugging, wins and all.",
    hosts: [
      { name: "Destiney Williams", role: "Co-host", image: { src: `${IMG}/ca-host-2.png`, alt: "Destiney Williams" } },
      { name: "Daniel Ray", role: "Co-host", image: { src: `${IMG}/ca-host-1.png`, alt: "Daniel Ray" } },
      {
        name: "Jalaiah Harmon",
        role: "Celebrity guest · Episodes 1–3",
        image: { src: `${IMG}/ca-guest-jalaiah.png`, alt: "Jalaiah Harmon" },
      },
      {
        name: "Dr. Fernanda Sulantay Vargas",
        role: "Role model · Episode 4",
        image: { src: `${IMG}/ca-guest-fernanda.png`, alt: "Dr. Fernanda Sulantay Vargas" },
      },
    ],
  },
  teach: {
    badge: "For schools and partners",
    headline: [{ text: "Teach it " }, { text: "yourself", mark: true }],
    lede: "Code Along Beyond is our first curriculum built to hand over. Partners and educators run the lessons with their own learners, using our guides.",
    cta: { label: "Bring it to your learners", href: routes.partner },
  },
  beFirst: {
    badge: "Don’t miss a drop",
    headline: "Be first to watch",
    lede: "Drop your email and we’ll let you know the day each new episode goes live.",
    label: "Email address",
    placeholder: "you@example.com",
    submit: "Join the list",
    fine: "Season 1 is powered by Beyond Code Collective, with support from Apple",
    // NOT IN DESIGN: Apple is set heavier (Mica, 2026-11-23).
    fineEmphasis: "Apple",
    subscribe: { endpoint: "/api/subscribe", source: "codeAlong-v01" },
    // NOT IN DESIGN: the design has no success or error state. Reused from Home.
    messages: home.hero.form.messages,
  },
};
