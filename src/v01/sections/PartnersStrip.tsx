import Image from "next/image";
import type { CSSProperties } from "react";
import type { PartnersStripContent } from "../content/types";
import { cx } from "../lib/cx";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./PartnersStrip.module.css";

type Props = { content: PartnersStripContent };

/** One row of partner logos in ruled boxes. */
export function PartnersStrip({ content }: Props) {
  return (
    <Section pad="none" rule="bottom-soft" ariaLabel={content.ariaLabel}>
      <div className={s.strip}>
        <p className={cx(p.mono, s.label)}>{content.label}</p>
        <ul className={s.logos}>
          {content.logos.map((logo) => (
            <li key={logo.src} className={s.logo}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                className={s.image}
                style={{ "--logo-h": `${logo.maxHeight}px` } as CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
