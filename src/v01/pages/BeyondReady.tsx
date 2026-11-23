import type { BeyondReadyPageContent } from "../content/beyondReady.types";
import { Hero } from "../sections/beyondReady/Hero";
import { Join } from "../sections/beyondReady/Join";
import { RolePicker } from "../sections/beyondReady/RolePicker";
import { Skills } from "../sections/beyondReady/Skills";
import { Week } from "../sections/beyondReady/Week";
import { Why } from "../sections/beyondReady/Why";
import { Faq } from "../sections/beyondShared/Faq";
import { PageShell } from "../ui/PageShell";
import s from "./BeyondReady.module.css";

type Props = { content: BeyondReadyPageContent };

/** BeyondReady, v0.1. Sections in the order of the design. All copy comes in as content. */
export function BeyondReadyPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <Hero content={content.hero} />
      <RolePicker id="roles" content={content.roles} />
      <Skills id="outcomes" content={content.skills} />
      <Week id="how" content={content.week} />
      <Why id="why" content={content.why} />
      <Faq id="faq" content={content.faq} />
      <Join id="join" content={content.join} />
    </PageShell>
  );
}
