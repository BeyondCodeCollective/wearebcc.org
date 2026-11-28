import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { SimplePage } from "@/v01/pages/Simple";
import { volunteer } from "@/v01/content/volunteer";

export const metadata: Metadata = {
  title: "Volunteer | Beyond Code Collective",
  description: "Mentor, teach or support an event with Beyond Code Collective. Sign up, browse open roles and report your hours.",
  // English only for now, so the canonical has no Spanish alternate.
  alternates: { canonical: `${SITE_URL}/en/volunteer` },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish readers go to the closest Spanish page.
  if (locale !== "en") redirect("/es/news/volunteer-with-bcc");

  return <SimplePage content={volunteer} />;
}
