import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Report | Beyond Code Collective",
  description: "Board of Directors report, Beyond Code Collective.",
  robots: { index: false, follow: false },
};

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
