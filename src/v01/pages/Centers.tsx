import type { CentersPageContent } from "../content/centers.types";
import { BringCenter } from "../sections/centers/BringCenter";
import { CentersHero } from "../sections/centers/CentersHero";
import { Inside } from "../sections/centers/Inside";
import { JoinForm } from "../sections/centers/JoinForm";
import { Locations } from "../sections/centers/Locations";
import { Quote } from "../sections/centers/Quote";
import { Stats } from "../sections/centers/Stats";
import { PageShell } from "../ui/PageShell";
import s from "./Centers.module.css";

type Props = { content: CentersPageContent };

/** Centers, v0.1. Sections in the order of the design. All copy comes in as content. */
export function CentersPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <CentersHero content={content.hero} />
      <Locations content={content.locations} />
      <Inside content={content.inside} />
      <Stats content={content.stats} />
      <Quote content={content.quote} />
      <JoinForm content={content.join} />
      <BringCenter content={content.bring} />
    </PageShell>
  );
}
