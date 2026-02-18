"use client";

export function Logo({
  variant = "stacked",
  color = "black",
  className = "",
}: {
  variant?: "stacked" | "horizontal";
  color?: "black" | "white";
  className?: string;
}) {
  if (variant === "horizontal") {
    return (
      <img
        src={
          color === "white"
            ? "/images/bcc-logo-horizontal-white.png"
            : "/images/bcc-logo-horizontal-black.png"
        }
        alt="Beyond Code Collective"
        className={className}
        draggable={false}
      />
    );
  }

  // Stacked — official SVG
  return (
    <img
      src={
        color === "white"
          ? "/images/bcc-logo-stacked-white.svg"
          : "/images/bcc-logo-stacked-black.svg"
      }
      alt="Beyond Code Collective"
      className={className}
      draggable={false}
    />
  );
}
