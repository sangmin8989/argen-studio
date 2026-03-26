'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';
import { type PortfolioProject, categoryLabels } from '@/data/portfolios';
import PortfolioGallery from './PortfolioGallery';

interface Props {
  project: PortfolioProject;
  images: string[];
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
}

export default function PortfolioDetail({ project, images, prev, next }: Props) {
  const { lang, t } = useLang();

  return (
    <div className="bg-warm-100 pt-[76px]">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] pt-8 pb-4">
        <Link href="/#portfolio" className="inline-flex items-center gap-2 font-sans text-sm text-warm-600 hover:text-accent transition-colors">
          {t(dict['portfolio.back'].ko, dict['portfolio.back'].en)}
        </Link>
      </div>

      <PortfolioGallery images={images} title={project.title[lang]} />

      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-3">
              {categoryLabels[project.category]}
            </span>
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-dark leading-tight">
              {project.title[lang]}
            </h1>
          </div>
          <div className="space-y-6">
            {[
              [t(dict['portfolio.location'].ko, dict['portfolio.location'].en), project.location[lang]],
              ...(project.area ? [[t(dict['portfolio.area'].ko, dict['portfolio.area'].en), project.area]] : []),
              [t(dict['portfolio.completed'].ko, dict['portfolio.completed'].en), project.completedAt],
              [t('사진', 'Photos'), `${project.imageCount}${t(dict['portfolio.photos'].ko, dict['portfolio.photos'].en)}`],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-warm-200 pb-4">
                <p className="font-sans text-xs tracking-[0.1em] uppercase text-warm-500 mb-1">{label}</p>
                <p className="font-sans text-base font-medium text-dark">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-between gap-4 border-t border-warm-200 pt-10">
          {prev ? (
            <Link href={`/portfolio/${prev.slug}`} className="group flex flex-col gap-1 hover:text-accent transition-colors">
              <span className="font-sans text-xs text-warm-500 uppercase tracking-widest">
                {t(dict['portfolio.prev'].ko, dict['portfolio.prev'].en)}
              </span>
              <span className="font-serif text-lg font-semibold text-dark group-hover:text-accent transition-colors">
                {prev.title[lang]}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/portfolio/${next.slug}`} className="group flex flex-col items-end gap-1 hover:text-accent transition-colors">
              <span className="font-sans text-xs text-warm-500 uppercase tracking-widest">
                {t(dict['portfolio.next'].ko, dict['portfolio.next'].en)}
              </span>
              <span className="font-serif text-lg font-semibold text-dark group-hover:text-accent transition-colors">
                {next.title[lang]}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
