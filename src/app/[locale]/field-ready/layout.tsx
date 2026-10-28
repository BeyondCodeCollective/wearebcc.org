import type { Metadata } from "next";

const TITLE = "Field Ready | Beyond Code Collective";
const DESCRIPTION =
  "Field Ready is a free eight-week program that trains anyone, in any function, to think clearly with AI, listen for the real problem, build something that helps, and prove it works. Join the waitlist.";
const OG_IMAGE = "https://www.wearebcc.org/field-ready/hero-poster.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale === "es" ? "es" : "en"}/field-ready`;
  const url = `https://www.wearebcc.org${path}`;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: url,
      languages: {
        en: "https://www.wearebcc.org/en/field-ready",
        es: "https://www.wearebcc.org/es/field-ready",
      },
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url,
      type: "website",
      images: [{ url: OG_IMAGE, alt: "Field Ready" }],
    },
  };
}

export default function FieldReadyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
