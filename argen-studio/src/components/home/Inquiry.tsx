'use client';

import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';
import { company } from '@/lib/company';

export default function Inquiry() {
  const { t } = useLang();

  const actions = [
    { key: 'phone', label: t('전화 상담', 'Call us'), value: company.phone, href: `tel:${company.phone}` },
  ];
  const places = [
    { key: 'hq', label: t(dict['footer.hq'].ko, dict['footer.hq'].en), address: t(company.hq.ko, company.hq.en) },
    { key: 'showroom', label: t(dict['footer.showroom'].ko, dict['footer.showroom'].en), address: t(company.showroom.ko, company.showroom.en) },
  ];

  return (
    <section className="bg-warm-50 pb-[clamp(5rem,10vw,9rem)] pt-[calc(76px+clamp(3rem,7vw,6rem))]">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="max-w-2xl mb-14 md:mb-20 reveal">
          <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-5">
            {t('문의', 'Inquiry')}
          </span>
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark leading-snug break-keep">
            {t('다음 공간을 함께 이야기해요.', 'Let’s talk about your next space.')}
          </h1>
          <p className="font-sans text-base leading-relaxed text-warm-700 mt-6 break-keep">
            {t(
              '프로젝트의 쓰임과 일정, 규모를 편하게 들려주세요. 전화로 문의하실 수 있습니다.',
              'Tell us about your project — its purpose, schedule and scale. You can reach us by phone.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 border-t border-warm-200 pt-10 md:pt-14">
          <ul className="reveal reveal-delay-1">
            {actions.map((a) => (
              <li key={a.key} className="border-b border-warm-200 first:border-t-0">
                <a
                  href={a.href}
                  className="group flex min-h-24 items-center justify-between gap-6 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span>
                    <span className="block font-sans text-xs font-medium tracking-[0.18em] uppercase text-warm-700 mb-2">{a.label}</span>
                    <span className="block font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-tight text-dark break-all">{a.value}</span>
                  </span>
                  <span aria-hidden="true" className="text-2xl text-dark transition-transform duration-500 group-hover:translate-x-1">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <dl className="reveal reveal-delay-2 space-y-10">
            {places.map((p) => (
              <div key={p.key} className="border-b border-warm-200 pb-8">
                <dt className="font-sans text-xs font-medium tracking-[0.18em] uppercase text-warm-700 mb-3">{p.label}</dt>
                <dd className="font-sans text-base leading-relaxed text-dark break-keep">{p.address}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
