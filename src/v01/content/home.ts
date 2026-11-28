import { routes, signupFor, siteFooter, siteHeader } from "./site";
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
    // NOT IN DESIGN: "students" added. Visitors aged 16 to 24 doubted the site was for them (run 6, 2026-11-27).
    lede: "Free courses, live workshops, and in-person Centers that teach anyone to use AI with confidence: students, first-timers, career changers, athletes, and grandparents alike.",
    form: {
      label: "Email address",
      placeholder: "you@example.com",
      submit: "Sign up",
      helper: "Get on the list and we will point you to the right program.",
      subscribe: { endpoint: "/api/subscribe", source: "home-v01-hero" },
      messages: formMessages,
    },
    cta: { label: "Find your program", href: to.homePrograms },
    // NOT IN DESIGN: the design's office-meeting photo read as a corporate site. This is a Beyond Code class.
    image: {
      src: `${IMG}/wwd-class.jpg`,
      alt: "Young learners in Beyond Code Collective sweatshirts at a class",
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
    // NOT IN DESIGN: the design sets "[Our mission]" as a label over the sentence. Mica asked for one line (2026-11-23).
    body: "Our mission: to build intergenerational access in the technologies of today and tomorrow.",
    link: { label: "About Beyond Code", href: to.story },
    image: { src: `${IMG}/mission.jpg`, alt: "A group of builders gathered close together, laughing", position: "center 30%" },
  },

  // NOT IN DESIGN: the design has four cards. Visitors asked for doors of their own: musicians were sent to
  // the athletes' page, and working adults, families and people who want to code had no card (run 6, 2026-11-27).
  paths: {
    headline: "PICK THE PATH THAT SOUNDS LIKE YOU.",
    lede: "Eight ways in. Each one opens the programs built for it.",
    cards: [
      {
        title: ["I want", "to build."],
        cta: "Find a program",
        href: to.homePrograms,
        surface: "cobalt",
        image: { src: `${IMG}/cathy.jpg`, alt: "Cathy, smiling in a bright pink cardigan", position: "center 8%" },
      },
      {
        title: ["I want AI", "skills for", "work."],
        cta: "See Beyond Ready",
        href: to.beyondReady,
        surface: "peach",
        image: {
          src: `${IMG}/field-ready.jpg`,
          alt: "Two women seated at a small table, looking at a laptop together",
          position: "center 25%",
        },
      },
      {
        title: ["I want", "to learn", "to code."],
        cta: "Watch Code Along",
        href: to.codeAlong,
        surface: "ink",
        image: {
          src: `${IMG}/ca-hero-still.jpg`,
          alt: "Destiney Williams and Daniel Ray on the Code Along set",
          position: "center 20%",
        },
      },
      {
        title: ["I have", "questions."],
        cta: "Ask at a live session",
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
        cta: "See the Centers",
        href: to.centers,
        surface: "forest",
        image: { src: `${IMG}/street-group.jpg`, alt: "Four people leaning in and reaching toward the camera on a city street", position: "center 35%" },
      },
      {
        title: ["I’m", "bringing", "my family."],
        cta: "Kids to grandparents",
        href: to.centers,
        surface: "navy",
        image: { src: `${IMG}/centers-families.jpg`, alt: "A father and his young son looking at a laptop together", position: "center 30%" },
      },
      {
        title: ["I’m an", "athlete."],
        cta: "Explore Beyond the Game",
        href: to.beyondTheGame,
        surface: "crimson",
        image: { src: `${IMG}/kleon.jpg`, alt: "Kleon Penn in his purple basketball jersey", position: "center 4%" },
      },
      {
        title: ["I make", "music."],
        cta: "Explore Beyond the Music",
        href: to.beyondTheMusic,
        surface: "cobalt",
        image: {
          src: "/images/news/beyond-the-music.jpg",
          alt: "Jerry Clark, Expert in Residence for Beyond the Music, smiling in a classroom",
          position: "center 25%",
        },
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
      { id: "linkedin-live", label: "Streamed on LinkedIn" },
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
        facts: [
          { label: "Time", value: "Start time to be confirmed" },
          { label: "Where", value: "In person in New York, hosted with Hudson Guild. Address to be confirmed." },
          { label: "For", value: "Older adults" },
        ],
        image: { src: `${IMG}/headphones.jpg`, alt: "", position: "center 42%" },
        signup: { label: "Save my free seat", href: signupFor("older-adult-ai-lab-2026-12-02") },
      },
      {
        id: "dialogues-2026-12-04",
        title: "Beyond Code Dialogues",
        description: "We interview the builders, multi-hyphenates, and thinkers shaping our world.",
        startsAt: "2026-12-04T00:00:00-05:00",
        timeZone: EASTERN,
        timeTbd: true,
        tags: ["virtual", "linkedin-live", "open"],
        meta: ["[Streamed on LinkedIn]", "[Virtual]", "[Open to the public]"],
        facts: [
          { label: "Time", value: "Start time to be confirmed" },
          { label: "Where", value: "Online, streamed live on LinkedIn" },
          { label: "For", value: "Open to the public" },
        ],
        image: { src: `${IMG}/dialogues-boyd.jpg`, alt: "Dr. Brian Boyd", position: "center 20%" },
        signup: { label: "Save my free seat", href: signupFor("dialogues-2026-12-04") },
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
        facts: [
          { label: "Time", value: "Start time to be confirmed" },
          { label: "Where", value: "Online" },
          { label: "For", value: "Open to the public" },
        ],
        image: { src: `${IMG}/labs.jpg`, alt: "", position: "center 20%" },
        signup: { label: "Save my free seat", href: signupFor("beyond-lab-2026-12-08") },
      },
      {
        id: "beyond-ready-lab-2026-12-14",
        title: "Beyond Ready Lab",
        description: "A live online lab for Beyond Ready. [Topic to confirm]",
        startsAt: "2026-12-14T12:00:00-05:00",
        timeZone: EASTERN,
        tags: ["virtual"],
        meta: ["[Virtual]", "[12:00 PM ET]"],
        facts: [
          { label: "Time", value: "12:00 PM Eastern" },
          { label: "Where", value: "Online" },
        ],
        image: { src: `${IMG}/field-ready.jpg`, alt: "", position: "center 25%" },
        signup: { label: "Save my free seat", href: signupFor("beyond-ready-lab-2026-12-14") },
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
        facts: [
          { label: "Time", value: "6:00 to 7:30 PM Eastern" },
          { label: "Where", value: "Online" },
          { label: "For", value: "Everyone" },
        ],
        image: { src: `${IMG}/labs.jpg`, alt: "", position: "center 20%" },
        signup: { label: "Save my free seat", href: signupFor("beyond-lab-2027-01-12") },
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
        facts: [
          { label: "Starts", value: "January. Exact date to be confirmed." },
          { label: "Length", value: "8 weeks" },
          { label: "For", value: "People in any role" },
          { label: "Cost", value: "Free" },
        ],
        image: { src: `${IMG}/field-ready.jpg`, alt: "", position: "center 25%" },
        signup: { label: "Join the waitlist", href: signupFor("beyond-ready") },
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
        // NOT IN DESIGN: this button left for bccacademy.io without saying so. Labs sessions are listed on Events.
        cta: { label: "See upcoming Labs", href: to.events },
        image: { src: `${IMG}/labs.jpg`, alt: "A person seated in a chair by a city window, hands folded", position: "center 15%" },
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
      // NOT IN DESIGN: Code Along Beyond was one link in the line below. Visitors asked for a row of its own.
      {
        title: "Code Along Beyond",
        description: "A free coding academy on YouTube. Real projects, built step by step.",
        tags: [{ label: "[Everyone]" }, { label: "[On YouTube]" }, { label: "[Free]" }],
        cta: { label: "Watch Code Along", href: to.codeAlong },
        image: {
          src: `${IMG}/ca-hero-still.jpg`,
          alt: "Destiney Williams and Daniel Ray on the Code Along set",
          position: "center 20%",
        },
      },
    ],
    // NOT IN DESIGN: Code Along Beyond has its own row above. "ASK ME ANYTHING" is off the list
    // until a session with that name is on the calendar: its link led to a page that never mentions it.
    more: {
      label: "[More ways in]",
      links: [
        { label: "Beyond Code Dialogues", href: to.events },
        { label: "Beyond the Game", href: to.beyondTheGame },
        { label: "Beyond the Music", href: to.beyondTheMusic },
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
      text: "“This program has given me confidence in ways I did not think were even possible.”",
      attribution: "TY, HOME FOR THE SUMMER PROGRAM",
      // NOT IN DESIGN: goes to the impact report while the Impact page is hidden (Mica, 2026-11-23).
      link: { label: "Read the impact report", href: to.impactReport },
      image: { src: `${IMG}/laptop-knees.jpg`, alt: "A builder seated with a laptop on their knees", position: "center 40%" },
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
    // The design has a grey box reading "Video" here. The still is the one Donate uses for the same film.
    poster: { src: `${IMG}/video-thumb.jpg`, alt: "The Beyond Code cohort together", position: "center" },
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
        image: { src: `${IMG}/hire.jpg`, alt: "A builder at a desk, smiling over her shoulder", position: "center 22%" },
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
        image: { src: `${IMG}/circle-looking-up.jpg`, alt: "Builders lying in a circle, looking up", position: "center" },
      },
    ],
  },

  signup: {
    ariaLabel: "Sign up",
    // NOT IN DESIGN: the design sets this form as one fill-in sentence. Visitors did not read it as a form,
    // so it is now labelled boxes. The headline and lede reuse the hero helper line.
    headline: "Get on the list.",
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
    subscribe: { endpoint: "/api/subscribe", source: "home-v01" },
    messages: formMessages,
    sticker: { src: `${IMG}/stickers/arrows.png`, alt: "" },
  },

  footer: siteFooter(),
};