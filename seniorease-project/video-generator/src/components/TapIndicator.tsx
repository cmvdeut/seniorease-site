import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const TAP_ELEMENT_POSITIONS: Record<string, { x: number; y: number }> = {
  // Eerste regel in gesprekkenlijst (onder zoekbalk)
  "chat-item":   { x: 50, y: 30 },
  "new-chat-fab": { x: 88, y: 91 },
  "attachment":  { x: 14, y: 89 },
  "send-button": { x: 90, y: 89 },
  "type-field":  { x: 50, y: 89 },
  "phone-icon":  { x: 83, y: 10 },
  "video-icon":  { x: 93, y: 10 },
  "call-button": { x: 50, y: 75 },
};

const RIPPLE_CYCLE = 50; // frames per ripple cycle

export const TapIndicator = ({
  tapElement,
  delay = 25,
}: {
  tapElement: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pos = TAP_ELEMENT_POSITIONS[tapElement];
  if (!pos) return null;

  const localFrame = Math.max(0, frame - delay);

  // Verschijn animatie
  const appear = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, mass: 0.6 },
    from: 0,
    to: 1,
  });

  // Ripple ring — herhaalt elke RIPPLE_CYCLE frames
  const rippleFrame = localFrame % RIPPLE_CYCLE;
  const rippleScale = interpolate(rippleFrame, [0, RIPPLE_CYCLE * 0.7], [1, 2.8], {
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(rippleFrame, [0, RIPPLE_CYCLE * 0.7], [0.7, 0], {
    extrapolateRight: "clamp",
  });

  if (localFrame === 0 && frame < delay) return null;

  const SIZE = 52;

  return (
    <div
      style={{
        position: "absolute",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: "translate(-50%, -50%)",
        width: SIZE,
        height: SIZE,
        pointerEvents: "none",
      }}
    >
      {/* Ripple ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.85)",
          transform: `scale(${rippleScale})`,
          opacity: rippleOpacity * appear,
        }}
      />

      {/* Gevulde cirkel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.88)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
          transform: `scale(${appear})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Vinger-icoon */}
        <div style={{ fontSize: 26, lineHeight: 1 }}>👆</div>
      </div>
    </div>
  );
};
