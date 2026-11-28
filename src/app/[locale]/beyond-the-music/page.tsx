import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { SimplePage } from "@/v01/pages/Simple";
import { beyondTheMusic } from "@/v01/content/beyondTheMusic";

export const metadata: Metadata = {
  title: "Beyond the Music | Beyond Code Collective",
  description: "AI education for artists, creatives and executives in entertainment, with Jerry Clark as Expert in Residence.",
  // English only for now, so the canonical has no Spanish alternate.
  alternates: { canonical: `${SITE_URL}/en/beyond-the-music` },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish readers go to the closest Spanish page.
  if (locale !== "en") redirect("/es/news");

  return <SimplePage content={beyondTheMusic} />;
}
