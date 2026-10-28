import { Nav } from "@/components/nav";
import { FieldReadyBody } from "./field-ready-body";
import "./field-ready.css";

export default async function FieldReadyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&family=Special+Gothic+Condensed+One&display=swap"
        rel="stylesheet"
      />
      <Nav variant="light" />
      <main className="fr">
        <FieldReadyBody locale={locale === "es" ? "es" : "en"} />
      </main>
    </>
  );
}
