'use client';

import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NAVIGATE_EVENT } from '@/lib/transition';

// 덮이는 데 걸리는 시간 / 걷히는 데 걸리는 시간. 걷히는 쪽을 더 길게 둬서 차분하게 드러나게 한다.
const COVER_MS = 380;
const REVEAL_MS = 900;
const COVER_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const REVEAL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
// 이동이 끝나지 않아도 화면이 영원히 덮여 있지 않게 하는 안전장치
const SAFETY_MS = 5000;

/**
 * 페이지 전환: 링크를 누르면 크림색 막이 화면을 덮고 → 그 사이에 이동 → 막이 천천히 걷히며 새 페이지가 드러난다.
 *  - 이전 페이지가 뚝 끊기거나 스크롤이 튀는 장면이 막 뒤에 가려진다.
 *  - 같은 페이지 안의 이동(해시/쿼리), 새 탭, 외부 링크, 전화·메일 링크, 뒤로가기는 건드리지 않는다.
 *  - '동작 줄이기' 설정이면 연출 없이 바로 이동한다.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const veilRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const pathRef = useRef(pathname);
  const timersRef = useRef<number[]>([]);

  const setVeil = useCallback((show: boolean) => {
    const el = veilRef.current;
    if (!el) return;
    el.style.transition = `opacity ${show ? COVER_MS : REVEAL_MS}ms ${show ? COVER_EASE : REVEAL_EASE}`;
    el.style.opacity = show ? '1' : '0';
    el.style.pointerEvents = show ? 'auto' : 'none'; // 덮여 있는 동안 중복 클릭 방지
  }, []);

  const go = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (url.origin !== window.location.origin) {
        window.location.assign(url.href);
        return;
      }
      if (reduced || url.pathname === pathRef.current) {
        router.push(target);
        return;
      }
      if (pendingRef.current) return;
      pendingRef.current = true;
      const el = veilRef.current;

      // 막이 "완전히 덮였다"는 신호를 받은 뒤에 이동한다. 고정 타이머만 쓰면 화면이 느린 환경에서
      // 막이 덮이기 전에 페이지가 바뀌어 연출이 깨진다. 신호가 안 오는 경우를 위해 안전 타이머도 둔다.
      let moved = false;
      const move = () => {
        if (moved) return;
        moved = true;
        el?.removeEventListener('transitionend', onCovered);
        router.push(target);
      };
      const onCovered = (e: TransitionEvent) => {
        if (e.target === el && e.propertyName === 'opacity') move();
      };
      el?.addEventListener('transitionend', onCovered);
      setVeil(true);
      timersRef.current.push(window.setTimeout(move, COVER_MS + 450));
      timersRef.current.push(
        window.setTimeout(() => {
          if (!pendingRef.current) return;
          pendingRef.current = false;
          setVeil(false);
        }, SAFETY_MS)
      );
    },
    [router, setVeil]
  );

  // 새 페이지가 그려지면 막을 걷는다
  useEffect(() => {
    pathRef.current = pathname;
    if (!pendingRef.current) return;
    pendingRef.current = false;
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
    let id2 = 0;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setVeil(false));
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, [pathname, setVeil]);

  // 내부 링크 클릭 / 코드에서 보낸 이동 요청을 가로챈다
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a) return;
      if ((a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || /^(mailto:|tel:|sms:|javascript:)/i.test(href)) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // 같은 페이지 안의 이동은 기본 동작
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault(); // Next <Link> 는 defaultPrevented 이면 스스로 이동하지 않는다
      go(href);
    };
    const onNavigate = (e: Event) => go((e as CustomEvent<string>).detail);
    document.addEventListener('click', onClick, true);
    window.addEventListener(NAVIGATE_EVENT, onNavigate);
    const timers = timersRef.current;
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener(NAVIGATE_EVENT, onNavigate);
      timers.forEach(window.clearTimeout);
    };
  }, [go]);

  return (
    <>
      <div
        ref={veilRef}
        aria-hidden="true"
        className="fixed inset-0 z-[9000] flex items-center justify-center bg-warm-100"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <span className="flex items-baseline gap-0.5 text-dark/60">
          <span className="font-serif text-2xl leading-none">A</span>
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em]">RGEN&nbsp;STUDIO</span>
        </span>
      </div>
      <div key={pathname} className="page-transition-active">
        {children}
      </div>
    </>
  );
}
