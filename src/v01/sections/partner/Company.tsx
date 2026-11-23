import Image from "next/image";
import type { CSSProperties } from "react";
import type { PartnerPageContent } from "../../content/partner.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Company.module.css";

type Props = { content: PartnerPageContent["company"] };

/**
 * Partner logos in cream tiles on forest, as a slow ticker. The track holds the
 * list twice and slides left by exactly one list, so the loop is seamless. The
 * second copy is hidden from assistive tech. With reduced motion it is a still grid.
 */
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
      <div className={s.viewport}>
        <div className={s.track}>
          {[false, true].map((copy) => (
            <ul key={copy ? "copy" : "list"} className={cx(s.logos, copy && s.copy)} aria-hidden={copy || undefined}>
              {content.logos.map((logo) => (
                <li key={logo.src} className={s.logo}>
                  <Image
                    src={logo.src}
                    alt={copy ? "" : logo.alt}
                    width={logo.width}
                    height={logo.height}
                    sizes="200px"
                    className={s.image}
                    style={{ "--logo-h": `${logo.maxHeight}px` } as CSSProperties}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}
