import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ARGEN STUDIO';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2D2620',
          position: 'relative',
        }}
      >
        {/* Subtle border accent */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '1px solid rgba(140, 117, 96, 0.3)',
            display: 'flex',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
          }}
        >
          {/* Logo: A + RGEN STUDIO */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span
              style={{
                fontSize: 88,
                fontWeight: 700,
                color: '#8C7560',
                fontFamily: 'serif',
              }}
            >
              A
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: '#FAF8F5',
                letterSpacing: '0.18em',
                fontFamily: 'sans-serif',
              }}
            >
              RGEN STUDIO
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 60,
              height: 1,
              backgroundColor: '#8C7560',
              display: 'flex',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: '#8C7560',
              letterSpacing: '0.3em',
            }}
          >
            DESIGN · BUILD · MANAGE
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: 'rgba(250, 248, 245, 0.4)',
              letterSpacing: '0.15em',
              marginTop: 4,
            }}
          >
            PREMIUM INTERIOR REMODELING
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
