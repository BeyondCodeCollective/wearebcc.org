import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { BeyondTheGameHeroContent } from "../../content/beyondTheGame.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import d from "./deep.module.css";
import s from "./Hero.module.css";

type Props = { content: BeyondTheGameHeroContent };

/** The cobalt opener: headline, the ask, and the before and after pair. */
export function Hero({ content }: Props) {
  return (
    <Section surface="cobalt" pad="none" className={cx(s.hero, d.deep)}>
      <div className={s.bar}>
        <nav aria-label="Breadcrumb" className={cx(p.mono, s.crumbs)}>
          {content.breadcrumb.links.map((link) => (
            <span key={link.href}>
              <a href={link.href}>{link.label}</a> /{" "}
            </span>
          ))}
          <span aria-current="page">{content.breadcrumb.current}</span>
        </nav>
        <span className={cx(p.mono, s.badge)}>{content.badge}</span>
      </div>

      <div className={s.top}>
        <h1 className={cx(p.display, s.headline)}>
          {content.headline.lines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          <span className={s.accent}>{content.headline.accent}</span>
        </h1>
        <div className={s.side}>
          <p className={s.lede}>
            <strong>{content.lede.strong}</strong>
            {content.lede.rest}
          </p>
          <div className={s.actions}>
            <a href={content.primary.href} className={cx(p.button, s.lemon, p.lg)}>
              {content.primary.label}
            </a>
            <a href={content.secondary.href} className={p.arrowLink}>
              {content.secondary.label}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className={s.pair}>
        <figure className={s.figure}>
          {content.then.image && (
            <Photo image={content.then.image} sizes="(min-width: 900px) 40vw, 100vw" className={cx(s.photo, s.mono)} />
          )}
          <figcaption className={cx(p.display, s.caption, s.dim)}>{content.then.caption}</figcaption>
        </figure>
        <div className={s.arrow} aria-hidden="true">
          <ArrowRight size={30} weight="bold" />
        </div>
        <figure className={s.figure}>
          {content.next.image && (
            <Photo image={content.next.image} sizes="(min-width: 900px) 50vw, 100vw" className={s.photo} />
          )}
          <figcaption className={cx(p.display, s.caption)}>
            {content.next.caption}
            <span className={s.accent}>{content.next.accent}</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
