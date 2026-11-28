import { ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { BeyondReadyHeroContent } from "../../content/beyondReady.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import g from "./grid.module.css";
import s from "./Hero.module.css";

type Props = { content: BeyondReadyHeroContent; id?: string };

/** Breadcrumb, the cobalt program card, the claim, the two calls to action and the photo. */
export function Hero({ content, id }: Props) {
  return (
    <Section id={id} surface="paper" pad="none" className={cx(s.hero, g.grid)}>
      <nav aria-label="Breadcrumb" className={cx(p.mono, s.crumbs)}>
        {content.breadcrumb.links.map((link) => (
          <span key={link.href}>
            <a href={link.href}>{link.label}</a> /{" "}
          </span>
        ))}
        <span aria-current="page">{content.breadcrumb.current}</span>
      </nav>

      <div className={s.layout}>
        <div className={cx(s.cover, g.gridDark)} data-surface="cobalt">
          <div className={s.coverTop}>
            <span className={cx(p.mono, s.coverMeta)}>{content.cover.brand}</span>
            <span className={cx(p.mono, s.coverMeta)}>{content.cover.cohort}</span>
          </div>
          <h1 className={cx(p.display, s.title)}>
            {content.cover.title.map((word, index) => (
              <span key={word}>
                {index > 0 && <br />}
                {word}
              </span>
            ))}
          </h1>
          <dl className={s.facts}>
            {content.cover.facts.map((fact) => (
              <div key={fact.label} className={s.fact}>
                <dt className={cx(p.mono, s.factLabel)}>{fact.label}</dt>
                <dd className={cx(p.display, s.factValue)}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={s.side}>
          <p className={cx(p.display, s.claim)}>
            {content.claim.before}
            <span className={g.hl}>{content.claim.highlight}</span>
          </p>
          <div className={s.copy}>
            <p className={s.lede}>{content.lede}</p>
            <div className={s.actions}>
              <a href={content.primary.href} className={cx(p.button, p.ink, p.lg)}>
                {content.primary.label}
              </a>
              <a href={content.secondary.href} className={p.arrowLink}>
                {content.secondary.label}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <a href={content.groups.href} className={cx(p.arrowLink, s.groups)}>
              {content.groups.label}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <Photo image={content.image} sizes="(min-width: 900px) 58vw, 100vw" priority className={s.photo} />
        </div>
      </div>
    </Section>
  );
}
