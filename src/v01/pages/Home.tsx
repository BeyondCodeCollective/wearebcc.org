import "../tokens.css";
import type { HomeContent } from "../content/types";
import { cx } from "../lib/cx";
import { About } from "../sections/About";
import { Events } from "../sections/Events";
import { Film } from "../sections/Film";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { Hero } from "../sections/Hero";
import { Impact } from "../sections/Impact";
import { NextUp } from "../sections/NextUp";
import { PartnerCta } from "../sections/PartnerCta";
import { PartnersStrip } from "../sections/PartnersStrip";
import { Paths } from "../sections/Paths";
import { Programs } from "../sections/Programs";
import { Signup } from "../sections/Signup";
import s from "./Home.module.css";

/**
 * When this module was loaded on the server: build time for a prerendered
 * page. Sections that hide past events start from it, then follow the
 * visitor's clock once the page is live in their browser.
 */
const RENDERED_AT = Date.now();

type Props = { content: HomeContent };

/** Home, v0.1. Sections in the order of the design. All copy comes in as content. */
export function Home({ content }: Props) {
  return (
    <div id="top" className={cx("v01", s.page)} data-surface="paper">
      <Header content={content.header} />
      <main>
        <Hero content={content.hero} />
        <NextUp content={content.nextUp} now={RENDERED_AT} />
        <About id="about" content={content.about} />
        <Paths id="paths" content={content.paths} />
        <Events id="events" content={content.events} now={RENDERED_AT} />
        <Programs id="programs" content={content.programs} now={RENDERED_AT} />
        <Impact id="impact" content={content.impact} />
        <Film content={content.film} />
        <PartnersStrip content={content.partners} />
        <PartnerCta id="partner" content={content.partnerCta} />
        <Signup id="signup" content={content.signup} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
