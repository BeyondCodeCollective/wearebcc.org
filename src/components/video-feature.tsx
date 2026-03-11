"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function VideoFeature() {
  const t = useTranslations("videoFeature");

  return (
    <section className="bg-true-black px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="font-mono text-xs tracking-wider text-electric-green"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("label")}
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-off-white">
            {t("headline")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 relative aspect-video overflow-hidden"
        >
          <iframe
            src="https://www.youtube.com/embed/MuDYrLFxx5o"
            title={t("headline")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
