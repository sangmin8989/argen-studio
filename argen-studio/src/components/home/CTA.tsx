'use client';

import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

export default function CTA() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative py-[clamp(5rem,10vw,9rem)] bg-accent overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center font-serif font-bold text-[clamp(8rem,25vw,18rem)] text-warm-700/20 select-none pointer-events-none leading-none tracking-tight" aria-hidden>
        ARGEN
      </span>
      <div className="relative z-10 max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] text-center">
        <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-warm-200 mb-5">
          {t(dict['cta.label'].ko, dict['cta.label'].en)}
        </span>
        <h2 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-bold text-warm-50 mb-4 leading-tight">
          {t(dict['cta.headline1'].ko, dict['cta.headline1'].en)}<br />
          {t(dict['cta.headline2'].ko, dict['cta.headline2'].en)}
        </h2>
        <p className="font-sans text-sm text-warm-200 mb-10 max-w-sm mx-auto">
          {t(dict['cta.subtitle'].ko, dict['cta.subtitle'].en)}
        </p>
        <div className="flex justify-center">
          <a href="tel:031-8043-7966" className="px-10 py-4 bg-warm-50 text-dark font-sans font-medium text-sm tracking-wide rounded hover:bg-white transition-colors">
            {t(dict['cta.phone'].ko, dict['cta.phone'].en)}
          </a>
        </div>
      </div>
    </section>
  );
}
