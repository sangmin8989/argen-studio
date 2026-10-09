'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';
import { portfolios, getPortfolioImagePath, type PortfolioProject } from '@/data/portfolios';
import PortfolioGallery from './PortfolioGallery';

interface Props {
  project: PortfolioProject;
  images: string[];
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
}

export default function PortfolioDetail({ project, images, prev, next }: Props) {
  const { lang, t } = useLang();
  const relatedProject = portfolios.find((p) => p.slug === project.relatedProjectSlug);
  const onward = next ?? portfolios.find((p) => p.slug !== project.slug);

  return (
    <div className="bg-warm-100 pt-[76px]">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] pt-8 pb-4">
        <Link href="/portfolio" className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-warm-700 hover:text-dark transition-colors">
          {t(dict['portfolio.back'].ko, dict['portfolio.back'].en)}
        </Link>
      </div>

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 md:items-end">
          <div className="md:col-span-2">
            <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-3">
              {t('시공 사례', 'Selected Works')} / {project.category.toUpperCase()}
            </span>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-normal text-dark leading-tight">
              {project.title[lang]}
            </h1>
            {project.description[lang] && <p className="mt-6 max-w-xl font-sans text-base leading-8 text-warm-700">{project.description[lang]}</p>}
            {relatedProject && (
              <Link href={`/portfolio/${relatedProject.slug}`} className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-warm-300 font-sans text-sm text-warm-700 hover:text-dark">
                {t('같은 프로젝트', 'Related project')} · {relatedProject.title[lang]} <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-1">
            {[
              ...(project.location[lang] ? [[t(dict['portfolio.location'].ko, dict['portfolio.location'].en), project.location[lang]]] : []),
              ...(project.area ? [[t(dict['portfolio.area'].ko, dict['portfolio.area'].en), project.area]] : []),
              [t(dict['portfolio.completed'].ko, dict['portfolio.completed'].en), project.completedAt],
              [t('사진', 'Photos'), `${project.imageCount}${t(dict['portfolio.photos'].ko, dict['portfolio.photos'].en)}`],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-warm-200 pb-4">
                <p className="font-sans text-xs tracking-[0.1em] uppercase text-warm-700 mb-1">{label}</p>
                <p className="font-sans text-base font-medium text-dark">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
        <PortfolioGallery images={images} title={project.title[lang]} />
      </div>

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] py-16">
        <div className="flex flex-col gap-8 border-y border-warm-300 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-warm-700">YOUR NEXT SPACE</p>
            <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] text-dark">{t('다음 공간을 함께 이야기해요.', 'Let’s talk about your next space.')}</h2>
          </div>
          <a href="tel:031-8043-7966" className="inline-flex min-h-12 items-center justify-center gap-8 bg-dark px-7 py-4 font-sans text-sm text-warm-100 hover:bg-warm-800">
            {t('전화로 상담하기', 'Call to discuss a project')} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="mt-10 flex justify-between gap-4 pt-4">
          {prev ? (
            <Link href={`/portfolio/${prev.slug}`} className="group flex flex-col gap-1 hover:text-accent transition-colors">
              <span className="font-sans text-xs text-warm-700 uppercase tracking-widest">
                {t(dict['portfolio.prev'].ko, dict['portfolio.prev'].en)}
              </span>
              <span className="font-serif text-lg font-semibold text-dark group-hover:text-accent transition-colors">
                {prev.title[lang]}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/portfolio/${next.slug}`} className="group flex flex-col items-end gap-1 hover:text-accent transition-colors">
              <span className="font-sans text-xs text-warm-700 uppercase tracking-widest">
                {t(dict['portfolio.next'].ko, dict['portfolio.next'].en)}
              </span>
              <span className="font-serif text-lg font-semibold text-dark group-hover:text-accent transition-colors">
                {next.title[lang]}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
      {onward ? <Link href={`/portfolio/${onward.slug}`} className="group mx-auto block max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)] pb-16">
        <div className="mb-5 flex items-end justify-between gap-5">
          <div><p className="mb-3 text-xs tracking-[0.2em] text-warm-700">{t('다음 프로젝트', 'NEXT PROJECT')}</p><h2 className="text-[clamp(1.6rem,4vw,3rem)] leading-snug">{onward.title[lang]}</h2></div>
          <span className="text-3xl" aria-hidden="true">↗</span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-warm-200 md:aspect-[2/1]">
          <Image src={getPortfolioImagePath(onward, onward.cardImageIndex ?? 1, 'hero')} alt={onward.title[lang]} fill sizes="90vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]" />
        </div>
      </Link> : null}
    </div>
  );
}
