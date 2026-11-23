import type { EventsPageContent } from "../content/events.types";
import { Archive } from "../sections/events/Archive";
import { EventList } from "../sections/events/EventList";
import { Hero } from "../sections/events/Hero";
import { NeverMiss } from "../sections/events/NeverMiss";
import { PageShell } from "../ui/PageShell";
import s from "./Events.module.css";

/**
 * When this module was loaded on the server: build time for a prerendered
 * page. Dated sections start from it, then follow the visitor's clock.
 */
const RENDERED_AT = Date.now();

type Props = { content: EventsPageContent };

/** Events, v0.1. Sections in the order of the design. All copy comes in as content. */
export function EventsPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <Hero content={content.hero} sessions={content.sessions} now={RENDERED_AT} />
      <EventList content={content.list} sessions={content.sessions} now={RENDERED_AT} />
      <Archive content={content.archive} />
      <NeverMiss content={content.neverMiss} />
    </PageShell>
  );
}
