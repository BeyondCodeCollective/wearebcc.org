import type { ImpactPageContent } from "../content/impact.types";
import { Report } from "../sections/about/Report";
import { FreePartners } from "../sections/impact/FreePartners";
import { Hero } from "../sections/impact/Hero";
import { Network } from "../sections/impact/Network";
import { Quotes } from "../sections/impact/Quotes";
import { Stories } from "../sections/impact/Stories";
import { PageShell } from "../ui/PageShell";
import s from "./Impact.module.css";

type Props = { content: ImpactPageContent };

/** Impact, v0.1. Sections in the order of the design. All copy comes in as content. */
export function ImpactPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <Hero content={content.hero} />
      <Network content={content.network} />
      <Stories content={content.stories} />
      <Quotes content={content.quotes} />
      <Report content={content.report} />
      <FreePartners content={content.partners} />
    </PageShell>
  );
}
