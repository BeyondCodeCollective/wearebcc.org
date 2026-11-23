import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { PostCard } from "../../content/news.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Breadcrumb } from "./Breadcrumb";
import s from "./Featured.module.css";
import type { BreadcrumbContent } from "../../content/news.types";

type Props = { breadcrumb: BreadcrumbContent; cta: string; post?: PostCard };

/** The page opener: the breadcrumb, then the newest post set large beside its photo. */
export function Featured({ breadcrumb, cta, post }: Props) {
  const words = post ? post.title.split(" ") : [];
  const split = words.length > 2 ? words.length - 2 : words.length;
  const lead = words.slice(0, split).join(" ");
  const tail = words.slice(split).join(" ");

  return (
    <Section id="top-story" pad="sm">
      <div className={s.stack}>
        <Breadcrumb content={breadcrumb} />
        {post ? (
          <a href={post.href} className={s.card}>
            <span className={s.copy}>
              <span className={s.meta}>
                <time dateTime={post.dateTime}>{post.dateLabel}</time> · {post.category}
              </span>
              <h1 className={cx(p.display, s.headline)}>
                {lead}
                {tail && <> <span className={s.highlight}>{tail}</span></>}
              </h1>
              {post.excerpt && <span className={s.lede}>{post.excerpt}</span>}
              <span className={p.arrowLink}>
                {cta} <ArrowRight aria-hidden="true" size={16} weight="regular" />
              </span>
            </span>
            <Photo
              image={post.image}
              sizes="(min-width: 900px) 55vw, 100vw"
              priority
              className={s.photo}
            />
          </a>
        ) : (
          <h1 className={cx(p.display, s.headline)}>News</h1>
        )}
      </div>
    </Section>
  );
}
