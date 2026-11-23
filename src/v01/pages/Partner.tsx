import type { PartnerPageContent } from "../content/partner.types";
import { Company } from "../sections/partner/Company";
import { Contact } from "../sections/partner/Contact";
import { PartnerHero } from "../sections/partner/PartnerHero";
import { WhoFor } from "../sections/partner/WhoFor";
import { PageShell } from "../ui/PageShell";
import s from "./Partner.module.css";

type Props = { content: PartnerPageContent };

/** Partner (Hire & partner), v0.1. Sections in the order of the design. All copy comes in as content. */
export function PartnerPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <PartnerHero content={content.hero} />
      <Company content={content.company} />
      <WhoFor content={content.who} />
      <Contact content={content.contact} />
    </PageShell>
  );
}
