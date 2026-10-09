'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

// href: 각 서비스의 "Works →" 가 이동할 시공 사례 페이지 (분류가 있으면 해당 분류로 필터)
const services = [
  { num: '01', title: 'services.exterior' as const, desc: 'services.exteriorDesc' as const, image: '/images/portfolio/exterior/star-sports-exterior/night-corner-edited.webp', href: '/portfolio?category=exterior' },
  { num: '02', title: 'services.commercial' as const, desc: 'services.commercialDesc' as const, image: '/images/services/service-commercial.jpg', href: '/portfolio?category=commercial' },
  { num: '03', title: 'services.hospital' as const, desc: 'services.hospitalDesc' as const, image: '/images/services/service-hospital.jpg', href: '/portfolio' },
];

export default function Services({ standalone = false }: { standalone?: boolean }) {
  const { t } = useLang();
  const Heading = standalone ? 'h1' : 'h2';

  return (
    <section id="services" className="bg-dark">
      <div className={`pb-0 ${standalone ? 'pt-[calc(76px+clamp(3rem,7vw,6rem))]' : 'py-[clamp(4rem,8vw,7rem)]'}`}>
        <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] text-center">
          <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-warm-400 mb-4">
            {t(dict['services.label'].ko, dict['services.label'].en)}
          </span>
          <Heading className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-warm-100 mb-4">
            {t(dict['services.title'].ko, dict['services.title'].en)}
          </Heading>
          <p className="font-sans text-sm text-warm-400 max-w-md mx-auto">
            {t(dict['services.subtitle'].ko, dict['services.subtitle'].en)}
          </p>
        </div>
      </div>
      <div className="pt-[clamp(3rem,6vw,5rem)]">
        {services.map((svc, i) => (
          <div key={svc.num} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} reveal`}>
            <div className={`relative w-full md:w-1/2 overflow-hidden reveal-image ${svc.title === 'services.exterior' ? 'aspect-[4/3] md:self-center' : 'aspect-[4/3] md:aspect-auto md:min-h-[480px]'}`}>
              <Image src={svc.image} alt={t(dict[svc.title].ko, dict[svc.title].en)} fill sizes="(max-width: 768px) 100vw, 50vw" className={svc.title === 'services.exterior' ? 'object-contain' : 'object-cover transition-transform duration-700 hover:scale-105'} />
              {svc.title !== 'services.exterior' && <div className="absolute inset-0 bg-dark/20" />}
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
                <Link href={svc.href} className="inline-flex items-center gap-2 font-sans text-sm font-medium text-warm-300 hover:text-warm-100 transition-colors group">
                  {t(dict['services.viewProjects'].ko, dict['services.viewProjects'].en)}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
