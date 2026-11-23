import Image from "next/image";
import type { CentersInsideContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Inside.module.css";

type Props = { content: CentersInsideContent };

/** Four ways to take part, as photo strips. On desktop the hovered strip widens. */
export function Inside({ content }: Props) {
  return (
    <Section pad="default" className={s.section}>
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>
          {content.headline.map((line) => (
            <span key={line} className={s.line}>
              {line}
            </span>
          ))}
        </h2>
        <div className={s.promise}>
          <p className={cx(p.title, s.promiseTitle)}>{content.promise.title}</p>
          <p className={cx(p.mono, s.promiseNote)}>{content.promise.note}</p>
        </div>
      </div>

      {/* A scrolling row on small screens needs to be reachable by keyboard. */}
      <ul className={s.strips} tabIndex={0} aria-label={content.stripsLabel}>
        {content.strips.map((strip) => (
          <li key={strip.title} className={s.strip}>
            <Image
              src={strip.image.src}
              alt={strip.image.alt}
              fill
              sizes="(min-width: 900px) 25vw, 78vw"
              className={s.image}
              style={{
                objectPosition: strip.image.position,
                transform: strip.zoom ? `scale(${strip.zoom})` : undefined,
              }}
            />
            <div className={s.shade} aria-hidden="true" />
            <div className={s.caption}>
              <h3 className={cx(p.title, s.title)}>{strip.title}</h3>
              <p className={s.text}>{strip.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
