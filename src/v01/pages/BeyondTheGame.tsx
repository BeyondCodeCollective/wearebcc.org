import type { BeyondTheGamePageContent } from "../content/beyondTheGame.types";
import { Apply } from "../sections/beyondTheGame/Apply";
import { Glance } from "../sections/beyondTheGame/Glance";
import { Hero } from "../sections/beyondTheGame/Hero";
import { Path } from "../sections/beyondTheGame/Path";
import { StagePicker } from "../sections/beyondTheGame/StagePicker";
import { Story } from "../sections/beyondTheGame/Story";
import { Team } from "../sections/beyondTheGame/Team";
import { Faq } from "../sections/beyondShared/Faq";
import { PageShell } from "../ui/PageShell";
import s from "./BeyondTheGame.module.css";

type Props = { content: BeyondTheGamePageContent };

/** When this module loaded. Dated facts hide against the browser's clock after load. */
const RENDERED_AT = Date.now();

/** BeyondTheGame, v0.1. Sections in the order of the design. All copy comes in as content. */
export function BeyondTheGamePage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <Hero content={content.hero} />
      <Glance content={content.glance} now={RENDERED_AT} />
      <StagePicker id="stage" content={content.stages} />
      <Path id="path" content={content.path} />
      <Story id="proof" content={content.story} />
      <Team id="team" content={content.team} />
      <Faq id="faq" content={content.faq} />
      <Apply id="apply" content={content.apply} />
    </PageShell>
  );
}
