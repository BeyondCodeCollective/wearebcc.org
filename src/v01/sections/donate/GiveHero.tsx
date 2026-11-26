import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Script from "next/script";
import type { ElementType } from "react";
import type { DonatePageContent } from "../../content/donate.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./GiveHero.module.css";

type Props = { content: DonatePageContent["give"] };

/** Donorbox web component: it sizes itself to the form. */
const DboxWidget = "dbox-widget" as unknown as ElementType;

/** The page opener on cobalt: the pitch on one side, the live donation form on a ticket stub. */
export function GiveHero({ content }: Props) {
  const { breadcrumb, donorbox } = content;
  // The arrow stays glued to the last word so it never wraps onto a line by itself.
  const fallbackWords = content.fallback.label.split(" ");
  const fallbackLast = fallbackWords.pop();
  const fallbackLead = fallbackWords.join(" ");
  return (
    <Section id="give" surface="cobalt" pad="none">
      <div className={s.inner}>
        <nav aria-label={breadcrumb.ariaLabel} className={cx(p.mono, s.crumb)}>
          <a href={breadcrumb.home.href}>{breadcrumb.home.label}</a> / <span aria-current="page">{breadcrumb.current}</span>
        </nav>

        <div className={s.card} data-surface="paper">
          <div className={s.pitch}>
            <div className={s.copy}>
              <h1 className={cx(p.display, s.headline)}>
                {content.headline[0]}
                <br />
                <span className={s.accent}>{content.headline[1]}</span>
              </h1>
              <p className={cx(p.display, s.tagline)}>{content.tagline}</p>
              <div className={s.body}>
                {content.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div className={s.legal}>
              <p className={s.trust}>{content.trust}</p>
              <a href={content.fallback.href} target="_blank" rel="noopener" className={cx(p.mono, s.fallback)}>
                {fallbackLead}{" "}
                <span className={s.nowrap}>
                  {fallbackLast}
                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>

          <div className={s.stub}>
            <span className={cx(s.notch, s.notchStart)} aria-hidden="true" />
            <span className={cx(s.notch, s.notchEnd)} aria-hidden="true" />
            <div className={s.form} role="region" aria-label={donorbox.ariaLabel}>
              <DboxWidget campaign={donorbox.campaign} type="donation_form" enable-auto-scroll="true" />
              <Script src={donorbox.scriptSrc} type="module" strategy="afterInteractive" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
