import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventsPage } from "@/v01/pages/Events";
import { events } from "@/v01/content/events";

export const metadata: Metadata = {
  title: "Events | Beyond Code Collective",
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: this page exists in English only. Spanish has no version of it yet.
  if (locale !== "en") notFound();

  return <EventsPage content={events} />;
}
