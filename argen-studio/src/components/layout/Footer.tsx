'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';
import { company } from '@/lib/company';

// 헤더 메뉴와 같은 별도 페이지로 연결한다.
const menuLinks = [
  { href: '/studio', key: 'nav.about' as const },
  { href: '/portfolio', key: 'nav.portfolio' as const },
  { href: '/practice', key: 'nav.services' as const },
  { href: '/inquiry', key: 'nav.contact' as const },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-dark text-warm-300">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-warm-800">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-4">
              <span className="font-serif text-2xl text-warm-200">A</span>
              <span className="font-sans text-sm font-medium tracking-[0.18em] uppercase text-warm-200">RGEN&nbsp;STUDIO</span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-warm-400 max-w-xs">
              {t(dict['footer.desc1'].ko, dict['footer.desc1'].en)}<br />
              {t(dict['footer.desc2'].ko, dict['footer.desc2'].en)}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-warm-500 mb-5">
              {t(dict['footer.menu'].ko, dict['footer.menu'].en)}
            </p>
            <ul className="space-y-0 md:space-y-3">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  {/* 모바일: 누르는 영역 44px 이상 */}
                  <Link href={link.href} className="flex min-h-11 items-center font-sans text-sm text-warm-400 hover:text-warm-200 transition-colors md:inline-flex md:min-h-0">
                    {t(dict[link.key].ko, dict[link.key].en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-warm-500 mb-5">
              {t(dict['footer.contactLabel'].ko, dict['footer.contactLabel'].en)}
            </p>
            <address className="not-italic space-y-3">
              <p className="font-sans text-xs font-medium text-warm-500 mb-0.5">
                {t(dict['footer.hq'].ko, dict['footer.hq'].en)}
              </p>
              <p className="font-sans text-sm text-warm-400">
                {t(company.hq.ko, company.hq.en)}
              </p>
              <p className="font-sans text-xs font-medium text-warm-500 mt-3 mb-0.5">
                {t(dict['footer.showroom'].ko, dict['footer.showroom'].en)}
              </p>
              <p className="font-sans text-sm text-warm-400">
                {t(company.showroom.ko, company.showroom.en)}
              </p>
              <a href={`tel:${company.phone}`} className="flex min-h-11 items-center font-sans text-sm text-warm-400 hover:text-warm-200 transition-colors md:mt-3 md:min-h-0">
                {company.phone}
              </a>
            </address>
          </div>
        </div>

        {/* 사업자 정보 — 건설업등록증 기준 */}
        <p className="pt-8 font-sans text-xs leading-relaxed text-warm-500">
          {t(
            '주식회사 아르젠 · 대표 이성우 · 건설업(실내건축공사업) 등록번호 화성26-나-24',
            'ARGEN Inc. · CEO Lee Seong-woo · Construction business (interior construction) Reg. No. Hwaseong 26-Na-24'
          )}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-sans text-xs text-warm-500">
            © {year} ARGEN STUDIO. All rights reserved.
          </p>
          <a href="https://argen.co.kr" className="inline-flex min-h-11 items-center font-sans text-xs text-warm-500 hover:text-warm-300 transition-colors md:min-h-0">
            argen.co.kr
          </a>
        </div>
      </div>
    </footer>
  );
}
