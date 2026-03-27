'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-terracotta"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(250,248,245,0.5) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Warm glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[120px]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
        >
          <span className="block h-[1px] w-10 bg-warm-300/60" />
          <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-warm-300">
            {t(dict['hero.eyebrow'].ko, dict['hero.eyebrow'].en)}
          </span>
          <span className="block h-[1px] w-10 bg-warm-300/60" />
        </motion.div>

        {/* Headline — ARtistic GENesis */}
        <motion.div
          className="mb-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.5 }}
        >
          <h1 className="leading-[1] flex items-baseline">
            <span className="font-sans text-[clamp(2.8rem,7vw,5.5rem)] font-medium tracking-[0.02em] text-accent">AR</span>
            <span className="font-sans text-[clamp(1rem,2.5vw,1.8rem)] font-medium tracking-[0.18em] text-warm-100">tistic</span>
          </h1>
          <h1 className="leading-[1] flex items-baseline mt-1">
            <span className="font-sans text-[clamp(2.5rem,6.2vw,4.8rem)] font-medium tracking-[0.02em] text-accent">GEN</span>
            <span className="font-sans text-[clamp(1rem,2.5vw,1.8rem)] font-medium tracking-[0.18em] text-warm-100">esis</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-sans text-[clamp(0.9rem,1.8vw,1.2rem)] text-warm-300 mb-10 tracking-[0.1em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.8 }}
        >
          {t('공간 창조에 대한 미학', 'The Aesthetics of Spatial Creation')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 1.0 }}
        >
          <button onClick={() => scrollTo('#contact')} className="px-8 py-4 bg-accent text-warm-50 font-sans font-medium text-sm tracking-wide rounded hover:bg-warm-700 transition-colors duration-200">
            {t(dict['hero.cta1'].ko, dict['hero.cta1'].en)}
          </button>
          <button onClick={() => scrollTo('#portfolio')} className="px-8 py-4 border border-warm-300/60 text-warm-100 font-sans font-medium text-sm tracking-wide rounded hover:bg-warm-100/10 transition-colors duration-200">
            {t(dict['hero.cta2'].ko, dict['hero.cta2'].en)}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-warm-400">
          {t(dict['hero.scroll'].ko, dict['hero.scroll'].en)}
        </span>
        <div className="w-[1px] h-10 bg-warm-400/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-warm-300 animate-scroll-dot" style={{ height: '40%' }} />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes scrollDot { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
        .animate-scroll-dot { animation: scrollDot 1.8s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
