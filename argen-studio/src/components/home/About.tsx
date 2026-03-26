'use client';

import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const standards = [
  { num: '01', title: 'about.s1.title' as const, desc: 'about.s1.desc' as const },
  { num: '02', title: 'about.s2.title' as const, desc: 'about.s2.desc' as const },
  { num: '03', title: 'about.s3.title' as const, desc: 'about.s3.desc' as const },
  { num: '04', title: 'about.s4.title' as const, desc: 'about.s4.desc' as const },
];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="py-[clamp(5rem,10vw,9rem)] bg-warm-50">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {t(dict['about.label'].ko, dict['about.label'].en)}
            </span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-dark mb-6 leading-tight">
              {t(dict['about.headline1'].ko, dict['about.headline1'].en)}<br />
              {t(dict['about.headline2'].ko, dict['about.headline2'].en)}
            </h2>
            <p className="font-sans text-base leading-relaxed text-warm-700 max-w-md">
              {t(dict['about.desc'].ko, dict['about.desc'].en)}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {standards.map((s, i) => (
              <div key={s.num} className={`bg-warm-100 rounded-lg p-6 reveal reveal-delay-${i + 1}`}>
                <span className="font-serif text-3xl font-bold text-warm-200 block mb-3">{s.num}</span>
                <h3 className="font-serif text-lg font-bold text-dark mb-2">
                  {t(dict[s.title].ko, dict[s.title].en)}
                </h3>
                <p className="font-sans text-sm text-warm-600 leading-relaxed">
                  {t(dict[s.desc].ko, dict[s.desc].en)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
