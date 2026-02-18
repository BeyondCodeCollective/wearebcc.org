"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PERSONA_KEYS = [
  "forTheFuture",
  "understandingOurWorld",
  "changingDirection",
  "makingADifference",
] as const;

const PERSONA_PHOTOS = [
  { src: "/images/community/community-01.jpg", alt: "Young people learning tech together" },
  { src: "/images/community/community-02.jpg", alt: "Family members engaging with technology" },
  { src: "/images/community/community-03.jpg", alt: "Professional transitioning into tech" },
  { src: "/images/community/community-04.jpg", alt: "Community leaders and partners collaborating" },
];

export function Audience() {
  const t = useTranslations("audience");

  return (
    <section className="bg-off-white px-6 pb-24 lg:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-wider uppercase text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("label")}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 font-heading text-[clamp(1.5rem,4vw,2.5rem)] leading-[0.9] text-true-black"
        >
          {t("headline1")}
          <br />
          {t("headline2")}
        </motion.h3>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PERSONA_KEYS.map((key, i) => {
            const photo = PERSONA_PHOTOS[i];
            const segments: string[] = [];
            let idx = 0;
            while (t.has(`personas.${key}.segments.${idx}`)) {
              segments.push(t(`personas.${key}.segments.${idx}`));
              idx++;
            }

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="group border-l-2 border-cobalt pl-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>

                <h4 className="mt-4 font-heading text-lg leading-tight text-true-black lg:text-xl">
                  {t(`personas.${key}.title`)}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {t(`personas.${key}.description`)}
                </p>

                <p className="mt-3 text-xs italic leading-relaxed text-grey-3">
                  &ldquo;{t(`personas.${key}.quote`)}&rdquo;
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {segments.map((seg) => (
                    <span
                      key={seg}
                      className="bg-cobalt/8 px-2 py-1 font-mono text-[10px] tracking-wider uppercase text-cobalt"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {seg}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
