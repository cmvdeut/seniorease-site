import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PhoneScreen, TapElement } from "../types";
import { TapIndicator } from "./TapIndicator";

// ─── Sub-screens ─────────────────────────────────────────────────────────────

const WA_GREEN = "#25D366";
const WA_DARK = "#075E54";
const WA_LIGHT_BG = "#ECE5DD";
const WA_SENT = "#DCF8C6";

const Avatar = ({ initials, size = 40, bg = "#aaa" }: { initials: string; size?: number; bg?: string }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", backgroundColor: bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: size * 0.38, fontWeight: "bold",
    fontFamily: "Segoe UI, Arial, sans-serif", flexShrink: 0,
  }}>
    {initials}
  </div>
);

const ChatListScreen = () => (
  <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
    {/* Header */}
    <div style={{
      backgroundColor: WA_DARK, padding: "14px 16px 10px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Segoe UI, Arial, sans-serif" }}>
        WhatsApp
      </span>
      <div style={{ display: "flex", gap: 16, color: "#fff", fontSize: 18 }}>
        <span>🔍</span><span>⋮</span>
      </div>
    </div>
    {/* Zoekbalk */}
    <div style={{
      backgroundColor: "#fff", margin: "8px 12px", borderRadius: 22,
      padding: "7px 14px", display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: 14, color: "#888" }}>🔍</span>
      <span style={{ fontSize: 14, color: "#aaa", fontFamily: "Segoe UI, Arial, sans-serif" }}>Zoeken...</span>
    </div>
    {/* Contacten */}
    {[
      { init: "M", name: "Mama", msg: "Hoe gaat het?", time: "09:14", bg: "#e91e63" },
      { init: "P", name: "Peter", msg: "Tot morgen 👍", time: "Gis", bg: "#2196f3" },
      { init: "F", name: "Fam. Groep", msg: "Gezellig!", time: "Ma", bg: WA_GREEN },
    ].map((c) => (
      <div key={c.name} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
        borderBottom: "1px solid #f0f0f0", backgroundColor: "#fff",
      }}>
        <Avatar initials={c.init} size={46} bg={c.bg} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Segoe UI, Arial, sans-serif", color: "#111" }}>{c.name}</span>
            <span style={{ fontSize: 12, color: "#888", fontFamily: "Segoe UI, Arial, sans-serif" }}>{c.time}</span>
          </div>
          <span style={{ fontSize: 13, color: "#666", fontFamily: "Segoe UI, Arial, sans-serif" }}>{c.msg}</span>
        </div>
      </div>
    ))}
    <div style={{ flex: 1, backgroundColor: "#f5f5f5" }} />
    {/* Nieuw gesprek knop */}
    <div style={{
      position: "absolute", bottom: 16, right: 16,
      width: 52, height: 52, borderRadius: "50%", backgroundColor: WA_GREEN,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
      boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
    }}>✏️</div>
  </div>
);

const DRAFT_MSG = "Dag mama! 👋";

const ChatScreen = ({
  showAttachmentMenu,
  tapElement,
  tapDelay = 25,
}: {
  showAttachmentMenu?: boolean;
  tapElement?: TapElement;
  tapDelay?: number;
}) => {
  const frame = useCurrentFrame();

  const typingStart = tapDelay + 28;
  const typeProgress =
    tapElement === "type-field"
      ? interpolate(frame, [typingStart, typingStart + 38], [0, 1], { extrapolateRight: "clamp" })
      : tapElement === "send-button"
        ? 1
        : 0;
  const visibleLen = Math.floor(typeProgress * DRAFT_MSG.length);
  const inputDisplay =
    tapElement === "type-field"
      ? frame < typingStart
        ? ""
        : DRAFT_MSG.slice(0, visibleLen)
      : tapElement === "send-button"
        ? DRAFT_MSG
        : "";

  const sendAfter = tapDelay + 22;
  const sentReveal = interpolate(
    frame,
    [sendAfter + 18, sendAfter + 40],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const showNewBubble = tapElement === "send-button" && sentReveal > 0.05;

  const inputBarText =
    tapElement === "send-button" && sentReveal > 0.42 ? "" : inputDisplay;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      {/* Header */}
      <div style={{
        backgroundColor: WA_DARK, padding: "10px 12px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ color: "#fff", fontSize: 18 }}>←</span>
        <Avatar initials="M" size={36} bg="#e91e63" />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontSize: 15, fontWeight: "bold", fontFamily: "Segoe UI, Arial, sans-serif" }}>Mama</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "Segoe UI, Arial, sans-serif" }}>online</div>
        </div>
        <div style={{ display: "flex", gap: 16, color: "#fff", fontSize: 18 }}>
          <span>📞</span><span>📹</span>
        </div>
      </div>
      {/* Berichten */}
      <div style={{ flex: 1, backgroundColor: WA_LIGHT_BG, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8, overflowY: "hidden" }}>
        <div style={{
          alignSelf: "flex-start", backgroundColor: "#fff", borderRadius: "0 10px 10px 10px",
          padding: "8px 12px", maxWidth: "75%", boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }}>
          <span style={{ fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif", color: "#111" }}>Hoe gaat het? 😊</span>
          <div style={{ fontSize: 10, color: "#aaa", textAlign: "right", fontFamily: "Segoe UI, Arial, sans-serif" }}>09:10</div>
        </div>
        <div style={{
          alignSelf: "flex-end", backgroundColor: WA_SENT, borderRadius: "10px 0 10px 10px",
          padding: "8px 12px", maxWidth: "75%", boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }}>
          <span style={{ fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif", color: "#111" }}>Goed hoor, en met jou?</span>
          <div style={{ fontSize: 10, color: "#aaa", textAlign: "right", fontFamily: "Segoe UI, Arial, sans-serif" }}>09:14 ✓✓</div>
        </div>
        {showNewBubble && (
          <div style={{
            alignSelf: "flex-end", backgroundColor: WA_SENT, borderRadius: "10px 0 10px 10px",
            padding: "8px 12px", maxWidth: "75%", boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
            opacity: sentReveal,
            transform: `translateY(${(1 - sentReveal) * 12}px)`,
          }}>
            <span style={{ fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif", color: "#111" }}>{DRAFT_MSG}</span>
            <div style={{ fontSize: 10, color: "#34B7F1", textAlign: "right", fontFamily: "Segoe UI, Arial, sans-serif" }}>
              {sentReveal > 0.85 ? "09:18 ✓✓" : "09:18"}
            </div>
          </div>
        )}
      </div>
      {/* Attachment menu */}
      {showAttachmentMenu && (
        <div style={{
          position: "absolute", bottom: 52, left: 8,
          backgroundColor: "#fff", borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          padding: "10px 0", minWidth: 150,
        }}>
          {["📷  Camera", "🖼️  Galerij", "📄  Document"].map((item) => (
            <div key={item} style={{
              padding: "10px 20px", fontSize: 14,
              fontFamily: "Segoe UI, Arial, sans-serif", color: "#333",
            }}>{item}</div>
          ))}
        </div>
      )}
      {/* Input bar */}
      <div style={{
        backgroundColor: "#f0f0f0", padding: "6px 8px",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{
          flex: 1, backgroundColor: "#fff", borderRadius: 22,
          padding: "8px 14px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>😊</span>
          <span style={{
            fontSize: 13,
            color: inputBarText ? "#111" : "#aaa",
            fontFamily: "Segoe UI, Arial, sans-serif",
            flex: 1,
          }}>
            {inputBarText || "Bericht"}
          </span>
          <span style={{ fontSize: 16 }}>📎</span>
          <span style={{ fontSize: 16 }}>📷</span>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", backgroundColor: WA_GREEN,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        }}>➤</div>
      </div>
    </div>
  );
};

const CallingScreen = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1], [0.92, 1.08]
  );

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      backgroundColor: WA_DARK, alignItems: "center", justifyContent: "center", gap: 20,
    }}>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "Segoe UI, Arial, sans-serif" }}>
        WhatsApp gesprek...
      </div>
      <div style={{ transform: `scale(${pulse})` }}>
        <Avatar initials="M" size={80} bg="#e91e63" />
      </div>
      <div style={{ color: "#fff", fontSize: 22, fontWeight: "bold", fontFamily: "Segoe UI, Arial, sans-serif" }}>Mama</div>
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Segoe UI, Arial, sans-serif" }}>
        bellen...
      </div>
      {/* Knoppen */}
      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        <div style={{
          width: 58, height: 58, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
        }}>🔇</div>
        <div style={{
          width: 58, height: 58, borderRadius: "50%", backgroundColor: "#e53935",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
        }}>📵</div>
        <div style={{
          width: 58, height: 58, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
        }}>🔊</div>
      </div>
    </div>
  );
};

// ─── Hoofd component ──────────────────────────────────────────────────────────

export const PhoneMockup = ({ phoneScreen }: { phoneScreen: PhoneScreen }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({ frame, fps, config: { damping: 14, mass: 0.7 }, from: 0.92, to: 1 });
  const opacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" });

  const PHONE_W = 280;
  const PHONE_H = 560;

  return (
    <div style={{
      opacity,
      transform: `scale(${appear})`,
      position: "relative",
      width: PHONE_W,
      height: PHONE_H,
    }}>
      {/* Telefoon frame */}
      <div style={{
        width: "100%", height: "100%",
        backgroundColor: "#1a1a1a",
        borderRadius: 40,
        padding: 10,
        boxSizing: "border-box",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}>
        {/* Scherm */}
        <div style={{
          width: "100%", height: "100%",
          backgroundColor: "#fff",
          borderRadius: 32,
          overflow: "hidden",
          position: "relative",
        }}>
          {/* Notch */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 80, height: 22, backgroundColor: "#1a1a1a",
            borderRadius: "0 0 14px 14px", zIndex: 10,
          }} />

          {/* Screen content */}
          <div style={{ position: "absolute", inset: 0, paddingTop: 22, overflow: "hidden" }}>
            {phoneScreen.type === "chat-list" && <ChatListScreen />}
            {phoneScreen.type === "chat" && (
              <ChatScreen
                showAttachmentMenu={false}
                tapElement={phoneScreen.tapElement}
                tapDelay={phoneScreen.tapDelay ?? 25}
              />
            )}
            {phoneScreen.type === "attachment-menu" && (
              <ChatScreen
                showAttachmentMenu
                tapElement={phoneScreen.tapElement}
                tapDelay={phoneScreen.tapDelay ?? 25}
              />
            )}
            {phoneScreen.type === "calling" && <CallingScreen />}
          </div>

          {/* Tap indicator */}
          {phoneScreen.tapElement && (
            <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
              <TapIndicator
                tapElement={phoneScreen.tapElement}
                delay={phoneScreen.tapDelay ?? 25}
              />
            </div>
          )}
        </div>
      </div>

      {/* Zijknoppen */}
      <div style={{
        position: "absolute", right: -4, top: 100, width: 4, height: 50,
        backgroundColor: "#333", borderRadius: "0 3px 3px 0",
      }} />
      <div style={{
        position: "absolute", left: -4, top: 80, width: 4, height: 35,
        backgroundColor: "#333", borderRadius: "3px 0 0 3px",
      }} />
      <div style={{
        position: "absolute", left: -4, top: 125, width: 4, height: 35,
        backgroundColor: "#333", borderRadius: "3px 0 0 3px",
      }} />
    </div>
  );
};
