"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const RESIDENCY_KEYS = ["atlanta", "newYork", "losAngeles"] as const;
const TEST_KEYS = ["detroit", "newJersey", "oakland"] as const;
const ACTIVE_KEYS = ["virginia", "puertoRico", "palmBeach"] as const;

type CityRow = {
  label: string;
  cityKeys: readonly string[];
  groupKey: string;
};

export function WhereWereBuilding() {
  const t = useTranslations("whereWereBuilding");

  const groups: CityRow[] = [
    { label: t("residencyLabel"), cityKeys: RESIDENCY_KEYS, groupKey: "residency" },
    { label: t("testLabel"), cityKeys: TEST_KEYS, groupKey: "test" },
    { label: t("activeLabel"), cityKeys: ACTIVE_KEYS, groupKey: "active" },
  ];

  return (
    <section className="bg-true-black px-6 py-24 lg:px-8 lg:py-32">
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

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-off-white"
          >
            {t("headline1")}
            <br />
            <span className="text-electric-green">{t("headline2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-md text-base leading-relaxed text-off-white/70 lg:text-lg"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {groups.map((group, gi) => (
            <motion.div
              key={group.groupKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * gi, duration: 0.6 }}
              className="border-t border-off-white/10 pt-8"
            >
              <p
                className="font-mono text-xs tracking-wider uppercase text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [{String(gi + 1).padStart(2, "0")}] {group.label}
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.cityKeys.map((cityKey) => (
                  <div key={cityKey}>
                    <p className="font-heading text-2xl text-off-white lg:text-3xl">
                      {t(`cities.${cityKey}.name`)}
                    </p>
                    <p className="mt-1 text-sm text-off-white/60">
                      {t(`cities.${cityKey}.detail`)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
