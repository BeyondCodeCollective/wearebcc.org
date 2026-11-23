import type { EventsPageContent } from "../content/events.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: EventsPageContent };

/** Events, v0.1. Sections in the order of the design. All copy comes in as content. */
export function EventsPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>Events</h1>
      </Section>
    </PageShell>
  );
}
