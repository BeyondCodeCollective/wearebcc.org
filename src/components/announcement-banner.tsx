"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { track } from "@/lib/ga";

// Internal tools keep their own header, so the bar stays off them.
const HIDDEN_ON = ["/admin", "/dashboard"];

/**
 * Slim donate bar pinned to the top of every public page. Its height is
 * `--banner-h` (globals.css), which the nav uses as its top offset.
 */
export function AnnouncementBanner() {
  const t = useTranslations("banner");
  const pathname = usePathname();

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] flex h-[var(--banner-h)] items-center justify-center bg-electric-green px-4">
      <Link
        href="/donate"
        onClick={() => track("donate_click", { source: "banner", click_location: "announcement-banner" })}
        className="group flex items-center gap-2 font-mono text-xs tracking-wider text-true-black sm:text-sm"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="font-bold">{t("title")}</span>
        <span className="underline underline-offset-2 group-hover:no-underline">
          {t("cta")}
        </span>
        <ArrowRight size={14} weight="bold" aria-hidden="true" />
      </Link>
    </div>
  );
}
