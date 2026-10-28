import type { Metadata } from "next";

const COPY = {
  en: {
    title: "Field Ready | Beyond Code Collective",
    description:
      "Field Ready is a free eight-week program that trains anyone, in any function, to think clearly with AI, listen for the real problem, build something that helps, and prove it works. Join the waitlist.",
  },
  es: {
    title: "Field Ready | Beyond Code Collective",
    description:
      "Field Ready es un programa gratuito de ocho semanas que enseña a cualquier persona, en cualquier área, a pensar con claridad con la IA, escuchar el problema real, crear algo que ayude y demostrar que funciona. Súmate a la lista de espera.",
  },
} as const;
const OG_IMAGE = "https://www.wearebcc.org/field-ready/hero-poster.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "es" ? "es" : "en";
  const { title: TITLE, description: DESCRIPTION } = COPY[lang];
  const path = `/${lang}/field-ready`;
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
