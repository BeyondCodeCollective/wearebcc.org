"use client";

import { useTranslations, useLocale } from "next-intl";
import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { SITE, CONTACT } from "@/lib/constants";
import { Logo } from "./ui/logo";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const initiativeLinks = [
    // Same order as the nav dropdown, so the two lists agree.
    { key: "catalyst", href: "catalyst" },
    { key: "theForge", href: "beyond-code-centers" },
    { key: "afterTheGame", href: "beyond-the-game" },
  ] as const;

  return (
    <footer className="bg-true-black px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 md:gap-12">
          {/* Logo & tagline */}
          <div>
            <Logo
              variant="horizontal"
              color="white"
              className="h-5 w-auto sm:h-6"
            />
            <p
              className="mt-3 font-mono text-xs tracking-wider text-off-white/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {SITE.tagline}
            </p>
          </div>

          {/* Initiatives */}
          <div>
            <p
              className="font-mono text-xs tracking-wider text-off-white/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("initiatives")}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {initiativeLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={`/${locale}/${href}`}
                  className="text-sm text-off-white/70 transition-colors hover:text-off-white"
                >
                  {tNav(key)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-mono text-xs tracking-wider text-off-white/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("contact")}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {Object.entries(CONTACT).map(([key, email]) => (
                <a
                  key={key}
                  href={`mailto:${email}`}
                  className="text-sm text-off-white/70 transition-colors hover:text-off-white break-all"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* Social / Legal */}
          <div>
            <p
              className="font-mono text-xs tracking-wider text-off-white/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("followUs")}
            </p>
            <div className="mt-3 flex gap-4">
              <a
                href="https://www.instagram.com/beyondcodecollective"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-off-white/70 transition-colors hover:text-off-white"
              >
                <InstagramLogo size={18} weight="bold" />
                {t("instagram")}
              </a>
              <a
                href="https://www.linkedin.com/company/beyond-code-collective"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-off-white/70 transition-colors hover:text-off-white"
              >
                <LinkedinLogo size={18} weight="bold" />
                {t("linkedin")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-off-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-off-white/60">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex gap-6">
            <a
              href={`/${locale}/privacy`}
              className="text-xs text-off-white/60 transition-colors hover:text-off-white"
            >
              {t("privacyPolicy")}
            </a>
            <a
              href={`/${locale}/terms`}
              className="text-xs text-off-white/60 transition-colors hover:text-off-white"
            >
              {t("termsOfUse")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
