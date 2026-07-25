"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const LEVEL_KEYS = ["junior", "mid", "senior", "mixed"] as const;
const INTEREST_KEYS = [
  "softwareEng",
  "dataAnalytics",
  "productDesign",
  "cybersecurity",
  "aiMl",
  "general",
] as const;

export function HireTalent() {
  const t = useTranslations("hireTalent");
  const [companyName, setCompanyName] = useState("");
  // Honeypot: hidden from people, filled in by bots. See /api/subscribe.
  const [website, setWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contactName.trim(),
          email: email.trim(),
          segment: `Employer - ${level}${interest ? ` - ${interest}` : ""}`,
          source: "hire-talent",
          website,
          company: companyName.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hire-talent" className="bg-charcoal px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 sm:gap-12 lg:gap-20">
          {/* Left — messaging */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("label")}
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.85] text-off-white">
                {t("headline1")}
                <br />
                <span className="text-electric-green">{t("headline2")}</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-off-white/70 sm:text-lg">
                {t("description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 space-y-4"
            >
              {(["point1", "point2", "point3"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="mt-1 text-electric-green">
                    <ArrowRight size={16} weight="bold" />
                  </div>
                  <p className="text-sm leading-relaxed text-off-white/60">{t(key)}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {submitted ? (
              <div className="bg-electric-green p-8">
                <Briefcase size={32} weight="bold" className="text-true-black" />
                <p className="mt-4 font-heading text-2xl text-true-black">{t("successTitle")}</p>
                <p className="mt-2 text-true-black/70">{t("successMessage")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Honeypot input: hidden from people, filled in by bots. */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <p
                  className="mb-2 font-mono text-xs tracking-wider text-off-white/40"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {t("formLabel")}
                </p>
                <input
                  type="text"
                  required
                  placeholder={t("companyName")}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={loading}
                  className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                />
                <input
                  type="text"
                  required
                  placeholder={t("contactName")}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  disabled={loading}
                  className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                />
                <input
                  type="email"
                  required
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                />
                <select
                  required
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  disabled={loading}
                  className="w-full appearance-none border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white focus:border-electric-green focus:outline-none disabled:opacity-50"
                >
                  <option value="" disabled className="bg-charcoal">
                    {t("levelPlaceholder")}
                  </option>
                  {LEVEL_KEYS.map((key) => (
                    <option key={key} value={t(`levels.${key}`)} className="bg-charcoal">
                      {t(`levels.${key}`)}
                    </option>
                  ))}
                </select>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  disabled={loading}
                  className="w-full appearance-none border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white focus:border-electric-green focus:outline-none disabled:opacity-50"
                >
                  <option value="" className="bg-charcoal">
                    {t("interestPlaceholder")}
                  </option>
                  {INTEREST_KEYS.map((key) => (
                    <option key={key} value={t(`interests.${key}`)} className="bg-charcoal">
                      {t(`interests.${key}`)}
                    </option>
                  ))}
                </select>
                {error && (
                  <p className="font-mono text-xs text-orange">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-electric-green px-5 py-3 font-mono text-xs tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4 sm:text-sm"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {loading ? t("submitting") : t("submit")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
