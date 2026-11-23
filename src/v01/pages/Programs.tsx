import type { ProgramsPageContent } from "../content/programs.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: ProgramsPageContent };

/** Programs, v0.1. Sections in the order of the design. All copy comes in as content. */
export function ProgramsPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>Programs</h1>
      </Section>
    </PageShell>
  );
}
