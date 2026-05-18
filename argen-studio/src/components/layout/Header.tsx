'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

// 명품 토대: process/quote 제거. 본질만.
const navLinks = [
  { href: '#about', key: 'nav.about' as const },
  { href: '#works', key: 'nav.portfolio' as const },
  { href: '#services', key: 'nav.services' as const },
  { href: '#contact', key: 'nav.contact' as const },
];

export default function Header() {
  const { lang, toggle, t } = useLang();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href === '#') return;
    // works 섹션은 portfolio id로 라우팅 (id 변경 안 했으므로 호환)
    const target = href === '#works' ? '#portfolio' : href;
    if (!isHome) {
      window.location.href = '/' + target;
      return;
    }
    const el = document.querySelector(target);
    if (!el) return;
    const navH = 76;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'bg-warm-100/90 backdrop-blur-md border-b border-warm-200'
            : 'bg-transparent'
        }`}
        style={{ height: 76 }}
      >
        <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] h-full flex items-center justify-between">
          {/* Logo — 침묵의 워드마크. 강조 컬러 없음. */}
          <Link href="/" className="flex items-baseline gap-0.5 group">
            <span
              className="font-serif text-[1.6rem] leading-none transition-colors duration-500"
              style={{ color: scrolled ? '#1C1917' : '#FAF8F5' }}
            >
              A
            </span>
            <span
              className="font-sans text-xs font-medium tracking-[0.22em] uppercase transition-colors duration-500"
              style={{ color: scrolled ? '#1C1917' : '#FAF8F5' }}
            >
              RGEN&nbsp;STUDIO
            </span>
          </Link>

          {/* Desktop nav — 미니멀. CTA 버튼 제거. */}
          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`font-sans text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                    scrolled ? 'text-dark/70 hover:text-dark' : 'text-warm-100/70 hover:text-warm-100'
                  }`}
                >
                  {t(dict[link.key].ko, dict[link.key].en)}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: Lang toggle만. 무료견적 버튼 제거. */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={toggle}
              className={`font-sans text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-dark/60 hover:text-dark' : 'text-warm-100/60 hover:text-warm-100'
              }`}
              aria-label="언어 전환"
            >
              <span className={lang === 'ko' ? 'font-semibold' : ''}>KO</span>
              <span className="mx-1.5 opacity-30">·</span>
              <span className={lang === 'en' ? 'font-semibold' : ''}>EN</span>
            </button>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggle}
              className={`font-sans text-[10px] font-medium tracking-[0.2em] uppercase transition-colors ${
                scrolled ? 'text-dark/60 hover:text-dark' : 'text-warm-100/60 hover:text-warm-100'
              }`}
              aria-label="언어 전환"
            >
              <span className={lang === 'ko' ? 'font-semibold' : ''}>KO</span>
              <span className="mx-1 opacity-30">·</span>
              <span className={lang === 'en' ? 'font-semibold' : ''}>EN</span>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            >
              <span
                className={`block h-[1px] rounded-none transition-all duration-300 origin-center ${
                  scrolled ? 'bg-dark' : 'bg-warm-100'
                } ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
              />
              <span
                className={`block h-[1px] rounded-none transition-all duration-300 ${
                  scrolled ? 'bg-dark' : 'bg-warm-100'
                } ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-[1px] rounded-none transition-all duration-300 origin-center ${
                  scrolled ? 'bg-dark' : 'bg-warm-100'
                } ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — 풀스크린 침묵 */}
      <div
        className={`fixed inset-0 z-40 bg-warm-100 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 76 }}
      >
        <ul className="flex flex-col px-[clamp(1.5rem,8vw,3rem)] pt-12 gap-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="w-full text-left font-serif text-[clamp(2.4rem,9vw,3.4rem)] leading-[1.05] py-3 text-dark hover:text-warm-700 active:text-warm-700 transition-colors min-h-[56px]"
              >
                {t(dict[link.key].ko, dict[link.key].en)}
              </button>
            </li>
          ))}
        </ul>
        <div className="px-[clamp(1.5rem,8vw,3rem)] pb-[max(3rem,env(safe-area-inset-bottom))]">
          <button
            onClick={toggle}
            className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-warm-600"
          >
            <span className={lang === 'ko' ? 'font-semibold text-dark' : ''}>한국어</span>
            <span className="mx-2 opacity-30">·</span>
            <span className={lang === 'en' ? 'font-semibold text-dark' : ''}>English</span>
          </button>
        </div>
      </div>
    </>
  );
}
