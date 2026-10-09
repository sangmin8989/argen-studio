'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';
import type { ShowroomPhoto } from '@/data/showroom';

// 사진 비율이 제각각(가로·세로)이라 열 단위로 쌓는 갤러리. 사진을 누르면 전체 화면으로 확대된다.
export default function ShowroomGallery({ photos }: { photos: ShowroomPhoto[] }) {
  const { lang, t } = useLang();
  const [current, setCurrent] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (index: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setCurrent(index);
    dialogRef.current?.showModal();
  };
  const step = useCallback(
    (d: number) => setCurrent((i) => (i + d + photos.length) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  const photo = photos[current];
  const ctrl =
    'flex h-11 w-11 items-center justify-center text-2xl text-warm-100 transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-100';

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className={`reveal reveal-delay-${(i % 3) + 1} mb-4 break-inside-avoid`}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={t(`${i + 1}번 사진 확대: ${p.alt.ko}`, `Enlarge photo ${i + 1}: ${p.alt.en}`)}
              className="group block w-full overflow-hidden bg-warm-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src={p.src}
                alt={p.alt[lang]}
                width={p.w}
                height={p.h}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                className="h-auto w-full transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t('쇼룸 사진 확대', 'Showroom photos')}
        className="portfolio-lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        onClose={() => openerRef.current?.focus()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
      >
        <div className="flex h-full flex-col text-warm-100">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="px-2 font-sans text-xs tracking-[0.2em]" aria-live="polite">
              {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <button type="button" className={ctrl} onClick={() => dialogRef.current?.close()} aria-label={t('확대 보기 닫기', 'Close enlarged view')}>
              ×
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-16">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt[lang]}
              width={photo.w}
              height={photo.h}
              sizes="100vw"
              className="max-h-full w-auto max-w-full object-contain"
            />
            <button type="button" className={`${ctrl} absolute left-1 top-1/2 -translate-y-1/2`} onClick={() => step(-1)} aria-label={t('이전 사진', 'Previous photo')}>
              ‹
            </button>
            <button type="button" className={`${ctrl} absolute right-1 top-1/2 -translate-y-1/2`} onClick={() => step(1)} aria-label={t('다음 사진', 'Next photo')}>
              ›
            </button>
          </div>
          <p className="px-5 py-4 text-center font-sans text-sm text-warm-300">{photo.alt[lang]}</p>
        </div>
      </dialog>
    </>
  );
}
