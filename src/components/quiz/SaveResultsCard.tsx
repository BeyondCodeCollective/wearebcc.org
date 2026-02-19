"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope, Lock, Check } from "@phosphor-icons/react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SaveResultsCardProps {
  personalityName: string;
  personalityKey: string;
  role: string;
  tagline: string;
  ageGroup: "under18" | "18plus" | null;
  salary: { low: number; mid: number; high: number };
  courses: string[];
  tNamespace: "quiz" | "quiz-v2";
}

export default function SaveResultsCard({
  personalityName,
  personalityKey,
  role,
  tagline,
  ageGroup,
  salary,
  courses,
  tNamespace,
}: SaveResultsCardProps) {
  const t = useTranslations(tNamespace);
  const locale = useLocale();
  const isYouth = ageGroup === "under18";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email.trim())) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          locale,
          personalityName,
          personalityKey,
          role,
          tagline,
          ageGroup,
          salary,
          courses,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-grey-2 border-l-4 border-l-electric-green p-4 md:p-5">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-electric-green flex items-center justify-center flex-shrink-0">
              <Check size={18} weight="bold" className="text-true-black" />
            </div>
            <div>
              <p className="font-bold text-true-black text-sm">{t("results.saveResults.successHeadline")}</p>
              <p className="text-grey-3 text-xs">{t("results.saveResults.successBody")}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Envelope size={20} weight="bold" className="text-cobalt" />
              <h4 className="font-bold text-true-black text-sm">
                {isYouth ? t("results.saveResults.youthHeadline") : t("results.saveResults.adultHeadline")}
              </h4>
            </div>
            <p className="text-grey-3 text-xs mb-3">
              {isYouth ? t("results.saveResults.youthBody") : t("results.saveResults.adultBody")}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={isYouth ? t("results.saveResults.youthEmailPlaceholder") : t("results.saveResults.emailPlaceholder")}
                className="flex-1 bg-grey-1 text-true-black placeholder-grey-3 px-3 py-2.5 text-sm border border-grey-2 focus:outline-none focus:border-cobalt transition-colors"
                required
              />
              <button
                type="submit"
                disabled={status === "submitting" || !email.trim()}
                className="px-4 py-2.5 bg-cobalt text-off-white text-xs font-bold tracking-wide disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {status === "submitting" ? "..." : t("results.saveResults.submitButton")}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-500 text-xs mt-2">{t("results.saveResults.errorText")}</p>
            )}
            <div className="flex items-center gap-1 mt-3">
              <Lock size={10} weight="bold" className="text-grey-3" />
              <p className="text-grey-3 text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>
                {t("results.saveResults.privacy")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
