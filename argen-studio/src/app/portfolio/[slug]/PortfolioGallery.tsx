'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  title: string;
}

export default function PortfolioGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <>
      {/* Main image */}
      <div
        className="relative w-full aspect-[16/9] max-h-[70vh] bg-warm-200 cursor-zoom-in overflow-hidden"
        onClick={() => setLightbox(true)}
      >
        <Image
          src={images[current]}
          alt={`${title} ${current + 1}`}
          fill
          priority={current === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-300"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }}
        />
        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="이전"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/50 text-warm-100 rounded-full hover:bg-dark/80 transition-colors backdrop-blur-sm"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="다음"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/50 text-warm-100 rounded-full hover:bg-dark/80 transition-colors backdrop-blur-sm"
            >
              ›
            </button>
          </>
        )}
        {/* Counter */}
        <span className="absolute bottom-4 right-4 font-sans text-xs text-warm-200 bg-dark/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
          {current + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] pt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative flex-none w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                  i === current ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${title} ${current + 1}`}
              width={1920}
              height={1080}
              className="object-contain max-h-[85vh] w-full"
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-warm-300 hover:text-warm-100 text-xl"
              aria-label="닫기"
            >
              ✕
            </button>
            {images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/60 text-warm-100 rounded-full text-xl">‹</button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-dark/60 text-warm-100 rounded-full text-xl">›</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
