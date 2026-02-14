import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-electric-green text-true-black hover:bg-electric-green/90",
  secondary:
    "bg-true-black text-off-white hover:bg-charcoal",
  outline:
    "border-2 border-current bg-transparent hover:bg-true-black/5",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & { variant?: ButtonVariant }) {
  return (
    <a
      className={`inline-flex items-center justify-center px-8 py-4 font-mono text-sm tracking-wider uppercase transition-colors cursor-pointer ${variants[variant]} ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
      {...props}
    >
      {children}
    </a>
  );
}
