import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ArticlePageContent } from "../../content/article.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./VideoCard.module.css";
import { VideoPlayer } from "./VideoPlayer";

type Props = { content: NonNullable<ArticlePageContent["video"]> };

/** A forest card with the post's film on the left. Takes the closing card's place. */
export function VideoCard({ content }: Props) {
  return (
    <Section id="watch" pad="sm" ariaLabelledBy="watch-title" className={s.section}>
      <div data-surface="forest" className={s.card}>
        <VideoPlayer src={content.src} poster={content.poster} play={content.play} />
        <div className={s.copy}>
          <h2 id="watch-title" className={cx(p.display, s.headline)}>
            {content.headline[0]}
            {content.headline[1] && (
              <>
                <br />
                <span className={s.highlight}>{content.headline[1]}</span>
              </>
            )}
          </h2>
          <p className={s.body}>{content.body}</p>
          <a href={content.cta.href} target="_blank" rel="noopener" className={p.arrowLink}>
            {content.cta.label} <ArrowUpRight aria-hidden="true" size={16} weight="regular" />
          </a>
        </div>
      </div>
    </Section>
  );
}
