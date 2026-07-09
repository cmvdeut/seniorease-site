import { ImageResponse } from 'next/og';

export const alt = 'SeniorEase — Digitale hulp voor senioren';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#F5EEE6',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 8,
            background: '#8B5E3C',
            display: 'flex',
          }}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            padding: '56px 72px',
            gap: 48,
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 20,
                  background: '#8B5E3C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  color: 'white',
                }}
              >
                ♥
              </div>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: '#8B5E3C',
                  lineHeight: 1.1,
                }}
              >
                SeniorEase
              </div>
            </div>

            <div
              style={{
                marginTop: 32,
                fontSize: 40,
                fontWeight: 700,
                color: '#1a1a1a',
                lineHeight: 1.25,
                maxWidth: 620,
              }}
            >
              Digitale hulp voor senioren
            </div>

            <div
              style={{
                marginTop: 20,
                fontSize: 26,
                color: '#4a4a4a',
                lineHeight: 1.45,
                maxWidth: 580,
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Stap-voor-stap uitleg · Gratis tools · In gewone taal
            </div>

            <div
              style={{
                marginTop: 40,
                display: 'flex',
                alignItems: 'center',
                fontSize: 22,
                color: '#8B5E3C',
                fontWeight: 700,
                fontFamily: 'Arial, sans-serif',
              }}
            >
              www.seniorease.nl
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 16,
              width: 340,
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {[
              { icon: '📱', label: 'WhatsApp & smartphone' },
              { icon: '🔒', label: 'Veilig online' },
              { icon: '📚', label: 'Gratis bibliotheek' },
              { icon: '🤖', label: 'AI uitgelegd' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: 'white',
                  border: '2px solid #E8DDD0',
                  borderRadius: 16,
                  padding: '18px 24px',
                  fontSize: 22,
                  color: '#333',
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: 6,
            background: '#8B5E3C',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
