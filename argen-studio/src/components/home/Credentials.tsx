'use client';

import { useLang } from '@/lib/i18n';

type Bi = { ko: string; en: string };

// 근거 문서: 건설업등록증(화성시장, 2026.08.25) / 옥외광고사업 등록증(화성시장, 2025.08.27) / 특허증(지식재산처장, 2026.09.16)
// 개인 정보(발명자 주소, 등록증의 생년월일 칸)와 법인등록번호는 노출하지 않는다.
// 옥외광고사업 등록증의 주소는 건설업등록증(본사 1층 147호)과 달라서 싣지 않는다.
const records: {
  key: string;
  label: Bi;
  headline: Bi;
  title?: Bi;
  details: { term: Bi; value: Bi }[];
}[] = [
  {
    key: 'license',
    label: { ko: '건설업 등록', en: 'Contractor Registration' },
    headline: { ko: '실내건축공사업', en: 'Interior Construction' },
    details: [
      { term: { ko: '등록번호', en: 'Registration No.' }, value: { ko: '화성26-나-24', en: 'Hwaseong 26-Na-24' } },
      { term: { ko: '등록일', en: 'Registered' }, value: { ko: '2026. 8. 25.', en: 'Aug 25, 2026' } },
      { term: { ko: '등록기관', en: 'Issued by' }, value: { ko: '화성시', en: 'Hwaseong City' } },
    ],
  },
  {
    key: 'outdoor-ad',
    label: { ko: '옥외광고사업 등록', en: 'Outdoor Advertising Registration' },
    headline: { ko: '옥외광고사업', en: 'Outdoor Advertising' },
    title: {
      ko: '옥외광고물 제작, 설치 및 인테리어',
      en: 'Outdoor advertising fabrication, installation and interior',
    },
    details: [
      { term: { ko: '등록번호', en: 'Registration No.' }, value: { ko: '제2025-5530606-08-5-00028호', en: 'No. 2025-5530606-08-5-00028' } },
      { term: { ko: '등록일', en: 'Registered' }, value: { ko: '2025. 8. 27.', en: 'Aug 27, 2025' } },
      { term: { ko: '등록기관', en: 'Issued by' }, value: { ko: '화성시', en: 'Hwaseong City' } },
    ],
  },
  {
    key: 'patent',
    label: { ko: '특허', en: 'Patent' },
    headline: { ko: '제10-3022394호', en: 'No. 10-3022394' },
    title: {
      ko: '실거래가 데이터 및 생활성향 지표에 기초한 주거 리모델링 의사결정 지원 시스템',
      en: 'Residential remodeling decision-support system based on actual transaction price data and lifestyle indicators',
    },
    details: [
      { term: { ko: '출원일', en: 'Filed' }, value: { ko: '2026. 2. 3.', en: 'Feb 3, 2026' } },
      { term: { ko: '등록일', en: 'Registered' }, value: { ko: '2026. 9. 16.', en: 'Sep 16, 2026' } },
      { term: { ko: '등록기관', en: 'Issued by' }, value: { ko: '지식재산처', en: 'Ministry of Intellectual Property' } },
    ],
  },
];

export default function Credentials() {
  const { t } = useLang();
  const tb = (b: Bi) => t(b.ko, b.en);

  return (
    <section id="credentials" className="py-[clamp(5rem,10vw,9rem)] bg-warm-50">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="max-w-2xl mb-14 md:mb-20 reveal">
          <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-5">
            {t('등록 · 특허', 'Credentials')}
          </span>
          <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-dark leading-snug break-keep">
            {t('등록된 시공, 등록된 기술.', 'Licensed to build. Patented to advise.')}
          </h2>
          <p className="font-sans text-base leading-relaxed text-warm-700 mt-6 break-keep">
            {t(
              '아르젠은 건설산업기본법에 따라 등록된 실내건축공사업체이자 옥외광고사업 등록업체이며, 주거 리모델링의 의사결정을 돕는 시스템으로 특허를 등록했습니다.',
              'ARGEN is a registered interior construction contractor under the Framework Act on the Construction Industry and a registered outdoor advertising business, and holds a patent for a residential remodeling decision-support system.'
            )}
          </p>
        </div>

        <div className="border-t border-warm-200">
          {records.map((r, i) => (
            <div
              key={r.key}
              className={`grid grid-cols-1 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-x-16 gap-y-6 py-10 md:py-12 border-b border-warm-200 reveal reveal-delay-${i + 1}`}
            >
              <div>
                <p className="font-sans text-xs font-medium tracking-[0.18em] uppercase text-warm-700 mb-3">
                  {tb(r.label)}
                </p>
                <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-dark break-keep">
                  {tb(r.headline)}
                </p>
              </div>

              <div>
                {r.title && (
                  <p className="font-sans text-base md:text-lg leading-relaxed text-dark mb-6 max-w-2xl break-keep">
                    {tb(r.title)}
                  </p>
                )}
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
                  {r.details.map((d) => (
                    <div key={d.term.ko}>
                      <dt className="font-sans text-xs font-medium tracking-[0.12em] uppercase text-warm-700 mb-1.5">
                        {tb(d.term)}
                      </dt>
                      <dd className="font-sans text-sm text-warm-800 break-keep">{tb(d.value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
