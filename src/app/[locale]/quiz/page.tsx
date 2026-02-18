"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  ChartBar,
  Lightning,
  Sparkle,
  Lightbulb,
  Hammer,
  Target,
  Shield,
  MagnifyingGlass,
  Heart,
  Star,
  HandFist,
  Backpack,
  Rocket,
  Envelope,
  Compass,
  Lock,
  Desktop,
  ChartLineUp,
  Confetti,
  GraduationCap,
  HeartBreak,
  EyeSlash,
  Prohibit,
  PaintBrush,
  Warning,
  Fire,
  Clipboard,
  Handshake,
  Books,
  Brain,
  Eye,
  Smiley,
  Palette,
  Moon,
  ChatCircle,
  DeviceMobile,
  HandWaving,
  FingerprintSimple,
  Check,
} from "@phosphor-icons/react";

// ============================================
// TYPES
// ============================================

type AgeGroup = "under18" | "18plus" | null;
type Screen = "home" | "capture" | "quiz" | "loading" | "results";
type PersonalityKey =
  | "fixer"
  | "architect"
  | "connector"
  | "creator"
  | "builder"
  | "maker"
  | "strategist"
  | "guardian"
  | "analyst"
  | "healer"
  | "educator"
  | "advocate";

// ============================================
// BACKGROUND IMAGES
// ============================================

const backgrounds = {
  hero: "/images/quiz/hero-home.jpg",
  q1: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80",
  q2: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
  q3: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
  q4: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
  q5: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80",
  results: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80",
};

// ============================================
// ICON COMPONENT FOR CAREER TYPES
// ============================================

function CareerIcon({ type, size = 32, className = "" }: { type: PersonalityKey; size?: number; className?: string }) {
  const props = { size, weight: "bold" as const, className };
  switch (type) {
    case "fixer": return <Wrench {...props} />;
    case "architect": return <ChartBar {...props} />;
    case "connector": return <Lightning {...props} />;
    case "creator": return <Sparkle {...props} />;
    case "builder": return <Lightbulb {...props} />;
    case "maker": return <Hammer {...props} />;
    case "strategist": return <Target {...props} />;
    case "guardian": return <Shield {...props} />;
    case "analyst": return <MagnifyingGlass {...props} />;
    case "healer": return <Heart {...props} />;
    case "educator": return <Star {...props} />;
    case "advocate": return <HandFist {...props} />;
  }
}

// ============================================
// CAREER PATHWAYS WITH REAL DATA
// ============================================

const careers = {
  fixer: {
    name: "The Fixer",
    tagline: "You see problems. You solve them.",
    role: "IT Support Specialist",
    salary: { low: 45000, mid: 58000, high: 75000 },
    timeToComplete: { 2: 8, 4: 4, 6: 3 },
    dayToDay: [
      "Troubleshooting hardware and software issues",
      "Setting up and maintaining computer systems",
      "Helping users solve technical problems",
      "Managing network connectivity and security",
      "Documenting solutions and processes",
    ],
    forYouth: {
      items: ["Workshops", "Code Along", "Summer Camps"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["CompTIA A+", "CompTIA Network+", "Help Desk Fundamentals"],
      cta: "Start IT Track",
      ctaUrl: "#",
    },
    personality: "fixer" as PersonalityKey,
    color: "#1D59FF",
  },
  architect: {
    name: "The Architect",
    tagline: "You see how everything connects.",
    role: "Data Analyst",
    salary: { low: 55000, mid: 75000, high: 95000 },
    timeToComplete: { 2: 10, 4: 5, 6: 4 },
    dayToDay: [
      "Analyzing data to find patterns and insights",
      "Building dashboards and visualizations",
      "Writing SQL queries and Python scripts",
      "Presenting findings to stakeholders",
      "Improving business decisions with data",
    ],
    forYouth: {
      items: ["AI Hive", "Workshops", "Code Along"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Data Analytics", "Python for Data Science", "SQL Fundamentals"],
      cta: "Start Data Track",
      ctaUrl: "#",
    },
    personality: "architect" as PersonalityKey,
    color: "#1D59FF",
  },
  connector: {
    name: "The Connector",
    tagline: "People are your superpower.",
    role: "Salesforce Administrator",
    salary: { low: 60000, mid: 81000, high: 105000 },
    timeToComplete: { 2: 7, 4: 4, 6: 3 },
    dayToDay: [
      "Managing and customizing Salesforce platforms",
      "Training teams on CRM best practices",
      "Building reports and dashboards for sales teams",
      "Automating business workflows",
      "Collaborating with stakeholders across departments",
    ],
    forYouth: {
      items: ["Culture Coded", "Summer Camps", "Workshops"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Salesforce Administrator", "Business Analysis", "CRM Fundamentals"],
      cta: "Start Salesforce Track",
      ctaUrl: "#",
    },
    personality: "connector" as PersonalityKey,
    color: "#FF4C00",
  },
  creator: {
    name: "The Creator",
    tagline: "You make things people love to use.",
    role: "UX Designer",
    salary: { low: 62000, mid: 85000, high: 115000 },
    timeToComplete: { 2: 9, 4: 5, 6: 3 },
    dayToDay: [
      "Designing intuitive user interfaces",
      "Conducting user research and testing",
      "Creating wireframes and prototypes in Figma",
      "Collaborating with developers and product teams",
      "Improving products based on user feedback",
    ],
    forYouth: {
      items: ["Culture Coded", "Code Along", "Summer Camps"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["UX Fundamentals", "Figma Mastery", "Design Thinking"],
      cta: "Start Design Track",
      ctaUrl: "#",
    },
    personality: "creator" as PersonalityKey,
    color: "#1D59FF",
  },
  builder: {
    name: "The Builder",
    tagline: "You'd rather create your own path.",
    role: "Entrepreneur / Freelancer",
    salary: { low: 40000, mid: 75000, high: 150000 },
    timeToComplete: { 2: 6, 4: 3, 6: 2 },
    dayToDay: [
      "Building and launching your own products or services",
      "Finding and serving clients or customers",
      "Managing finances and business operations",
      "Marketing and growing your brand",
      "Wearing many hats and solving problems daily",
    ],
    forYouth: {
      items: ["Code Along", "Workshops", "Summer Camps"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Business Basics", "E-commerce & Shopify", "Freelance Foundations"],
      cta: "Start Business Track",
      ctaUrl: "#",
    },
    personality: "builder" as PersonalityKey,
    color: "#FF4C00",
  },
  maker: {
    name: "The Maker",
    tagline: "You build things that matter.",
    role: "Skilled Trades Professional",
    salary: { low: 42000, mid: 58000, high: 85000 },
    timeToComplete: { 2: 12, 4: 6, 6: 4 },
    dayToDay: [
      "Working with your hands on real projects",
      "Reading blueprints and technical documents",
      "Installing, maintaining, and repairing systems",
      "Problem-solving on job sites",
      "Seeing tangible results of your work daily",
    ],
    forYouth: {
      items: ["Workshops", "Summer Camps", "Code Along"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Trade Exploration", "Apprenticeship Prep", "Technical Certifications"],
      cta: "Explore Trades",
      ctaUrl: "#",
    },
    personality: "maker" as PersonalityKey,
    color: "#1D59FF",
  },
  strategist: {
    name: "The Strategist",
    tagline: "You see the bigger picture.",
    role: "Project Manager",
    salary: { low: 65000, mid: 88000, high: 120000 },
    timeToComplete: { 2: 8, 4: 4, 6: 3 },
    dayToDay: [
      "Leading cross-functional teams to deliver projects",
      "Planning timelines, budgets, and resources",
      "Removing roadblocks for your team",
      "Communicating with stakeholders at all levels",
      "Turning chaos into organized progress",
    ],
    forYouth: {
      items: ["Leadership Initiatives", "Summer Camps", "Workshops"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["PMP Certification", "Agile/Scrum", "Leadership Fundamentals"],
      cta: "Start Management Track",
      ctaUrl: "#",
    },
    personality: "strategist" as PersonalityKey,
    color: "#012966",
  },
  guardian: {
    name: "The Guardian",
    tagline: "You keep things safe and secure.",
    role: "Cybersecurity Analyst",
    salary: { low: 70000, mid: 95000, high: 130000 },
    timeToComplete: { 2: 10, 4: 5, 6: 4 },
    dayToDay: [
      "Monitoring systems for security threats",
      "Investigating suspicious activity",
      "Implementing security protocols",
      "Training teams on security best practices",
      "Staying ahead of hackers and threats",
    ],
    forYouth: {
      items: ["Cyber Clubs", "Workshops", "Summer Camps"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Security+", "Ethical Hacking", "Network Security"],
      cta: "Start Security Track",
      ctaUrl: "#",
    },
    personality: "guardian" as PersonalityKey,
    color: "#1D59FF",
  },
  analyst: {
    name: "The Detective",
    tagline: "You find the truth in the details.",
    role: "Business Intelligence Analyst",
    salary: { low: 58000, mid: 78000, high: 105000 },
    timeToComplete: { 2: 9, 4: 5, 6: 3 },
    dayToDay: [
      "Digging into data to uncover insights",
      "Building reports that drive decisions",
      "Interviewing stakeholders to understand needs",
      "Translating complex findings into simple stories",
      "Spotting trends others miss",
    ],
    forYouth: {
      items: ["Data Clubs", "Workshops", "AI Hive"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Power BI", "Tableau", "Business Analysis"],
      cta: "Start Analytics Track",
      ctaUrl: "#",
    },
    personality: "analyst" as PersonalityKey,
    color: "#FF4C00",
  },
  healer: {
    name: "The Healer",
    tagline: "You help people feel better.",
    role: "Healthcare Tech Specialist",
    salary: { low: 48000, mid: 65000, high: 90000 },
    timeToComplete: { 2: 10, 4: 5, 6: 4 },
    dayToDay: [
      "Supporting healthcare technology systems",
      "Training medical staff on new tools",
      "Ensuring patient data is secure and accessible",
      "Troubleshooting critical healthcare equipment",
      "Making technology work for people who save lives",
    ],
    forYouth: {
      items: ["Health Tech Workshops", "Summer Camps", "STEM Initiatives"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Health IT Certification", "Medical Terminology", "HIPAA Training"],
      cta: "Start Healthcare Tech Track",
      ctaUrl: "#",
    },
    personality: "healer" as PersonalityKey,
    color: "#012966",
  },
  educator: {
    name: "The Guide",
    tagline: "You light the path for others.",
    role: "Technical Trainer / Instructional Designer",
    salary: { low: 52000, mid: 72000, high: 95000 },
    timeToComplete: { 2: 8, 4: 4, 6: 3 },
    dayToDay: [
      "Creating engaging learning experiences",
      "Breaking down complex topics into simple lessons",
      "Coaching individuals to reach their potential",
      "Developing training materials and courses",
      "Watching people grow because of your guidance",
    ],
    forYouth: {
      items: ["Peer Mentoring", "Workshops", "Leadership Initiatives"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Instructional Design", "Adult Learning Theory", "Course Development"],
      cta: "Start Education Track",
      ctaUrl: "#",
    },
    personality: "educator" as PersonalityKey,
    color: "#1D59FF",
  },
  advocate: {
    name: "The Advocate",
    tagline: "You fight for what matters.",
    role: "Community Tech Coordinator",
    salary: { low: 45000, mid: 62000, high: 85000 },
    timeToComplete: { 2: 6, 4: 3, 6: 2 },
    dayToDay: [
      "Bringing technology access to underserved communities",
      "Running digital literacy initiatives",
      "Connecting people with resources and opportunities",
      "Advocating for equitable tech access",
      "Making real impact in people's lives",
    ],
    forYouth: {
      items: ["Community Service", "Leadership Initiatives", "Workshops"],
      cta: "Explore BCC Initiatives",
      ctaUrl: "/",
    },
    forAdult: {
      items: ["Nonprofit Tech", "Digital Inclusion", "Community Organizing"],
      cta: "Start Community Track",
      ctaUrl: "#",
    },
    personality: "advocate" as PersonalityKey,
    color: "#012966",
  },
};

// ============================================
// ANSWER ICON COMPONENT
// ============================================

function AnswerIcon({ name, size = 28, className = "" }: { name: string; size?: number; className?: string }) {
  const props = { size, weight: "bold" as const, className };
  const icons: Record<string, React.ReactNode> = {
    wrench: <Wrench {...props} />,
    "magnifying-glass": <MagnifyingGlass {...props} />,
    "device-mobile": <DeviceMobile {...props} />,
    target: <Target {...props} />,
    shield: <Shield {...props} />,
    star: <Star {...props} />,
    desktop: <Desktop {...props} />,
    "chart-line-up": <ChartLineUp {...props} />,
    party: <Confetti {...props} />,
    rocket: <Rocket {...props} />,
    "hand-fist": <HandFist {...props} />,
    "graduation-cap": <GraduationCap {...props} />,
    "heart-break": <HeartBreak {...props} />,
    "eye-slash": <EyeSlash {...props} />,
    prohibit: <Prohibit {...props} />,
    "paint-brush": <PaintBrush {...props} />,
    warning: <Warning {...props} />,
    fire: <Fire {...props} />,
    lightning: <Lightning {...props} />,
    clipboard: <Clipboard {...props} />,
    handshake: <Handshake {...props} />,
    sparkle: <Sparkle {...props} />,
    books: <Books {...props} />,
    heart: <Heart {...props} />,
    brain: <Brain {...props} />,
    eye: <Eye {...props} />,
    "user-circle": <Smiley {...props} />,
    smiley: <Smiley {...props} />,
    lightbulb: <Lightbulb {...props} />,
    palette: <Palette {...props} />,
    moon: <Moon {...props} />,
    "chat-circle": <ChatCircle {...props} />,
    hammer: <Hammer {...props} />,
    "hand-waving": <HandWaving {...props} />,
    "fingerprint-simple": <FingerprintSimple {...props} />,
    "chart-bar": <ChartBar {...props} />,
  };
  return <>{icons[name] || <Sparkle {...props} />}</>;
}

// ============================================
// QUESTIONS
// ============================================

interface Answer {
  text: string;
  icon: string;
  personality: PersonalityKey;
}

interface Question {
  question: string;
  background: string;
  answers: Answer[];
}

const questions: Question[] = [
  {
    question: "Your friend's computer dies right before a big deadline. What do you do?",
    background: backgrounds.q1,
    answers: [
      { text: "Already grabbing my tools\u2014I got this", icon: "wrench", personality: "fixer" },
      { text: "Let me check what's actually wrong first", icon: "magnifying-glass", personality: "analyst" },
      { text: "I know a guy who can help", icon: "device-mobile", personality: "connector" },
      { text: "Time to make this crisis look organized", icon: "target", personality: "strategist" },
      { text: "This wouldn't have happened with better security...", icon: "shield", personality: "guardian" },
      { text: "Let me walk you through fixing it yourself", icon: "star", personality: "educator" },
    ],
  },
  {
    question: "You just won $10,000. What's your first thought?",
    background: backgrounds.q2,
    answers: [
      { text: "Finally upgrade my setup", icon: "desktop", personality: "fixer" },
      { text: "Invest it and watch it grow", icon: "chart-line-up", personality: "architect" },
      { text: "Throw a party for everyone I love", icon: "party", personality: "connector" },
      { text: "Start that business I've been dreaming about", icon: "rocket", personality: "builder" },
      { text: "Donate to causes that matter", icon: "hand-fist", personality: "advocate" },
      { text: "Pay for someone's education or training", icon: "graduation-cap", personality: "educator" },
    ],
  },
  {
    question: "What would make you quit a job on the spot?",
    background: backgrounds.q3,
    answers: [
      { text: "Being forced to ship something broken", icon: "heart-break", personality: "fixer" },
      { text: "Leadership ignoring the data", icon: "eye-slash", personality: "analyst" },
      { text: "A toxic team that doesn't have each other's backs", icon: "prohibit", personality: "connector" },
      { text: "Zero creative freedom", icon: "paint-brush", personality: "creator" },
      { text: "Seeing people get hurt because corners were cut", icon: "warning", personality: "guardian" },
      { text: "Working for a company that hurts communities", icon: "fire", personality: "advocate" },
    ],
  },
  {
    question: "You're leading a group project. What's your move?",
    background: backgrounds.q4,
    answers: [
      { text: "Jump in and handle the hardest technical part", icon: "lightning", personality: "maker" },
      { text: "Create a clear plan so everyone knows their role", icon: "clipboard", personality: "strategist" },
      { text: "Make sure everyone feels heard and included", icon: "handshake", personality: "connector" },
      { text: "Focus on making the final product look amazing", icon: "sparkle", personality: "creator" },
      { text: "Research everything so we don't make mistakes", icon: "books", personality: "analyst" },
      { text: "Make sure we're building something that helps people", icon: "heart", personality: "healer" },
    ],
  },
  {
    question: "It's 2 AM and you can't sleep. What are you doing?",
    background: backgrounds.q5,
    answers: [
      { text: "Down a rabbit hole learning something new", icon: "brain", personality: "analyst" },
      { text: "Planning my next big move", icon: "moon", personality: "strategist" },
      { text: "Texting friends or scrolling socials", icon: "chat-circle", personality: "connector" },
      { text: "Working on a creative project", icon: "palette", personality: "creator" },
      { text: "Worrying about all the things that could go wrong", icon: "shield", personality: "guardian" },
      { text: "Thinking about how to make tomorrow better for someone", icon: "heart", personality: "advocate" },
    ],
  },
  {
    question: "What compliment hits different for you?",
    background: backgrounds.q1,
    answers: [
      { text: '"You always figure things out"', icon: "brain", personality: "fixer" },
      { text: '"You see things nobody else sees"', icon: "eye", personality: "architect" },
      { text: '"Everyone loves working with you"', icon: "handshake", personality: "connector" },
      { text: '"This is beautiful"', icon: "smiley", personality: "creator" },
      { text: '"You made this from scratch?!"', icon: "lightbulb", personality: "builder" },
      { text: '"You changed my life"', icon: "star", personality: "educator" },
    ],
  },
  {
    question: "Pick your superpower.",
    background: backgrounds.q2,
    answers: [
      { text: "Fix anything with one touch", icon: "hand-waving", personality: "fixer" },
      { text: "See 10 years into the future", icon: "eye", personality: "architect" },
      { text: "Make anyone trust you instantly", icon: "fingerprint-simple", personality: "connector" },
      { text: "Create anything you imagine", icon: "sparkle", personality: "creator" },
      { text: "Be immune to all threats", icon: "shield", personality: "guardian" },
      { text: "Heal anyone's pain", icon: "heart", personality: "healer" },
    ],
  },
];

// ============================================
// COMPONENTS
// ============================================

function HomeScreen({ onSelectAge }: { onSelectAge: (age: AgeGroup) => void }) {
  return (
    <div className="h-[100dvh] flex">
      <div className="w-full lg:w-1/2 h-full bg-cobalt flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-12 py-6 md:py-8 safe-top">
          <div className="font-heading text-off-white text-sm md:text-base tracking-tight">Beyond Code Collective</div>
          <Link href="/" className="text-off-white/80 text-sm hover:text-off-white transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            Back to Home
          </Link>
        </header>

        <div className="flex-1 flex items-center px-4 md:px-12 lg:px-16 pb-6">
          <div className="w-full max-w-xl fade-in">
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-off-white mb-4 md:mb-6 leading-[0.9]">
              Find your path.<br />
              <span className="text-off-white">Build your future.</span>
            </h1>

            <p className="text-base md:text-xl text-off-white/70 mb-6 md:mb-12 leading-relaxed">
              Quick questions. Real career matches. Let&apos;s find what fits you.
            </p>

            <p className="text-off-white/50 text-xs md:text-sm mb-4 md:mb-6" style={{ fontFamily: "var(--font-mono)" }}>[ WHERE ARE YOU IN YOUR JOURNEY? ]</p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => onSelectAge("under18")}
                className="group bg-charcoal border-2 border-off-white/20 px-5 py-5 text-left transition-all hover:border-off-white active:scale-[0.98] md:hover:scale-[1.02] flex-1 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 focus:ring-offset-true-black"
                aria-label="I'm still in school - middle school, high school, or college"
              >
                <div className="text-electric-green mb-2" aria-hidden="true"><Backpack size={28} weight="bold" /></div>
                <div className="text-lg font-semibold text-off-white mb-1">Still in school</div>
                <div className="text-off-white/60 text-sm">Middle school, high school, or college</div>
              </button>

              <button
                onClick={() => onSelectAge("18plus")}
                className="group bg-charcoal border-2 border-off-white/20 px-5 py-5 text-left transition-all hover:border-off-white active:scale-[0.98] md:hover:scale-[1.02] flex-1 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 focus:ring-offset-true-black"
                aria-label="Ready to level up - looking for a new career or skill"
              >
                <div className="text-electric-green mb-2" aria-hidden="true"><Rocket size={28} weight="bold" /></div>
                <div className="text-lg font-semibold text-off-white mb-1">Ready to level up</div>
                <div className="text-off-white/60 text-sm">Looking for a new career or skill</div>
              </button>
            </div>

            <p className="mt-6 md:mt-10 text-off-white/50 text-xs md:text-sm" style={{ fontFamily: "var(--font-mono)" }}>[ 2 MINUTES ] &middot; NO WRONG ANSWERS</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 h-full relative border-l-2 border-off-white/20">
        <Image src={backgrounds.hero} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}

function LeadCaptureScreen({
  onSubmit,
  onSkip
}: {
  onSubmit: (contact: { type: 'email' | 'phone'; value: string }) => void;
  onSkip: () => void;
}) {
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateInput = (input: string, type: 'email' | 'phone') => {
    if (type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    } else {
      return /^[\d\s\-\+\(\)]{10,}$/.test(input.replace(/\s/g, ''));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsValid(validateInput(newValue, contactType));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ type: contactType, value });
    }
  };

  return (
    <div className="h-[100dvh] flex">
      <div className="w-full lg:w-1/2 h-full bg-cobalt flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-12 py-6 md:py-8 safe-top">
          <div className="font-heading text-off-white text-sm md:text-base tracking-tight">Beyond Code</div>
        </header>

        <div className="flex-1 flex items-center px-4 md:px-12 lg:px-16 pb-6">
          <div className="w-full max-w-xl fade-in">
            <div className="text-off-white mb-4 md:mb-6"><Envelope size={48} weight="bold" /></div>
            <h1 className="font-heading text-2xl md:text-4xl text-off-white mb-3 md:mb-4 leading-[0.9]">
              One quick thing
            </h1>
            <p className="text-base md:text-lg text-off-white/70 mb-6 md:mb-8 leading-relaxed">
              Where should we send your personalized results?
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="flex bg-off-white/10 p-1 border border-off-white/20 w-fit">
                <button
                  type="button"
                  onClick={() => { setContactType('email'); setValue(''); setIsValid(false); }}
                  className={`px-5 py-2 text-base font-medium transition-all ${
                    contactType === 'email'
                      ? 'bg-off-white text-cobalt'
                      : 'text-off-white/60 hover:text-off-white'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => { setContactType('phone'); setValue(''); setIsValid(false); }}
                  className={`px-5 py-2 text-base font-medium transition-all ${
                    contactType === 'phone'
                      ? 'bg-off-white text-cobalt'
                      : 'text-off-white/60 hover:text-off-white'
                  }`}
                >
                  Phone
                </button>
              </div>

              <div className="relative">
                <input
                  type={contactType === 'email' ? 'email' : 'tel'}
                  value={value}
                  onChange={handleChange}
                  placeholder={contactType === 'email' ? 'your@email.com' : '(555) 123-4567'}
                  className="w-full bg-white text-true-black placeholder-grey-3 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-electric-green border-0"
                  autoFocus
                />
                {isValid && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cobalt">
                    <Check size={24} weight="bold" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-4 text-lg font-bold transition-all ${
                  isValid
                    ? 'bg-electric-green text-true-black active:bg-electric-green/80 md:hover:bg-electric-green/80 md:hover:scale-[1.02]'
                    : 'bg-off-white/10 text-off-white/30 cursor-not-allowed'
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                LET&apos;S GO &rarr;
              </button>
            </form>

            <button
              onClick={onSkip}
              className="mt-4 md:mt-6 text-off-white/50 hover:text-off-white text-sm transition-colors"
            >
              Skip for now
            </button>

            <p className="mt-6 md:mt-8 text-off-white/40 text-xs flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <Lock size={14} weight="bold" /> NO SPAM. UNSUBSCRIBE ANYTIME.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 h-full relative border-l-2 border-cobalt/20">
        <Image src={backgrounds.hero} alt="" fill className="object-cover" />
      </div>
    </div>
  );
}

function LoadingScreen({ career }: { career: typeof careers[PersonalityKey] }) {
  const [stage, setStage] = useState(0);
  const stages = [
    "Analyzing your answers...",
    "Finding your strengths...",
    "Matching career paths...",
    "Building your roadmap..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="h-[100dvh] bg-cobalt flex items-center justify-center px-4">
      <div className="text-center fade-in">
        <div
          className="flex justify-center mb-6 md:mb-8 animate-bounce text-off-white"
          style={{ animationDuration: '1s' }}
          aria-label={`${career.name} icon`}
        >
          <CareerIcon type={career.personality} size={64} />
        </div>
        <div className="space-y-2 md:space-y-3" role="status" aria-live="polite">
          {stages.map((text, i) => (
            <p
              key={text}
              className={`text-base md:text-lg transition-all duration-300 ${
                i <= stage
                  ? 'text-off-white opacity-100'
                  : 'text-off-white/30'
              }`}
            >
              {i < stage && <span className="text-off-white mr-2" aria-hidden="true"><Check size={16} weight="bold" className="inline" /></span>}
              {i === stage && <span className="text-off-white mr-2" aria-hidden="true">&#9679;</span>}
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (personality: PersonalityKey) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelect = (index: number, personality: PersonalityKey) => {
    setSelected(index);
    setTimeout(() => onAnswer(personality), 400);
  };

  const QUESTION_THEMES = [
    { bg: "#1D59FF", isLight: false },
    { bg: "#FF4C00", isLight: false },
    { bg: "#012966", isLight: false },
    { bg: "#E5F701", isLight: true },
    { bg: "#193F0F", isLight: false },
    { bg: "#000000", isLight: false },
    { bg: "#570000", isLight: false },
  ];
  const theme = QUESTION_THEMES[questionIndex % QUESTION_THEMES.length];
  const currentColor = theme.bg;
  const isLight = theme.isLight;

  return (
    <div className="relative h-[100dvh] overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: currentColor }} />

      <div className="absolute top-0 left-0 right-0 z-50 safe-top">
        <div className={`h-1 ${isLight ? 'bg-true-black/10' : 'bg-off-white/10'}`}>
          <div
            className={`h-full ${isLight ? 'bg-cobalt' : 'bg-electric-green'} transition-all duration-700 ease-out`}
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        <div className="flex justify-center gap-1.5 mt-3 md:mt-6">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 transition-all duration-300 ${
                i < questionIndex
                  ? (isLight ? 'bg-cobalt' : 'bg-electric-green')
                  : i === questionIndex
                  ? `${isLight ? 'bg-true-black' : 'bg-off-white'} w-6 md:w-8`
                  : (isLight ? 'bg-true-black/30' : 'bg-off-white/30')
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-4 pt-14 pb-6 md:py-24">
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full md:h-auto justify-between md:justify-start">
          <div className="flex-shrink-0">
            <div className="text-center mb-3 md:mb-8 fade-in">
              <span
                className={`inline-block px-4 py-1.5 ${isLight ? 'bg-true-black/10 text-true-black/70' : 'bg-off-white/10 text-off-white/70'} text-sm font-medium`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [{String(questionIndex + 1).padStart(2, "0")}] OF [{String(totalQuestions).padStart(2, "0")}]
              </span>
            </div>

            <h2
              className={`font-heading text-xl md:text-4xl lg:text-5xl ${isLight ? 'text-true-black' : 'text-off-white'} text-center mb-4 md:mb-10 leading-[0.9] fade-in px-2`}
              id="question-heading"
            >
              {question.question}
            </h2>
          </div>

          <div className="flex-1 flex flex-col justify-center md:block">
            <div
              className="grid grid-cols-2 gap-2 md:gap-3"
              role="radiogroup"
              aria-labelledby="question-heading"
            >
              {question.answers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i, answer.personality)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(i, answer.personality);
                    }
                  }}
                  disabled={selected !== null}
                  role="radio"
                  aria-checked={selected === i}
                  aria-label={answer.text}
                  className={`group relative text-left p-4 md:p-5 transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 focus:ring-offset-transparent
                    ${selected === i
                      ? (isLight ? 'bg-cobalt text-off-white' : 'bg-electric-green text-true-black') + ' scale-[1.02] shadow-xl'
                      : selected !== null
                      ? (isLight ? 'bg-true-black/5 text-true-black/40' : 'bg-off-white/5 text-off-white/40') + ' scale-[0.98]'
                      : (isLight
                          ? 'bg-true-black/10 backdrop-blur-sm text-true-black active:bg-true-black/20 md:hover:bg-true-black/20'
                          : 'bg-off-white/10 backdrop-blur-sm text-off-white active:bg-off-white/20 md:hover:bg-off-white/20'
                        ) + ' md:hover:scale-[1.02]'
                    }
                    ${hoveredIndex === i && selected === null ? (isLight ? 'shadow-lg shadow-true-black/10' : 'shadow-lg shadow-off-white/10') : ''}
                  `}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className={`${selected === i ? 'text-off-white' : (isLight ? 'text-true-black' : 'text-off-white')}`} aria-hidden="true">
                      <AnswerIcon name={answer.icon} size={28} />
                    </span>
                    <span className="font-medium text-sm md:text-base leading-tight md:leading-snug line-clamp-2">{answer.text}</span>
                  </div>
                  {selected === i && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3" aria-hidden="true">
                      <Check size={24} weight="bold" className={isLight ? "text-off-white/60" : "text-true-black/60"} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <p className={`hidden md:block text-center mt-8 ${isLight ? 'text-true-black/40' : 'text-off-white/40'} text-sm`}>
            Trust your gut. First instinct is usually right.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function ResultsScreen({
  career,
  ageGroup,
  onRestart,
}: {
  career: typeof careers[PersonalityKey];
  ageGroup: AgeGroup;
  onRestart: () => void;
}) {
  const [hoursPerDay, setHoursPerDay] = useState<2 | 4 | 6>(4);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const pathwayInfo = ageGroup === "under18" ? career.forYouth : career.forAdult;
  const months = career.timeToComplete[hoursPerDay];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setChatStarted(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: {
            personalityName: career.name,
            tagline: career.tagline,
            role: career.role,
            salary: career.salary.mid,
            timeToComplete: months,
            hoursPerDay,
            courses: pathwayInfo.items,
          },
        }),
      });

      const data = await response.json();
      if (data.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I had trouble connecting. Try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "Is this the right path for me?",
    "What skills do I need?",
    "How do I get started?",
    "What's the job market like?",
  ];

  // All career colors are now dark - use white text on all role cards
  const roleCardTextClass = "text-off-white";

  return (
    <div className="min-h-[100dvh] flex">
      <div className="w-full lg:w-1/2 min-h-[100dvh] bg-off-white overflow-y-auto pb-24 lg:pb-0">
        <header className="sticky top-0 z-30 bg-off-white border-b border-grey-2 safe-top">
          <div className="px-4 md:px-12 lg:px-16 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-grey-3 hover:text-true-black transition-colors text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              HOME
            </Link>
            <button
              onClick={onRestart}
              className="text-grey-3 hover:text-true-black text-sm font-medium transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label="Retake quiz"
            >
              RETAKE QUIZ
            </button>
          </div>
        </header>

        <div className="px-4 md:px-12 lg:px-16 py-6 md:py-8">
          <div className="mb-6 md:mb-8 fade-in">
            <p className="mb-2 text-xs md:text-sm font-semibold tracking-wide text-cobalt" style={{ fontFamily: "var(--font-mono)" }}>
              [ YOUR PATH ]
            </p>
            <h1 className="font-heading text-3xl md:text-5xl text-true-black tracking-tight mb-2 flex items-center gap-3">
              <span className="text-cobalt"><CareerIcon type={career.personality} size={40} /></span>
              {career.name}
            </h1>
            <p className="text-base md:text-xl text-grey-3 italic">&quot;{career.tagline}&quot;</p>
          </div>

          <div
            className="mb-6 md:mb-8 px-4 md:px-6 py-4 md:py-5"
            style={{ backgroundColor: career.color }}
          >
            <p className={`text-sm font-semibold opacity-80 ${roleCardTextClass}`} style={{ fontFamily: "var(--font-mono)" }}>YOUR IDEAL ROLE</p>
            <p className={`text-xl md:text-2xl font-bold ${roleCardTextClass}`}>{career.role}</p>
            <p className={`text-base md:text-lg opacity-90 mt-1 ${roleCardTextClass}`}>${career.salary.mid.toLocaleString()}/year average</p>
          </div>

          <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 border border-grey-2">
            <h3 className="text-base md:text-lg font-bold text-true-black mb-3 md:mb-4">How long will it take?</h3>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
              <span className="text-grey-3 text-sm">I can spend</span>
              <div className="flex bg-grey-1 p-1">
                {[2, 4, 6].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setHoursPerDay(hours as 2 | 4 | 6)}
                    className={`px-4 py-1.5 text-sm font-medium transition-all ${
                      hoursPerDay === hours ? "bg-cobalt text-off-white" : "text-grey-3"
                    }`}
                  >
                    {hours}
                  </button>
                ))}
              </div>
              <span className="text-grey-3 text-sm">hrs/day</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-cobalt">
              &asymp; {months} Months
            </div>
            <p className="text-grey-3 text-xs mt-2" style={{ fontFamily: "var(--font-mono)" }}>*BASED ON STUDENT AVERAGES</p>
          </div>

          <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 border border-grey-2">
            <h3 className="text-base md:text-lg font-bold text-true-black mb-3 md:mb-4">Salary range</h3>
            <div className="relative h-16 md:h-20 flex items-end gap-0.5 md:gap-1 mb-2">
              {[15, 25, 40, 55, 70, 85, 95, 100, 95, 85, 70].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i === 5 || i === 6 ? career.color : "rgba(29, 89, 255, 0.12)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-grey-3">
              <span>${(career.salary.low / 1000).toFixed(0)}k</span>
              <span className="font-semibold text-true-black">${(career.salary.mid / 1000).toFixed(0)}k</span>
              <span>${(career.salary.high / 1000).toFixed(0)}k</span>
            </div>
          </div>

          <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 border border-grey-2">
            <h3 className="text-base md:text-lg font-bold text-true-black mb-3 md:mb-4">Day-to-day looks like</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {career.dayToDay.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-charcoal text-sm">
                  <span className="mt-0.5 text-cobalt">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 md:mb-8">
            <p className="mb-2 md:mb-3 text-sm font-semibold text-cobalt" style={{ fontFamily: "var(--font-mono)" }}>
              {ageGroup === "under18" ? "[ INITIATIVES FOR YOU ]" : "[ START WITH THESE COURSES ]"}
            </p>
            <div className="flex flex-wrap gap-2">
              {pathwayInfo.items.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 text-sm font-medium border border-cobalt text-cobalt"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Link
            href={pathwayInfo.ctaUrl}
            className="inline-flex items-center justify-center gap-3 bg-cobalt text-off-white text-base md:text-lg font-bold px-6 md:px-8 py-4 transition-all active:scale-95 md:hover:scale-105 w-full md:w-auto"
            style={{ fontFamily: "var(--font-mono)" }}
            aria-label={`Explore ${pathwayInfo.cta}`}
          >
            <span>{pathwayInfo.cta}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Chat Button */}
      <button
        onClick={() => setShowMobileChat(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-electric-green flex items-center justify-center shadow-lg z-40 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 text-true-black"
        aria-label="Open career guide chat"
      >
        <Compass size={28} weight="bold" />
      </button>

      {/* Mobile Chat Panel */}
      {showMobileChat && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-off-white">
          <div className="px-4 py-4 border-b border-grey-2 flex items-center gap-3 safe-top">
            <button
              onClick={() => setShowMobileChat(false)}
              className="p-2 -ml-2 text-grey-3"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-10 h-10 bg-cobalt flex items-center justify-center shadow text-off-white">
              <Compass size={24} weight="bold" />
            </div>
            <div className="flex-1">
              <h3 className="text-true-black font-bold">Career Guide</h3>
              <p className="text-grey-3 text-xs">Ask me anything</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {!chatStarted ? (
              <div className="space-y-4">
                <div className="bg-grey-1 px-3 py-3 border border-grey-2">
                  <p className="text-charcoal text-sm">
                    Questions about <strong className="text-true-black">{career.role}</strong>? I got you.
                  </p>
                </div>
                <div className="space-y-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left px-3 py-2.5 text-sm font-medium bg-grey-1 text-charcoal active:bg-grey-2 border border-grey-2 hover:bg-grey-2"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-2 shadow-sm ${
                      msg.role === "user"
                        ? "bg-cobalt text-off-white"
                        : "bg-white text-true-black border border-grey-2"
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 border border-grey-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-grey-2 bg-grey-1 safe-bottom">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white text-true-black placeholder-grey-3 px-4 py-3 text-sm border border-grey-2"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 text-off-white font-semibold disabled:opacity-50 bg-cobalt"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Chat Panel */}
      <div className="hidden lg:flex w-1/2 h-screen flex-col bg-grey-1 sticky top-0">
        <div className="px-6 py-5 border-b border-grey-2 bg-white flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-cobalt flex items-center justify-center shadow-lg text-off-white">
              <Compass size={28} weight="bold" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cobalt border-2 border-grey-1"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-true-black font-bold text-lg">Your Career Guide</h3>
            <p className="text-grey-3 text-sm">Here to help you navigate</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!chatStarted ? (
            <div className="space-y-6">
              <div className="flex justify-start">
                <div className="bg-off-white/10 px-4 py-3 border border-off-white/10 max-w-[85%]">
                  <p className="text-charcoal text-sm leading-relaxed">
                    Hey! Questions about <strong className="text-true-black">{career.role}</strong>? I got you.
                  </p>
                </div>
              </div>
              <div className="pl-11 space-y-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="block w-full text-left px-4 py-3 text-sm font-medium bg-white text-charcoal hover:bg-grey-2 transition-all border border-grey-2 hover:border-grey-3"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-3 shadow-sm ${
                    msg.role === "user"
                      ? "bg-cobalt text-off-white"
                      : "bg-white text-true-black border border-grey-2"
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-off-white/10 px-4 py-3 border border-off-white/10">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-grey-2 bg-white">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-charcoal text-off-white placeholder-grey-3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cobalt/50 text-sm border border-off-white/20 shadow-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 text-off-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 bg-cobalt shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function GuidanceQuiz() {
  const [screen, setScreen] = useState<Screen>("home");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [contactInfo, setContactInfo] = useState<{ type: 'email' | 'phone'; value: string } | null>(null);
  const [scores, setScores] = useState<Record<PersonalityKey, number>>({
    fixer: 0, architect: 0, connector: 0, creator: 0, builder: 0, maker: 0,
    strategist: 0, guardian: 0, analyst: 0, healer: 0, educator: 0, advocate: 0,
  });

  const handleAgeSelect = (age: AgeGroup) => {
    setAgeGroup(age);
    setCurrentQuestion(0);
    setScores({ fixer: 0, architect: 0, connector: 0, creator: 0, builder: 0, maker: 0, strategist: 0, guardian: 0, analyst: 0, healer: 0, educator: 0, advocate: 0 });
    setScreen("capture");
  };

  const handleContactSubmit = (contact: { type: 'email' | 'phone'; value: string }) => {
    setContactInfo(contact);
    setScreen("quiz");
  };

  const handleContactSkip = () => {
    setScreen("quiz");
  };

  const handleAnswer = (personality: PersonalityKey) => {
    setScores((prev) => ({ ...prev, [personality]: prev[personality] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setScreen("loading");
      setTimeout(() => setScreen("results"), 2800);
    }
  };

  const handleRestart = () => {
    setScreen("home");
    setAgeGroup(null);
    setCurrentQuestion(0);
    setContactInfo(null);
    setScores({ fixer: 0, architect: 0, connector: 0, creator: 0, builder: 0, maker: 0, strategist: 0, guardian: 0, analyst: 0, healer: 0, educator: 0, advocate: 0 });
  };

  const getWinningCareer = () => {
    const entries = Object.entries(scores) as [PersonalityKey, number][];
    const winner = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
    return careers[winner[0]];
  };

  return (
    <>
      <main id="main-content">
        {screen === "home" && <HomeScreen onSelectAge={handleAgeSelect} />}
        {screen === "capture" && (
          <LeadCaptureScreen onSubmit={handleContactSubmit} onSkip={handleContactSkip} />
        )}
        {screen === "quiz" && (
          <QuestionScreen
            key={currentQuestion}
            question={questions[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}
        {screen === "loading" && <LoadingScreen career={getWinningCareer()} />}
        {screen === "results" && (
          <ResultsScreen career={getWinningCareer()} ageGroup={ageGroup} onRestart={handleRestart} />
        )}
      </main>
    </>
  );
}
