import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { EpisodesContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Badge, Frame } from "./parts";
import s from "./Episodes.module.css";
import t from "./tone.module.css";

type Props = { content: EpisodesContent };

/** The season, one card per episode, each linking to YouTube. */
export function Episodes({ content }: Props) {
  return (
    <Section id="episodes" surface="paper" className={t.cream}>
      <div className={s.head}>
        <Badge>{content.badge}</Badge>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <p className={s.lede}>{content.lede}</p>
      </div>
      <div className={s.grid}>
        {content.episodes.map((episode) => (
          <a key={episode.id} href={episode.href} className={s.card} target="_blank" rel="noopener">
            <Frame
              image={episode.image}
              sizes="(min-width: 1200px) 520px, (min-width: 700px) 45vw, 100vw"
              shadow="sky"
              photoClass={s.photo}
              play
            >
              <span className={s.tag}>
                <Badge>{episode.badge}</Badge>
              </span>
            </Frame>
            <h3 className={cx(p.display, s.title)}>{episode.title}</h3>
            <span className={cx(p.mono, s.watch)}>
              {episode.watch}
              <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
