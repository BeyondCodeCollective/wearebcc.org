import type { BeyondReadyPageContent } from "../content/beyondReady.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: BeyondReadyPageContent };

/** BeyondReady, v0.1. Sections in the order of the design. All copy comes in as content. */
export function BeyondReadyPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>BeyondReady</h1>
      </Section>
    </PageShell>
  );
}
