'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';
import { portfolios, getPortfolioImagePath, type PortfolioCategory } from '@/data/portfolios';

const filters = ['all', 'apartment', 'commercial', 'church'] as const;
type Filter = (typeof filters)[number];

const filterKeys: Record<Filter, { ko: string; en: string }> = {
  all: dict['portfolio.all'],
  apartment: dict['portfolio.apartment'],
  commercial: dict['portfolio.commercial'],
  church: dict['portfolio.church'],
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 18,
      delay: i * 0.12,
    },
  }),
};

export default function Portfolio() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<Filter>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px' });

  const visible = active === 'all' ? portfolios : portfolios.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-[clamp(5rem,10vw,9rem)] bg-warm-100">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="text-center mb-12 reveal">
          <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t(dict['portfolio.label'].ko, dict['portfolio.label'].en)}
          </span>
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-dark mb-4">
            {t(dict['portfolio.title'].ko, dict['portfolio.title'].en)}
          </h2>
          <p className="font-sans text-sm text-warm-600 max-w-md mx-auto">
            {t(dict['portfolio.subtitle'].ko, dict['portfolio.subtitle'].en)}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-12 reveal">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                active === f ? 'bg-accent text-warm-50' : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
              }`}
            >
              {t(filterKeys[f].ko, filterKeys[f].en)}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-center font-sans text-sm text-warm-500 py-20">
            {t(dict['portfolio.empty'].ko, dict['portfolio.empty'].en)}
          </p>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  data-cursor="view"
                  className="group block bg-warm-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-warm-200">
                    <Image
                      src={getPortfolioImagePath(project, 1, 'card')}
                      alt={project.title[lang]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-dark/70 text-warm-200 font-sans text-[10px] tracking-[0.15em] uppercase rounded-sm backdrop-blur-sm">
                      {t(filterKeys[project.category].ko, filterKeys[project.category].en)}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-xs text-warm-500 mb-1">{project.location[lang]} · {project.year}</p>
                    <h3 className="font-serif text-lg font-semibold text-dark group-hover:text-accent transition-colors leading-snug">
                      {project.title[lang]}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
