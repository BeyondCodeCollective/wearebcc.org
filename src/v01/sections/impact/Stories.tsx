import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { StoriesContent } from "../../content/impact.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Stories.module.css";

type Props = { content: StoriesContent };

/** Three full-width story panels, photo and color panel side by side, alternating. */
export function Stories({ content }: Props) {
  return (
    <Section pad="none" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>
        {content.headline.map((line) => (
          <span key={line} className={s.line}>
            {line}
          </span>
        ))}
      </h2>
      <p className={s.lede}>{content.lede}</p>

      <div className={s.list}>
        {content.stories.map((story) => (
          <article key={story.title} className={cx(s.story, story.imageSide === "right" && s.flip)}>
            <Photo image={story.image} sizes="(min-width: 800px) 50vw, 100vw" className={s.photo} />
            <Section as="div" surface={story.surface} pad="none" flush className={s.panel}>
              <div className={s.inner}>
                <p className={s.meta}>{story.meta}</p>
                <h3 className={cx(p.display, s.title)}>{story.title}</h3>
                <p className={s.body}>{story.body}</p>
                {story.stats && <p className={cx(p.title, s.stats)}>{story.stats}</p>}
                <a href={story.link.href} className={p.arrowLink}>
                  {story.link.label}
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </Section>
          </article>
        ))}
      </div>
    </Section>
  );
}
