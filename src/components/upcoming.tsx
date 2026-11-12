"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Access = "open" | "invite";
type EventKey = "dialoguesMorey" | "dialoguesBoyd" | "musicLab" | "catalystLab" | "olderAdultLab" | "githubSchools" | "fieldReadyLab";
type MonthKey = "nov" | "dec" | "jan";

// Dates, access and links live here; all visible copy lives in landing.json ("upcoming").
const EVENTS: { key: EventKey; month: MonthKey; access: Access; href?: string; external?: boolean }[] = [
  { key: "dialoguesMorey", month: "nov", access: "open", href: "https://www.linkedin.com/events/7521236923525500928", external: true },
  { key: "dialoguesBoyd", month: "nov", access: "open" },
  { key: "musicLab", month: "nov", access: "invite" },
  { key: "catalystLab", month: "nov", access: "open", href: "https://bccacademy.io/bcc/catalyst-labs", external: true },
  { key: "olderAdultLab", month: "dec", access: "invite" },
  { key: "githubSchools", month: "dec", access: "invite" },
  { key: "fieldReadyLab", month: "dec", access: "open", href: "/field-ready" },
];

const MONTHS: MonthKey[] = ["nov", "dec", "jan"];

const ctaClass =
  "mt-5 inline-flex items-center gap-2 bg-electric-green px-5 py-2.5 font-mono text-xs tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80";

export function Upcoming() {
  const t = useTranslations("upcoming");

  return (
    <section id="upcoming" className="bg-off-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-base tracking-wider uppercase text-cobalt"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-4 font-heading text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.88] tracking-tight text-true-black"
        >
          {t("headline1")}
          <br />
          <span className="text-cobalt">{t("headline2")}</span>
        </motion.h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-true-black/80 lg:text-lg">
          {t("description")}
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {MONTHS.map((month, mi) => {
            const events = EVENTS.filter((e) => e.month === month);
            return (
              <div key={month}>
                <p
                  className="border-b-2 border-true-black pb-3 font-mono text-sm tracking-[0.2em] uppercase text-true-black"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t(`months.${month}`)}
                </p>

                <div className="mt-2 divide-y divide-true-black/15">
                  {events.map((ev, i) => (
                    <motion.article
                      key={ev.key}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.1 * (i + mi), duration: 0.5 }}
                      className="flex gap-5 py-6"
                    >
                      <p className="w-14 shrink-0 font-heading text-5xl leading-none text-cobalt">
                        {t(`events.${ev.key}.day`)}
                      </p>
                      <div className="min-w-0">
                        <span
                          className={`inline-block px-2.5 py-1 font-mono text-[11px] tracking-wider uppercase ${
                            ev.access === "open"
                              ? "bg-electric-green text-true-black"
                              : "border border-true-black/40 text-true-black/70"
                          }`}
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {t(`tags.${ev.access}`)}
                        </span>
                        <h3 className="mt-3 font-heading text-[1.6rem] leading-[0.95] text-true-black">
                          {t(`events.${ev.key}.title`)}
                        </h3>
                        <p
                          className="mt-2 font-mono text-xs tracking-wider uppercase text-true-black/70"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {t(`events.${ev.key}.meta`)}
                          {t.has(`events.${ev.key}.note`) && (
                            <>
                              {" · "}
                              <span className="text-cobalt">{t(`events.${ev.key}.note`)}</span>
                            </>
                          )}
                        </p>
                        <p className="mt-3 text-base leading-relaxed text-true-black/85">
                          {t(`events.${ev.key}.description`)}
                        </p>
                        {ev.href &&
                          (ev.external ? (
                            <a
                              href={ev.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={ctaClass}
                              style={{ fontFamily: "var(--font-mono)" }}
                            >
                              {t(`events.${ev.key}.cta`)}
                              <span aria-hidden="true">&rarr;</span>
                            </a>
                          ) : (
                            <Link
                              href={ev.href}
                              className={ctaClass}
                              style={{ fontFamily: "var(--font-mono)" }}
                            >
                              {t(`events.${ev.key}.cta`)}
                              <span aria-hidden="true">&rarr;</span>
                            </Link>
                          ))}
                      </div>
                    </motion.article>
                  ))}

                  {month === "jan" && (
                    <div className="py-6">
                      <h3 className="font-heading text-[1.6rem] leading-[0.95] text-true-black">
                        {t("january.title")}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-true-black/85">
                        {t("january.description")}
                      </p>
                      <Link
                        href="/field-ready#join"
                        className={ctaClass}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {t("january.cta")}
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
