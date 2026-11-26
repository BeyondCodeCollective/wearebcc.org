import type { BeyondTheGamePageContent } from "./beyondTheGame.types";
import { routes, siteFooter, siteHeader } from "./site";

/**
 * BeyondTheGame, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-BeyondTheGame-ttzv.dc.html.
 */
export const beyondTheGame: BeyondTheGamePageContent = {
  header: siteHeader({ current: "Programs", spanishHref: "/es/beyond-the-game" }),
  footer: siteFooter(),

  hero: {
    breadcrumb: {
      links: [
        { label: "Home", href: routes.home },
        { label: "Programs", href: routes.homePrograms },
      ],
      current: "Beyond the Game",
    },
    badge: "Free for athletes",
    headline: { lines: ["Life after", "the game"], accent: "starts here." },
    lede: {
      strong: "Beyond the Game",
      rest: " helps athletes move into tech careers when they leave their sport. Free certifications, career coaching, and people who have made the same move.",
    },
    primary: { label: "Apply free", href: "#apply" },
    secondary: { label: "How it works", href: "#path" },
    // The design's two photos are files the design tool could not export, so there is no image yet.
    then: { caption: "Then: the team, the schedule, the work." },
    next: { caption: "Next: ", accent: "the same drive, a new career." },
  },

  glance: {
    label: "At a glance",
    items: [
      { label: "Cost", value: "Free to learners", note: "Thanks to our partners" },
      { label: "Length", value: "3 months" },
      { label: "Pace", value: "Part-time" },
      {
        label: "Next cohort",
        value: "February 2026",
        // Month only in the design. Unconfirmed: shown until the first day of that month is over.
        when: { startsAt: "2026-02-01T00:00:00-05:00", timeZone: "America/New_York", timeTbd: true },
      },
    ],
  },

  stages: {
    headline: ["Where are you", "in your transition?"],
    intro: "Every athlete leaves the game at a different moment. Pick yours to see where to start.",
    groupLabel: "Where are you in your transition",
    startLabel: "Start with",
    cta: { label: "Apply for the next cohort", href: "#apply" },
    stages: [
      {
        key: "competing",
        label: "Still competing",
        head: "Start now, around training.",
        body: "Part-time sessions fit a training schedule. Begin with one free Beyond Lab, then join a 4-week AI Fundamentals cohort to learn the basics.",
        start: "A Beyond Lab, then Tech+",
      },
      {
        key: "finished",
        label: "Just finished",
        head: "Use the structure you’re used to.",
        body: "The end of a career can leave a gap in your week. A cohort gives you a schedule, a group, and a clear goal while you plan what’s next.",
        start: "The next cohort, start to finish",
      },
      {
        key: "yearsout",
        label: "A few years out",
        head: "It’s not too late.",
        body: "The discipline that got you through your sport still counts. Earn certifications, then use MASS coaching to tell your story in a way tech employers hear.",
        start: "Certifications, then MASS coaching",
      },
    ],
  },

  path: {
    headline: ["One path,", "four steps."],
    intro: "Start with a single free session. Go as far as you want.",
    diagramLabel: "Four steps along one path: try it, get the basics, join Field Ready, start your own",
    steps: [
      { kicker: "Try it", title: "A free Beyond Lab", body: "One 90-minute session to see if tech fits you." },
      {
        kicker: "Get the basics",
        title: "A 4-week AI Fundamentals cohort",
        body: "Four weeks to learn the basics, with an instructor beside you.",
      },
      {
        kicker: "Join Field Ready",
        title: "BEYOND READY + MINDSET COACHING",
        body: "Then join Beyond Ready, an 8-week program that furthers your tech skills, alongside Mindset coaching tailored for your transition from athlete to technologist.",
      },
      {
        kicker: "Start your own",
        title: "Entrepreneurship track",
        body: "For athletes who want to build a business. Coming March 2027.",
        upcoming: true,
      },
    ],
  },

  story: {
    groupLabel: "Choose a learner story",
    thenLabel: "Then",
    nowLabel: "Now",
    // Both quotes are placeholders in the design, so they are left out until the words exist.
    // NOT IN DESIGN: Carla's line. Her story is a placeholder there, so this one is written from
    // the facts on the Impact page. Her photo is the cutout made for the August deck.
    learners: [
      {
        key: "kleon",
        label: "Kleon",
        then: "Basketball",
        now: "Cybersecurity",
        image: {
          src: "/images/v01/kleon.jpg",
          alt: "Kleon Penn in his basketball jersey",
          position: "center 5%",
        },
        name: "Kleon Penn",
        text: "came through Beyond the Game’s first cohort after 15 years in basketball and is building a career in cybersecurity, starting with CompTIA Network+.",
        link: { label: "Read Kleon’s story", href: routes.home },
      },
      {
        key: "carla",
        label: "Carla",
        then: "Basketball",
        now: "Entrepreneurship",
        image: {
          src: "/images/btg/carla-portrait.webp",
          alt: "Carla Cortijo Sánchez in her Puerto Rico jersey, holding a basketball",
          position: "center 8%",
        },
        name: "Carla Cortijo Sánchez",
        text: "came through Beyond the Game’s first cohort after her years in basketball and built an app using AI on her way into entrepreneurship.",
        link: { label: "Read Carla’s story", href: routes.home },
      },
    ],
  },

  team: {
    headline: ["Who you’ll", "work with."],
    intro: "People who have made a career change themselves.",
    people: [
      {
        name: "Ramon Clemente",
        role: "Head of Beyond the Game",
        bio: "20 years in basketball, now with two IT certifications alongside his cohort in under a year.",
        image: {
          src: "/images/v01/ramon.jpg",
          alt: "Ramon Clemente smiling, speaking into a microphone",
          position: "center 12%",
        },
      },
      {
        name: "Angel Aviles",
        role: "Mindset coach",
        bio: "Decades of experience supporting athletes and executives to perform their A-game.",
        image: {
          src: "/images/v01/angel.jpg",
          alt: "Angel Aviles, smiling in a white linen shirt",
          position: "center 0%",
        },
      },
    ],
  },

  faq: {
    headline: "Questions.",
    items: [
      {
        question: "Do I need a tech background?",
        answer: "No. The path starts from zero, with an instructor in every session.",
        open: true,
      },
      { question: "Can I start while I’m still competing?" },
      { question: "What does it cost?" },
      { question: "Who can apply?" },
    ],
  },

  apply: {
    headline: ["Your next", "chapter."],
    body: "Apply in a few minutes on BCC Academy, our learning platform. You finish your forms there after you apply.",
    aside: {
      title: "Next cohort",
      // The design also has "[Date TBC]" above this line. It is left out until there is a date.
      meta: "Free · Part-time",
      cta: { label: "Apply on BCC Academy ↗", href: "https://bccacademy.io", external: true },
    },
    sponsor: {
      strong: "Leagues, teams, and athletic departments",
      rest: " can sponsor a cohort for athletes leaving their sport.",
      link: { label: "Partner with us", href: routes.partner },
    },
  },
};