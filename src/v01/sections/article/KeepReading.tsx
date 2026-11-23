import type { ArticlePageContent } from "../../content/article.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./KeepReading.module.css";

type Props = { content: ArticlePageContent["more"] };

/** Three more posts as a ruled list of headlines with thumbnails. */
export function KeepReading({ content }: Props) {
  if (content.posts.length === 0) return null;
  return (
    <Section id="more" surface="paper-warm" pad="lg">
      <div className={s.layout}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <ul className={s.list}>
          {content.posts.map((post) => (
            <li key={post.slug}>
              <a href={post.href} className={s.row}>
                <span className={cx(p.display, s.title)}>{post.title}</span>
                <Photo
                  image={{ ...post.image, alt: "" }}
                  sizes="(min-width: 900px) 140px, 96px"
                  className={s.thumb}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
