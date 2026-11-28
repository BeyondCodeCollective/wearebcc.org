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
 * Copy is taken from docs/design/v0-1/S-Signup-zdvm.dc.html, except the form, which is noted below.
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
    // NOT IN DESIGN: the design sets this form as one fill-in sentence. Visitors did not read it as a form,
    // so it is now labelled boxes with a headline.
    headline: "Sign up.",
    lede: "Tell us a little and we will point you to the right program.",
    fields: {
      name: { label: "First name", placeholder: "Your first name" },
      email: { label: "Email", placeholder: "you@example.com" },
      interest: {
        label: "I want to",
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
      city: { label: "City", placeholder: "Your city" },
      language: { label: "Write to me in", options: ["English", "Español"] },
    },
    submit: "Sign me up",
    note: "We never share your details. Unsubscribe any time.",
    subscribe: { endpoint: "/api/subscribe", source: "signup-v01" },
    messages: formMessages,
    sticker: { src: "/images/v01/stickers/arrows.png", alt: "" },
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
