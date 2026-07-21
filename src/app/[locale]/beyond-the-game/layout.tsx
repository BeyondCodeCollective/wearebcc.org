import type { Metadata } from "next";

const OG_IMAGE = "https://www.wearebcc.org/images/atg/atg-hero-panel.jpg";

const COPY = {
  en: {
    title: "Beyond The Game | Beyond Code Collective",
    description:
      "Beyond The Game is a national, cohort-based workforce program helping transitioning professional and NCAA student-athletes design and enter a second career in tech.",
    ogTitle: "Beyond The Game",
    imageAlt: "Athletes in a Beyond The Game program session",
  },
  es: {
    title: "Beyond The Game | Beyond Code Collective",
    description:
      "Beyond The Game es un programa nacional de fuerza laboral basado en cohortes que ayuda a atletas profesionales y universitarios de la NCAA en transición a diseñar e iniciar una segunda carrera en tecnología.",
    ogTitle: "Beyond The Game",
    imageAlt: "Atletas en una sesión del programa Beyond The Game",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "es" ? COPY.es : COPY.en;
  const path = `/${locale === "es" ? "es" : "en"}/beyond-the-game`;
  const url = `https://www.wearebcc.org${path}`;

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        en: "https://www.wearebcc.org/en/beyond-the-game",
        es: "https://www.wearebcc.org/es/beyond-the-game",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.description,
      url,
      siteName: "Beyond Code Collective",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1600, height: 1066, alt: c.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.ogTitle,
      description: c.description,
      images: [OG_IMAGE],
    },
  };
}

export default function BeyondTheGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
