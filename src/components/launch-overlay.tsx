"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "code-along-beyond-launch-dismissed";

export function LaunchOverlay() {
  const t = useTranslations("launchOverlay");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) setOpen(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-6"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden bg-off-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 z-10 bg-black/50 p-2 text-off-white transition-colors hover:bg-black"
              aria-label={t("close")}
            >
              <X size={16} weight="bold" />
            </button>

            <Image
              src="/images/code-along/playlist-card-v2.jpg"
              alt="Code Along Beyond: Music"
              width={854}
              height={480}
              className="w-full"
              priority
            />

            <div className="flex flex-col gap-4 p-6 sm:p-8">
              <span
                className="self-start bg-cobalt px-3 py-1 font-mono text-xs tracking-wider text-off-white"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("badge")}
              </span>
              <h2 className="font-heading text-2xl leading-[0.95] text-true-black sm:text-3xl">
                {t("title")}
              </h2>
              <p className="text-sm leading-relaxed text-charcoal/80">
                {t("description")}
              </p>
              <p
                className="font-mono text-[11px] leading-relaxed tracking-wider text-charcoal/60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("credit")}
                <br />
                {t("sponsor")}
              </p>
              <Link
                href="/code-along"
                onClick={dismiss}
                className="mt-2 inline-flex items-center gap-2 self-start bg-cobalt px-6 py-3 font-mono text-xs tracking-wider text-off-white transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("cta")}
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
