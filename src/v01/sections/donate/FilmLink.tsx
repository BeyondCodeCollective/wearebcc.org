import Image from "next/image";
import { Play } from "@phosphor-icons/react/dist/ssr";
import type { DonatePageContent } from "../../content/donate.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./FilmLink.module.css";

type Props = { content: DonatePageContent["video"] };

/** A full-width still that opens the film on YouTube. */
export function FilmLink({ content }: Props) {
  return (
    <Section pad="none">
      <a href={content.href} target="_blank" rel="noopener" aria-label={content.ariaLabel} className={s.link}>
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="100vw"
          className={s.image}
          style={{ objectPosition: content.image.position }}
        />
        <span className={s.fade} aria-hidden="true" />
        <span className={s.copy}>
          <span className={cx(p.display, s.headline)}>
            {content.headline.map((line, index) => (
              <span key={line}>
                {line}
                {index < content.headline.length - 1 && <br />}
              </span>
            ))}
          </span>
          <span className={cx(p.mono, s.cue)}>
            <span className={s.play} aria-hidden="true">
              <Play size={24} weight="fill" />
            </span>
            {content.label}
          </span>
        </span>
      </a>
    </Section>
  );
}
