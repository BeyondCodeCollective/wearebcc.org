import Image from "next/image";
import type { CSSProperties } from "react";
import type { PartnerPageContent } from "../../content/partner.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Company.module.css";

type Props = { content: PartnerPageContent["company"] };

/** Partner logos in cream tiles on forest. */
export function Company({ content }: Props) {
  return (
    <Section surface="forest" pad="lg">
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <div className={s.promise}>
          <p className={cx(p.title, s.promiseTitle)}>{content.promise.title}</p>
          <p className={cx(p.mono, s.note)}>{content.promise.note}</p>
        </div>
      </div>
      <ul className={s.logos}>
        {content.logos.map((logo) => (
          <li key={logo.src} className={s.logo}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="(min-width: 760px) 20vw, 45vw"
              className={s.image}
              style={{ "--logo-h": `${logo.maxHeight}px` } as CSSProperties}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
