"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RESOURCES, FEATURED_VIDEO } from "@/lib/constants";

const RESOURCE_KEYS = ["onePager", "forgeOverview", "brandFlipbook"] as const;

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 1v9m0 0L5 7m3 3l3-3M2 12v1.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 2H3.5A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V10M10 2h4v4M7 9l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Resources() {
  const t = useTranslations("resources");

  return (
    <section id="resources" className="bg-forest-green px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-electric-green">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h2>
            <p
              className="mt-4 font-mono text-xs tracking-wider text-off-white/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("subheading")}
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-off-white/70 sm:text-lg"
        >
          {t("description")}
        </motion.p>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-4 font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("featuredVideo")}
            </p>

            <div className="relative aspect-video overflow-hidden bg-true-black">
              <iframe
                src={FEATURED_VIDEO.embedUrl}
                title={FEATURED_VIDEO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("downloads")}
            </motion.p>

            <div className="space-y-4">
              {RESOURCE_KEYS.map((key, i) => {
                const resource = RESOURCES[i];
                const isExternal = "external" in resource && resource.external;
                return (
                  <motion.a
                    key={key}
                    href={resource.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="group flex items-start gap-3 border border-off-white/10 p-4 transition-all hover:border-electric-green/40 hover:bg-off-white/5 sm:gap-4 sm:p-5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-electric-green/10 transition-colors group-hover:bg-electric-green/20 sm:h-12 sm:w-12">
                      <span
                        className="font-mono text-xs font-bold text-electric-green"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {resource.type}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-base text-off-white transition-colors group-hover:text-electric-green lg:text-lg">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-off-white/70">
                        {t(`items.${key}.description`)}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-off-white/50 transition-colors group-hover:text-electric-green">
                      {isExternal ? <ExternalIcon /> : <DownloadIcon />}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
