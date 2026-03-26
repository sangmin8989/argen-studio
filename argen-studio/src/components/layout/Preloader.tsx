'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [phase, setPhase] = useState<'show' | 'exit' | 'done'>('show');

  useEffect(() => {
    if (sessionStorage.getItem('preloaded')) {
      setPhase('done');
      return;
    }
    const exitTimer = setTimeout(() => setPhase('exit'), 4000);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('preloaded', '1');
    }, 5200);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-dark preloader-wrap ${
        phase === 'exit' ? 'preloader-exit' : ''
      }`}
    >
      {/* Subtle radial glow behind logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="preloader-glow" />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        {/* Logo — Netflix-style zoom from large → settle */}
        <div className="preloader-logo flex items-baseline gap-1">
          <span className="font-serif text-[clamp(3rem,9vw,6rem)] font-bold text-accent">
            A
          </span>
          <span className="font-sans text-[clamp(1rem,2.5vw,1.6rem)] font-medium tracking-[0.18em] uppercase text-warm-200">
            RGEN STUDIO
          </span>
        </div>

        {/* Accent line */}
        <div className="preloader-line h-[1px] bg-accent" />

        {/* Tagline */}
        <p className="font-sans text-xs tracking-[0.3em] text-warm-500 uppercase preloader-tag">
          DESIGN · BUILD · MANAGE
        </p>
      </div>

      <style jsx>{`
        /* Radial glow — warm spotlight behind logo */
        .preloader-glow {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(140,117,96,0.15) 0%, transparent 70%);
          opacity: 0;
          animation: glowPulse 2s ease-out 0.3s forwards;
        }

        /* Logo: start big + blurred, zoom down + sharpen (Netflix N effect) */
        .preloader-logo {
          opacity: 0;
          transform: scale(2);
          filter: blur(12px);
          animation: logoReveal 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }

        .preloader-line {
          width: 0;
          animation: lineGrow 0.9s cubic-bezier(0.16, 1, 0.3, 1) 2.2s forwards;
        }

        .preloader-tag {
          opacity: 0;
          transform: translateY(8px);
          animation: tagIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2.8s forwards;
        }

        /* Exit: scale up + fade (zoom through) */
        .preloader-exit {
          animation: exitZoom 1.2s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }

        @keyframes logoReveal {
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        @keyframes glowPulse {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; }
          100% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes lineGrow {
          to { width: 80px; }
        }
        @keyframes tagIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes exitZoom {
          to {
            opacity: 0;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
