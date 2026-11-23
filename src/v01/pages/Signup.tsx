import type { SignupPageContent } from "../content/signup.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: SignupPageContent };

/** Signup, v0.1. Sections in the order of the design. All copy comes in as content. */
export function SignupPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>Signup</h1>
      </Section>
    </PageShell>
  );
}
