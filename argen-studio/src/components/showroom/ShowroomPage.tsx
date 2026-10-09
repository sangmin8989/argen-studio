'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { company } from '@/lib/company';
import { showroomHero, showroomPhotos } from '@/data/showroom';
import ShowroomGallery from './ShowroomGallery';

const linkBtn =
  'inline-flex min-h-12 items-center gap-6 border border-dark px-7 font-sans text-sm text-dark transition-colors hover:bg-dark hover:text-warm-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

export default function ShowroomPage() {
  const { lang, t } = useLang();
  const q = encodeURIComponent(company.showroom.mapQuery);
  const maps = [
    { key: 'naver', label: t('네이버지도', 'Naver Map'), href: `https://map.naver.com/p/search/${q}` },
    { key: 'kakao', label: t('카카오맵', 'Kakao Map'), href: `https://map.kakao.com/?q=${q}` },
  ];

  return (
    <>
      {/* 1. 제목 */}
      <section className="bg-warm-100 pt-[calc(76px+clamp(2.5rem,6vw,5rem))]">
        <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
          <p className="mb-5 font-sans text-xs tracking-[0.24em] text-warm-700">ARGEN STUDIO / SHOWROOM</p>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] text-dark">{t('쇼룸', 'Showroom')}</h1>
        </div>
      </section>

      {/* 2. 대표 사진 (.reveal 부모가 감지하고 안쪽 .reveal-image 를 함께 연다) */}
      <section className="bg-warm-100 py-[clamp(2rem,4vw,3rem)]">
        <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
          <div className="reveal">
            <figure className="reveal-image">
              <div className="relative aspect-[4/3] overflow-hidden bg-warm-200 md:aspect-[16/8]">
                <Image
                  src={showroomHero.src}
                  alt={showroomHero.alt[lang]}
                  fill
                  priority
                  sizes="(max-width: 1440px) 92vw, 1312px"
                  className="object-cover object-[50%_60%]"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 3. 소개 + 방문 정보 */}
      <section className="bg-warm-100 py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-[clamp(1.25rem,5vw,4rem)] lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 className="reveal font-serif text-[clamp(1.6rem,3vw,2.75rem)] font-bold leading-snug text-dark break-keep">
              {t('재료와 빛을,', 'Materials and light,')}
              <br />
              {t('직접 보는 곳.', 'in person.')}
            </h2>
            <p className="reveal reveal-delay-1 mt-6 max-w-xl font-sans text-base leading-8 text-warm-700 break-keep">
              {t(
                '타일과 마감재, 조명, 주방과 욕실, 가구까지. 아르젠이 다루는 재료를 실제 공간으로 구성해 두었습니다.',
                'Tiles and finishes, lighting, kitchens, bathrooms and furniture — the materials ARGEN works with, arranged as a real space.'
              )}
            </p>
          </div>

          <dl className="reveal reveal-delay-1 border-t border-warm-300">
            <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-warm-300 py-5">
              <dt className="pt-0.5 font-sans text-xs font-medium tracking-[0.15em] text-warm-700">{t('위치', 'Address')}</dt>
              <dd className="font-sans text-sm leading-relaxed text-dark break-keep">{t(company.showroom.ko, company.showroom.en)}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-warm-300 py-2">
              <dt className="flex items-center font-sans text-xs font-medium tracking-[0.15em] text-warm-700">{t('전화', 'Phone')}</dt>
              <dd>
                <a href={`tel:${company.phone}`} className="inline-flex min-h-11 items-center font-sans text-sm text-dark underline underline-offset-4">
                  {company.phone}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-3 py-6">
              {maps.map((m) => (
                <a key={m.key} href={m.href} target="_blank" rel="noopener noreferrer" className={linkBtn}>
                  {m.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </dl>
        </div>
      </section>

      {/* 4. 갤러리 */}
      <section className="bg-warm-100 pb-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,5vw,4rem)]">
          <ShowroomGallery photos={showroomPhotos} />
        </div>
      </section>

      {/* 5. 다음 행동 */}
      <section className="bg-warm-50 py-[clamp(4rem,8vw,7rem)]">
        <div className="reveal mx-auto flex max-w-[1320px] flex-col gap-8 px-[clamp(1.25rem,5vw,4rem)] md:flex-row md:items-center md:justify-between">
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-dark break-keep">
            {t('다음 공간을 함께 이야기해요.', 'Let’s talk about your next space.')}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/portfolio" className={linkBtn}>
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
      </section>
    </>
  );
}
