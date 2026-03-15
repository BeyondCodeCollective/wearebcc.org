"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, UsersThree, Path, ArrowsClockwise } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

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
          source: "after-the-game-landing",
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

  // Read program items
  const programItems: string[] = [];
  let pi = 0;
  while (t.has(`programItems.${pi}`)) {
    programItems.push(t(`programItems.${pi}`));
    pi++;
  }

  return (
    <div className="min-h-screen bg-true-black">
      {/* Back to BCC */}
      <div className="px-6 py-4 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-off-white/50 transition-colors hover:text-off-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft size={14} weight="bold" />
          {t("back")}
        </a>
      </div>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-5xl text-center">
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
              src="/images/atg/atg-logo-white.png"
              alt="After The Game"
              width={400}
              height={80}
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
              className="bg-cobalt px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-cobalt/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("joinWaitlist")} &rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-b border-off-white/10 bg-charcoal px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
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
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base leading-relaxed text-off-white/70 sm:text-lg">
              {t("problemText")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-off-white sm:text-lg">
              {t("problemText2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video + text */}
      <section className="border-t border-off-white/10 px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <p
              className="font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("videoLabel")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9] text-off-white">
              {t("videoHeadline1")}
              <br />
              {t("videoHeadline2")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-off-white/60">
              {t("videoDescription")}
            </p>
          </div>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden bg-charcoal">
            <video
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              <source src="/videos/atg-testimonial.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </section>

      {/* The Program — checklist + image */}
      <section className="border-t border-off-white/10 bg-charcoal px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
              {t("programLabel")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9] text-off-white">
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
                  <CheckCircle size={20} weight="fill" className="mt-0.5 flex-shrink-0 text-electric-green" />
                  <p className="text-base leading-relaxed text-off-white/80 sm:text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            <Image
              src="/images/atg/excelling.jpg"
              alt="Confident young professional in a modern workspace"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Classroom + Curriculum + Ecosystem — editorial flow */}
      <section className="border-t border-off-white/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Classroom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-electric-green pl-6"
          >
            <div className="flex items-center gap-3">
              <UsersThree size={28} weight="bold" className="text-electric-green" />
              <p
                className="font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("classroomLabel")}
              </p>
            </div>
            <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.9] text-off-white">
              {t("classroomHeadline1")}
              <br />
              <span className="text-electric-green">{t("classroomHeadline2")}</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-off-white/70">
              {t("classroomText")}
            </p>
          </motion.div>

          {/* Curriculum */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-off-white/30 pl-6"
          >
            <div className="flex items-center gap-3">
              <Path size={28} weight="bold" className="text-off-white" />
              <p
                className="font-mono text-xs tracking-wider text-off-white/60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("curriculumLabel")}
              </p>
            </div>
            <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.9] text-off-white">
              {t("curriculumHeadline1")}
              <br />
              {t("curriculumHeadline2")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-off-white/70">
              {t("curriculumText")}
            </p>
          </motion.div>

          {/* Ecosystem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-electric-green pl-6"
          >
            <div className="flex items-center gap-3">
              <ArrowsClockwise size={28} weight="bold" className="text-electric-green" />
              <p
                className="font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("ecosystemLabel")}
              </p>
            </div>
            <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.9] text-off-white">
              {t("ecosystemHeadline1")}
              <br />
              <span className="text-electric-green">{t("ecosystemHeadline2")}</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-off-white/70">
              {t("ecosystemText")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signup form */}
      <section
        id="signup"
        className="border-t border-off-white/10 bg-charcoal px-6 py-16 lg:px-8 lg:py-24"
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
              <div className="bg-electric-green p-8">
                <p className="font-heading text-3xl text-true-black">
                  {t("successTitle")}
                </p>
                <p className="mt-2 text-true-black/70">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              <>
                <p
                  className="font-mono text-xs tracking-wider text-electric-green"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("formLabel")}
                </p>
                <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9] text-off-white">
                  {t("formHeadline1")}
                  <br />
                  <span className="text-electric-green">{t("formHeadline2")}</span>
                </h2>
                <p className="mt-4 text-sm text-off-white/60">
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
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="tel"
                    placeholder={t("phone")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    disabled={loading}
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white focus:border-cobalt focus:outline-none appearance-none disabled:opacity-50"
                  >
                    <option value="" className="bg-true-black">
                      {t("interestPlaceholder")}
                    </option>
                    <option value="Join" className="bg-true-black">
                      {t("interestJoin")}
                    </option>
                    <option value="Volunteer" className="bg-true-black">
                      {t("interestVolunteer")}
                    </option>
                    <option value="Support" className="bg-true-black">
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
      <footer className="border-t border-off-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a
            href="/"
            className="font-mono text-xs tracking-wider text-off-white/40 transition-colors hover:text-off-white"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("back")}
          </a>
          <p
            className="font-mono text-xs tracking-wider text-off-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &copy; {new Date().getFullYear()} BEYOND CODE COLLECTIVE
          </p>
        </div>
      </footer>
    </div>
  );
}
