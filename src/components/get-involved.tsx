"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";

export function GetInvolved() {
  const t = useTranslations("getInvolved");

  return (
    <section
      id="get-involved"
      className="bg-electric-green px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-[clamp(3rem,8vw,7rem)] leading-[0.85] text-true-black"
        >
          {t("headline1")}
          <br />
          {t("headline2")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-base leading-relaxed text-true-black/80 sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:info@wearebcc.org"
              className="inline-flex items-center justify-center gap-2 bg-true-black px-5 py-3 font-mono text-xs tracking-wider uppercase text-off-white transition-colors hover:bg-charcoal sm:px-8 sm:py-4 sm:text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("cta")}
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
