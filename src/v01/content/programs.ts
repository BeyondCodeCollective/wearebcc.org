import type { ProgramsPageContent } from "./programs.types";
import { routes, siteFooter, siteHeader } from "./site";

/**
 * Programs, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Programs-ybhi.dc.html.
 */
export const programs: ProgramsPageContent = {
  header: siteHeader({ current: "Programs" }),
  footer: siteFooter(),
  intro: {
    breadcrumb: [{ label: "Home", href: routes.home }, { label: "Programs" }],
    headline: [{ text: "Find your" }, { text: "program.", highlight: true }],
    lede: "Pick the line that sounds like you. Every program is free.",
    promise: { title: "Free to learners", note: "Thanks to our partners" },
  },
  programs: {
    ariaLabel: "Programs",
    rows: [
      {
        line: "I want to use AI in my job.",
        name: "Beyond Ready",
        dot: "cobalt",
        summary: "An 8-week course for any role. Build one real thing that helps your work.",
        tags: ["[8 weeks]", "[Live + self-paced]", "[Starts Jan]"],
        cta: { label: "Join the waitlist", href: routes.beyondReady },
      },
      {
        line: "I’m curious and want to try it once.",
        name: "Beyond Labs",
        dot: "cobalt",
        summary: "One free, live online workshop on one topic. No experience needed.",
        tags: ["[1 session]", "[Online]", "[Monthly]"],
        cta: { label: "See the next Lab", href: routes.events },
      },
      {
        line: "I learn best in person.",
        name: "Beyond Centers",
        dot: "forest",
        summary: "Free hands-on hubs where every generation learns together.",
        tags: ["[Atlanta]", "[LA soon]", "[New York soon]"],
        cta: { label: "Find a Center", href: routes.centers },
      },
      {
        line: "I’m an athlete planning what’s next.",
        name: "Beyond the Game",
        dot: "forest",
        summary: "AI Fundamentals, then Beyond Ready, with coaching for life after sport.",
        tags: ["[Athletes]", "[Cohort]", "[Free]"],
        cta: { label: "Save my free seat", href: routes.beyondTheGame },
      },
      {
        line: "I’m 55 or older and new to AI.",
        name: "Older Adult AI Lab",
        dot: "forest",
        summary: "A friendly, hands-on start with AI, in person.",
        tags: ["[In person]", "[New York]"],
        cta: { label: "See dates", href: routes.events },
      },
      {
        line: "I’m a young builder.",
        name: "Code Along Beyond",
        dot: "crimson",
        summary: "Free video lessons. Build a real app, one episode at a time.",
        tags: ["[YouTube]", "[Self-paced]"],
        cta: { label: "Start watching", href: routes.codeAlong },
      },
      {
        line: "I want to listen and learn.",
        name: "Beyond Code Dialogues",
        dot: "crimson",
        summary: "Live conversations with the builders shaping our world.",
        tags: ["[LinkedIn Live]", "[Free]"],
        cta: { label: "Next episode", href: routes.events },
      },
    ],
  },
  unsure: { headline: "Still not sure?", cta: { label: "Tell us about you", href: routes.signup } },
};
