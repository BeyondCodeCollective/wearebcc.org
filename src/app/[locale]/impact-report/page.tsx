import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { ImpactReportPage } from "@/v01/pages/ImpactReport";
import { impactReport } from "@/v01/content/impactReport";

export const metadata: Metadata = {
  title: "Six Month Impact Report: Beyond Code Collective",
  description: "Six months in, the model holds: 485 learners across six generations and 16 U.S. states and territories.",
  // Shared without a locale prefix: the middleware rewrites /impact-report to this page.
  alternates: { canonical: `${SITE_URL}/impact-report` },
};

export default function Page() {
  return <ImpactReportPage content={impactReport} />;
}
