import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Access | Beyond Code Collective",
  description: "Partner-only preview of Beyond Code Collective programs.",
  robots: { index: false, follow: false },
  // Without its own openGraph this page inherits the root card, which shows the
  // Centers photo. noindex keeps it out of search; the card still renders when
  // the link is pasted into Slack, iMessage or an email, which is the only way
  // anyone reaches this page.
  openGraph: {
    title: "Your first downtown. Who runs it?",
    description: "Beyond Code Collective × Rancho Cordova — partner preview.",
    url: "https://www.wearebcc.org/en/rancho-cordova",
    siteName: "Beyond Code Collective",
    type: "website",
    images: [
      {
        url: "https://www.wearebcc.org/images/rancho-cordova-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cordova Arena at dusk, over the line: Your first downtown. Who runs it?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your first downtown. Who runs it?",
    description: "Beyond Code Collective × Rancho Cordova — partner preview.",
    images: ["https://www.wearebcc.org/images/rancho-cordova-og.jpg"],
  },
};

export default function RanchoCordovaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
