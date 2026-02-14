import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Path | Beyond Code Collective",
  description:
    "Take our quick quiz to discover your perfect learning pathway at Beyond Code Collective. Whether you're 14 or 40, we'll match you with the right courses.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
