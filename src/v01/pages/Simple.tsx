import type { SimplePageContent } from "../content/simple.types";
import { BringCenter } from "../sections/centers/BringCenter";
import { Ways } from "../sections/donate/Ways";
import { PartnerHero } from "../sections/partner/PartnerHero";
import { PageShell } from "../ui/PageShell";
import { Photo } from "../ui/Photo";
import { Section } from "../ui/Section";
import s from "./Simple.module.css";

type Props = { content: SimplePageContent };

/** A plain information page. All copy comes in as content. */
export function SimplePage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <PartnerHero content={content.hero} actions={content.actions} />
      {content.image && (
        <Section pad="none" className={s.band}>
          <Photo image={content.image} sizes="(min-width: 1440px) 1360px, 94vw" priority className={s.photo} />
        </Section>
      )}
      {content.sections.map((section, index) => (
        <Ways
          key={section.headline.join(" ")}
          content={section}
          surface={section.surface ?? (index % 2 === 0 ? "paper-warm" : "paper")}
        />
      ))}
      <BringCenter content={content.closing} />
    </PageShell>
  );
}
