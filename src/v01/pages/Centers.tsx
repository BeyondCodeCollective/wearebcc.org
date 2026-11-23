import type { CentersPageContent } from "../content/centers.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: CentersPageContent };

/** Centers, v0.1. Sections in the order of the design. All copy comes in as content. */
export function CentersPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>Centers</h1>
      </Section>
    </PageShell>
  );
}
