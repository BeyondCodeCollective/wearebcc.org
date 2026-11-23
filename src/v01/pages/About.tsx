import type { AboutPageContent } from "../content/about.types";
import { Board } from "../sections/about/Board";
import { BuildWithUs } from "../sections/about/BuildWithUs";
import { Council } from "../sections/about/Council";
import { Founder } from "../sections/about/Founder";
import { Hero } from "../sections/about/Hero";
import { Report } from "../sections/about/Report";
import { Team } from "../sections/about/Team";
import { WhatWeDo } from "../sections/about/WhatWeDo";
import { WhyHere } from "../sections/about/WhyHere";
import { PageShell } from "../ui/PageShell";
import s from "./About.module.css";

type Props = { content: AboutPageContent };

/** About, v0.1. Sections in the order of the design. All copy comes in as content. */
export function AboutPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <Hero content={content.hero} />
      <Founder content={content.founder} />
      <WhatWeDo content={content.whatWeDo} />
      <WhyHere content={content.whyHere} />
      <Team content={content.team} />
      <Board content={content.board} />
      <Council content={content.council} />
      <Report content={content.report} />
      <BuildWithUs content={content.build} />
    </PageShell>
  );
}
