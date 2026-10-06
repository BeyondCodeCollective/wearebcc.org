"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Armchair, ArrowDown, ArrowUpRight, Play } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { track } from "@/lib/ga";
import { DONATE_CAMPAIGN, DONATE_VIDEO_ID } from "@/lib/constants";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const;

type Fact = { n: string; t: string };

/** Cycles the people a seat is held for. Static first item under reduced motion. */
function SeatHolder({ holders }: { holders: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % holders.length), 2600);
    return () => clearInterval(id);
  }, [reduce, holders.length]);

  return (
    <span className="relative block min-h-[2.6em] sm:min-h-[1.6em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block font-heading text-[clamp(1.5rem,3.2vw,2.25rem)] normal-case leading-tight tracking-tight text-off-white"
          aria-live="polite"
        >
          {holders[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Marquee of seat holders; stands still under reduced motion. */
function Ticker({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden bg-electric-green py-4" aria-hidden="true">
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, idx) => (
          <span key={idx} className="flex items-center gap-8">
            <span className="font-heading text-xl text-true-black sm:text-2xl">
              {item}
            </span>
            <Armchair size={26} weight="bold" className="text-true-black" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** YouTube slot. Loads the iframe only after a click, so the page stays light. */
function VideoSlot({
  soonTitle,
  soonBody,
  play,
  iframeTitle,
}: {
  soonTitle: string;
  soonBody: string;
  play: string;
  iframeTitle: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (!DONATE_VIDEO_ID) {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 border border-off-white/25 bg-true-black p-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-electric-green text-true-black">
          <Play size={26} weight="fill" />
        </span>
        <p className="font-heading text-2xl text-off-white sm:text-3xl">
          {soonTitle}
        </p>
        <p className="text-base text-off-white/80">{soonBody}</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-true-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${DONATE_VIDEO_ID}?autoplay=1&rel=0`}
          title={iframeTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={play}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${DONATE_VIDEO_ID}/maxresdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-true-black/30 transition-colors group-hover:bg-true-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-electric-green text-true-black transition-transform group-hover:scale-110">
            <Play size={32} weight="fill" />
          </span>
        </button>
      )}
    </div>
  );
}

function FactRow({ n, t, dark }: Fact & { dark?: boolean }) {
  return (
    <div
      className={`grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-t py-4 sm:grid-cols-[9rem_1fr] ${
        dark ? "border-off-white/25" : "border-true-black/25"
      }`}
    >
      <dt className="font-heading text-4xl leading-none sm:text-5xl">{n}</dt>
      <dd className="text-base leading-snug sm:text-lg">{t}</dd>
    </div>
  );
}

export default function DonatePage() {
  const t = useTranslations("donate");
  const holders = t.raw("hero.holders") as string[];
  const people = t.raw("middle.people") as string[];
  const ledger = t.raw("proof.ledger") as Fact[];
  const moment = t.raw("proof.moment") as Fact[];

  return (
    <>
      <Nav variant="dark" />
      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-true-black px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[clamp(3.25rem,10.5vw,6rem)] leading-[0.88] text-electric-green"
              >
                {t("hero.line1")}
                <br />
                {t("hero.line2")}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-10 max-w-xl"
              >
                <p className="text-lg leading-relaxed text-off-white/90">
                  {t("hero.lead")}
                </p>
                <div className="mt-2">
                  <SeatHolder holders={holders} />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="#give"
                  onClick={() => track("donate_click", { source: "donate-hero" })}
                  className="inline-flex items-center justify-center gap-2 bg-electric-green px-7 py-4 font-mono text-xs uppercase tracking-wider text-true-black transition-transform hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("hero.ctaPrimary")}
                  <ArrowDown size={14} weight="bold" />
                </a>
                <a
                  href="#video"
                  className="inline-flex items-center justify-center gap-2 border border-off-white/40 px-7 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-off-white hover:text-true-black"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("hero.ctaSecondary")}
                  <Play size={14} weight="fill" />
                </a>
              </motion.div>
            </div>

            {/* Tilted photo pair; the larger one bleeds toward the page edge */}
            <div className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[32rem] lg:col-span-5 lg:mx-0 lg:h-[36rem] lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, rotate: 0, y: 30 }}
                animate={{ opacity: 1, rotate: -4, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 h-[68%] w-[78%] overflow-hidden"
              >
                <Image
                  src="/images/community/community-02.jpg"
                  alt={t("hero.photoAlt1")}
                  fill
                  sizes="(min-width: 1024px) 28vw, 70vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: 0, y: 30 }}
                animate={{ opacity: 1, rotate: 5, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 right-0 h-[58%] w-[66%] overflow-hidden border-4 border-electric-green lg:-mr-10"
              >
                <Image
                  src="/images/community/community-04.jpg"
                  alt={t("hero.photoAlt2")}
                  fill
                  sizes="(min-width: 1024px) 24vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <Ticker items={holders} />

        {/* ── One sentence ─────────────────────────────────── */}
        <section className="bg-cobalt px-6 py-24 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <motion.p
              {...reveal}
              className="max-w-5xl font-heading text-[clamp(2.25rem,6.5vw,5rem)] normal-case leading-[0.98] tracking-tight text-off-white"
            >
              {t("seat.quote")}
            </motion.p>
            <motion.p
              {...reveal}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-10 max-w-xl text-lg leading-relaxed text-off-white lg:ml-auto"
            >
              {t("seat.body")}
            </motion.p>
          </div>
        </section>

        {/* ── Year-end video ───────────────────────────────── */}
        <section id="video" className="bg-true-black px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div {...reveal} className="lg:col-span-8">
              <VideoSlot
                soonTitle={t("video.soonTitle")}
                soonBody={t("video.soonBody")}
                play={t("video.play")}
                iframeTitle={t("video.iframeTitle")}
              />
            </motion.div>
            <motion.div
              {...reveal}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="lg:col-span-4"
            >
              <h2 className="font-heading text-[clamp(2.25rem,5vw,4rem)] leading-[0.9] text-electric-green">
                {t("video.headline")}
              </h2>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-off-white/90">
                {t("video.body")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── The middle ───────────────────────────────────── */}
        <section className="bg-off-white px-6 py-20 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12">
              <motion.h2
                {...reveal}
                className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.88] text-true-black lg:col-span-7"
              >
                {t("middle.headline1")}
                <br />
                <span className="text-cobalt">{t("middle.headline2")}</span>
              </motion.h2>
              <motion.p
                {...reveal}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-lg leading-relaxed text-true-black lg:col-span-5 lg:pt-3"
              >
                {t("middle.body")}
              </motion.p>
            </div>

            {/* The funding gap, drawn: two funded ends, one starved middle */}
            <motion.div
              {...reveal}
              className="mt-14 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_3fr_1fr]"
            >
              <div className="flex flex-col justify-between border border-true-black/30 p-5">
                <p className="font-heading text-lg leading-tight text-true-black">
                  {t("middle.front")}
                </p>
                <p
                  className="mt-6 font-mono text-xs uppercase tracking-wider text-grey-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("middle.funded")}
                </p>
              </div>
              <div className="flex flex-col justify-between bg-true-black p-6 sm:p-8">
                <p
                  className="font-mono text-xs uppercase tracking-wider text-electric-green"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("middle.midNote")}
                </p>
                <p className="mt-10 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-electric-green">
                  {t("middle.mid")}
                </p>
              </div>
              <div className="flex flex-col justify-between border border-true-black/30 p-5">
                <p className="font-heading text-lg leading-tight text-true-black">
                  {t("middle.back")}
                </p>
                <p
                  className="mt-6 font-mono text-xs uppercase tracking-wider text-grey-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("middle.funded")}
                </p>
              </div>
            </motion.div>

            <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-start">
              <motion.ul {...reveal} className="lg:col-span-6">
                {people.map((p) => (
                  <li
                    key={p}
                    className="border-t border-true-black/25 py-4 font-heading text-[clamp(1.25rem,2.4vw,1.75rem)] normal-case leading-tight tracking-tight text-true-black last:border-b"
                  >
                    {p}
                  </li>
                ))}
                <li className="pt-6 text-lg leading-relaxed text-true-black">
                  {t("middle.close")}
                </li>
              </motion.ul>
              <motion.div
                {...reveal}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="relative aspect-[4/3] overflow-hidden lg:col-span-6 lg:-mr-8 xl:-mr-24"
              >
                <Image
                  src="/images/community/community-03.jpg"
                  alt={t("middle.photoAlt")}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Proof ────────────────────────────────────────── */}
        <section className="bg-electric-green px-6 py-20 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
            <motion.div {...reveal} className="lg:col-span-6">
              <p className="font-heading text-[clamp(5rem,20vw,12rem)] leading-[0.8] text-true-black">
                {t("proof.big")}
              </p>
              <p className="mt-6 max-w-sm font-heading text-[clamp(1.5rem,3vw,2.25rem)] normal-case leading-tight tracking-tight text-true-black">
                {t("proof.bigLabel")}
              </p>
            </motion.div>
            <motion.div
              {...reveal}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-true-black lg:col-span-6"
            >
              <h2 className="font-heading text-2xl">{t("proof.ledgerTitle")}</h2>
              <dl className="mt-4">
                {ledger.map((f) => (
                  <FactRow key={f.n} {...f} />
                ))}
              </dl>
              <h2 className="mt-12 font-heading text-2xl">
                {t("proof.momentTitle")}
              </h2>
              <dl className="mt-4">
                {moment.map((f) => (
                  <FactRow key={f.n} {...f} />
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* ── Give ─────────────────────────────────────────── */}
        <section id="give" className="bg-cobalt px-6 py-20 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <motion.div
              {...reveal}
              className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
            >
              <h2 className="font-heading text-[clamp(3.25rem,9vw,6rem)] leading-[0.86] text-off-white">
                {t("give.headline1")}
                <br />
                <span className="text-electric-green">{t("give.headline2")}</span>
              </h2>
              <p className="mt-8 max-w-sm text-lg leading-relaxed text-off-white">
                {t("give.body")}
              </p>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-off-white/90">
                {t("give.trust")}
              </p>
              <a
                href={`https://donorbox.org/${DONATE_CAMPAIGN}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("donate_click", { source: "donate-fallback" })}
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-wider text-electric-green underline-offset-4 hover:underline"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("give.fallback")}
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="mx-auto w-full max-w-lg bg-off-white p-2 sm:p-4">
                <iframe
                  src={`https://donorbox.org/embed/${DONATE_CAMPAIGN}`}
                  title={t("give.frameTitle")}
                  name="donorbox"
                  allow="payment"
                  loading="lazy"
                  className="h-[960px] w-full border-0 sm:h-[900px]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-true-black">
          <Image
            src="/images/community/community-06.jpg"
            alt={t("close.photoAlt")}
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-28 lg:px-8 lg:py-40">
            <h2 className="font-heading text-[clamp(3rem,10vw,6rem)] leading-[0.86] text-electric-green">
              {t("close.headline")}
            </h2>
            <a
              href="#give"
              onClick={() => track("donate_click", { source: "donate-close" })}
              className="inline-flex items-center gap-2 bg-electric-green px-7 py-4 font-mono text-xs uppercase tracking-wider text-true-black transition-transform hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("close.cta")}
              <ArrowDown size={14} weight="bold" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
