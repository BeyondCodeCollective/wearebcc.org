import type { ImpactReportContent } from "../content/impactReport";
import { ReportFrame } from "../sections/impactReport/ReportFrame";
import { PageShell } from "../ui/PageShell";

type Props = { content: ImpactReportContent };

/** The six month impact report inside the site header and footer. */
export function ImpactReportPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <ReportFrame content={content.report} />
    </PageShell>
  );
}
