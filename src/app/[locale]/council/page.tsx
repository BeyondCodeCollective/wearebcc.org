"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Lightbulb,
  Briefcase,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { COUNCIL_LEADERSHIP, COUNCIL_MEMBERS } from "@/lib/constants";

const MISSION_ICONS = [Brain, Lightbulb, Briefcase];

export default function Council() {
  const t = useTranslations("council");

  return (
    <div className="min-h-screen bg-off-white">
      {/* Back to BCC */}
      <div className="px-6 py-4 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-true-black/50 transition-colors hover:text-true-black"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft size={14} weight="bold" />
          {t("back")}
        </a>
      </div>

      {/* Hero Text */}
      <section className="px-6 pt-12 pb-12 lg:px-8 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-wider text-cobalt"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("heroLabel")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 max-w-4xl font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[0.85] text-true-black"
          >
            {t("heroHeadline1")}
            <br />
            <span className="text-cobalt">{t("heroHeadline2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-grey-3 sm:text-lg"
          >
            {t("heroDescription")}
          </motion.p>
        </div>
      </section>

      {/* Council Member Photos */}
      <section className="px-6 pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mb-10"
          >
            <p
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("councilLabel")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.85] text-true-black">
              {t("councilHeadline1")}
              <br />
              <span className="text-cobalt">{t("councilHeadline2")}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-grey-3 sm:text-lg">
              {t("councilDescription")}
            </p>
          </motion.div>

          {/* Top row: 4 cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {COUNCIL_MEMBERS.slice(0, 4).map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + 0.1 * i, duration: 0.6 }}
                className="group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.org} — Tech Futures National Council`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="mt-3">
                  <p className="font-heading text-base text-true-black sm:text-lg">
                    {member.name}
                  </p>
                  <p
                    className="mt-1 font-mono text-[10px] tracking-wider text-cobalt"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {member.org.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: 3 cards, centered */}
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:mt-6 lg:grid-cols-4 lg:gap-6">
            <div className="hidden lg:block" />
            {COUNCIL_MEMBERS.slice(4).map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + 0.1 * (i + 4), duration: 0.6 }}
                className="group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.org} — Tech Futures National Council`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="mt-3">
                  <p className="font-heading text-base text-true-black sm:text-lg">
                    {member.name}
                  </p>
                  <p
                    className="mt-1 font-mono text-[10px] tracking-wider text-cobalt"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {member.org.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mica Le John Quote */}
      <section className="bg-cobalt px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-lg leading-relaxed text-off-white/90 italic sm:text-xl lg:text-2xl">
            &ldquo;{t("edQuote")}&rdquo;
          </p>
          <p
            className="mt-8 font-mono text-xs tracking-wider text-off-white/50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("edQuoteName")} &mdash; {t("edQuoteTitle")}
          </p>
        </motion.div>
      </section>

      {/* Leadership Team */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
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
              {t("leadershipLabel")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.85] text-true-black">
              {t("leadershipHeadline1")}
              <br />
              <span className="text-cobalt">{t("leadershipHeadline2")}</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-12">
            {COUNCIL_LEADERSHIP.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className="group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                  <Image
                    src={leader.image}
                    alt={`${leader.name}, ${leader.role}`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[0.9] text-true-black">
                    {leader.name}
                  </p>
                  <p
                    className="mt-2 font-mono text-[10px] tracking-wider text-cobalt"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {leader.role.toUpperCase()}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-grey-3">
                    {t(`leadershipBios.${leader.bio}`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="bg-charcoal px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl border-l-4 border-electric-green pl-6 sm:pl-10"
        >
          <p className="text-lg leading-relaxed text-off-white/90 italic sm:text-xl">
            &ldquo;{t("founderQuote")}&rdquo;
          </p>
          <p
            className="mt-6 font-mono text-xs tracking-wider text-electric-green"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("founderName")} &mdash; {t("founderTitle")}
          </p>
        </motion.div>
      </section>

      {/* Mission Pillars */}
      <section className="bg-grey-1 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
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
              {t("missionLabel")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.85] text-true-black">
              {t("missionHeadline1")}
              <br />
              <span className="text-cobalt">{t("missionHeadline2")}</span>
            </h2>
          </motion.div>

          <div className="mt-12 space-y-12">
            {[0, 1, 2].map((i) => {
              const Icon = MISSION_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.6 }}
                  className="border-l-2 border-cobalt pl-6"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={28} weight="bold" className="text-cobalt" />
                    <p
                      className="font-mono text-xs tracking-wider text-cobalt"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {t(`missionPillars.${i}.label`)}
                    </p>
                  </div>
                  <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.9] text-true-black">
                    {t(`missionPillars.${i}.title`)}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-grey-3">
                    {t(`missionPillars.${i}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
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
