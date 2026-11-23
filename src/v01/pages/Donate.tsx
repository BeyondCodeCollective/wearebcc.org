import type { DonatePageContent } from "../content/donate.types";
import { FilmLink } from "../sections/donate/FilmLink";
import { GiveHero } from "../sections/donate/GiveHero";
import { Questions } from "../sections/donate/Questions";
import { Statement } from "../sections/donate/Statement";
import { Ways } from "../sections/donate/Ways";
import { PageShell } from "../ui/PageShell";
import s from "./Donate.module.css";

type Props = { content: DonatePageContent };

/** Donate, v0.1. Sections in the order of the design. All copy comes in as content. */
export function DonatePage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <GiveHero content={content.give} />
      <Statement content={content.statement} />
      <FilmLink content={content.video} />
      <Ways content={content.ways} />
      <Questions content={content.questions} />
    </PageShell>
  );
}
