"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShuffleText } from "./ui/shuffle-text";
import { Link } from "@/i18n/navigation";
import { useQuiz } from "./quiz-modal";
import { useNewsletter } from "./newsletter-modal";

const FLOATING_FACES = [
  { src: "/images/faces/face-01.jpg", alt: "Learner" },
  { src: "/images/faces/face-02.jpg", alt: "Learner" },
  { src: "/images/faces/face-03.jpg", alt: "Learner" },
  { src: "/images/faces/face-04.jpg", alt: "Learner" },
  { src: "/images/faces/face-05.jpg", alt: "Learner" },
  { src: "/images/faces/face-06.jpg", alt: "Learner" },
  { src: "/images/faces/face-07.jpg", alt: "Learner" },
  { src: "/images/faces/face-08.jpg", alt: "Learner" },
  { src: "/images/faces/face-09.jpg", alt: "Learner" },
  { src: "/images/faces/face-10.jpg", alt: "Learner" },
  { src: "/images/faces/face-11.jpg", alt: "Learner" },
  { src: "/images/faces/face-12.jpg", alt: "Learner" },
];

const FACE_POSITIONS = FLOATING_FACES.map((face, i) => ({
  ...face,
  id: i,
  size: 48 + Math.floor(i % 3) * 20,
  x: (i * 8.3) % 95,
  y: (i * 13 + 5) % 90,
  duration: 10 + (i % 4) * 3,
  delay: i * 0.4,
}));

export function Hero() {
  const { openQuiz } = useQuiz();
  const { openNewsletter } = useNewsletter();
  const t = useTranslations("hero");

  const rotatingWords = [
    t("rotatingWords.0"),
    t("rotatingWords.1"),
    t("rotatingWords.2"),
    t("rotatingWords.3"),
  ];

  return (
    <section className="relative min-h-screen bg-true-black px-6 pt-32 pb-16 lg:px-8 overflow-hidden">
      {/* Floating learner faces background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {FACE_POSITIONS.map((face) => (
          <motion.div
            key={face.id}
            className="absolute overflow-hidden border border-off-white/10"
            style={{
              width: face.size,
              height: face.size,
              left: `${face.x}%`,
              top: `${face.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.12, 0.22, 0.1, 0.18, 0.12],
              y: [0, -20, 8, -12, 0],
              x: [0, 8, -6, 4, 0],
            }}
            transition={{
              duration: face.duration,
              repeat: Infinity,
              delay: face.delay,
              ease: "easeInOut",
            }}
          >
            <Image
              src={face.src}
              alt={face.alt}
              fill
              className="object-cover"
              sizes={`${face.size}px`}
            />
          </motion.div>
        ))}

        <motion.div
          className="absolute right-[-5%] top-[15%] font-heading text-[20rem] leading-none text-off-white/[0.03] select-none lg:text-[30rem]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          [ ]
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.85] text-off-white"
            >
              <ShuffleText text={t("headline1")} delay={200} />
              <br />
              <ShuffleText
                texts={rotatingWords}
                delay={600}
                cycleInterval={15000}
              />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8"
            >
              <p
                className="text-electric-green font-mono text-sm tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("tagline")}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-8 max-w-md text-base leading-relaxed text-grey-2 sm:text-lg"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              {/* Quiz button hidden — re-enable when quiz is ready
              <button
                onClick={() => openQuiz()}
                className="bg-electric-green px-8 py-4 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80 sm:px-10"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("getStarted")} &rarr;
              </button>
              */}
              <Link
                href="/after-the-game"
                className="bg-cobalt px-5 py-3 text-center font-mono text-xs tracking-wider uppercase text-off-white transition-colors hover:bg-cobalt/80 sm:px-8 sm:py-4 sm:text-sm"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                AFTER THE GAME &rarr;
              </Link>
              <button
                onClick={() => openNewsletter()}
                className="border border-off-white/30 px-5 py-3 text-center font-mono text-xs tracking-wider uppercase text-off-white/70 transition-all hover:border-off-white hover:text-off-white sm:px-8 sm:py-4 sm:text-sm"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("joinNewsletter")}
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-h-[500px] overflow-hidden">
              <Image
                src="/images/hero-main.jpg"
                alt="Beyond Code Collective community"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
