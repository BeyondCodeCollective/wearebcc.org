import type { DonatePageContent } from "../content/donate.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: DonatePageContent };

/** Donate, v0.1. Sections in the order of the design. All copy comes in as content. */
export function DonatePage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>Donate</h1>
      </Section>
    </PageShell>
  );
}
