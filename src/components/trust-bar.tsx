"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EMPLOYER_LOGOS } from "./ui/brand-logos";

export function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="border-b border-grey-2/50 bg-off-white px-6 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-wider uppercase text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("label")}
        </motion.p>

        <div className="mt-4 relative overflow-hidden">
          <div className="flex animate-scroll items-center gap-10 whitespace-nowrap sm:gap-16">
            {[...EMPLOYER_LOGOS, ...EMPLOYER_LOGOS].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-5 w-auto opacity-30 transition-opacity hover:opacity-100 sm:h-7"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
