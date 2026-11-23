import type { ImpactPageContent } from "../content/impact.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: ImpactPageContent };

/** Impact, v0.1. Sections in the order of the design. All copy comes in as content. */
export function ImpactPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>Impact</h1>
      </Section>
    </PageShell>
  );
}
