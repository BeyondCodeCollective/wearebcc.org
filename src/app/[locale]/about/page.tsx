import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/v01/pages/About";
import { about } from "@/v01/content/about";

export const metadata: Metadata = {
  title: "About | Beyond Code Collective",
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish has no version of it yet.
  if (locale !== "en") notFound();

  return <AboutPage content={about} />;
}
