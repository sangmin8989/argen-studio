'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

export default function Hero() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: video moves slow, content moves fast, overlay darkens
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0.85]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

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
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Video with parallax */}
      <motion.div
        className="absolute inset-[-15%]"
        style={{ y: videoY, scale: videoScale }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay that darkens on scroll */}
      <motion.div
        className="absolute inset-0 bg-dark"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content with faster parallax */}
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

        {/* Headline — character-by-character reveal */}
        <h1 className="font-serif text-[clamp(2.2rem,5.5vw,5rem)] font-bold text-warm-50 leading-[1.05] mb-6">
          {[t(dict['hero.headline1'].ko, dict['hero.headline1'].en), '\n', t(dict['hero.headline2'].ko, dict['hero.headline2'].en)].map((segment, si) => {
            if (segment === '\n') return <br key={`br-${si}`} />;
            const offset = si === 0 ? 0 : t(dict['hero.headline1'].ko, dict['hero.headline1'].en).length;
            return segment.split('').map((char, ci) => (
              <motion.span
                key={`${si}-${ci}`}
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: 0.6 + (offset + ci) * 0.04,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ));
          })}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-sans text-[clamp(0.875rem,1.5vw,1.1rem)] text-warm-300 mb-10 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.7 }}
        >
          {t(dict['hero.subtitle'].ko, dict['hero.subtitle'].en)}
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
