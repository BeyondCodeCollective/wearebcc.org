import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { HeroContent } from "../content/types";
import { cx } from "../lib/cx";
import { EmailForm } from "../ui/EmailForm";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Hero.module.css";

type Props = { content: HeroContent; id?: string };

/** Page opener: the one h1, a short pitch, the quick email sign-up and a photo. */
export function Hero({ content, id }: Props) {
  return (
    <Section id={id} pad="sm">
      <h1 className={cx(p.display, s.headline)}>
        {content.headline.map((line) => (
          <span key={line.text} className={cx(s.line, line.highlight && s.highlight)}>
            {line.text}{" "}
          </span>
        ))}
      </h1>

      <div className={s.row}>
        <div className={s.copy}>
          <p className={s.lede}>{content.lede}</p>
          <EmailForm id="hero-email" content={content.form} />
          <a href={content.cta.href} className={cx(p.button, p.ink, p.xl, s.cta)}>
            {content.cta.label}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
        {content.image && (
          <Photo
            image={content.image}
            sizes="(min-width: 900px) 62vw, 100vw"
            shade
            priority
            className={s.photo}
          />
        )}
      </div>
    </Section>
  );
}
