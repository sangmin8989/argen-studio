'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const navLinks = [
  { href: '#about', ko: 'nav.about' as const },
  { href: '#services', ko: 'nav.services' as const },
  { href: '#portfolio', ko: 'nav.portfolio' as const },
  { href: '#process', ko: 'nav.process' as const },
  { href: '#contact', ko: 'nav.contact' as const },
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
    if (!isHome) {
      window.location.href = '/' + href;
      return;
    }
    const el = document.querySelector(href);
    if (!el) return;
    const navH = 76;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-warm-100/95 backdrop-blur-md shadow-sm border-b border-warm-200'
            : 'bg-transparent'
        }`}
        style={{ height: 76 }}
      >
        <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-0.5 group">
            <span
              className="font-serif text-2xl font-bold leading-none"
              style={{ color: scrolled ? '#8C7560' : '#FAF8F5' }}
            >
              A
            </span>
            <span
              className="font-sans text-sm font-medium tracking-[0.18em] uppercase transition-colors"
              style={{ color: scrolled ? '#1A1A1A' : '#FAF8F5' }}
            >
              RGEN STUDIO
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`font-sans text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                    scrolled ? 'text-dark/70 hover:text-accent' : 'text-warm-100/80 hover:text-warm-100'
                  }`}
                >
                  {t(dict[link.ko].ko, dict[link.ko].en)}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: Lang toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggle}
              className={`font-sans text-xs font-medium tracking-wider transition-colors ${
                scrolled ? 'text-dark/60 hover:text-dark' : 'text-warm-100/60 hover:text-warm-100'
              }`}
            >
              <span className={lang === 'ko' ? 'font-bold text-accent' : ''}>KO</span>
              <span className="mx-1 opacity-40">/</span>
              <span className={lang === 'en' ? 'font-bold text-accent' : ''}>EN</span>
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-5 py-2.5 rounded font-sans text-sm font-medium tracking-wide transition-all duration-200 bg-accent text-warm-50 hover:bg-warm-700"
            >
              {t(dict['nav.quote'].ko, dict['nav.quote'].en)}
            </button>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              className={`font-sans text-xs font-medium tracking-wider transition-colors ${
                scrolled ? 'text-dark/60 hover:text-dark' : 'text-warm-100/60 hover:text-warm-100'
              }`}
            >
              <span className={lang === 'ko' ? 'font-bold text-accent' : ''}>KO</span>
              <span className="mx-0.5 opacity-40">/</span>
              <span className={lang === 'en' ? 'font-bold text-accent' : ''}>EN</span>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            >
            <span
              className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                scrolled ? 'bg-dark' : 'bg-warm-100'
              } ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
            />
            <span
              className={`block h-[1.5px] rounded-full transition-all duration-300 ${
                scrolled ? 'bg-dark' : 'bg-warm-100'
              } ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                scrolled ? 'bg-dark' : 'bg-warm-100'
              } ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
            />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-warm-100 flex flex-col justify-between transition-transform duration-300 ease-out-expo ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 76 }}
      >
        <ul className="flex flex-col px-8 pt-6 gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="w-full text-center font-serif text-2xl font-medium py-3 border-b border-warm-200 text-dark hover:text-accent transition-colors"
              >
                {t(dict[link.ko].ko, dict[link.ko].en)}
              </button>
            </li>
          ))}
        </ul>
        <div className="px-8 pb-10 flex flex-col items-center gap-4">
          <button
            onClick={toggle}
            className="font-sans text-sm font-medium text-warm-600"
          >
            <span className={lang === 'ko' ? 'font-bold text-accent' : ''}>한국어</span>
            <span className="mx-2 opacity-40">/</span>
            <span className={lang === 'en' ? 'font-bold text-accent' : ''}>English</span>
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="w-full py-4 bg-accent text-warm-50 font-sans text-base font-medium tracking-wide rounded"
          >
            {t(dict['nav.quoteFull'].ko, dict['nav.quoteFull'].en)}
          </button>
        </div>
      </div>
    </>
  );
}
