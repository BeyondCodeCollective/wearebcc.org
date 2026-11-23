import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ImpactContent } from "../content/types";
import { cx } from "../lib/cx";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Impact.module.css";

type Props = { content: ImpactContent; id?: string };

/** Three headline results and one learner quote, on forest. */
export function Impact({ content, id }: Props) {
  const { quote } = content;
  return (
    <Section id={id} surface="forest">
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>

      <ul className={cx(p.display, s.stats)}>
        {content.stats.map((stat) => (
          <li key={stat.value} className={s.stat}>
            <span className={s.value}>{stat.value}</span> {stat.text}
          </li>
        ))}
      </ul>

      <figure className={s.quote}>
        <p className={cx(p.mono, s.label)}>{quote.label}</p>
        {quote.image && <Photo image={quote.image} sizes="220px" className={s.portrait} />}
        <blockquote className={s.words}>{quote.text}</blockquote>
        <figcaption className={cx(p.mono, s.caption)}>
          <span>{quote.attribution}</span>
          <a href={quote.link.href} className={p.arrowLink}>
            {quote.link.label}
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </figcaption>
      </figure>
    </Section>
  );
}
