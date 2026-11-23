import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ArticlePageContent } from "../../content/article.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./ClosingCard.module.css";

type Props = { content: ArticlePageContent["closing"] };

/** A forest card that sends readers to Events. Without a photo the copy takes the whole card. */
export function ClosingCard({ content }: Props) {
  return (
    <Section id="next" pad="sm" className={s.section}>
      <a
        href={content.cta.href}
        data-surface="forest"
        className={cx(s.card, content.image && s.withPhoto)}
      >
        {content.image && (
          <Photo image={content.image} sizes="(min-width: 900px) 45vw, 100vw" className={s.photo} />
        )}
        <span className={s.copy}>
          <span className={cx(p.display, s.headline)}>
            {content.headline[0]}
            <br />
            <span className={s.highlight}>{content.headline[1]}</span>
          </span>
          <span className={s.body}>{content.body}</span>
          <span className={p.arrowLink}>
            {content.cta.label} <ArrowRight aria-hidden="true" size={16} weight="regular" />
          </span>
        </span>
      </a>
    </Section>
  );
}
