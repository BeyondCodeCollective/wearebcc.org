import type { NowStreamingContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Badge, CtaButton, Frame } from "./parts";
import s from "./NowStreaming.module.css";
import t from "./tone.module.css";

type Props = { content: NowStreamingContent };

/** The newest episode, as a poster that plays on YouTube. */
export function NowStreaming({ content }: Props) {
  return (
    <Section surface="paper" pad="lg" className={t.sky}>
      <div className={s.stack}>
        <Badge tone="mint">{content.badge}</Badge>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <a href={content.playHref} aria-label={content.playLabel} className={s.play} target="_blank" rel="noopener">
          <Frame
            image={content.image}
            sizes="(min-width: 1200px) 1080px, 100vw"
            shadow="lemon"
            photoClass={s.photo}
            play
          />
        </a>
        <CtaButton link={content.cta} kind="solid" arrow />
      </div>
    </Section>
  );
}
