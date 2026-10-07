"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Script from "next/script";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { track } from "@/lib/ga";
import {
  DONATE_CAMPAIGN,
  DONATE_VIDEO_ID,
  DONATE_VIDEO_POSTER,
  DONATE_VIDEO_SRC,
} from "@/lib/constants";

// Donorbox web component: sizes itself to the form, unlike a fixed-height iframe.
const DboxWidget = "dbox-widget" as unknown as React.ElementType;

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const;

type Fact = { n: string; t: string };

const HERO_PHOTOS = [
  { src: "/images/donate/hero-1.jpg", pos: "50% 30%" },
  { src: "/images/donate/hero-2.jpg", pos: "50% 25%" },
  { src: "/images/donate/hero-3.jpg", pos: "50% 25%" },
  { src: "/images/donate/hero-4.jpg", pos: "50% 28%" },
  { src: "/images/donate/hero-5.jpg", pos: "50% 30%" },
  { src: "/images/donate/hero-6.jpg", pos: "50% 30%" },
  { src: "/images/donate/hero-7.jpg", pos: "50% 35%" },
  { src: "/images/donate/hero-8.jpg", pos: "50% 28%" },
];

/** Crossfading photo stage. Ticks below are the progress bar and the controls. */
function HeroStage({
  photos,
}: {
  photos: { src: string; pos: string; alt: string }[];
}) {
  const reduce = useReducedMotion();
  // `prev` stays fully opaque underneath while `active` fades in on top. Fading
  // both at once dips through the dark background and reads as a flicker.
  const [{ active, prev }, setShown] = useState({ active: 0, prev: -1 });
  const go = (i: number) =>
    setShown((s) => (i === s.active ? s : { active: i, prev: s.active }));
  const [loaded, setLoaded] = useState(0);
  const allLoaded = loaded >= photos.length;

  // Wait for every photo before rotating, so a slow image never pops in mid-fade.
  useEffect(() => {
    if (reduce || !allLoaded) return;
    const id = setInterval(
      () =>
        setShown((s) => ({
          active: (s.active + 1) % photos.length,
          prev: s.active,
        })),
      5200,
    );
    return () => clearInterval(id);
  }, [reduce, allLoaded, photos.length, active]);

  return (
    <div className="mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-none">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-dark-cobalt">
        {photos.map((p, i) => (
          <div
            key={p.src}
            className="absolute inset-0"
            style={{
              opacity: i === active || i === prev ? 1 : 0,
              zIndex: i === active ? 2 : i === prev ? 1 : 0,
              // Plain CSS transition: the incoming photo fades in over the
              // outgoing one, which stays opaque underneath until it is covered.
              transition:
                i === active && !reduce ? "opacity 1100ms ease-in-out" : "none",
            }}
            aria-hidden={i !== active}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              priority={i === 0}
              loading="eager"
              quality={88}
              onLoad={() => setLoaded((n) => n + 1)}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              style={{ objectPosition: p.pos }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`${i + 1} / ${photos.length}`}
            aria-current={i === active}
            className="group flex-1 py-2"
          >
            <span
              className={`block h-1 transition-colors ${
                i === active
                  ? "bg-electric-green"
                  : "bg-off-white/30 group-hover:bg-off-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

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
    <span className="relative block h-[2.5em] text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block font-heading normal-case tracking-tight text-off-white"
          aria-live="polite"
        >
          {holders[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
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

  if (DONATE_VIDEO_SRC) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-true-black">
        {playing ? (
          <video
            src={DONATE_VIDEO_SRC}
            poster={DONATE_VIDEO_POSTER}
            title={iframeTitle}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full bg-true-black"
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
              src={DONATE_VIDEO_POSTER}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-true-black/20 transition-colors group-hover:bg-true-black/0" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-electric-green text-true-black transition-transform group-hover:scale-110">
              <Play size={32} weight="fill" />
            </span>
          </button>
        )}
      </div>
    );
  }

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
  const alts = t.raw("hero.photoAlts") as string[];
  const photos = HERO_PHOTOS.map((p, i) => ({ ...p, alt: alts[i] }));
  const ledger = t.raw("proof.ledger") as Fact[];

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
                  onClick={() =>
                    track("donate_click", { source: "donate-hero" })
                  }
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

            <HeroStage photos={photos} />
          </div>
        </section>

        {/* ── Give ─────────────────────────────────────────── */}
        <section id="give" className="bg-cobalt px-6 py-16 lg:px-8 lg:py-24">
          {/* One ticket: text is the stub, form is the main half, split by a
              perforated tear line. Notches are cobalt circles on the tear line.
              DOM order (text, form, legal) keeps the form high on phones. */}
          <motion.div
            {...reveal}
            className="relative mx-auto grid max-w-6xl bg-off-white lg:grid-cols-[5fr_7fr] lg:grid-rows-[1fr_auto]"
          >
            <div className="p-6 sm:p-10 lg:col-start-1 lg:row-start-1 lg:p-12 lg:pr-14">
              <h2 className="font-heading text-[clamp(3.25rem,9vw,6rem)] leading-[0.86] text-true-black">
                {t("give.headline1")}
                <br />
                <span className="text-cobalt">{t("give.headline2")}</span>
              </h2>
              <p className="mt-8 max-w-md font-heading text-[clamp(1.5rem,2.6vw,2rem)] normal-case leading-tight tracking-tight text-true-black">
                {t("seat.quote")}
              </p>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-true-black/85">
                {t("give.body")}
              </p>
            </div>

            <div className="relative border-y-2 border-dashed border-true-black/30 bg-white p-0 sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:justify-center lg:border-y-0 lg:border-l-2 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute -left-3.5 -top-3.5 z-10 h-7 w-7 rounded-full bg-cobalt"
              />
              <span
                aria-hidden="true"
                className="absolute -right-3.5 -top-3.5 z-10 h-7 w-7 rounded-full bg-cobalt lg:-bottom-3.5 lg:-left-3.5 lg:right-auto lg:top-auto"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-3.5 -left-3.5 z-10 h-7 w-7 rounded-full bg-cobalt lg:hidden"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-3.5 -right-3.5 z-10 h-7 w-7 rounded-full bg-cobalt lg:hidden"
              />
              <div className="w-full max-w-[425px]">
                <DboxWidget
                  campaign={DONATE_CAMPAIGN}
                  type="donation_form"
                  enable-auto-scroll="true"
                />
                <Script
                  src="https://donorbox.org/widgets.js"
                  type="module"
                  strategy="afterInteractive"
                />
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:col-start-1 lg:row-start-2 lg:self-end lg:p-12 lg:pr-14 lg:pt-0">
              <p className="max-w-sm text-sm leading-relaxed text-grey-3">
                {t("give.trust")}
              </p>
              <a
                href={`https://donorbox.org/${DONATE_CAMPAIGN}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("donate_click", { source: "donate-fallback" })
                }
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-wider text-dark-cobalt underline-offset-4 hover:underline"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("give.fallback")}
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* ── Year-end video ───────────────────────────────── */}
        <section
          id="video"
          className="bg-true-black px-6 py-20 lg:px-8 lg:py-28"
        >
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
              <h2 className="font-heading text-2xl">
                {t("proof.ledgerTitle")}
              </h2>
              <dl className="mt-4">
                {ledger.map((f) => (
                  <FactRow key={f.n} {...f} />
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* ── Banner ───────────────────────────────────────── */}
        <section className="bg-true-black px-6 py-12 lg:px-8 lg:py-16">
          <a
            href="#give"
            onClick={() => track("donate_click", { source: "donate-banner" })}
            className="mx-auto block max-w-6xl transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/donate/banner.webp"
              alt={t("banner.alt")}
              width={2400}
              height={880}
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
