"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const PRINCIPLE_KEYS = ["enhance", "deepen", "accelerate"] as const;
const COUNTER_KEYS = ["struggle", "constraints", "judgment", "connection"] as const;

export function AIPrinciples() {
  const t = useTranslations("aiPrinciples");

  return (
    <section className="bg-charcoal px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-wider uppercase text-electric-green"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-4xl font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-off-white"
        >
          {t("headline1")}
          <br />
          <span className="text-electric-green">{t("headline2")}</span>
        </motion.h2>

        <div className="mt-16 grid gap-px bg-off-white/10 md:grid-cols-3">
          {PRINCIPLE_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="bg-charcoal p-8 lg:p-10"
            >
              <p
                className="font-mono text-[10px] tracking-wider uppercase text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [{String(i + 1).padStart(2, "0")}]
              </p>
              <p className="mt-4 font-heading text-xl leading-tight text-off-white lg:text-2xl">
                {t(`principles.${key}.use`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-off-white/60">
                {t(`principles.${key}.notTo`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16"
        >
          <div>
            <p
              className="font-mono text-xs tracking-wider uppercase text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("counterLabel")}
            </p>
            <h3 className="mt-4 font-heading text-2xl leading-tight text-off-white lg:text-3xl">
              {t("counterHeadline")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-off-white/60 lg:text-base">
              {t("counterDescription")}
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {COUNTER_KEYS.map((key, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="border-l-2 border-electric-green pl-4 py-1 text-base leading-relaxed text-off-white/80"
              >
                {t(`counter.${key}`)}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
