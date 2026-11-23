import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { SignupPage } from "@/v01/pages/Signup";
import { signup } from "@/v01/content/signup";

export const metadata: Metadata = {
  title: "Sign up | Beyond Code Collective",
  // English only for now, so the canonical has no Spanish alternate.
  alternates: { canonical: `${SITE_URL}/en/sign-up` },
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish has no version of it yet.
  if (locale !== "en") notFound();

  return <SignupPage content={signup} />;
}
