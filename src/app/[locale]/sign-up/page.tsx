import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo";
import { SignupPage } from "@/v01/pages/Signup";
import { signupContentFor } from "@/v01/content/signupContext";

export const metadata: Metadata = {
  title: "Sign up | Beyond Code Collective",
  // English only for now, so the canonical has no Spanish alternate.
  alternates: { canonical: `${SITE_URL}/en/sign-up` },
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ for?: string | string[] }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  // A link can say what the sign-up is for: /en/sign-up?for=<event id or program key>.
  const key = typeof query.for === "string" ? query.for : undefined;

  // v0.1: this page exists in English only. Spanish has no version of it yet.
  if (locale !== "en") notFound();

  return <SignupPage content={signupContentFor(key, Date.now())} />;
}
