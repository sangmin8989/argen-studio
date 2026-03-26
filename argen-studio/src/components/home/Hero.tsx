'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

export default function Hero() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      const resume = () => { video.play(); };
      document.addEventListener('touchstart', resume, { once: true });
      document.addEventListener('click', resume, { once: true });
    });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
    }
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-dark/50" />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="block h-[1px] w-10 bg-warm-300/60" />
          <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-warm-300">
            {t(dict['hero.eyebrow'].ko, dict['hero.eyebrow'].en)}
          </span>
          <span className="block h-[1px] w-10 bg-warm-300/60" />
        </div>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-bold text-warm-50 leading-[1.05] mb-6">
          {t(dict['hero.headline1'].ko, dict['hero.headline1'].en)}<br />
          {t(dict['hero.headline2'].ko, dict['hero.headline2'].en)}
        </h1>
        <p className="font-sans text-[clamp(0.875rem,1.5vw,1.1rem)] text-warm-300 mb-10 tracking-wide">
          {t(dict['hero.subtitle'].ko, dict['hero.subtitle'].en)}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo('#contact')} className="px-8 py-4 bg-accent text-warm-50 font-sans font-medium text-sm tracking-wide rounded hover:bg-warm-700 transition-colors duration-200">
            {t(dict['hero.cta1'].ko, dict['hero.cta1'].en)}
          </button>
          <button onClick={() => scrollTo('#portfolio')} className="px-8 py-4 border border-warm-300/60 text-warm-100 font-sans font-medium text-sm tracking-wide rounded hover:bg-warm-100/10 transition-colors duration-200">
            {t(dict['hero.cta2'].ko, dict['hero.cta2'].en)}
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-warm-400">
          {t(dict['hero.scroll'].ko, dict['hero.scroll'].en)}
        </span>
        <div className="w-[1px] h-10 bg-warm-400/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-warm-300 animate-scroll-dot" style={{ height: '40%' }} />
        </div>
      </div>
      <style jsx>{`
        @keyframes scrollDot { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
        .animate-scroll-dot { animation: scrollDot 1.8s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
