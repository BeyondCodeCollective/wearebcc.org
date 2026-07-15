import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.tsx at Apple touch size — the [ ] brackets on
// electric green.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E4F800",
          borderRadius: "28px",
        }}
      >
        <span
          style={{
            fontSize: "96px",
            fontWeight: 900,
            color: "#0A0A0A",
            letterSpacing: "-5px",
            lineHeight: 1,
          }}
        >
          [ ]
        </span>
      </div>
    ),
    { ...size }
  );
}
