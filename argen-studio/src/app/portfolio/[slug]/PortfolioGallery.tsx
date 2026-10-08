'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image, { getImageProps } from 'next/image';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { useLang } from '@/lib/i18n';

interface Props { images: string[]; title: string }

export default function PortfolioGallery({ images, title }: Props) {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const reduceMotion = useReducedMotion();
  const src = images[current];
  const paginate = useCallback((step: number) => {
    setCurrent((index) => (index + step + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const rail = railRef.current;
    const thumbnail = thumbnailRefs.current[current];
    if (rail && thumbnail) {
      const left = thumbnail.offsetLeft - rail.offsetLeft;
      if (left < rail.scrollLeft || left + thumbnail.offsetWidth > rail.scrollLeft + rail.clientWidth) {
        rail.scrollTo({ left: Math.max(0, left - (rail.clientWidth - thumbnail.offsetWidth) / 2), behavior: reduceMotion ? 'instant' : 'smooth' });
      }
    }
  }, [current, reduceMotion]);

  useEffect(() => {
    if (images.length < 2) return;
    const adjacent = images[(current + 1) % images.length];
    const { props } = getImageProps({ src: adjacent, alt: '', width: 1920, height: 1440, sizes: '(max-width: 768px) 100vw, 90vw' });
    const preload = new window.Image();
    preload.sizes = props.sizes ?? '';
    preload.srcset = props.srcSet ?? '';
    preload.src = props.src;
  }, [current, images]);

  const open = () => {
    if (dragged.current) { dragged.current = false; return; }
    setOverview(false);
    dialogRef.current?.showModal();
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    dragged.current = Math.abs(info.offset.x) > 8;
    if (info.offset.x < -50) paginate(1);
    else if (info.offset.x > 50) paginate(-1);
  };
  const photo = (expanded: boolean) => (
    <motion.div key={`${expanded}-${src}`} className="absolute inset-0" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
      drag={images.length > 1 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragEnd={onDragEnd} style={{ touchAction: 'pan-y' }}>
      <Image src={src} alt={`${title} — ${current + 1}`} fill sizes={expanded ? '100vw' : '(max-width: 768px) 100vw, 90vw'} priority={current === 0}
        className={`object-contain transition-opacity duration-500 ${loaded[src] ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded((state) => ({ ...state, [src]: true }))}
        onError={() => setFailed((state) => ({ ...state, [src]: true }))} draggable={false} />
    </motion.div>
  );
  const controls = (expanded: boolean) => (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => paginate(-1)} aria-label={t('이전 사진', 'Previous photo')} className="portfolio-gallery-control">←</button>
      <span className="min-w-16 text-center font-sans text-xs tabular-nums" aria-live="polite">{String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
      <button type="button" onClick={() => paginate(1)} aria-label={t('다음 사진', 'Next photo')} className="portfolio-gallery-control">→</button>
      {expanded ? <button type="button" onClick={() => dialogRef.current?.close()} className="portfolio-gallery-control" aria-label={t('확대 보기 닫기', 'Close enlarged view')}>×</button> : null}
    </div>
  );
  if (!src) return null;

  return (
    <div ref={galleryRef} className="portfolio-gallery" onKeyDown={(event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); paginate(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); paginate(-1); }
    }}>
      <div className="relative h-[clamp(16rem,85vw,32rem)] sm:h-[clamp(18rem,65vw,44rem)] max-h-[75svh] overflow-hidden bg-warm-200">
        {!loaded[src] && !failed[src] ? <span className="absolute inset-0 flex items-center justify-center font-sans text-xs tracking-widest text-warm-700" role="status">{t('사진을 불러오는 중', 'Loading photograph')}</span> : null}
        {photo(false)}
        <motion.button type="button" onClick={open} drag={images.length > 1 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0} onDragEnd={onDragEnd} style={{ touchAction: 'pan-y' }} className="absolute inset-0 z-10" aria-label={t('사진 확대 보기', 'Enlarge photograph')} />
        {failed[src] ? <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-sm text-warm-700" role="status">{t('사진을 불러오지 못했습니다. 다음 사진을 확인해 주세요.', 'Unable to load this photograph. Please try the next image.')}</span> : null}
      </div>
      <div className="flex flex-col items-start justify-between gap-3 border-b border-warm-300 py-4 text-warm-700 sm:flex-row sm:items-center">
        <p className="font-sans text-xs tracking-wide">{t('사진을 눌러 크게 감상하세요.', 'Select a photograph to view it in full.')}</p>
        <button type="button" className="min-h-11 border-b border-current font-sans text-sm" onClick={() => { setOverview(true); dialogRef.current?.showModal(); }}>{t('전체 사진 보기', 'View all photographs')} ↗</button>
        {controls(false)}
      </div>
      <div ref={railRef} className="relative flex gap-3 overflow-x-auto py-5" role="group" aria-label={t('사진 선택', 'Select photograph')}>
        {images.map((image, index) => (
          <button key={`${image}-${index}`} type="button" ref={(el) => { thumbnailRefs.current[index] = el; }} onClick={() => setCurrent(index)} aria-label={t(`${index + 1}번 사진 보기`, `View photograph ${index + 1}`)} aria-pressed={current === index}
            className={`relative h-16 w-24 shrink-0 overflow-hidden transition-opacity ${current === index ? 'opacity-100 outline-2 outline-offset-2 outline-accent' : 'opacity-50 hover:opacity-100'}`}>
            <Image src={image} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
      <dialog ref={dialogRef} aria-label={t(`${title} 사진 확대`, `${title} enlarged photographs`)} className="portfolio-lightbox" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} onClose={() => { galleryRef.current?.querySelector<HTMLButtonElement>('[aria-label]')?.focus(); }}>
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-warm-100">
            <p className="font-sans text-sm">{title}</p>
            <button type="button" className="min-h-11 text-sm" aria-pressed={overview} onClick={() => setOverview(!overview)}>{overview ? t('한 장씩 보기', 'Single view') : t('전체 사진', 'All photographs')}</button>
            {controls(true)}
          </div>
          {overview ? <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image, index) => <button key={`${image}-overview-${index}`} type="button" aria-label={t(`${index + 1}번 사진 확대`, `Enlarge photograph ${index + 1}`)} className="relative aspect-[4/3] overflow-hidden" onClick={() => { setCurrent(index); setOverview(false); }}>
                <Image src={image} alt={`${title} — ${index + 1}`} fill sizes="(max-width: 768px) 45vw, 25vw" className="object-cover" />
                <span className="absolute bottom-2 left-2 bg-dark/80 px-2 py-1 text-xs text-white">{String(index + 1).padStart(2, '0')}</span>
              </button>)}
            </div>
          </div> : <div className="relative min-h-0 flex-1 mx-4 mb-5">{photo(true)}</div>}
        </div>
      </dialog>
      {images.length > 1 ? <section className="py-[clamp(3rem,7vw,6rem)]" aria-label={t('프로젝트 사진 기록', 'Project photo essay')}>
        <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-warm-300 pt-6">
          <h2 className="text-2xl md:text-3xl">{t('공간을 따라', 'Through the space')}</h2>
          <span className="text-xs tracking-widest text-warm-700">PROJECT JOURNAL</span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {Array.from(new Set([1, Math.floor(images.length / 2), images.length - 1])).map((index, order) => <figure key={images[index]} className={order === 0 ? 'md:col-span-2' : ''}>
            <button type="button" className={`relative block w-full overflow-hidden bg-warm-200 ${order === 0 ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-[4/3]'}`} aria-label={t(`${index + 1}번 사진 확대`, `Enlarge photograph ${index + 1}`)} onClick={() => { setCurrent(index); setOverview(false); dialogRef.current?.showModal(); }}>
              <Image src={images[index]} alt={`${title} — ${index + 1}`} fill sizes={order === 0 ? '90vw' : '(max-width: 768px) 90vw, 45vw'} className="object-contain" />
            </button>
            <figcaption className="flex justify-between gap-4 border-b border-warm-300 py-4 text-xs text-warm-700"><span>{title}</span><span className="shrink-0 tabular-nums">{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></figcaption>
          </figure>)}
        </div>
      </section> : null}
    </div>
  );
}
