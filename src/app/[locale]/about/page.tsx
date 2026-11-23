import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { AboutPage } from "@/v01/pages/About";
import { about } from "@/v01/content/about";

export const metadata: Metadata = {
  title: "About | Beyond Code Collective",
  // English only for now, so the canonical has no Spanish alternate.
  alternates: { canonical: `${SITE_URL}/en/about` },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish has no version of it yet.
  if (locale !== "en") notFound();

  return <AboutPage content={about} />;
}
