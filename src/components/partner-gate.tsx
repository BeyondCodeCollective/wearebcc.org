"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, EnvelopeSimple, LockSimple } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";

export const PARTNER_GATE_STORAGE_KEY = "bcc-partner-portal-unlocked";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Partner deck sign-in. The viewer proves they control an email address by
 * entering a one-time code, and /api/deck-access/verify sets the signed
 * httpOnly cookie that unlocks the static decks under /decks/.
 *
 * This replaced a single shared password: without a per-person identity we
 * could not attribute a deck view to anyone.
 */
export function PartnerGate({ onUnlock }: { onUnlock: () => void }) {
  const t = useTranslations("partnerGate");
  const locale = useLocale();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setError(t("errorEmail"));
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/deck-access/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (res.ok) {
        setStep("code");
      } else {
        setError(res.status === 503 ? t("errorUnavailable") : t("errorEmail"));
      }
    } catch {
      setError(t("errorUnavailable"));
    }
    setBusy(false);
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/deck-access/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      if (res.ok) {
        sessionStorage.setItem(PARTNER_GATE_STORAGE_KEY, "1");
        onUnlock();
        return;
      }
      setError(t("errorCode"));
    } catch {
      setError(t("errorUnavailable"));
    }
    setBusy(false);
  };

  const onEmailStep = step === "email";

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-off-white px-6 pt-36 pb-20 lg:pt-44">
      <motion.form
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={onEmailStep ? requestCode : verifyCode}
        className="w-full max-w-sm"
      >
        <span className="flex h-12 w-12 items-center justify-center bg-cobalt text-off-white">
          {onEmailStep ? (
            <LockSimple size={20} weight="bold" />
          ) : (
            <EnvelopeSimple size={20} weight="bold" />
          )}
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

        {onEmailStep ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-grey-3">
              {t("introEmail")}
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholderEmail")}
              autoFocus
              autoComplete="email"
              className="mt-6 w-full border border-true-black/20 bg-white px-4 py-3 font-mono text-sm outline-none focus:border-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            />
          </>
        ) : (
          <>
            <p className="mt-4 text-sm leading-relaxed text-grey-3">
              {t("introCode")} <span className="text-true-black">{email}</span>
            </p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder={t("placeholderCode")}
              autoFocus
              autoComplete="one-time-code"
              className="mt-6 w-full border border-true-black/20 bg-white px-4 py-3 text-center font-mono text-2xl tracking-[.4em] outline-none focus:border-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            />
          </>
        )}

        {error ? <p className="mt-2 text-sm text-orange">{error}</p> : null}

        <button
          type="submit"
          disabled={busy || (onEmailStep ? !email : code.length !== 6)}
          className="mt-4 w-full bg-true-black px-6 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-cobalt disabled:opacity-50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {busy ? t("checking") : onEmailStep ? t("sendCode") : t("submit")}
        </button>

        {onEmailStep ? (
          <p className="mt-4 text-xs leading-relaxed text-grey-3">{t("privacy")}</p>
        ) : (
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError(null);
            }}
            className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt hover:underline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft size={14} weight="bold" />
            {t("useAnotherEmail")}
          </button>
        )}

        <p className="mt-6 text-sm leading-relaxed text-grey-3">
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
