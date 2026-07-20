"use client";

import { motion } from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export const PARTNER_GATE_STORAGE_KEY = "bcc-partner-portal-unlocked";

/**
 * Shown when someone reaches a partner deck without a valid session.
 *
 * There is no form here on purpose. Access is by named invite link, created
 * in /admin and sent by us, so that every deck view belongs to a known
 * person. Anyone landing here needs a link, not a password.
 */
export function PartnerGate({ onUnlock }: { onUnlock: () => void }) {
  void onUnlock; // kept so callers do not have to change
  const t = useTranslations("partnerGate");
  const params = useSearchParams();
  const problem = params.get("invite");

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-off-white px-6 pt-36 pb-20 lg:pt-44">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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

        {problem ? (
          <p className="mt-4 text-sm leading-relaxed text-orange">
            {problem === "unavailable" || problem === "error"
              ? t("errorUnavailable")
              : t("errorInvalid")}
          </p>
        ) : null}

        <p className="mt-4 text-sm leading-relaxed text-grey-3">{t("intro")}</p>

        <a
          href="mailto:catalyst@wearebcc.org?subject=Partner%20deck%20access"
          className="mt-6 inline-block w-full bg-true-black px-6 py-4 text-center font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-cobalt"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("requestAccess")}
        </a>

        <p className="mt-4 text-xs leading-relaxed text-grey-3">{t("privacy")}</p>
      </motion.div>
    </section>
  );
}
