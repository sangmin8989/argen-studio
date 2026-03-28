'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { portfolios, getPortfolioImagePath } from '@/data/portfolios';

const featured = portfolios.filter((p) => p.featured).slice(0, 5);

export default function StoryGallery() {
  const { lang, t } = useLang();
  const [projectIdx, setProjectIdx] = useState(0);
  const [imageIdx, setImageIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const project = featured[projectIdx];
  const maxImages = Math.min(project.imageCount, 6); // cap at 6 per story

  // Auto-progress timer
  useEffect(() => {
    if (isPaused || showInfo) return;
    timerRef.current = setTimeout(() => {
      if (imageIdx < maxImages - 1) {
        setDirection(1);
        setImageIdx((prev) => prev + 1);
      } else if (projectIdx < featured.length - 1) {
        setDirection(1);
        setProjectIdx((prev) => prev + 1);
        setImageIdx(0);
      }
    }, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [imageIdx, projectIdx, isPaused, showInfo, maxImages]);

  const goNext = useCallback(() => {
    setDirection(1);
    if (imageIdx < maxImages - 1) {
      setImageIdx((prev) => prev + 1);
    } else if (projectIdx < featured.length - 1) {
      setProjectIdx((prev) => prev + 1);
      setImageIdx(0);
    }
  }, [imageIdx, projectIdx, maxImages]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    if (imageIdx > 0) {
      setImageIdx((prev) => prev - 1);
    } else if (projectIdx > 0) {
      setProjectIdx((prev) => prev - 1);
      setImageIdx(0);
    }
  }, [imageIdx, projectIdx]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const dt = Date.now() - touchStartRef.current.time;

    // Swipe up → show info
    if (dy < -60 && Math.abs(dx) < Math.abs(dy)) {
      setShowInfo(true);
      return;
    }
    // Swipe down → hide info
    if (dy > 60 && showInfo) {
      setShowInfo(false);
      return;
    }
    // Quick tap (not swipe) → left/right navigation
    if (dt < 300 && Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      const tapX = e.changedTouches[0].clientX;
      const screenW = window.innerWidth;
      if (tapX > screenW * 0.5) goNext();
      else goPrev();
    }
    // Horizontal swipe → project navigation
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0 && projectIdx < featured.length - 1) {
        setDirection(1);
        setProjectIdx((prev) => prev + 1);
        setImageIdx(0);
      } else if (dx > 0 && projectIdx > 0) {
        setDirection(-1);
        setProjectIdx((prev) => prev - 1);
        setImageIdx(0);
      }
    }
    touchStartRef.current = null;
  };

  // Desktop click navigation
  const handleClick = (e: React.MouseEvent) => {
    const clickX = e.clientX;
    const rect = e.currentTarget.getBoundingClientRect();
    if (clickX > rect.left + rect.width * 0.5) goNext();
    else goPrev();
  };

  const imageSrc = getPortfolioImagePath(project, imageIdx + 1, 'hero');

  return (
    <section className="py-16 bg-warm-100 md:hidden" id="story-gallery">
      <div className="text-center mb-6 px-6">
        <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent">
          {t('포트폴리오', 'Portfolio')}
        </span>
        <h2 className="font-serif text-2xl font-bold text-dark mt-2">
          {t('시공 사례', 'Our Work')}
        </h2>
      </div>

      <div
        className="relative w-full aspect-[9/16] max-h-[75vh] mx-auto overflow-hidden rounded-2xl bg-dark"
        style={{ maxWidth: '400px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStartCapture={() => setIsPaused(true)}
        onTouchEndCapture={() => setIsPaused(false)}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 z-20 flex gap-1">
          {Array.from({ length: maxImages }).map((_, i) => (
            <div key={i} className="flex-1 h-[2px] bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{
                  width: i < imageIdx ? '100%' : i === imageIdx ? '100%' : '0%',
                }}
                transition={
                  i === imageIdx
                    ? { duration: isPaused || showInfo ? 0 : 4, ease: 'linear' }
                    : { duration: 0.2 }
                }
                key={`${projectIdx}-${imageIdx}-${i}`}
              />
            </div>
          ))}
        </div>

        {/* Project indicator dots */}
        <div className="absolute top-8 left-0 right-0 z-20 flex justify-center gap-2">
          {featured.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === projectIdx ? 'bg-accent' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${projectIdx}-${imageIdx}`}
            className="absolute inset-0"
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={imageSrc}
              alt={project.title[lang]}
              fill
              sizes="400px"
              className="object-cover"
              priority={projectIdx === 0 && imageIdx === 0}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Project info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={projectIdx}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="font-sans text-[10px] text-white/70 tracking-[0.15em] uppercase mb-1">
              {project.location[lang]} · {project.year}
            </p>
            <h3 className="font-serif text-xl font-bold text-white leading-tight">
              {project.title[lang]}
            </h3>
            <p className="font-sans text-xs text-white/60 mt-2">
              {t('위로 스와이프하여 자세히 보기', 'Swipe up for details')}
            </p>
          </motion.div>
        </div>

        {/* Bottom sheet (swipe up) */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              className="absolute inset-x-0 bottom-0 z-30 bg-warm-50 rounded-t-2xl p-6"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-warm-300 rounded-full mx-auto mb-4" />
              <h3 className="font-serif text-lg font-bold text-dark mb-2">
                {project.title[lang]}
              </h3>
              <p className="font-sans text-sm text-warm-600 mb-1">
                {project.location[lang]} · {project.year}
              </p>
              {project.area && (
                <p className="font-sans text-sm text-warm-600 mb-3">
                  {t(`면적: ${project.area}`, `Area: ${project.area}`)}
                </p>
              )}
              <button
                onClick={() => setShowInfo(false)}
                className="w-full py-3 bg-accent text-warm-50 font-sans font-medium text-sm rounded-lg mt-2"
              >
                {t('닫기', 'Close')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
