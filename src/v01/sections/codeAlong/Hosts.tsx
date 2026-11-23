import Image from "next/image";
import type { HostsContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Badge } from "./parts";
import s from "./Hosts.module.css";
import t from "./tone.module.css";

type Props = { content: HostsContent };

/** The season's two hosts and two guests. */
export function Hosts({ content }: Props) {
  return (
    <Section surface="paper" className={t.sky}>
      <div className={s.head}>
        <Badge tone="mint">{content.badge}</Badge>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <p className={s.lede}>{content.lede}</p>
      </div>
      <ul className={s.list}>
        {content.hosts.map((host) => (
          <li key={host.name} className={s.host}>
            <Image
              src={host.image.src}
              alt={host.image.alt}
              width={400}
              height={400}
              sizes="(min-width: 1300px) 260px, (min-width: 900px) 22vw, 44vw"
              className={s.portrait}
            />
            <p className={cx(p.display, s.name)}>{host.name}</p>
            <p className={cx(p.mono, s.role)}>{host.role}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
