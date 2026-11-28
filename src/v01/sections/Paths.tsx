import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { PathsContent } from "../content/types";
import { cx } from "../lib/cx";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Paths.module.css";

type Props = { content: PathsContent; id?: string };

/** Poster links, one per way into the programs. Each poster sets its own surface. */
export function Paths({ content, id }: Props) {
  return (
    <Section id={id} pad="lg">
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
      <p className={s.lede}>{content.lede}</p>

      <ul className={s.cards}>
        {content.cards.map((card) => (
          <li key={card.title.join(" ")}>
            <a href={card.href} data-surface={card.surface} className={s.card}>
              {card.image && (
                <Photo
                  image={card.image}
                  sizes="(min-width: 1180px) 24vw, (min-width: 600px) 48vw, 100vw"
                  className={s.photo}
                />
              )}
              <span className={cx(s.text, !card.image && s.bare)}>
                <span className={cx(p.display, s.title, card.titleHighlight && s.titleHighlight)}>
                  {card.title.map((line) => (
                    <span key={line} className={s.line}>
                      {line}{" "}
                    </span>
                  ))}
                </span>
                <span className={cx(p.mono, s.cta)}>
                  {card.cta}
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
