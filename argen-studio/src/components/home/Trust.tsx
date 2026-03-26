'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const metrics = [
  { target: 847, suffix: '+', label: 'trust.completed' as const },
  { target: 94,  suffix: '%', label: 'trust.retention' as const },
  { target: 12,  suffix: null, suffixKey: 'trust.experienceSuffix' as const, label: 'trust.experience' as const },
  { target: 100, suffix: '%', label: 'trust.satisfaction' as const },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(2, -10 * t);
            setValue(Math.floor(ease * target));
            if (t < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}{suffix}
    </span>
  );
}

export default function Trust() {
  const { t } = useLang();

  return (
    <section className="bg-dark py-16">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-warm-800">
          {metrics.map((m, i) => {
            const suffix = m.suffixKey
              ? t(dict[m.suffixKey].ko, dict[m.suffixKey].en)
              : (m.suffix ?? '');
            return (
              <div key={i} className={`flex flex-col items-center text-center reveal reveal-delay-${i}`}>
                <p className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-warm-100 leading-none mb-2">
                  <Counter target={m.target} suffix={suffix} />
                </p>
                <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-warm-500">
                  {t(dict[m.label].ko, dict[m.label].en)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
