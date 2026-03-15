"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Globe,
  Lightning,
  LockOpen,
  MapPin,
  CalendarBlank,
  Clock,
  Buildings,
  Chalkboard,
  UsersThree,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const GALLERY_IMAGES = [
  { src: "/images/forge/hero.jpg", alt: "The Forge opening event community gathering" },
  { src: "/images/community/community-01.jpg", alt: "AI Fundamentals Fellowship classroom session" },
  { src: "/images/community/community-02.jpg", alt: "Young BCC community members" },
  { src: "/images/community/community-05.jpg", alt: "Workshop planning session" },
  { src: "/images/community/community-06.jpg", alt: "Collaborative learning at Beyond Code" },
];

// Placeholder — replace with actual Eventbrite URL once live
const EVENTBRITE_URL = "#";

export default function TheForge() {
  const t = useTranslations("forge");
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
          segment: interest ? `Forge - ${interest}` : "Forge - General",
          source: "the-forge-landing",
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

  // Read arrays from translations
  const pillars: { title: string; description: string }[] = [];
  let pi = 0;
  while (t.has(`pillars.${pi}.title`)) {
    pillars.push({ title: t(`pillars.${pi}.title`), description: t(`pillars.${pi}.description`) });
    pi++;
  }

  const programmingTypes: { title: string; description: string; format: string; audience: string }[] = [];
  let pti = 0;
  while (t.has(`programmingTypes.${pti}.title`)) {
    programmingTypes.push({
      title: t(`programmingTypes.${pti}.title`),
      description: t(`programmingTypes.${pti}.description`),
      format: t(`programmingTypes.${pti}.format`),
      audience: t(`programmingTypes.${pti}.audience`),
    });
    pti++;
  }

  const steps: { step: string; title: string; description: string }[] = [];
  let si = 0;
  while (t.has(`howItWorksSteps.${si}.step`)) {
    steps.push({
      step: t(`howItWorksSteps.${si}.step`),
      title: t(`howItWorksSteps.${si}.title`),
      description: t(`howItWorksSteps.${si}.description`),
    });
    si++;
  }

  const pillarIcons = [
    <Users key="users" size={28} weight="bold" />,
    <Globe key="globe" size={28} weight="bold" />,
    <Lightning key="lightning" size={28} weight="bold" />,
    <LockOpen key="lock" size={28} weight="bold" />,
  ];

  return (
    <div className="min-h-screen bg-off-white">
      {/* Back to BCC */}
      <div className="absolute top-0 left-0 z-20 px-6 py-4 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-off-white/70 transition-colors hover:text-off-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft size={14} weight="bold" />
          {t("back")}
        </a>
      </div>

      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] overflow-hidden bg-true-black">
        <Image
          src="/images/forge/hero.jpg"
          alt="The Forge community event with diverse attendees"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-true-black via-true-black/40 to-transparent" />

        <div className="relative z-10 flex min-h-[70vh] flex-col justify-end px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="mx-auto w-full max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("initiative")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-4"
            >
              <Image
                src="/images/forge/forge-logo-white.png"
                alt="The Forge"
                width={400}
                height={50}
                className="h-10 w-auto sm:h-14 lg:h-16"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-2 font-heading text-[clamp(1.25rem,3vw,2rem)] leading-[0.9] text-cobalt"
            >
              {t("headline1")}
              <br />
              {t("headline2")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-off-white/70 sm:text-lg"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <a
                href="#programming"
                className="inline-block bg-cobalt px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-cobalt/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("learnMore")} &rarr;
              </a>
              <a
                href={EVENTBRITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-off-white/30 px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:border-off-white hover:bg-off-white/5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("eventbriteCta")}
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── The Forge: ATL — residency / programming / how it works ─── */}
      <section id="programming" className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Intro — two-column with image */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
                {t("atlLabel")}
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.85] text-true-black">
                {t("atlHeadline1")}
                <br />
                <span className="text-cobalt">{t("atlHeadline2")}</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-grey-3 sm:text-lg">
                {t("atlText")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <Image
                src="/images/community/community-01.jpg"
                alt="AI Fundamentals Fellowship classroom at The Forge"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-true-black/30 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* ATL residency details */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Buildings size={24} weight="bold" />, text: t("atlPartner"), href: undefined },
              { icon: <Clock size={24} weight="bold" />, text: t("atlSchedule"), href: undefined },
              { icon: <CalendarBlank size={24} weight="bold" />, text: t("atlDates"), href: undefined },
              { icon: <MapPin size={24} weight="bold" />, text: t("atlLocation"), href: "https://www.google.com/maps/search/Georgia+Tech+ATDC+Atlanta+GA" },
            ].map((item, i) => {
              const content = (
                <>
                  <div className="text-cobalt">{item.icon}</div>
                  <p className={`mt-3 text-sm leading-relaxed text-grey-3 ${item.href ? "underline decoration-cobalt/30 underline-offset-2" : ""}`}>{item.text}</p>
                </>
              );
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="border border-true-black/10 bg-grey-1 p-6"
                >
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Programming types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 border-t border-grey-2 pt-12"
          >
            <p
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("programmingLabel")}
            </p>
            <h3 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.85] text-true-black">
              {t("programmingHeadline1")}{" "}
              <span className="text-cobalt">{t("programmingHeadline2")}</span>
            </h3>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {programmingTypes.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="flex flex-col border-t-4 border-cobalt bg-true-black p-8"
              >
                <div className="flex items-center gap-3 text-cobalt">
                  {i === 0 ? (
                    <Chalkboard size={28} weight="bold" />
                  ) : (
                    <UsersThree size={28} weight="bold" />
                  )}
                  <h3 className="font-heading text-2xl text-off-white">{prog.title}</h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-off-white/70">
                  {prog.description}
                </p>
                <div className="mt-6 flex gap-4">
                  <span
                    className="font-mono text-[10px] tracking-wider text-cobalt"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {prog.format}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-wider text-off-white/40"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {prog.audience}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-sm text-grey-3 italic"
          >
            {t("programmingNote")}
          </motion.p>

          {/* How it works steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 border-t border-grey-2 pt-12"
          >
            <p
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("howItWorksLabel")}
            </p>
            <h3 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.85] text-true-black">
              {t("howItWorksHeadline1")}{" "}
              <span className="text-cobalt">{t("howItWorksHeadline2")}</span>
            </h3>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * i, duration: 0.5 }}
                className="relative"
              >
                <p className="font-heading text-5xl text-cobalt/20">{step.step}</p>
                <h4 className="mt-1 font-heading text-lg text-true-black">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-grey-3">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="absolute top-6 -right-3 hidden text-cobalt/30 lg:block">
                    <ArrowRight size={20} weight="bold" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10"
          >
            <a
              href={EVENTBRITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cobalt px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-cobalt/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("viewCalendar")}
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Founder quote ─── */}
      <section className="bg-cobalt px-6 py-12 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-lg leading-relaxed italic text-off-white/90 sm:text-xl lg:text-2xl">
            &ldquo;{t("quoteText")}&rdquo;
          </p>
          <p
            className="mt-6 font-mono text-xs tracking-wider text-off-white/60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("quoteAuthor")} &mdash; {t("quoteRole")}
          </p>
        </motion.div>
      </section>

      {/* ─── Our Community + Built for Everyone ─── */}
      <section className="bg-true-black px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left — headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <p
                className="font-mono text-xs tracking-wider text-cobalt"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("pillarsLabel")}
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.85] text-off-white">
                {t("pillarsHeadline1")}
                <br />
                <span className="text-cobalt">{t("pillarsHeadline2")}</span>
              </h2>
            </motion.div>

            {/* Right — pillars as stacked rows */}
            <div className="space-y-8 lg:col-span-3">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex gap-5 border-l-2 border-cobalt pl-6"
                >
                  <div className="shrink-0 pt-0.5 text-cobalt">{pillarIcons[i]}</div>
                  <div>
                    <h3 className="font-heading text-lg text-off-white">{pillar.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-off-white/60">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo gallery */}
        <div className="mt-16 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-6 lg:px-8" style={{ width: "max-content" }}>
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="relative h-[280px] w-[400px] flex-shrink-0 overflow-hidden sm:h-[340px] sm:w-[480px]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="480px"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Eventbrite CTA band ─── */}
      <section className="bg-cobalt px-6 py-10 lg:px-8 lg:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-heading text-[clamp(1.5rem,3vw,2rem)] leading-[0.9] text-off-white">
              {t("programmingHeadline1")} {t("programmingHeadline2")}
            </p>
            <p className="mt-1 text-sm text-off-white/70">{t("programmingNote")}</p>
          </div>
          <a
            href={EVENTBRITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border-2 border-off-white px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-off-white hover:text-cobalt"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("eventbriteCta")}
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>
      </section>

      {/* ─── Signup form ─── */}
      <section id="signup" className="bg-true-black px-6 py-16 lg:px-8 lg:py-24">
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
                <p className="font-heading text-3xl text-off-white">{t("successTitle")}</p>
                <p className="mt-2 text-off-white/80">{t("successMessage")}</p>
              </div>
            ) : (
              <>
                <p
                  className="font-mono text-xs tracking-wider text-cobalt"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("formLabel")}
                </p>
                <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9] text-off-white">
                  {t("formHeadline1")}
                  <br />
                  <span className="text-cobalt">{t("formHeadline2")}</span>
                </h2>
                <p className="mt-4 text-sm text-off-white/60">{t("formDescription")}</p>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 text-left">
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
                    className="w-full appearance-none border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white focus:border-cobalt focus:outline-none disabled:opacity-50"
                  >
                    <option value="" className="bg-true-black">
                      {t("interestPlaceholder")}
                    </option>
                    <option value="Attend" className="bg-true-black">
                      {t("interestAttend")}
                    </option>
                    <option value="Volunteer" className="bg-true-black">
                      {t("interestVolunteer")}
                    </option>
                    <option value="Partner" className="bg-true-black">
                      {t("interestPartner")}
                    </option>
                    <option value="Enroll Child" className="bg-true-black">
                      {t("interestEnroll")}
                    </option>
                  </select>
                  {error && <p className="font-mono text-xs text-orange">{error}</p>}
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

      {/* ─── Footer ─── */}
      <footer className="border-t border-true-black/10 bg-off-white px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
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
