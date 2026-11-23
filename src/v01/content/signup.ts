import type { FormMessages } from "./types";
import type { SignupPageContent } from "./signup.types";
import { routes, siteFooter, siteHeader } from "./site";

/** NOT IN DESIGN: the design has no success or error state. Lines reused from Home. */
const formMessages: FormMessages = {
  success: "You're on the list.",
  successBody: "We'll be in touch as cohorts and Labs open up.",
  error: "Something went wrong. Please try again.",
};

/**
 * Signup, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Signup-zdvm.dc.html.
 */
export const signup: SignupPageContent = {
  header: siteHeader(),
  footer: siteFooter(),

  breadcrumb: {
    ariaLabel: "Breadcrumb",
    home: { label: "Home", href: routes.home },
    current: "Sign up",
  },

  form: {
    ariaLabel: "Sign up",
    sentence: {
      intro: "Hi, I’m",
      name: { label: "your first name", placeholder: "your first name" },
      want: "and I want to",
      interest: {
        label: "What you want to do",
        options: [
          "build with AI",
          "learn in person",
          "join live conversations",
          "grow as an athlete",
          "grow in my music career",
          "hire or partner",
          "volunteer",
        ],
      },
      place: "in",
      city: { label: "your city", placeholder: "your city" },
      cityEnd: ".",
      write: "Write to me in",
      language: { label: "Language", options: ["English", "Español"] },
      at: "at",
      email: { label: "you@example.com", placeholder: "you@example.com" },
      end: ".",
    },
    submit: "Sign me up",
    note: "We never share your details. Unsubscribe any time.",
    subscribe: { endpoint: "/api/subscribe", source: "signup-v01" },
    messages: formMessages,
    // MISSING FILE: decorative sticker, 260px wide, a /_blob/ image in the design.
    sticker: undefined,
  },

  next: {
    headline: "Then what?",
    steps: [
      { title: "You get a welcome", body: "One click in your inbox confirms it." },
      { title: "We match you", body: "Programs that fit what you told us." },
      { title: "You show up", body: "An invite to the next session near you." },
    ],
  },

  tiles: [
    {
      lines: ["Here for", "your team?"],
      link: { label: "Hire & partner", href: routes.partner },
      surface: "cobalt",
    },
    {
      lines: ["Here to", "help fund it?"],
      link: { label: "Fund the work", href: routes.donate },
      surface: "forest",
    },
  ],
};
