import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const Intro = ({ title }: { title: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const titleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [25, 45], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5EEE6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <div style={{ transform: `scale(${logoScale})` }}>
        <Img src={staticFile("heart-logo.png")} style={{ width: 200, height: 200 }} />
      </div>

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontFamily: "Segoe UI, Arial, sans-serif",
            fontWeight: "bold",
            color: "#8B5E3C",
          }}
        >
          SeniorEase
        </div>
        <div
          style={{
            fontSize: 44,
            fontFamily: "Segoe UI, Arial, sans-serif",
            fontWeight: "bold",
            color: "#1F1F1F",
            marginTop: 20,
          }}
        >
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};
