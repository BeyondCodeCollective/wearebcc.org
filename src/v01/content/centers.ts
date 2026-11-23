import type { CentersPageContent } from "./centers.types";
import { routes, siteFooter, siteHeader } from "./site";

const IMG = "/images/v01";

/**
 * Centers, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Centers-e17q.dc.html.
 */
export const centers: CentersPageContent = {
  header: siteHeader({ spanishHref: "/es/beyond-code-centers" }),
  footer: siteFooter(),
  hero: {
    breadcrumb: [
      { label: "Home", href: routes.home },
      { label: "Programs", href: routes.programs },
      { label: "Beyond Centers" },
    ],
    headline: [{ text: "One room." }, { text: "Every generation.", highlight: true }],
    lede: "Beyond Centers are free, in-person hubs where an 8-year-old and his grandmother learn about tech at the same table.",
    primary: { label: "See upcoming sessions", href: routes.events },
    secondary: { label: "Join a Center", href: "#join" },
  },
  locations: {
    headline: "Where we are.",
    cities: [
      { name: "Atlanta", status: "open", statusLabel: "Open" },
      { name: "Los Angeles", status: "soon", statusLabel: "SOON" },
      { name: "New York", status: "soon", statusLabel: "Soon" },
    ],
  },
  inside: {
    headline: ["What happens", "inside."],
    promise: { title: "Free to learners", note: "Thanks to our partners" },
    stripsLabel: "What happens inside a Center",
    strips: [
      {
        title: "Lunch and Learn",
        text: "One-time sessions on AI, data, and everyday tools.",
        image: { src: `${IMG}/centers-lunch-learn.jpg`, alt: "Four people smiling and talking around a cafe table", position: "38% center" },
      },
      {
        title: "Cohorts",
        text: "Longer courses with an instructor and a project.",
        image: {
          src: `${IMG}/centers-cohorts-2.jpg`,
          alt: "A group of nine people posing together, two holding certificates of completion and one holding up a laptop",
          position: "33% center",
        },
        zoom: 1.27,
      },
      {
        title: "Families",
        text: "Caregivers and kids build side by side.",
        image: { src: `${IMG}/centers-families.jpg`, alt: "A father and his young son looking at a laptop together", position: "center 30%" },
      },
      {
        title: "Teens",
        text: "A weekly space to learn and build with peers.",
        image: {
          src: `${IMG}/centers-teens.jpg`,
          alt: "Five teens standing together in a school hallway, holding notebooks and bags",
          position: "center 40%",
        },
      },
    ],
  },
  stats: {
    stats: [
      { value: "100%", text: "of Atlanta learners taught what they learned to someone else.", surface: "cobalt" },
      { value: "80%", text: "feel more confident with technology. The other 20% already did.", surface: "lemon" },
    ],
  },
  quote: {
    // The design gives this portrait the alt text "[Placeholder portrait]", which is a note, so it is left empty.
    image: { src: `${IMG}/cathy.jpg`, alt: "", position: "center 25%" },
    text: '"THIS HELPED ME UNDERSTAND TECHNOLOGY IN A MORE APPROACHABLE WAY. IT WAS INSPIRING TO LEARN TOGETHER, ASK QUESTIONS FREELY, AND GROW OUR CONFIDENCE WITH TECH AS A COMMUNITY."',
    attribution: "Cathy, ai fundamentals for Wisdom learners",
  },
  join: {
    id: "join",
    headline: ["Pull up", "a chair."],
    body: "Tell us what you’re looking for and we’ll send dates near you.",
    email: { label: "Email address", placeholder: "you@example.com" },
    want: { label: "I want to…", options: ["Attend programming", "Volunteer", "Partner or sponsor", "Enroll my child"] },
    zip: { label: "ZIP code", placeholder: "Enter your ZIP code" },
    submit: "Sign up",
    subscribe: { endpoint: "/api/subscribe", source: "centers-v01" },
    // Not in the design: the same wording Home uses for its forms.
    messages: {
      success: "You're on the list.",
      successBody: "We'll be in touch as cohorts and Labs open up.",
      error: "Something went wrong. Please try again.",
    },
  },
  bring: { headline: "Bring a Center to your city.", cta: { label: "Partner with us", href: routes.partner } },
};
