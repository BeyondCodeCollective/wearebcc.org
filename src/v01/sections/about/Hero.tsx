import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { AboutHeroContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Sticker } from "../../ui/Sticker";
import s from "./Hero.module.css";

type Props = { content: AboutHeroContent };

/** Peach opener: headline, mission and a collage of four tilted photos. */
export function Hero({ content }: Props) {
  const { breadcrumb } = content;
  const slots = [s.pic1, s.pic2, s.pic3, s.pic4];

  return (
    <Section surface="peach" pad="none" className={s.hero}>
      <div className={s.grid}>
        <div className={s.text}>
          <nav aria-label="Breadcrumb" className={cx(p.mono, s.crumb)}>
            <a href={breadcrumb.homeHref}>{breadcrumb.homeLabel}</a> / {breadcrumb.current}
          </nav>
          <h1 className={cx(p.display, s.headline)}>
            {content.headline.map((line) => (
              <span key={line} className={s.line}>
                {line}
              </span>
            ))}
          </h1>
          <p className={s.lede}>{content.lede}</p>
          <p className={s.mission}>
            <strong>{content.mission.label}</strong>&nbsp;{content.mission.body}
          </p>
          <a href={content.link.href} className={p.arrowLink}>
            {content.link.label}
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className={s.collage}>
          {content.photos.map((image, i) => (
            <div key={image.src} className={cx(s.pic, slots[i])}>
              <Photo image={image} sizes="(min-width: 900px) 30vw, 70vw" className={s.fill} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>
      <Sticker sticker={content.sticker} className={s.sticker} />
    </Section>
  );
}
