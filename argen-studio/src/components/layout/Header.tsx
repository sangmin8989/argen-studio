'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

// 명품 토대: process/quote 제거. 본질만. 각 메뉴는 별도 페이지로 열린다.
const navLinks = [
  { href: '/studio', key: 'nav.about' as const },
  { href: '/portfolio', key: 'nav.portfolio' as const },
  { href: '/practice', key: 'nav.services' as const },
  { href: '/inquiry', key: 'nav.contact' as const },
];

// 맨 위가 어두운 배경(히어로처럼)인 페이지: 스크롤 전에는 밝은 글자색을 유지한다
const darkTopPaths = ['/practice'];

export default function Header() {
  const { lang, toggle, t } = useLang();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const hasDarkTop = isHome || darkTopPaths.some((p) => pathname.startsWith(p));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const wasMenuOpenRef = useRef(false);

  // 밝은 배경 위에서는 어두운 글자색을 쓴다:
  // 스크롤했을 때 / 어두운 상단(히어로)이 없는 페이지 / 밝은 모바일 메뉴가 열렸을 때
  const solid = scrolled || !hasDarkTop || menuOpen;

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

  // 모바일 메뉴 접근성: Escape 로 닫기, 열면 첫 항목으로 포커스, 닫으면 햄버거로 포커스 복귀
  useEffect(() => {
    if (!menuOpen) {
      if (wasMenuOpenRef.current) hamburgerRef.current?.focus();
      wasMenuOpenRef.current = false;
      return;
    }
    wasMenuOpenRef.current = true;
    const focusTimer = setTimeout(() => firstMenuItemRef.current?.focus(), 60); // inert 해제 후
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname.startsWith(href);
  // 현재 페이지의 메뉴는 또렷하게, 나머지는 한 톤 낮게
  const navColor = (href: string) =>
    solid
      ? isActive(href) ? 'text-dark' : 'text-dark/70 hover:text-dark'
      : isActive(href) ? 'text-warm-100' : 'text-warm-100/70 hover:text-warm-100';

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
          <Link href="/" aria-label="ARGEN STUDIO" className="flex items-baseline gap-0.5 py-3 group">
            <span
              className="font-serif text-[1.6rem] leading-none transition-colors duration-500"
              style={{ color: solid ? '#1C1917' : '#FAF8F5' }}
            >
              A
            </span>
            <span
              className="font-sans text-xs font-medium tracking-[0.22em] uppercase transition-colors duration-500"
              style={{ color: solid ? '#1C1917' : '#FAF8F5' }}
            >
              RGEN&nbsp;STUDIO
            </span>
          </Link>

          {/* Desktop nav — 미니멀. CTA 버튼 제거. */}
          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`font-sans font-medium uppercase transition-colors duration-300 ${lang === 'ko' ? 'text-[13px] tracking-[0.06em]' : 'text-xs tracking-[0.15em]'} ${navColor(link.href)}`}
                >
                  {t(dict[link.key].ko, dict[link.key].en)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Lang toggle만. 무료견적 버튼 제거. */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={toggle}
              className={`font-sans text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                solid ? 'text-dark/60 hover:text-dark' : 'text-warm-100/60 hover:text-warm-100'
              }`}
              aria-label="언어 전환"
            >
              <span className={lang === 'ko' ? 'font-semibold' : ''}>KO</span>
              <span className="mx-1.5 opacity-30">·</span>
              <span className={lang === 'en' ? 'font-semibold' : ''}>EN</span>
            </button>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className={`min-h-11 min-w-14 font-sans text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                solid ? 'text-dark/60 hover:text-dark' : 'text-warm-100/60 hover:text-warm-100'
              }`}
              aria-label="언어 전환"
            >
              <span className={lang === 'ko' ? 'font-semibold' : ''}>KO</span>
              <span className="mx-1 opacity-30">·</span>
              <span className={lang === 'en' ? 'font-semibold' : ''}>EN</span>
            </button>
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex flex-col justify-center gap-[5px] w-11 h-11 p-2.5"
            >
              <span
                className={`block h-[1px] rounded-none transition-all duration-300 origin-center ${
                  solid ? 'bg-dark' : 'bg-warm-100'
                } ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
              />
              <span
                className={`block h-[1px] rounded-none transition-all duration-300 ${
                  solid ? 'bg-dark' : 'bg-warm-100'
                } ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-[1px] rounded-none transition-all duration-300 origin-center ${
                  solid ? 'bg-dark' : 'bg-warm-100'
                } ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — 풀스크린 침묵 */}
      {/* 닫힌 동안은 inert: 화면 밖으로 밀려나 있어도 Tab 포커스·스크린리더가 닿지 않게 한다 */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`fixed inset-0 z-40 bg-warm-100 flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 76 }}
      >
        <ul className="flex flex-col px-[clamp(1.5rem,8vw,3rem)] pt-[clamp(1rem,5svh,3rem)] gap-3">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <Link
                ref={i === 0 ? firstMenuItemRef : undefined}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="flex w-full items-center text-left font-serif text-[clamp(1.5rem,5.5vw,2rem)] leading-[1.3] py-2 text-dark hover:text-warm-700 active:text-warm-700 transition-colors min-h-[48px]"
              >
                {t(dict[link.key].ko, dict[link.key].en)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-[clamp(1.5rem,8vw,3rem)] pb-[max(3rem,env(safe-area-inset-bottom))]">
          <button
            onClick={toggle}
            className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-warm-700"
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
