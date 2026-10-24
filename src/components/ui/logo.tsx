"use client";

export function Logo({
  variant = "stacked",
  color = "black",
  className = "",
  loading = "eager",
}: {
  variant?: "stacked" | "horizontal";
  color?: "black" | "white";
  className?: string;
  /** Use "lazy" for logos below the fold (footer) so they are not preloaded. */
  loading?: "eager" | "lazy";
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
        loading={loading}
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
      loading={loading}
    />
  );
}
