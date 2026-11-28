import type { HomeContent } from "../content/types";
import { About } from "../sections/About";
import { Events } from "../sections/Events";
import { Film } from "../sections/Film";
import { Hero } from "../sections/Hero";
import { Impact } from "../sections/Impact";
import { NextUp } from "../sections/NextUp";
import { PartnerCta } from "../sections/PartnerCta";
import { PartnersStrip } from "../sections/PartnersStrip";
import { Paths } from "../sections/Paths";
import { Programs } from "../sections/Programs";
import { Signup } from "../sections/Signup";
import { PageShell } from "../ui/PageShell";

/**
 * When this module was loaded on the server: build time for a prerendered
 * page. Sections that hide past events start from it, then follow the
 * visitor's clock once the page is live in their browser.
 */
const RENDERED_AT = Date.now();

type Props = { content: HomeContent };

/**
 * Home, v0.1. All copy comes in as content.
 * NOT IN DESIGN: the design runs About, Paths, Events, Programs. Visitors wanted "Start here"
 * straight under the first screen, so the programs and the path cards now come first (run 6, 2026-11-27).
 */
export function Home({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Hero content={content.hero} />
      <NextUp content={content.nextUp} now={RENDERED_AT} />
      <Programs id="programs" content={content.programs} now={RENDERED_AT} />
      <Paths id="paths" content={content.paths} />
      <Events id="events" content={content.events} now={RENDERED_AT} />
      <About id="about" content={content.about} />
      <Impact id="impact" content={content.impact} />
      <Film content={content.film} />
      <PartnersStrip content={content.partners} />
      <PartnerCta id="partner" content={content.partnerCta} />
      <Signup id="signup" content={content.signup} />
    </PageShell>
  );
}
