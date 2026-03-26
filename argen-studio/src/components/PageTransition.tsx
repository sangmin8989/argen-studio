'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<'enter' | 'active'>('active');

  useEffect(() => {
    setStage('enter');
    const timer = setTimeout(() => setStage('active'), 30);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={stage === 'enter' ? 'page-transition-enter' : 'page-transition-active'}
    >
      {children}
    </div>
  );
}
