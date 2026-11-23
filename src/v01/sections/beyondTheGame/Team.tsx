import type { BeyondTheGameTeamContent } from "../../content/beyondTheGame.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Team.module.css";

type Props = { content: BeyondTheGameTeamContent; id?: string };

/** The people leading the program. */
export function Team({ content, id }: Props) {
  return (
    <Section id={id} surface="paper-warm" pad="none" rule="top" className={s.section}>
      <div className={s.layout}>
        <div className={s.head}>
          <h2 className={cx(p.display, s.headline)}>
            {content.headline.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className={s.intro}>{content.intro}</p>
        </div>
        <ul className={s.people}>
          {content.people.map((person) => (
            <li key={person.name} className={s.person}>
              <Photo image={person.image} sizes="(min-width: 900px) 28vw, 46vw" className={s.photo} />
              <span className={cx(p.display, s.name)}>{person.name}</span>
              <span className={s.role}>{person.role}</span>
              <span className={s.bio}>{person.bio}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
