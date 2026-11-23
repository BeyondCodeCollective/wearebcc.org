import Image from "next/image";
import { Fragment } from "react";
import type { CodeAlongHeroContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Emphasis } from "./Emphasis";
import { Badge, CtaButton, Frame, Marked } from "./parts";
import s from "./Hero.module.css";
import t from "./tone.module.css";

type Props = { content: CodeAlongHeroContent };

/** Page opener: breadcrumb, season badge, logo, the one h1, two buttons and a still from the set. */
export function Hero({ content }: Props) {
  return (
    <Section id="top" surface="paper" pad="sm" className={t.mint}>
      <div className={s.stack}>
        <nav aria-label={content.breadcrumbLabel} className={cx(p.mono, s.trail)}>
          {content.breadcrumb.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 && " / "}
              {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
            </Fragment>
          ))}
        </nav>
        <Badge tone="navy">{content.badge}</Badge>
        <Image
          src={content.logo.src}
          alt={content.logo.alt}
          width={content.logo.size}
          height={content.logo.size}
          sizes="240px"
          priority
          className={s.logo}
        />
        <h1 className={cx(p.display, s.headline)}>
          <Marked parts={content.headline} />
        </h1>
        <p className={s.credit}>
          <Emphasis text={content.credit} emphasis={content.creditEmphasis} className={s.apple} />
        </p>
        <div className={s.lede}>
          {content.lede.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={s.actions}>
          <CtaButton link={content.primaryCta} kind="solid" arrow />
          <CtaButton link={content.secondaryCta} kind="outline" />
        </div>
        <div className={s.still}>
          <Frame
            image={content.still}
            sizes="(min-width: 1100px) 980px, 100vw"
            shadow="sky"
            photoClass={s.stillPhoto}
            priority
          />
        </div>
      </div>
    </Section>
  );
}
