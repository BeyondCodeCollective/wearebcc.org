"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  PartnerGate,
  PARTNER_GATE_STORAGE_KEY,
} from "@/components/partner-gate";

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
      {children}
    </p>
  );
}

function CatalystContent() {
  const t = useTranslations("partners");

  const stats = t.raw("stats") as { stat: string; label: string }[];
  const credentials = t.raw("credentials") as string[];
  const pillars = t.raw("pillars") as { n: string; title: string; text: string }[];
  const roles = t.raw("roles") as { track: string; title: string; text: string }[];
  const caliber = t.raw("caliber") as { tag: string; text: string }[];
  const steps = t.raw("steps") as { n: string; title: string; text: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-cobalt px-6 pt-36 pb-16 lg:px-8 lg:pt-44 lg:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-electric-green" />
              <MonoLabel className="text-electric-green">{t("badge")}</MonoLabel>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.85] text-off-white">
              {t("heroHeadline1")}
              <br />
              <span className="text-electric-green">{t("heroHeadline2")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-off-white/70 sm:text-lg">
              {t("heroText")}
            </p>
            <a
              href="mailto:catalyst@wearebcc.org"
              className="mt-8 inline-flex items-center gap-2 bg-cobalt px-6 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-off-white hover:text-true-black"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("talkCta")}
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative hidden aspect-[4/3] overflow-hidden lg:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://beyondcode-catalyst.vercel.app/hero.jpg"
              alt={t("heroImageAlt")}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-off-white/10 bg-true-black px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-none text-electric-green">
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

      {/* Hook */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal}>
            <MonoLabel>{t("gapLabel")}</MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.92] text-true-black">
              {t("gapHeadline1")}{" "}
              <span className="text-cobalt">{t("gapHeadline2")}</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-grey-3 sm:text-lg">
              {t("gapText")}{" "}
              <strong className="text-true-black">{t("gapStrong")}</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certified & Screened + Why the model works */}
      <section className="bg-grey-1 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <motion.div {...reveal}>
            <MonoLabel>{t("whoLabel")}</MonoLabel>
            <h3 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-4xl">
              {t("whoHeadline1")}
              <br />
              {t("whoHeadline2")}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-grey-3">
              {t("whoText1")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="border border-true-black/30 bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-true-black"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-6 text-base leading-relaxed text-grey-3">
              {t("whoText2")}
            </p>
            <div className="mt-8 bg-true-black p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  weight="bold"
                  className="text-electric-green"
                />
                <MonoLabel className="text-electric-green">
                  {t("proofLabel")}
                </MonoLabel>
              </div>
              <h4 className="mt-3 font-heading text-xl text-off-white">
                {t("proofHeadline")}
              </h4>
              <p className="mt-2 text-base leading-relaxed text-off-white/85">
                {t("proofText")}
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal} transition={{ delay: 0.15, duration: 0.6 }}>
            <MonoLabel>{t("whyLabel")}</MonoLabel>
            <h3 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-4xl">
              {t("whyHeadline1")}
              <br />
              {t("whyHeadline2")}
            </h3>
            <div className="mt-8 space-y-7">
              {pillars.map((p) => (
                <div key={p.n} className="flex gap-5">
                  <span className="font-heading text-3xl leading-none text-cobalt">
                    {p.n}
                  </span>
                  <div>
                    <h4 className="font-heading text-lg text-true-black">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-base leading-relaxed text-grey-3">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal}>
            <MonoLabel>{t("rolesLabel")}</MonoLabel>
            <h2 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-5xl">
              {t("rolesHeadline1")}
              <br />
              {t("rolesHeadline2")}
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {roles.map((r, i) => (
              <motion.div
                key={r.title}
                {...reveal}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="bg-white p-7"
              >
                <MonoLabel className="text-cobalt">{r.track}</MonoLabel>
                <h3 className="mt-2 font-heading text-2xl text-true-black">
                  {r.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-grey-3">
                  {r.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Caliber */}
      <section className="bg-grey-1 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal}>
            <MonoLabel>{t("caliberLabel")}</MonoLabel>
            <h2 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-5xl">
              {t("caliberHeadline1")}
              <br />
              {t("caliberHeadline2")}
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caliber.map((c, i) => (
              <motion.div
                key={c.tag}
                {...reveal}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
                className="bg-white p-6"
              >
                <MonoLabel className="text-cobalt">{c.tag}</MonoLabel>
                <p className="mt-3 text-base leading-relaxed text-grey-3">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>
          <p
            className="mt-8 font-mono text-xs tracking-wider text-grey-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("caliberNote")}
          </p>
        </div>
      </section>

      {/* How partnership works */}
      <section className="bg-dark-cobalt px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal}>
            <MonoLabel className="text-electric-green">
              {t("stepsLabel")}
            </MonoLabel>
            <h2 className="mt-4 font-heading text-3xl leading-[0.92] text-off-white sm:text-5xl">
              {t("stepsHeadline1")}
              <br />
              {t("stepsHeadline2")}
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                {...reveal}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <MonoLabel className="text-electric-green">{s.n}</MonoLabel>
                <h3 className="mt-3 font-heading text-xl text-off-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-off-white/85">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About + quote */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal}>
            <MonoLabel>{t("aboutLabel")}</MonoLabel>
            <p className="mt-5 text-base leading-relaxed text-grey-3 sm:text-lg">
              {t("aboutText1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-grey-3 sm:text-lg">
              {t("aboutText2")}
            </p>
          </motion.div>
          <motion.blockquote
            {...reveal}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-12 bg-white p-8"
          >
            <p className="text-lg font-medium leading-relaxed text-true-black">
              &ldquo;{t("quoteText")}&rdquo;
            </p>
            <cite
              className="mt-5 block font-mono text-xs uppercase not-italic tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("quoteAttribution")}
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-true-black px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            {...reveal}
            className="max-w-xl font-heading text-3xl leading-[0.92] text-off-white sm:text-4xl"
          >
            {t("ctaHeadline1")}{" "}
            <span className="text-electric-green">{t("ctaHeadline2")}</span>
          </motion.h2>
          <motion.div
            {...reveal}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-mono text-base leading-relaxed text-off-white/85"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("ctaContact")}
            <br />
            <a
              href="mailto:mica@wearebcc.org"
              className="text-electric-green underline-offset-4 hover:underline"
            >
              mica@wearebcc.org
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function PartnersPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(PARTNER_GATE_STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-off-white">
      <Nav variant={unlocked ? "dark" : "light"} />
      {ready ? (
        unlocked ? (
          <CatalystContent />
        ) : (
          <PartnerGate onUnlock={() => setUnlocked(true)} />
        )
      ) : (
        <div className="min-h-[70vh]" />
      )}
      <Footer />
    </div>
  );
}
