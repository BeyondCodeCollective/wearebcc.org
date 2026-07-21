"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, SealCheck, UsersThree, Path } from "@phosphor-icons/react";
import { Nav } from "@/components/nav";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AfterTheGame() {
  const t = useTranslations("atg");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          segment: interest ? `ATG - ${interest}` : "ATG - General",
          source: "beyond-the-game-landing",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to subscribe");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setLoading(false);
    }
  };

  // Read stats array
  const stats: { stat: string; label: string }[] = [];
  let si = 0;
  while (t.has(`problemStats.${si}.stat`)) {
    stats.push({ stat: t(`problemStats.${si}.stat`), label: t(`problemStats.${si}.label`) });
    si++;
  }

  // Read results stats array
  const resultsStats: { stat: string; label: string }[] = [];
  let ri = 0;
  while (t.has(`resultsStats.${ri}.stat`)) {
    resultsStats.push({
      stat: t(`resultsStats.${ri}.stat`),
      label: t(`resultsStats.${ri}.label`),
    });
    ri++;
  }

  const resultsCards = [
    {
      title: t("resultsCard1Title"),
      slug: t("resultsCard1Slug"),
      image: t("resultsCard1Image"),
    },
    {
      title: t("resultsCard2Title"),
      slug: t("resultsCard2Slug"),
      image: t("resultsCard2Image"),
    },
  ];

  const certCourses = [1, 2, 3].map((n) => ({
    title: t(`comptiaCourse${n}Title`),
    detail: t(`comptiaCourse${n}Detail`),
    desc: t(`comptiaCourse${n}Desc`),
    status: t(`comptiaCourse${n}Status`),
    done: n < 3,
  }));

  // Read program items
  const programItems: string[] = [];
  let pi = 0;
  while (t.has(`programItems.${pi}`)) {
    programItems.push(t(`programItems.${pi}`));
    pi++;
  }

  return (
    <div className="min-h-screen bg-true-black">
      <Nav />

      {/* Hero */}
      <section className="relative px-6 pt-28 pb-16 lg:px-8 lg:pt-32 lg:pb-24">
        <Image
          src="/images/atg/atg-hero-panel.jpg"
          alt="Beyond The Game"
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-true-black via-true-black/50 to-true-black/70" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-electric-green animate-pulse" />
              <span
                className="font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("nextCohort")}
              </span>
            </div>
            <Image
              src="/images/btg/btg-logo-white.png"
              alt="Beyond The Game"
              width={1043}
              height={212}
              className="mx-auto h-12 w-auto sm:h-16 lg:h-20"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mx-auto mt-4 font-mono text-xs tracking-wider text-electric-green"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("initiative")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-8 max-w-3xl font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-off-white"
          >
            {t("headline1")}
            <br />
            <span className="text-electric-green">{t("headline2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-off-white/70 sm:text-lg"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#signup"
              className="bg-cobalt px-5 py-3 font-mono text-xs tracking-wider sm:px-8 sm:py-4 sm:text-sm uppercase text-off-white transition-colors hover:bg-cobalt/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("joinWaitlist")} &rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-b border-off-white/10 bg-charcoal px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-[clamp(1.25rem,3vw,2rem)] leading-none text-electric-green">
                {item.stat}
              </p>
              <p
                className="mt-1 font-mono text-[10px] tracking-wider text-off-white/50"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Bridge — why this exists */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base leading-relaxed text-grey-3 sm:text-lg">
              {t("problemText")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-true-black sm:text-lg">
              {t("problemText2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video + text */}
      <section className="bg-grey-1 px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <p
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("videoLabel")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9] text-true-black">
              {t("videoHeadline1")}
              <br />
              {t("videoHeadline2")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-grey-3">
              {t("videoDescription")}
            </p>
            <blockquote className="mt-8 border-l-2 border-cobalt pl-5">
              <p className="text-base font-medium leading-relaxed text-true-black">
                &ldquo;{t("quoteText")}&rdquo;
              </p>
              <cite
                className="mt-3 block font-mono text-[10px] uppercase not-italic tracking-wider text-grey-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("quoteAuthor")} · {t("quoteRole")}
              </cite>
            </blockquote>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/community/community-05.jpg"
              alt="Community members networking at event"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </motion.div>
      </section>

      {/* Results — cohort 1 receipts */}
      <section className="bg-true-black px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ {t("resultsLabel")} ]
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9] text-off-white">
              {t("resultsHeadline1")}
              <br />
              <span className="text-electric-green">{t("resultsHeadline2")}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-off-white/70">
              {t("resultsText")}
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {resultsStats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="border border-off-white/10 bg-charcoal p-6"
              >
                <p className="font-heading text-4xl leading-none text-electric-green">
                  {item.stat}
                </p>
                <p
                  className="mt-2 font-mono text-[10px] uppercase tracking-wider text-off-white/50"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {resultsCards.map((card, i) => (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
              >
                <Link href={`/news/${card.slug}`} className="group block">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                  <p className="mt-4 font-heading text-xl leading-tight text-off-white">
                    {card.title}
                  </p>
                  <p
                    className="mt-2 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-electric-green"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {t("resultsRead")}
                    <ArrowUpRight size={14} weight="bold" />
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Program — checklist + image */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("programLabel")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9] text-true-black">
              {t("programHeadline1")}
              <br />
              {t("programHeadline2")}
            </h2>

            <div className="mt-10 space-y-4">
              {programItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-cobalt" />
                  <p className="text-base leading-relaxed text-grey-3 sm:text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-true-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
                <source src="/videos/atg-program.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-4">
              <p className="font-heading text-lg text-true-black">Ramón Clemente</p>
              <p
                className="font-mono text-[10px] tracking-wider text-grey-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                HEAD OF AFTER THE GAME
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Classroom + Curriculum + Ecosystem — editorial flow */}
      <section className="bg-grey-1 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Classroom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-cobalt pl-6"
          >
            <div className="flex items-center gap-3">
              <UsersThree size={28} weight="bold" className="text-cobalt" />
              <p
                className="font-mono text-xs tracking-wider text-cobalt"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("classroomLabel")}
              </p>
            </div>
            <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.9] text-true-black">
              {t("classroomHeadline1")}
              <br />
              <span className="text-cobalt">{t("classroomHeadline2")}</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-grey-3">
              {t("classroomText")}
            </p>
          </motion.div>

          {/* Curriculum */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-cobalt pl-6"
          >
            <div className="flex items-center gap-3">
              <Path size={28} weight="bold" className="text-cobalt" />
              <p
                className="font-mono text-xs tracking-wider text-cobalt"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("curriculumLabel")}
              </p>
            </div>
            <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.9] text-true-black">
              {t("curriculumHeadline1")}
              <br />
              {t("curriculumHeadline2")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-grey-3">
              {t("curriculumText")}
            </p>
          </motion.div>

          {/* Certification tracks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-cobalt pl-6"
          >
            <div className="flex items-center gap-3">
              <SealCheck size={28} weight="bold" className="text-cobalt" />
              <p
                className="font-mono text-xs tracking-wider text-cobalt"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("comptiaLabel")}
              </p>
            </div>
            <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.9] text-true-black">
              {t("comptiaHeadline1")}
              <br />
              <span className="text-cobalt">{t("comptiaHeadline2")}</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-grey-3">
              {t("comptiaText")}
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {certCourses.map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex flex-col bg-white p-6"
                >
                  <span
                    className={`self-start px-2.5 py-1 font-mono text-[10px] tracking-wider ${
                      course.done
                        ? "bg-true-black text-electric-green"
                        : "bg-cobalt text-off-white"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {course.status}
                  </span>
                  <p className="mt-4 font-heading text-lg leading-tight text-true-black">
                    {course.title}
                  </p>
                  <p
                    className="mt-1 font-mono text-[10px] tracking-wider text-grey-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {course.detail}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-grey-3">
                    {course.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Signup form */}
      <section
        id="signup"
        className="bg-off-white px-6 py-16 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {submitted ? (
              <div className="bg-cobalt p-8">
                <p className="font-heading text-3xl text-off-white">
                  {t("successTitle")}
                </p>
                <p className="mt-2 text-off-white/80">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              <>
                <p
                  className="font-mono text-xs tracking-wider text-cobalt"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("formLabel")}
                </p>
                <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9] text-true-black">
                  {t("formHeadline1")}
                  <br />
                  <span className="text-cobalt">{t("formHeadline2")}</span>
                </h2>
                <p className="mt-4 text-sm text-grey-3">
                  {t("formDescription")}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 flex flex-col gap-3 text-left"
                >
                  <input
                    type="text"
                    required
                    placeholder={t("firstName")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                    className="w-full border border-true-black/15 bg-white px-4 py-3 text-true-black placeholder:text-true-black/40 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full border border-true-black/15 bg-white px-4 py-3 text-true-black placeholder:text-true-black/40 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="tel"
                    placeholder={t("phone")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="w-full border border-true-black/15 bg-white px-4 py-3 text-true-black placeholder:text-true-black/40 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    disabled={loading}
                    className="w-full border border-true-black/15 bg-white px-4 py-3 text-true-black focus:border-cobalt focus:outline-none appearance-none disabled:opacity-50"
                  >
                    <option value="" className="bg-white">
                      {t("interestPlaceholder")}
                    </option>
                    <option value="Join" className="bg-white">
                      {t("interestJoin")}
                    </option>
                    <option value="Volunteer" className="bg-white">
                      {t("interestVolunteer")}
                    </option>
                    <option value="Support" className="bg-white">
                      {t("interestSupport")}
                    </option>
                  </select>
                  {error && (
                    <p className="font-mono text-xs text-orange">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cobalt px-6 py-3 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-cobalt/80 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {loading ? t("submitting") : t("submit")}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-true-black/10 bg-off-white px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a
            href="/"
            className="font-mono text-xs tracking-wider text-true-black/40 transition-colors hover:text-true-black"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("back")}
          </a>
          <p
            className="font-mono text-xs tracking-wider text-true-black/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &copy; {new Date().getFullYear()} BEYOND CODE COLLECTIVE
          </p>
        </div>
      </footer>
    </div>
  );
}
