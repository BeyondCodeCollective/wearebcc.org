import { routes, siteFooter, siteHeader } from "./site";
import type { FormMessages, HomeContent } from "./types";

/**
 * Home, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Home-9616.dc.html.
 *
 * Three things in this file are not from the design and are marked NOT IN DESIGN:
 * the form success and error lines (borrowed from the existing site), the link
 * targets (the design links to pages that do not exist yet) and the event times.
 */

const IMG = "/images/v01";

/** Link targets. The design links to S-*.dc.html pages: the route map says where each one lives. */
const to = routes;

/** NOT IN DESIGN: the design has no success or error state. Lines reused from the existing site. */
const formMessages: FormMessages = {
  success: "You're on the list.",
  successBody: "We'll be in touch as cohorts and Labs open up.",
  error: "Something went wrong. Please try again.",
};

/** All event times are Eastern unless a row says otherwise. NOT CONFIRMED. */
const EASTERN = "America/New_York";

export const home: HomeContent = {
  header: siteHeader({ homeHref: to.top }),

  hero: {
    headline: [{ text: "Free AI skills" }, { text: "for every generation.", highlight: true }],
    lede: "Free courses, live workshops, and in-person Centers that teach anyone to use AI with confidence: first-timers, career changers, athletes, and grandparents alike.",
    form: {
      label: "Email address",
      placeholder: "you@example.com",
      submit: "Sign up",
      helper: "Get on the list and we will point you to the right program.",
      subscribe: { endpoint: "/api/subscribe", source: "home-v01-hero" },
      messages: formMessages,
    },
    cta: { label: "Find your program", href: to.homePrograms },
    image: {
      src: `${IMG}/team-table.jpg`,
      alt: "A diverse team of colleagues meeting around a wooden table in a bright office",
      position: "center 40%",
    },
  },

  // The design shows Wed, Nov 18. That date has passed, so the bar hides itself.
  nextUp: {
    label: "[Next up]",
    text: "Wed, Nov 18 · Beyond Code Dialogues · Live on LinkedIn",
    cta: { label: "Save my spot", href: to.events },
    startsAt: "2026-11-18T00:00:00-05:00",
    timeZone: EASTERN,
    timeTbd: true,
  },

  about: {
    headline: "AI is reshaping work.",
    headlineHighlight: "Navigate it with us.",
    label: "[Our mission]",
    body: "To build intergenerational access in the technologies of today and tomorrow.",
    link: { label: "About Beyond Code", href: to.team },
    // MISSING FILE: "A group of builders gathered close together, laughing", position "center 30%".
    image: undefined,
  },

  paths: {
    headline: "PICK THE PATH THAT SOUNDS LIKE YOU.",
    lede: "Four ways in. Each one opens the programs built for it.",
    cards: [
      {
        title: ["I want", "to build."],
        cta: "See programs",
        href: to.homePrograms,
        surface: "cobalt",
        image: { src: `${IMG}/cathy.jpg`, alt: "Cathy, smiling in a bright pink cardigan", position: "center 8%" },
      },
      {
        title: ["I have", "questions."],
        cta: "SEE PROGRAMS",
        href: to.events,
        surface: "lemon",
        image: {
          src: `${IMG}/questions.jpg`,
          alt: "Two people in conversation, one gesturing mid-sentence",
          position: "center 30%",
        },
      },
      {
        title: ["I learn", "best in", "person."],
        titleHighlight: true,
        cta: "See programs",
        href: to.centers,
        surface: "forest",
        // MISSING FILE: "Four people leaning in and reaching toward the camera on a city street", position "center 35%".
        image: undefined,
      },
      {
        title: ["I’m in", "music or", "sports."],
        cta: "See programs",
        href: to.beyondTheGame,
        surface: "crimson",
        // MISSING FILE: "A builder leaning on a desk in a sunlit studio workspace", position "center 30%".
        image: undefined,
      },
    ],
  },

  events: {
    headline: "What’s upcoming.",
    note: "Always no cost to you, thanks to our partners.",
    filterLabel: "Filter events",
    filters: [
      { id: "all", label: "All" },
      { id: "virtual", label: "Virtual" },
      { id: "in-person", label: "In person" },
      { id: "linkedin-live", label: "LinkedIn Live" },
      { id: "open", label: "Open to the public" },
      { id: "invite-only", label: "Invite only" },
    ],
    // DATES NOT CONFIRMED. Where the design gives no time, timeTbd keeps the
    // event up until the end of its day. An event hides itself once it starts.
    events: [
      {
        id: "older-adult-ai-lab-2026-12-02",
        title: "Older Adult AI Lab",
        description: "An introduction to AI for older adults, hosted with Hudson Guild.",
        startsAt: "2026-12-02T00:00:00-05:00",
        timeZone: EASTERN,
        timeTbd: true,
        tags: ["in-person"],
        meta: ["[In person]", "[New York]"],
        image: { src: `${IMG}/headphones.jpg`, alt: "", position: "center 42%" },
        // The design links this button to the events section itself.
        signup: { label: "FOLLOW ALONG", href: to.events },
      },
      {
        id: "dialogues-2026-12-04",
        title: "Beyond Code Dialogues",
        description: "We interview the builders, multi-hyphenates, and thinkers shaping our world.",
        startsAt: "2026-12-04T00:00:00-05:00",
        timeZone: EASTERN,
        timeTbd: true,
        tags: ["virtual", "linkedin-live", "open"],
        meta: ["[LinkedIn Live]", "[Virtual]", "[Open to the public]"],
        image: { src: `${IMG}/dialogues-boyd.jpg`, alt: "Dr. Brian Boyd", position: "center 20%" },
        signup: { label: "Save my free seat", href: to.signup },
      },
      {
        id: "beyond-lab-2026-12-08",
        title: "Beyond Lab",
        description: "A live online workshop on AI and entrepreneurship.",
        startsAt: "2026-12-08T00:00:00-05:00",
        timeZone: EASTERN,
        timeTbd: true,
        tags: ["virtual", "open"],
        meta: ["[Virtual]", "[Open to the public]"],
        // MISSING FILE: decorative thumbnail, position "center 20%".
        image: undefined,
        signup: { label: "Save my free seat", href: to.signup },
      },
      {
        id: "beyond-ready-lab-2026-12-14",
        title: "Beyond Ready Lab",
        description: "A live online lab for Beyond Ready. [Topic to confirm]",
        startsAt: "2026-12-14T12:00:00-05:00",
        timeZone: EASTERN,
        tags: ["virtual"],
        meta: ["[Virtual]", "[12:00 PM ET]"],
        image: { src: `${IMG}/field-ready.jpg`, alt: "", position: "center 25%" },
        signup: { label: "Save my free seat", href: to.signup },
        hidden: "Description still carries the design note [Topic to confirm].",
      },
      {
        id: "beyond-lab-2027-01-12",
        title: "Beyond Lab",
        description: "A live online workshop on AI and entrepreneurship.",
        startsAt: "2027-01-12T18:00:00-05:00",
        timeZone: EASTERN,
        tags: ["virtual"],
        meta: ["[Virtual]", "[6:00–7:30 PM ET]"],
        // MISSING FILE: decorative thumbnail, position "center 20%".
        image: undefined,
        signup: { label: "Save my free seat", href: to.signup },
      },
      {
        id: "beyond-ready-2027-01",
        title: "Beyond Ready",
        description: "An 8-week course that teaches people in any role to work with AI.",
        // The design says only "Starts Jan". Shown until January ends.
        startsAt: "2027-01-01T00:00:00-05:00",
        hideAfter: "2027-02-01T00:00:00-05:00",
        timeZone: EASTERN,
        dateLabel: { eyebrow: "Starts", value: "Jan" },
        tags: [],
        meta: ["[8 weeks]", "[Free]", "[Any role]"],
        image: { src: `${IMG}/field-ready.jpg`, alt: "", position: "center 25%" },
        signup: { label: "Join the waitlist", href: to.beyondReady },
      },
    ],
    empty: { text: "Nothing on the calendar for this filter right now.", reset: "See all events" },
    calendar: { label: "See the full calendar", href: to.events },
  },

  programs: {
    headline: "Start here.",
    promise: {
      title: "Free to learners",
      note: "Thanks to our partners",
      body: "No technical experience needed, just a willingness to learn.",
    },
    programs: [
      {
        title: "Beyond Ready",
        description: "An 8-week course that teaches people in any role to work with AI.",
        tags: [{ label: "[Any role]" }, { label: "[8 weeks]" }, { label: "[Free]" }, { label: "[Starts Jan]" }],
        cta: { label: "Join the waitlist", href: to.beyondReady },
        image: {
          src: `${IMG}/field-ready.jpg`,
          alt: "Two women seated at a small table, looking at a laptop together",
          position: "center 25%",
        },
      },
      {
        title: "Beyond Labs",
        description: "Live online workshops, one topic per session.",
        tags: [
          { label: "[Everyone]" },
          { label: "[1 session]" },
          // Nov 19 has passed, so this tag hides itself.
          { label: "[Next: Nov 19]", hideAfter: "2026-11-20T00:00:00-05:00" },
        ],
        cta: { label: "Save my free seat", href: "https://bccacademy.io/bcc/catalyst-labs", external: true },
        // MISSING FILE: "A person seated in a chair by a city window, hands folded", position "center 15%".
        image: undefined,
      },
      {
        title: "Beyond Centers",
        description: "Hands-on learning in person. Atlanta, New York, Los Angeles and more.",
        tags: [{ label: "[Atlanta]" }, { label: "[LA soon]" }, { label: "[NY soon]" }],
        cta: { label: "See the Centers", href: to.centers },
        image: {
          src: `${IMG}/smiling-group.jpg`,
          alt: "Three generations laughing together",
          position: "center 30%",
        },
      },
    ],
    more: {
      label: "[More ways in]",
      links: [
        { label: "Code Along Beyond", href: to.codeAlong },
        { label: "Beyond Code Dialogues", href: to.events },
        { label: "ASK ME ANYTHING", href: to.events },
        { label: "Beyond the Game", href: to.beyondTheGame },
        { label: "Beyond the Music", href: to.events },
      ],
    },
  },

  impact: {
    headline: "Real people. Real results.",
    stats: [
      { value: "510+", text: "learners served in first eight months." },
      { value: "100%", text: "of Beyond Centers learners taught what they learned to someone else." },
      { value: "2.3M", text: "views of Code Along Beyond in its first month." },
    ],
    quote: {
      // NOT IN DESIGN: label so the quote reads as a testimonial (Mica, 2026-11-23).
      label: "From our learners",
      text: "[ This program has given me confidence in ways I did not think were even possible ]",
      attribution: "TY, HOME FOR THE SUMMER PROGRAM",
      link: { label: "Meet more builders", href: to.impact },
      // MISSING FILE: "A builder seated with a laptop on their knees", position "center 40%".
      image: undefined,
    },
  },

  film: {
    headline: "See the work.",
    body: "Who Beyond Code is for and what builders make here.",
    label: "[Watch the film on YouTube]",
    play: {
      label: "Play the Beyond Code film on YouTube (opens in a new tab)",
      href: "https://www.youtube.com/watch?v=-JEj-7AS7Kc&t=1s",
    },
    // The design has a grey box reading "Video" here: a placeholder, so hidden.
    poster: undefined,
  },

  partners: {
    label: "[Building with]",
    ariaLabel: "Partners and press",
    logos: [
      { src: `${IMG}/logos/take-two.png`, alt: "Take-Two Interactive", width: 500, height: 420, maxHeight: 48 },
      { src: `${IMG}/logos/zapier.png`, alt: "Zapier", width: 800, height: 221, maxHeight: 36 },
      { src: `${IMG}/logos/nextera.png`, alt: "NextEra Energy", width: 224, height: 103, maxHeight: 48 },
      { src: `${IMG}/logos/nba-foundation.png`, alt: "NBA Foundation", width: 800, height: 382, maxHeight: 44 },
      { src: `${IMG}/logos/waymo.png`, alt: "Waymo", width: 766, height: 413, maxHeight: 44 },
      { src: `${IMG}/logos/ibm.png`, alt: "IBM", width: 467, height: 179, maxHeight: 36 },
    ],
  },

  partnerCta: {
    headline: "Hire, partner, or fund.",
    columns: [
      {
        label: "[Employers]",
        title: "HIRE",
        body: "Meet learners who have built working projects on real problems. Talk with us about hiring our graduates and finding the right fit for your organization.",
        cta: { label: "Talk to us", href: to.partner },
        // MISSING FILE: "A builder at work at a desk", position "center 22%".
        image: undefined,
      },
      {
        label: "[WORKFORCE BOARDS AND EMPLOYERS]",
        title: "PARTNER",
        body: "We adapt Beyond Ready to your company, your community, and your goals. Collaborate with us to shape it around your work, and run it alongside your existing programs.",
        cta: { label: "Partner with us", href: to.partner },
        image: {
          src: `${IMG}/partner.jpg`,
          alt: "Four colleagues of different ages gathered around a laptop",
          position: "center 25%",
        },
      },
      {
        label: "[Funders]",
        title: "Fund the work",
        body: "Help keep these programs free for the builders who show up, so they can stay focused on the future with no cost standing in their way.",
        cta: { label: "Fund a program", href: to.donate },
        // MISSING FILE: "Builders lying in a circle, looking up", position "center".
        image: undefined,
      },
    ],
  },

  signup: {
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
    subscribe: { endpoint: "/api/subscribe", source: "home-v01" },
    messages: formMessages,
    // MISSING FILE: decorative sticker that overlaps the footer, 260px wide.
    sticker: undefined,
  },

  footer: siteFooter(),
};