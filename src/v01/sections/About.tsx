import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { AboutContent } from "../content/types";
import { cx } from "../lib/cx";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./About.module.css";

type Props = { content: AboutContent; id?: string };

/** Statement on ink with the mission and a link to learn more. Photo is optional. */
export function About({ content, id }: Props) {
  const headline = (
    <h2 className={cx(p.display, s.headline)}>
      {content.headline} <em className={s.highlight}>{content.headlineHighlight}</em>
    </h2>
  );

  const mission = (
    <div className={s.mission}>
      {content.label ? <p className={p.mono}>{content.label}</p> : null}
      <p className={s.body}>{content.body}</p>
      <a href={content.link.href} className={p.arrowLink}>
        {content.link.label}
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      </a>
    </div>
  );

  return (
    <Section id={id} surface="ink" pad="md">
      {content.image ? (
        <div className={s.grid}>
          <div className={s.lead}>
            {headline}
            {mission}
          </div>
          <Photo image={content.image} sizes="(min-width: 900px) 40vw, 100vw" shade className={s.photo} />
        </div>
      ) : (
        <div className={s.grid}>
          {headline}
          <div className={s.aside}>{mission}</div>
        </div>
      )}
    </Section>
  );
}
