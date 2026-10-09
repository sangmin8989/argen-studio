'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';
import { company } from '@/lib/company';
import Credentials from '@/components/home/Credentials';

const standards = [
  { num: '01', title: 'about.s1.title' as const, desc: 'about.s1.desc' as const },
  { num: '02', title: 'about.s2.title' as const, desc: 'about.s2.desc' as const },
  { num: '03', title: 'about.s3.title' as const, desc: 'about.s3.desc' as const },
  { num: '04', title: 'about.s4.title' as const, desc: 'about.s4.desc' as const },
];

export default function StudioPage() {
  const { t } = useLang();

  const facts = [
    { key: 'name', term: t('상호', 'Company'), value: t(company.name.ko, company.name.en) },
    { key: 'ceo', term: t('대표자', 'CEO'), value: t(company.ceo.ko, company.ceo.en) },
    { key: 'hq', term: t(dict['footer.hq'].ko, dict['footer.hq'].en), value: t(company.hq.ko, company.hq.en) },
    { key: 'showroom', term: t(dict['footer.showroom'].ko, dict['footer.showroom'].en), value: t(company.showroom.ko, company.showroom.en) },
    { key: 'phone', term: t('전화', 'Phone'), value: company.phone },
  ];

  return (
    <>
      {/* 1. 제목 */}
      <section className="bg-warm-100 pt-[calc(76px+clamp(2.5rem,6vw,5rem))]">
        <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
          <p className="mb-5 font-sans text-xs tracking-[0.24em] text-warm-700">ARGEN STUDIO / ABOUT</p>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] text-dark">{t('회사소개', 'Studio')}</h1>
        </div>
      </section>

      {/* 2. 한 문장의 시선 + 소개 */}
      <section className="bg-warm-100 py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-[clamp(1.25rem,5vw,4rem)] lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <h2 className="reveal font-serif text-[clamp(1.6rem,3vw,2.75rem)] font-bold leading-snug text-dark break-keep">
            {t(dict['about.headline1'].ko, dict['about.headline1'].en)}
            <br />
            {t(dict['about.headline2'].ko, dict['about.headline2'].en)}
          </h2>
          <p className="reveal reveal-delay-1 font-sans text-base leading-8 text-warm-700 break-keep lg:pt-3">
            {t(dict['about.desc'].ko, dict['about.desc'].en)}
          </p>
        </div>
      </section>

      {/* 3. 대표 사진 */}
      <section className="bg-warm-100 pb-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
          {/* reveal-image 는 자르기(clip-path)로 가려져 스스로는 화면에 감지되지 않는다.
              감지는 .reveal 부모가 하고, 부모가 보이면 안쪽 reveal-image 를 함께 연다 (다른 섹션과 같은 방식) */}
          <div className="reveal">
          <figure className="reveal-image">
            <Link href="/portfolio/star-sports-exterior" className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent">
              <div className="relative aspect-[4/3] overflow-hidden bg-warm-200 md:aspect-[16/7]">
                <Image
                  src="/images/portfolio/exterior/star-sports-exterior/night-front-edited.webp"
                  alt={t('스타스포츠 외장 리모델링', 'Star Sports exterior remodeling')}
                  fill
                  sizes="(max-width: 1440px) 92vw, 1312px"
                  className="object-cover object-[50%_40%] transition-transform duration-700 motion-safe:group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 font-sans text-sm text-warm-700">
                <span>{t('스타스포츠 외장 리모델링 · 서울 을지로 · 2026', 'Star Sports Exterior Remodeling · Euljiro, Seoul · 2026')}</span>
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </figcaption>
            </Link>
          </figure>
          </div>
        </div>
      </section>

      {/* 4. 아르젠의 기준 */}
      <section className="bg-warm-100 pb-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
          <ol className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((s, i) => (
              <li key={s.num} className={`reveal reveal-delay-${(i % 4) + 1} border-t border-warm-300 pt-6`}>
                <span className="mb-4 block font-serif text-3xl text-warm-600">{s.num}</span>
                <h3 className="mb-3 font-serif text-xl font-bold text-dark">{t(dict[s.title].ko, dict[s.title].en)}</h3>
                <p className="font-sans text-sm leading-7 text-warm-700 break-keep">{t(dict[s.desc].ko, dict[s.desc].en)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. 등록 · 특허 */}
      <Credentials />

      {/* 6. 회사 정보 + 다음 행동 */}
      <section className="bg-warm-100 py-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto max-w-[1320px] px-[clamp(1.25rem,5vw,4rem)]">
          <h2 className="reveal mb-10 font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-dark">{t('회사 정보', 'Company')}</h2>
          <dl className="reveal reveal-delay-1 grid grid-cols-1 gap-x-12 border-t border-warm-300 md:grid-cols-2">
            {facts.map((f) => (
              <div key={f.key} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-warm-300 py-5 sm:grid-cols-[8rem_1fr]">
                <dt className="font-sans text-xs font-medium tracking-[0.15em] text-warm-700 pt-0.5">{f.term}</dt>
                <dd className="font-sans text-sm leading-relaxed text-dark break-keep">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="reveal mt-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-dark break-keep">
              {t('다음 공간을 함께 이야기해요.', 'Let’s talk about your next space.')}
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center gap-6 border border-dark px-7 font-sans text-sm text-dark transition-colors hover:bg-dark hover:text-warm-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {t('시공 사례 보기', 'View works')} <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex min-h-12 items-center gap-6 bg-dark px-7 font-sans text-sm text-warm-100 transition-colors hover:bg-warm-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {t('문의하기', 'Contact us')} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
