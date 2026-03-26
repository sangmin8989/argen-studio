'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';

interface Props {
  images: string[];
  title: string;
}

const swipeThreshold = 50;

export default function PortfolioGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((c) => {
      if (dir === 1) return c === images.length - 1 ? 0 : c + 1;
      return c === 0 ? images.length - 1 : c - 1;
    });
  }, [images.length]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -swipeThreshold) paginate(1);
    else if (info.offset.x > swipeThreshold) paginate(-1);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <>
      {/* Main image with swipe */}
      <div
        className="relative w-full aspect-[16/9] max-h-[70vh] bg-warm-200 overflow-hidden cursor-grab active:cursor-grabbing"
        onClick={() => setLightbox(true)}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={onDragEnd}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${title} ${current + 1}`}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover pointer-events-none"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              aria-label="이전"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/50 text-warm-100 rounded-full hover:bg-dark/80 transition-colors backdrop-blur-sm z-10"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              aria-label="다음"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/50 text-warm-100 rounded-full hover:bg-dark/80 transition-colors backdrop-blur-sm z-10"
            >
              ›
            </button>
          </>
        )}

        {/* Counter */}
        <span className="absolute bottom-4 right-4 font-sans text-xs text-warm-200 bg-dark/50 px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
          {current + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] pt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`relative flex-none w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                  i === current ? 'border-accent scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox with swipe */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl max-h-[90vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={onDragEnd}
            >
              <Image
                src={images[current]}
                alt={`${title} ${current + 1}`}
                width={1920}
                height={1080}
                className="object-contain max-h-[85vh] w-full pointer-events-none"
              />
            </motion.div>
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-warm-300 hover:text-warm-100 text-xl"
              aria-label="닫기"
            >
              ✕
            </button>
            {images.length > 1 && (
              <>
                <button onClick={() => paginate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/60 text-warm-100 rounded-full text-xl">‹</button>
                <button onClick={() => paginate(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/60 text-warm-100 rounded-full text-xl">›</button>
              </>
            )}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-xs text-warm-300 bg-dark/60 px-3 py-1 rounded-full">
              {current + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
