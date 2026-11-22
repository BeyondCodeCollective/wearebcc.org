import { Play } from "@phosphor-icons/react/dist/ssr";
import type { FilmContent } from "../content/types";
import { cx } from "../lib/cx";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Film.module.css";

type Props = { content: FilmContent; id?: string };

/** Points to the film on YouTube. Give it a poster and the frame appears beside the copy. */
export function Film({ content, id }: Props) {
  const play = (
    <a
      href={content.play.href}
      target="_blank"
      rel="noopener"
      aria-label={content.play.label}
      className={s.play}
    >
      <Play size={32} weight="fill" aria-hidden="true" />
    </a>
  );

  return (
    <Section id={id} surface="ink">
      <div className={s.layout}>
        <div className={s.copy}>
          <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
          <p className={s.body}>{content.body}</p>
          <p className={cx(p.mono, s.label)}>{content.label}</p>
        </div>
        {content.poster ? (
          <div className={s.stage}>
            <Photo image={content.poster} sizes="(min-width: 900px) 62vw, 100vw" className={s.poster} />
            {play}
          </div>
        ) : (
          play
        )}
      </div>
    </Section>
  );
}
