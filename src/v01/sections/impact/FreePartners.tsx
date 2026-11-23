import Image from "next/image";
import type { CSSProperties } from "react";
import type { FreePartnersContent } from "../../content/impact.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./FreePartners.module.css";

type Props = { content: FreePartnersContent };

/** Who pays for the free seats: a grid of partner logos and names on lemon. */
export function FreePartners({ content }: Props) {
  return (
    <Section surface="lemon" pad="none" className={s.section}>
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>
          {content.headline.map((line) => (
            <span key={line} className={s.line}>
              {line}
            </span>
          ))}
        </h2>
        <div className={s.aside}>
          <span className={cx(p.display, s.asideTitle)}>{content.aside.title}</span>
          <span className={cx(p.mono, s.asideNote)}>{content.aside.note}</span>
        </div>
      </div>

      <ul className={s.grid}>
        {content.partners.map((partner) =>
          "logo" in partner ? (
            <li key={partner.logo.src} className={s.tile}>
              <Image
                src={partner.logo.src}
                alt={partner.logo.alt}
                width={partner.logo.width}
                height={partner.logo.height}
                sizes="200px"
                className={s.logo}
                style={{ "--logo-h": `${partner.logo.maxHeight}px` } as CSSProperties}
              />
            </li>
          ) : (
            <li key={partner.name} className={cx(p.display, s.tile, s.name)}>
              {partner.name}
            </li>
          ),
        )}
      </ul>
    </Section>
  );
}
