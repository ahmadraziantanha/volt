import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VOLT — Sound, engineered.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lightning bolt polygon — derived from the favicon path, in percentages
// of a square container so the shape isn't distorted.
const BOLT_CLIP =
  "polygon(53% 16%, 28% 56%, 44% 56%, 41% 84%, 72% 38%, 56% 38%, 59% 16%)";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 90px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle accent glow behind bolt */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "200px",
            width: "340px",
            height: "340px",
            background:
              "radial-gradient(circle, rgba(228,255,26,0.12) 0%, transparent 65%)",
            transform: "translateY(-50%)",
          }}
        />

        {/* Left: text stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          {/* Mono label */}
          <div
            style={{
              fontSize: "13px",
              color: "#4A4A4A",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "36px",
            }}
          >
            PORTO · PORTUGAL
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: "168px",
              fontWeight: "800",
              color: "#FAFAFA",
              lineHeight: "0.84",
              letterSpacing: "-8px",
              marginBottom: "36px",
            }}
          >
            VOLT
          </div>

          {/* Accent bar */}
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "#E4FF1A",
              marginBottom: "28px",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "22px",
              color: "#707070",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Sound, engineered.
          </div>
        </div>

        {/* Right: electric yellow lightning bolt */}
        <div
          style={{
            width: "300px",
            height: "300px",
            background: "#E4FF1A",
            clipPath: BOLT_CLIP,
            flexShrink: 0,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
