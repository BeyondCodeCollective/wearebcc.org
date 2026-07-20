import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Access | Beyond Code Collective",
  description: "Partner-only preview of Beyond Code Collective programs.",
  robots: { index: false, follow: false },
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
