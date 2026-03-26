'use client';

import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const menuLinks = [
  { href: '#about', key: 'nav.about' as const },
  { href: '#services', key: 'nav.services' as const },
  { href: '#portfolio', key: 'nav.portfolio' as const },
  { href: '#process', key: 'nav.process' as const },
  { href: '#contact', key: 'nav.contact' as const },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-warm-300">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-warm-800">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-4">
              <span className="font-serif text-2xl font-bold text-accent">A</span>
              <span className="font-sans text-sm font-medium tracking-[0.18em] uppercase text-warm-200">RGEN STUDIO</span>
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
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-sans text-sm text-warm-400 hover:text-warm-200 transition-colors">
                    {t(dict[link.key].ko, dict[link.key].en)}
                  </a>
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
                {t('경기도 화성시 동탄첨단산업 1로 58, 퍼스트코리아 217호', '58 Dongtan Cheomdan-saneop 1-ro, Hwaseong-si, First Korea #217')}
              </p>
              <p className="font-sans text-xs font-medium text-warm-500 mt-3 mb-0.5">
                {t(dict['footer.showroom'].ko, dict['footer.showroom'].en)}
              </p>
              <p className="font-sans text-sm text-warm-400">
                {t('경기도 수원시 권선로 681, 아르젠 스튜디오', '681 Gwonseon-ro, Suwon-si, ARGEN Studio')}
              </p>
              <a href="tel:031-8043-7966" className="block font-sans text-sm text-warm-400 hover:text-warm-200 transition-colors mt-3">
                031-8043-7966
              </a>
              <a href="mailto:contact@argen.co.kr" className="block font-sans text-sm text-warm-400 hover:text-warm-200 transition-colors">
                contact@argen.co.kr
              </a>
            </address>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-sans text-xs text-warm-600">
            © {year} ARGEN STUDIO. All rights reserved.
          </p>
          <a href="https://argen.co.kr" className="font-sans text-xs text-warm-600 hover:text-warm-400 transition-colors">
            argen.co.kr
          </a>
        </div>
      </div>
    </footer>
  );
}
