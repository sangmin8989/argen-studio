'use client';

import { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';
import MagneticButton from '@/components/MagneticButton';

const ShaderGradientCanvas = lazy(() =>
  import('shadergradient').then((m) => ({ default: m.ShaderGradientCanvas }))
);
const ShaderGradient = lazy(() =>
  import('shadergradient').then((m) => ({ default: m.ShaderGradient }))
);

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
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #d5948d, #cc807a, #9c5c58)' }}
    >
      {/* Shader gradient background — GPU-powered 3D gradient */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ShaderGradientCanvas
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <ShaderGradient
              type="waterPlane"
              animate="on"
              uTime={0.2}
              uSpeed={0.1}
              uStrength={1.5}
              uDensity={1.8}
              uFrequency={3.5}
              uAmplitude={3}
              positionX={0}
              positionY={0}
              positionZ={0}
              rotationX={0}
              rotationY={0}
              rotationZ={0}
              color1="#9c5c58"
              color2="#6a3b3a"
              color3="#8b6914"
              reflection={0.1}
              wireframe={false}
              grain="on"
              lightType="3d"
              brightness={0.6}
              envPreset="dawn"
              cAzimuthAngle={180}
              cPolarAngle={80}
              cDistance={3.5}
              cameraZoom={1}
            />
          </ShaderGradientCanvas>
        </Suspense>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/30" />

      {/* Content */}
      <motion.div
        className="relative z-[2] text-center px-6 max-w-3xl mx-auto"
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

        {/* Headline — ARtistic GENesis (character split animation) */}
        <div className="mb-4 flex flex-col items-center overflow-hidden">
          <h1 className="leading-[1] flex items-baseline">
            {['A', 'R'].map((char, i) => (
              <motion.span
                key={`ar-${i}`}
                className="font-sans text-[clamp(2.8rem,7vw,5.5rem)] font-medium tracking-[0.02em] text-accent inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
            {['t', 'i', 's', 't', 'i', 'c'].map((char, i) => (
              <motion.span
                key={`tistic-${i}`}
                className="font-sans text-[clamp(1rem,2.5vw,1.8rem)] font-medium tracking-[0.18em] text-warm-100 inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.66 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <h1 className="leading-[1] flex items-baseline mt-1">
            {['G', 'E', 'N'].map((char, i) => (
              <motion.span
                key={`gen-${i}`}
                className="font-sans text-[clamp(2.5rem,6.2vw,4.8rem)] font-medium tracking-[0.02em] text-accent inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
            {['e', 's', 'i', 's'].map((char, i) => (
              <motion.span
                key={`esis-${i}`}
                className="font-sans text-[clamp(1rem,2.5vw,1.8rem)] font-medium tracking-[0.18em] text-warm-100 inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.14 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

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
          <MagneticButton onClick={() => scrollTo('#contact')} className="px-8 py-4 bg-accent text-warm-50 font-sans font-medium text-sm tracking-wide rounded hover:bg-warm-700 transition-colors duration-200">
            {t(dict['hero.cta1'].ko, dict['hero.cta1'].en)}
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo('#portfolio')} className="px-8 py-4 border border-warm-300/60 text-warm-100 font-sans font-medium text-sm tracking-wide rounded hover:bg-warm-100/10 transition-colors duration-200">
            {t(dict['hero.cta2'].ko, dict['hero.cta2'].en)}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[2]"
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
