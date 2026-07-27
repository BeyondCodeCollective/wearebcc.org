"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  Quotes,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { useContact } from "@/components/contact-modal";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const;

function MonoLabel({
  children,
  className = "text-cobalt",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-wider ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      [ {children} ]
    </p>
  );
}

type Cell = { title: string; text: string };
type Track = { title: string; text: string; tags: string[] };
type Facilitator = { name: string; role?: string; bio: string; photo: string };
type Card = {
  badge: string;
  title: string;
  lead?: string;
  text: string;
  stat?: string;
  statSource?: string;
  cta: string;
  href: string;
  facilitator?: Facilitator;
};
type Stat = { stat: string; label: string };
type Story = { quote: string; name: string; role: string };
type EmployerCard = {
  title1: string;
  title2: string;
  text: string;
  cta: string;
};

export default function CatalystPage() {
  const t = useTranslations("catalyst");
  const { openContact } = useContact();

  const stats = t.raw("stats") as Stat[];
  const cells = t.raw("program.cells") as Cell[];
  const tracks = t.raw("tracks.items") as Track[];
  const cards = t.raw("workshops.cards") as Card[];
  const verticals = t.raw("verticals.items") as string[];
  const results = t.raw("results.stats") as Stat[];
  const stories = t.raw("stories.items") as Story[];
  const interestOptions = t.raw("signup.interestOptions") as string[];
  const employerCards = t.raw("employers.cards") as EmployerCard[];

  const [story, setStory] = useState(0);

  // Signup form
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(interestOptions[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(false);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          segment: interest,
          source: "catalyst-landing",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
      setFormError(true);
    } catch {
      setFormError(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Nav variant="dark" />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-charcoal px-6 pt-36 pb-16 lg:px-8 lg:pt-44 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -10%, rgba(29,89,255,0.35) 0%, rgba(47,47,47,0) 55%), linear-gradient(180deg, #2F2F2F 0%, #000000 100%)",
          }}
        />
        {/* Ambient grid — thin lines drifting slowly upward, faded at the edges */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            opacity: 0.08,
            maskImage:
              "radial-gradient(115% 85% at 50% 0%, #000 15%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(115% 85% at 50% 0%, #000 15%, transparent 65%)",
          }}
          animate={{ backgroundPositionY: ["0px", "-52px"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        {/* A single soft neon beam sweeping down the hero, slowly */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(229,247,1,0.07), transparent)",
          }}
          animate={{ top: ["-20%", "120%"] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2.5,
          }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-[clamp(4rem,16vw,11rem)] leading-[0.8] tracking-tight text-off-white"
          >
            {t("hero.wordmark")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 font-heading text-[clamp(1.5rem,4vw,2.75rem)] leading-[0.95] text-off-white"
          >
            {t("hero.headline1")}{" "}
            <span className="text-electric-green">{t("hero.headline2")}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-off-white/90"
          >
            {t("hero.body")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#signup"
              className="inline-flex items-center gap-2 bg-electric-green px-6 py-4 font-mono text-xs uppercase tracking-wider text-true-black transition-transform hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("hero.ctaPrimary")}
              <ArrowRight size={14} weight="bold" />
            </a>
            <a
              href="#employers"
              className="inline-flex items-center gap-2 border border-off-white/30 px-6 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:border-off-white hover:bg-off-white hover:text-true-black"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stat bar ───────────────────────────────────────── */}
      <section className="bg-true-black px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-[clamp(2rem,6vw,3.5rem)] leading-none text-electric-green">
                {item.stat}
              </p>
              <p
                className="mt-2 font-mono text-xs uppercase tracking-wider text-off-white/75"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The Gap ────────────────────────────────────────── */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <motion.div {...reveal}>
            <MonoLabel>{t("gap.label")}</MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-true-black">
              {t("gap.headline1")}
              <br />
              <span className="text-cobalt">{t("gap.headline2")}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-grey-3">
              {t("gap.body")}
            </p>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden"
            style={{ boxShadow: "12px 12px 0 #1D59FF" }}
          >
            <Image
              src="/images/catalyst/gap.jpg"
              alt={t("gap.imageAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ── The Program ────────────────────────────────────── */}
      <section className="bg-true-black px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal}>
            <MonoLabel className="text-electric-green">
              {t("program.label")}
            </MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-off-white">
              {t("program.headline")}
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-px overflow-hidden border border-off-white/10 bg-off-white/10 sm:grid-cols-2">
            {cells.map((c, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="bg-true-black p-8"
              >
                <h3 className="font-heading text-xl uppercase tracking-tight text-electric-green">
                  {c.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-off-white/85">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Tracks ───────────────────────────────────── */}
      <section className="bg-charcoal px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal}>
            <MonoLabel className="text-electric-green">
              {t("tracks.label")}
            </MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-off-white">
              {t("tracks.headline")}
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tracks.map((tr, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex flex-col border border-off-white/10 bg-true-black p-8"
              >
                <p
                  className="font-mono text-sm text-electric-green"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-heading text-2xl uppercase tracking-tight text-off-white">
                  {tr.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-off-white/85">
                  {tr.text}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tr.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-off-white/15 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-off-white/75"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workshops + Labs ───────────────────────────────── */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal}>
            <MonoLabel>{t("workshops.label")}</MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-true-black">
              {t("workshops.headline1")}
              <br />
              {t("workshops.headline2")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-grey-3">
              {t("workshops.body")}
            </p>
          </motion.div>
          <div className="mt-10 grid items-start gap-4 md:grid-cols-3">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex flex-col border border-true-black/10 bg-white p-8"
              >
                <span
                  className="self-start bg-cobalt px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-off-white"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {card.badge}
                </span>
                <h3 className="mt-5 font-heading text-2xl uppercase tracking-tight text-true-black">
                  {card.title}
                </h3>
                {card.lead && (
                  <p className="mt-3 font-heading text-base leading-snug text-cobalt">
                    {card.lead}
                  </p>
                )}
                <p className="mt-3 text-base leading-relaxed text-grey-3">
                  {card.text}
                </p>
                {card.facilitator && (
                  <div className="mt-5 flex items-start gap-3 border-t border-true-black/10 pt-5">
                    <Image
                      src={card.facilitator.photo}
                      alt={card.facilitator.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0 rounded-full object-cover"
                    />
                    <div>
                      {card.facilitator.role && (
                        <p
                          className="font-mono text-xs uppercase tracking-wider text-cobalt"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {card.facilitator.role}
                        </p>
                      )}
                      <p className="font-heading text-sm uppercase tracking-tight text-true-black">
                        {card.facilitator.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-grey-3">
                        {card.facilitator.bio}
                      </p>
                    </div>
                  </div>
                )}
                {card.stat && (
                  <div className="mt-5 border-l-2 border-electric-green pl-3">
                    <p className="text-xs leading-relaxed text-true-black">
                      {card.stat}
                    </p>
                    {card.statSource && (
                      <p
                        className="mt-1 font-mono text-xs uppercase tracking-wider text-grey-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {card.statSource}
                      </p>
                    )}
                  </div>
                )}
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cobalt transition-colors hover:text-true-black"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {card.cta}
                  <ArrowUpRight size={13} weight="bold" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Verticals ──────────────────────────────────── */}
      <section className="bg-true-black px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div {...reveal}>
            <MonoLabel className="text-electric-green">
              {t("verticals.label")}
            </MonoLabel>
            <h2 className="mx-auto mt-4 max-w-3xl font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-off-white">
              {t("verticals.headline1")}
              <br />
              <span className="text-electric-green">
                {t("verticals.headline2")}
              </span>
            </h2>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {verticals.map((v) => (
              <span
                key={v}
                className="border border-off-white/20 px-4 py-2 font-mono text-xs uppercase tracking-wider text-off-white/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {v}
              </span>
            ))}
          </motion.div>
          <p
            className="mt-8 font-mono text-xs uppercase tracking-wider text-off-white/70"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("verticals.caption")}
          </p>
        </div>
      </section>

      {/* ── The Results ────────────────────────────────────── */}
      <section className="bg-charcoal px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal}>
            <MonoLabel className="text-electric-green">
              {t("results.label")}
            </MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-off-white">
              {t("results.headline")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-off-white/85">
              {t("results.body")}
            </p>
          </motion.div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {results.map((r, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="border-t border-off-white/15 pt-6"
              >
                <p className="font-heading text-[clamp(3rem,8vw,5rem)] leading-none text-electric-green">
                  {r.stat}
                </p>
                <p className="mt-3 text-base leading-relaxed text-off-white/85">
                  {r.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real Stories ───────────────────────────────────── */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal}>
            <MonoLabel>{t("stories.label")}</MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-true-black">
              {t("stories.headline1")}
              <br />
              {t("stories.headline2")}
            </h2>
          </motion.div>
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.figure
                key={story}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="border border-true-black/10 bg-white p-8 lg:p-12"
              >
                <Quotes size={32} weight="fill" className="text-cobalt" />
                <blockquote className="mt-5 font-heading text-xl leading-snug text-true-black lg:text-2xl">
                  {stories[story].quote}
                </blockquote>
                <figcaption
                  className="mt-6 font-mono text-xs uppercase tracking-wider text-grey-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {stories[story].name} · {stories[story].role}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            {stories.length > 1 && (
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() =>
                    setStory((s) => (s - 1 + stories.length) % stories.length)
                  }
                  aria-label="Previous"
                  className="flex h-9 w-9 items-center justify-center border border-true-black/15 text-true-black transition-colors hover:bg-true-black hover:text-off-white"
                >
                  <CaretLeft size={14} weight="bold" />
                </button>
                <button
                  onClick={() => setStory((s) => (s + 1) % stories.length)}
                  aria-label="Next"
                  className="flex h-9 w-9 items-center justify-center border border-true-black/15 text-true-black transition-colors hover:bg-true-black hover:text-off-white"
                >
                  <CaretRight size={14} weight="bold" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Get On The List ────────────────────────────────── */}
      <section id="signup" className="bg-cobalt px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <motion.div {...reveal} className="text-center">
            <MonoLabel className="text-electric-green">
              {t("signup.label")}
            </MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-off-white">
              {t("signup.headline")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-off-white">
              {t("signup.body")}
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-dark-cobalt p-8 text-center"
            >
              <p className="font-heading text-2xl text-electric-green">
                {t("signup.success")}
              </p>
              <p className="mt-2 text-sm text-off-white/90">
                {t("signup.successBody")}
              </p>
            </motion.div>
          ) : (
            <motion.form
              {...reveal}
              transition={{ delay: 0.1, duration: 0.6 }}
              onSubmit={submit}
              className="mt-10 flex flex-col gap-3"
            >
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t("signup.firstName")}
                required
                className="w-full border border-off-white/20 bg-dark-cobalt px-4 py-3 text-sm text-off-white placeholder:text-off-white/60 outline-none focus:border-electric-green"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("signup.email")}
                required
                className="w-full border border-off-white/20 bg-dark-cobalt px-4 py-3 text-sm text-off-white placeholder:text-off-white/60 outline-none focus:border-electric-green"
              />
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                aria-label={t("signup.interestLabel")}
                className="w-full border border-off-white/20 bg-dark-cobalt px-4 py-3 text-sm text-off-white outline-none focus:border-electric-green"
              >
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {formError && (
                <p className="text-sm text-electric-green">
                  {t("signup.error")}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full bg-electric-green px-6 py-4 font-mono text-xs uppercase tracking-wider text-true-black transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {submitting ? "…" : t("signup.submit")}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── Why We Built Catalyst ──────────────────────────── */}
      <section className="bg-true-black px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...reveal}>
            <MonoLabel className="text-electric-green">
              {t("why.label")}
            </MonoLabel>
            <blockquote className="mt-6 font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight text-off-white">
              {t("why.quote")}
            </blockquote>
            <p className="mt-8 font-mono text-xs uppercase tracking-wider text-off-white/75" style={{ fontFamily: "var(--font-mono)" }}>
              {t("why.author")} · {t("why.authorRole")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Hire Ready (employers) ─────────────────────────── */}
      <section id="employers" className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal}>
            <MonoLabel>{t("employers.label")}</MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.85] text-true-black">
              {t("employers.headline")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-grey-3">
              {t("employers.body")}
            </p>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {employerCards.map((card, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex flex-col bg-dark-cobalt p-8 lg:p-10"
              >
                <h3 className="font-heading text-2xl uppercase leading-[0.95] tracking-tight text-off-white">
                  {card.title1}
                  <br />
                  {card.title2}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-off-white/85">
                  {card.text}
                </p>
                <button
                  onClick={() =>
                    openContact({
                      segment:
                        i === 0
                          ? "Catalyst — Hire Grads"
                          : "Catalyst — Partner Access",
                      prefillMessage: t(`employers.cards.${i}.prefill`),
                    })
                  }
                  className="mt-6 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-wider text-electric-green transition-colors hover:text-off-white"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {card.cta}
                  <ArrowUpRight size={13} weight="bold" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
