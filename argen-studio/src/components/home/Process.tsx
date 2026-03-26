'use client';

import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const steps = [
  { num: '01', title: 'process.s1' as const, desc: 'process.s1d' as const },
  { num: '02', title: 'process.s2' as const, desc: 'process.s2d' as const },
  { num: '03', title: 'process.s3' as const, desc: 'process.s3d' as const },
  { num: '04', title: 'process.s4' as const, desc: 'process.s4d' as const },
  { num: '05', title: 'process.s5' as const, desc: 'process.s5d' as const },
  { num: '06', title: 'process.s6' as const, desc: 'process.s6d' as const },
];

export default function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="py-[clamp(5rem,10vw,9rem)] bg-warm-200">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t(dict['process.label'].ko, dict['process.label'].en)}
          </span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-dark mb-4">
            {t(dict['process.title'].ko, dict['process.title'].en)}
          </h2>
          <p className="font-sans text-sm text-warm-600 max-w-md mx-auto">
            {t(dict['process.subtitle'].ko, dict['process.subtitle'].en)}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className={`relative bg-warm-50 rounded-lg p-8 overflow-hidden reveal reveal-delay-${i % 5}`}>
              <span className="absolute top-0 right-4 font-serif text-[6rem] font-bold text-warm-200 leading-none select-none pointer-events-none">{step.num}</span>
              <div className="relative z-10">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-4 block">STEP {step.num}</span>
                <h3 className="font-serif text-xl font-bold text-dark mb-3">
                  {t(dict[step.title].ko, dict[step.title].en)}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-warm-600">
                  {t(dict[step.desc].ko, dict[step.desc].en)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
