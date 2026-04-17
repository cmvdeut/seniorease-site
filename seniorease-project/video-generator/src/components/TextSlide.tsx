import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Slide } from "../types";
import { PhoneMockup } from "./PhoneMockup";

const POINT_DELAY_FRAMES = 18;

export const TextSlide = ({
  slide,
  slideNumber,
  totalSlides,
}: {
  slide: Slide;
  slideNumber: number;
  totalSlides: number;
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const titleX = interpolate(frame, [0, 15], [-60, 0], { extrapolateRight: "clamp" });
  const screenshotScale = interpolate(frame, [0, 20], [0.95, 1], { extrapolateRight: "clamp" });
  const screenshotOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" });

  const hasScreenshot = Boolean(slide.screenshot);
  const hasPhone = Boolean(slide.phoneScreen);
  const hasRightColumn = hasScreenshot || hasPhone;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5EEE6" }}>

      {/* Logo watermark */}
      <Img
        src={staticFile("heart-logo.png")}
        style={{
          position: "absolute",
          bottom: 36,
          right: 52,
          width: 70,
          height: 70,
          opacity: 0.25,
          zIndex: 10,
        }}
      />

      {/* Slide teller */}
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 52,
          fontSize: 24,
          color: "#8B5E3C",
          fontFamily: "Segoe UI, Arial, sans-serif",
          opacity: 0.6,
          zIndex: 10,
        }}
      >
        {slideNumber} / {totalSlides}
      </div>

      {/* Hoofd layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          padding: "80px 100px",
          gap: 60,
          boxSizing: "border-box",
        }}
      >
        {/* Linker kolom: titel + punten */}
        <div
          style={{
            flex: hasRightColumn ? "0 0 48%" : "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Titel */}
          <div
            style={{
              opacity: fadeIn,
              transform: `translateX(${titleX}px)`,
              fontSize: hasRightColumn ? 52 : 64,
              fontFamily: "Segoe UI, Arial, sans-serif",
              fontWeight: "bold",
              color: "#8B5E3C",
              marginBottom: 44,
              borderLeft: "10px solid #8B5E3C",
              paddingLeft: 32,
              lineHeight: 1.25,
            }}
          >
            {slide.title}
          </div>

          {/* Punten */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {slide.points.map((point, i) => {
              const pointOpacity = interpolate(
                frame,
                [12 + i * POINT_DELAY_FRAMES, 12 + i * POINT_DELAY_FRAMES + 12],
                [0, 1],
                { extrapolateRight: "clamp" }
              );
              const pointX = interpolate(
                frame,
                [12 + i * POINT_DELAY_FRAMES, 12 + i * POINT_DELAY_FRAMES + 12],
                [-50, 0],
                { extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={i}
                  style={{
                    opacity: pointOpacity,
                    transform: `translateX(${pointX}px)`,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 24,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#8B5E3C",
                      flexShrink: 0,
                      marginTop: 10,
                    }}
                  />
                  <div
                    style={{
                      fontSize: hasRightColumn ? 34 : 40,
                      fontFamily: "Segoe UI, Arial, sans-serif",
                      color: "#1F1F1F",
                      lineHeight: 1.5,
                    }}
                  >
                    {point}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rechter kolom: screenshot of phone mockup */}
        {hasScreenshot && (
          <div
            style={{
              flex: "0 0 48%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: screenshotOpacity,
              transform: `scale(${screenshotScale})`,
            }}
          >
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(139, 94, 60, 0.25)",
                border: "4px solid #8B5E3C",
                maxWidth: "100%",
                maxHeight: "820px",
              }}
            >
              <Img
                src={staticFile(`screenshots/${slide.screenshot}`)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        )}
        {hasPhone && slide.phoneScreen && (
          <div
            style={{
              flex: "0 0 48%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneMockup phoneScreen={slide.phoneScreen} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
