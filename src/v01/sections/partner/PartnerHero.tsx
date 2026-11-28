import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { PartnerPageContent } from "../../content/partner.types";
import type { LinkRef } from "../../content/types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./PartnerHero.module.css";

type Props = {
  content: PartnerPageContent["hero"];
  /** Buttons under the headline, for pages whose first job is one clear next step. */
  actions?: (LinkRef & { variant: "ink" | "ghost" })[];
};

/** Page opener: breadcrumb, the one h1 and a one-line promise. */
export function PartnerHero({ content, actions }: Props) {
  const { breadcrumb, headline } = content;
  return (
    <Section pad="none">
      <div className={s.inner}>
        <nav aria-label={breadcrumb.ariaLabel} className={cx(p.mono, s.crumb)}>
          <a href={breadcrumb.home.href}>{breadcrumb.home.label}</a> / <span aria-current="page">{breadcrumb.current}</span>
        </nav>
        <div className={s.row}>
          <h1 className={cx(p.display, s.headline)}>
            {headline.map((line, index) => (
              <span key={line} className={index === headline.length - 1 ? s.accent : s.line}>
                {line}
              </span>
            ))}
          </h1>
          <p className={s.lede}>{content.lede}</p>
        </div>
        {actions && (
          <div className={s.actions}>
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={cx(p.button, action.variant === "ink" ? p.ink : p.ghost, p.lg)}
                {...(action.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {action.label}
                {action.external && <ArrowUpRight weight="bold" aria-hidden="true" />}
              </a>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
