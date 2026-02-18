"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionLabel } from "./ui/section-label";

const SEGMENT_KEYS = [
  "student",
  "learner",
  "parent",
  "careerChanger",
  "employer",
  "partnerDonor",
] as const;

export function GetInvolved() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [segment, setSegment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = useTranslations("getInvolved");
  const tf = useTranslations("form");
  const ts = useTranslations("segments");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          segment,
          source: "get-involved",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : tf("somethingWentWrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="get-involved"
      className="bg-electric-green px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
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
          <SectionLabel number="06" className="text-true-black/30 mt-2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 max-w-lg"
        >
          {submitted ? (
            <div className="bg-true-black p-8">
              <p className="font-heading text-2xl text-electric-green">
                {tf("youreIn")}
              </p>
              <p className="mt-2 text-off-white">
                {tf("wellBeInTouch")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder={tf("firstName")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
                className="w-full border-2 border-true-black bg-transparent px-4 py-3 text-true-black placeholder:text-true-black/40 focus:outline-none focus:ring-2 focus:ring-true-black disabled:opacity-50 sm:px-6 sm:py-4"
              />
              <input
                type="email"
                required
                placeholder={tf("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full border-2 border-true-black bg-transparent px-4 py-3 text-true-black placeholder:text-true-black/40 focus:outline-none focus:ring-2 focus:ring-true-black disabled:opacity-50 sm:px-6 sm:py-4"
              />
              <input
                type="tel"
                placeholder={tf("phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                className="w-full border-2 border-true-black bg-transparent px-4 py-3 text-true-black placeholder:text-true-black/40 focus:outline-none focus:ring-2 focus:ring-true-black disabled:opacity-50 sm:px-6 sm:py-4"
              />
              <select
                required
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                disabled={loading}
                className="w-full border-2 border-true-black bg-transparent px-4 py-3 text-true-black focus:outline-none focus:ring-2 focus:ring-true-black appearance-none disabled:opacity-50 sm:px-6 sm:py-4"
              >
                <option value="" disabled>
                  {tf("iAmA")}
                </option>
                {SEGMENT_KEYS.map((key) => (
                  <option key={key} value={ts(key)}>
                    {ts(key)}
                  </option>
                ))}
              </select>
              {error && (
                <p className="text-true-black font-mono text-sm">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-true-black px-6 py-3 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-charcoal disabled:opacity-50 disabled:cursor-not-allowed sm:px-8 sm:py-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {loading ? tf("joining") : tf("joinTheCommunity")}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
