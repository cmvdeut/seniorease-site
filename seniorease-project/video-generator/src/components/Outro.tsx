import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, mass: 0.8 }, from: 0.85, to: 1 });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const buttonOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#8B5E3C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <Img src={staticFile("heart-logo.png")} style={{ width: 160, height: 160 }} />

        <div
          style={{
            fontSize: 80,
            fontFamily: "Segoe UI, Arial, sans-serif",
            fontWeight: "bold",
            color: "#FFFFFF",
          }}
        >
          seniorease.nl
        </div>

        <div
          style={{
            fontSize: 38,
            fontFamily: "Segoe UI, Arial, sans-serif",
            color: "#F5EEE6",
            opacity: 0.9,
          }}
        >
          Technologie zonder gedoe
        </div>

        <div
          style={{
            opacity: buttonOpacity,
            marginTop: 20,
            display: "flex",
            gap: 32,
          }}
        >
          <div
            style={{
              padding: "18px 52px",
              border: "3px solid #F5EEE6",
              borderRadius: 50,
              fontSize: 34,
              color: "#F5EEE6",
              fontFamily: "Segoe UI, Arial, sans-serif",
            }}
          >
            👍 Like
          </div>
          <div
            style={{
              padding: "18px 52px",
              backgroundColor: "#F5EEE6",
              borderRadius: 50,
              fontSize: 34,
              color: "#8B5E3C",
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontWeight: "bold",
            }}
          >
            🔔 Abonneer
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
