import type { ArticlePageContent } from "../../content/article.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Sticker } from "../../ui/Sticker";
import { Breadcrumb } from "../news/Breadcrumb";
import s from "./Hero.module.css";

type Props = {
  breadcrumb: ArticlePageContent["breadcrumb"];
  post: ArticlePageContent["post"];
  sticker: ArticlePageContent["sticker"];
};

/** Breadcrumb, byline row and headline beside the post's photo. */
export function Hero({ breadcrumb, post, sticker }: Props) {
  return (
    <Section id="top-story" pad="sm" className={s.section}>
      <Sticker sticker={sticker} className={s.sticker} />
      <div className={s.layout}>
        <div className={s.copy}>
          <Breadcrumb content={breadcrumb} />
          <span className={s.meta}>
            <time dateTime={post.dateTime}>{post.dateLabel}</time> · {post.category} · {post.readTime}
          </span>
          <h1 className={cx(p.display, s.headline)}>{post.title}</h1>
        </div>
        <Photo image={post.image} sizes="(min-width: 900px) 45vw, 100vw" priority className={s.photo} />
      </div>
    </Section>
  );
}
