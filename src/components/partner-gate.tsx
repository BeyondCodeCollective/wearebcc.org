"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeSlash, LockSimple } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

export const PARTNER_GATE_STORAGE_KEY = "bcc-partner-portal-unlocked";

/**
 * Shared partners-only password gate. Checks the code server-side at
 * /api/partner-gate (which also sets the httpOnly cookie that unlocks
 * gated static assets under /decks/), then remembers the unlock for the
 * browser session.
 */
export function PartnerGate({ onUnlock }: { onUnlock: () => void }) {
  const t = useTranslations("partnerGate");
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError(false);
    try {
      const res = await fetch("/api/partner-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem(PARTNER_GATE_STORAGE_KEY, "1");
        onUnlock();
        return;
      }
    } catch {
      // treat as wrong password
    }
    setError(true);
    setChecking(false);
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-off-white px-6 pt-36 pb-20 lg:pt-44">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={submit}
        className="w-full max-w-sm"
      >
        <span className="flex h-12 w-12 items-center justify-center bg-cobalt text-off-white">
          <LockSimple size={20} weight="bold" />
        </span>
        <p
          className="mt-6 font-mono text-xs uppercase tracking-wider text-cobalt"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("label")}
        </p>
        <h1 className="mt-3 font-heading text-4xl leading-[0.9] text-true-black">
          {t("headline1")}
          <br />
          {t("headline2")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-grey-3">
          {t("intro")}
        </p>
        <div className="relative mt-6">
          <input
            type={revealed ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("placeholder")}
            autoFocus
            className="w-full border border-true-black/20 bg-white py-3 pl-4 pr-12 font-mono text-sm tracking-wider outline-none focus:border-cobalt"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            aria-label={revealed ? t("hide") : t("show")}
            aria-pressed={revealed}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-true-black/60 transition-colors hover:text-cobalt"
          >
            {revealed ? (
              <EyeSlash size={18} weight="bold" />
            ) : (
              <Eye size={18} weight="bold" />
            )}
          </button>
        </div>
        {error ? (
          <p className="mt-2 text-sm text-orange">
            {t("error")}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={checking || !password}
          className="mt-4 w-full bg-true-black px-6 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-cobalt disabled:opacity-50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {checking ? t("checking") : t("submit")}
        </button>
        <p className="mt-4 text-base leading-relaxed text-grey-3">
          {t("needAccessPre")}{" "}
          <a
            href="mailto:catalyst@wearebcc.org"
            className="text-cobalt underline-offset-4 hover:underline"
          >
            catalyst@wearebcc.org
          </a>{" "}
          {t("needAccessPost")}
        </p>
      </motion.form>
    </section>
  );
}
