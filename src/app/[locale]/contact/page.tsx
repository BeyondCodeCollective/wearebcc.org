import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { SimplePage } from "@/v01/pages/Simple";
import { contact } from "@/v01/content/contact";

export const metadata: Metadata = {
  title: "Contact | Beyond Code Collective",
  description: "Call or write to Beyond Code Collective: learners, partners, donors, press and volunteers.",
  // English only for now, so the canonical has no Spanish alternate.
  alternates: { canonical: `${SITE_URL}/en/contact` },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish readers go to the closest Spanish page.
  if (locale !== "en") redirect("/es");

  return <SimplePage content={contact} />;
}
