'use client';

import Image from 'next/image';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const services = [
  { num: '01', title: 'services.exterior' as const, desc: 'services.exteriorDesc' as const, image: '/images/portfolio/exterior/cheongwaok-exterior/hero/exterior-cheongwaok-exterior-05-hero.webp' },
  { num: '02', title: 'services.commercial' as const, desc: 'services.commercialDesc' as const, image: '/images/services/service-commercial.jpg' },
  { num: '03', title: 'services.hospital' as const, desc: 'services.hospitalDesc' as const, image: '/images/services/service-hospital-v2.jpg' },
];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="bg-dark">
      <div className="py-[clamp(4rem,8vw,7rem)] pb-0">
        <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] text-center">
          <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t(dict['services.label'].ko, dict['services.label'].en)}
          </span>
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-warm-100 mb-4">
            {t(dict['services.title'].ko, dict['services.title'].en)}
          </h2>
          <p className="font-sans text-sm text-warm-400 max-w-md mx-auto">
            {t(dict['services.subtitle'].ko, dict['services.subtitle'].en)}
          </p>
        </div>
      </div>
      <div className="pt-[clamp(3rem,6vw,5rem)]">
        {services.map((svc, i) => (
          <div key={svc.num} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} reveal`}>
            <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden reveal-image">
              <Image src={svc.image} alt={t(dict[svc.title].ko, dict[svc.title].en)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-dark/20" />
            </div>
            <div className="w-full md:w-1/2 flex items-center bg-charcoal px-[clamp(2rem,6vw,5rem)] py-16">
              <div>
                <span className="font-sans text-[4rem] font-bold text-warm-800 leading-none block mb-6">{svc.num}</span>
                <h3 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-warm-100 mb-4">
                  {t(dict[svc.title].ko, dict[svc.title].en)}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-warm-400 mb-8 max-w-sm">
                  {t(dict[svc.desc].ko, dict[svc.desc].en)}
                </p>
                <a href="#portfolio" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-warm-300 transition-colors group">
                  {t(dict['services.viewProjects'].ko, dict['services.viewProjects'].en)}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
