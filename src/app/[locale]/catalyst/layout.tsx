import type { Metadata } from "next";

const OG_IMAGE = "https://www.wearebcc.org/images/atg/atg-hero-panel.jpg";

const COPY = {
  en: {
    title: "Catalyst: From Skill to Career | Beyond Code Collective",
    description:
      "Catalyst is an 8–12 week, cohort-based workforce program for adult learners ready to move into tech. No prior background required — bring the drive, we bring the curriculum, community, and employer connections.",
    ogTitle: "Catalyst: From Skill to Career",
    imageAlt: "A Catalyst cohort session",
  },
  es: {
    title: "Catalyst: De la Habilidad a la Carrera | Beyond Code Collective",
    description:
      "Catalyst es un programa de fuerza laboral basado en cohortes, de 8 a 12 semanas, para personas adultas listas para entrar en la tecnología. Sin experiencia previa: tú pones el empuje, nosotros el plan de estudios, la comunidad y las conexiones con empleadores.",
    ogTitle: "Catalyst: De la Habilidad a la Carrera",
    imageAlt: "Una sesión de la cohorte Catalyst",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "es" ? COPY.es : COPY.en;
  const path = `/${locale === "es" ? "es" : "en"}/catalyst`;
  const url = `https://www.wearebcc.org${path}`;

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        en: "https://www.wearebcc.org/en/catalyst",
        es: "https://www.wearebcc.org/es/catalyst",
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

export default function CatalystLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
