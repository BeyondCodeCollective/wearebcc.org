import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImpactPage } from "@/v01/pages/Impact";
import { impact } from "@/v01/content/impact";

export const metadata: Metadata = {
  title: "Impact | Beyond Code Collective",
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish has no version of it yet.
  if (locale !== "en") notFound();

  return <ImpactPage content={impact} />;
}
