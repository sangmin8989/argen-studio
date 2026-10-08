'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { portfolios, getPortfolioImagePath, type PortfolioCategory } from '@/data/portfolios';

const categories = {
  all: { ko: '전체', en: 'All' },
  commercial: { ko: '상업공간', en: 'Commercial' },
  residential: { ko: '주거공간', en: 'Residential' },
  exterior: { ko: '건물 외장', en: 'Exterior' },
  church: { ko: '교회공간', en: 'Church' },
};
type Filter = PortfolioCategory | 'all';

export default function Portfolio() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<Filter>('all');
  const visible = portfolios.filter((p) => active === 'all' || p.category === active);
  return (
    <section id="portfolio" className="scroll-mt-24 bg-warm-100 py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 font-sans text-xs tracking-[0.24em] text-warm-700">ARGEN STUDIO / SELECTED WORKS</p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] text-dark">{t('시공 사례', 'Selected Works')}</h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-7 text-warm-700">{t('공간의 쓰임과 그 안의 일상을 생각합니다. 아르젠이 완성한 공간을 만나보세요.', 'Spaces shaped around their purpose and the lives within. Explore our completed projects.')}</p>
        </div>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-y border-warm-300 py-4">
          <div className="portfolio-filters flex w-full min-w-0 gap-2 overflow-x-auto py-1 md:w-auto md:flex-wrap" role="group" aria-label={t('시공 사례 분류', 'Project categories')}>
            {(Object.keys(categories) as Filter[]).map((key) => (
              <button key={key} type="button" aria-pressed={active === key} onClick={(event) => { setActive(key); const rail = event.currentTarget.parentElement; if (rail && rail.scrollWidth > rail.clientWidth) rail.scrollTo({left: event.currentTarget.offsetLeft - rail.offsetLeft, behavior: 'smooth'}); }} className={`min-h-11 shrink-0 whitespace-nowrap px-4 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${active === key ? 'bg-dark text-warm-100' : 'text-warm-700 hover:bg-warm-200'}`}>
                {categories[key][lang]}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="font-sans text-xs tracking-widest text-warm-700">{String(visible.length).padStart(2, '0')} {t('개의 프로젝트', 'PROJECTS')}</p>
        </div>
        {visible.length ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:gap-y-12 md:grid-cols-2">
            {visible.map((project, index) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} data-cursor="view" className={`group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent ${index === 0 ? 'md:col-span-2' : ''}`}>
                <div className={`relative overflow-hidden bg-warm-200 ${index === 0 ? 'aspect-[4/3] md:aspect-[2/1]' : 'aspect-[4/3]'}`}>
                  <Image src={getPortfolioImagePath(project, project.cardImageIndex ?? 1, 'hero')} alt={project.title[lang]} fill sizes={index === 0 ? '(max-width: 1440px) 90vw, 1312px' : '(max-width: 768px) 90vw, (max-width: 1440px) 45vw, 640px'} className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]" />
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-warm-100 text-xl text-dark" aria-hidden="true">↗</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-warm-300 py-5">
                  <div>
                    <p className="mb-2 font-sans text-xs text-warm-700">{categories[project.category][lang]}{project.location[lang] ? ` / ${project.location[lang]}` : ''}</p>
                    <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-dark">{project.title[lang]}</h3>
                  </div>
                  <span className="pt-1 font-sans text-sm text-warm-700">{project.year}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="py-20 text-center text-warm-700">{t('아직 등록된 시공 사례가 없습니다.', 'No projects in this category yet.')}</p>}
      </div>
    </section>
  );
}
