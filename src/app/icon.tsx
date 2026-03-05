import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FF4C00",
          borderRadius: "4px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          BCC
        </span>
      </div>
    ),
    { ...size }
  );
}
