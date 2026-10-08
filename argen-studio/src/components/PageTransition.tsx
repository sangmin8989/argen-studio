'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// 경로가 바뀔 때마다 key 로 래퍼를 새로 마운트해서 CSS 진입 애니메이션(pageEnter)을 다시 재생한다.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition-active">
      {children}
    </div>
  );
}
