import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import LegacyPage from "./legacy-page";
import { PartnerPage } from "@/v01/pages/Partner";
import { partner } from "@/v01/content/partner";

type Props = { params: Promise<{ locale: string }> };

/**
 * The layout beside this file describes the old page: a partner-only preview,
 * kept out of search. In English this route is now the public Hire and partner
 * page, so English gets its own title and is indexable. Spanish inherits the
 * layout's metadata, unchanged.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  return {
    title: "Hire and partner | Beyond Code Collective",
    description:
      "Beyond Code Collective provides human-powered resources for a tech-driven world. Building intergenerational opportunity in the technologies of today and tomorrow.",
    robots: { index: true, follow: true },
    alternates: { canonical: `${SITE_URL}/en/partners` },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: English gets the new page, built from src/v01. Spanish keeps the
  // current page in legacy-page.tsx, unchanged, until the new design has Spanish copy.
  if (locale === "en") return <PartnerPage content={partner} />;

  return <LegacyPage />;
}
