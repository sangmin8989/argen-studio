'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const bars = [
  { label: 'pricing.materials' as const, percent: 45, desc: 'pricing.materialsDesc' as const },
  { label: 'pricing.labor' as const, percent: 30, desc: 'pricing.laborDesc' as const },
  { label: 'pricing.design' as const, percent: 15, desc: 'pricing.designDesc' as const },
  { label: 'pricing.misc' as const, percent: 10, desc: 'pricing.miscDesc' as const },
];

function AnimatedBar({ percent, delay }: { percent: number; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.style.width = `${percent}%`; }, delay + 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [percent, delay]);

  return (
    <div className="h-1.5 bg-warm-200 rounded-full overflow-hidden">
      <div ref={barRef} className="h-full bg-accent rounded-full transition-all duration-700 ease-out" style={{ width: 0 }} />
    </div>
  );
}

export default function Pricing() {
  const { t } = useLang();

  return (
    <section className="py-[clamp(5rem,10vw,9rem)] bg-dark">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {t(dict['pricing.label'].ko, dict['pricing.label'].en)}
            </span>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-warm-100 mb-4">
              {t(dict['pricing.title1'].ko, dict['pricing.title1'].en)}<br />
              {t(dict['pricing.title2'].ko, dict['pricing.title2'].en)}
            </h2>
            <p className="font-sans text-sm text-warm-400 max-w-sm">
              {t(dict['pricing.subtitle'].ko, dict['pricing.subtitle'].en)}
            </p>
          </div>
          <div className="space-y-8">
            {bars.map((bar, i) => (
              <div key={i} className={`reveal reveal-delay-${i}`}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-sans text-sm font-medium text-warm-200">{t(dict[bar.label].ko, dict[bar.label].en)}</span>
                  <span className="font-serif text-2xl font-bold text-warm-100">{bar.percent}%</span>
                </div>
                <AnimatedBar percent={bar.percent} delay={i * 100} />
                <p className="font-sans text-xs text-warm-500 mt-2 leading-relaxed">{t(dict[bar.desc].ko, dict[bar.desc].en)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
