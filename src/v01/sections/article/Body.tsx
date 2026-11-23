import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ArticlePageContent } from "../../content/article.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Body.module.css";
import { ShareRow } from "./ShareRow";

type Props = { post: ArticlePageContent["post"]; share: ArticlePageContent["share"] };

/** The story: byline aside, paragraphs with a drop cap, the post's own links, then share. */
export function Body({ post, share }: Props) {
  return (
    <Section id="story" pad="sm">
      <div className={s.layout}>
        <aside className={s.aside}>
          {post.author && <span className={cx(p.title, s.author)}>{post.author}</span>}
        </aside>
        <article className={s.article}>
          <div className={s.text}>
            {post.paragraphs.map((paragraph, index) => (
              <p key={index} className={s.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          {post.links.length > 0 && (
            <ul className={s.links}>
              {post.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={s.link}
                    {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    <span>
                      <span className={cx(p.mono, s.linkLabel)}>{link.label}</span>
                      {link.description && <span className={s.linkNote}>{link.description}</span>}
                    </span>
                    <ArrowUpRight aria-hidden="true" size={16} weight="bold" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <ShareRow content={share} />
        </article>
        <div />
      </div>
    </Section>
  );
}
