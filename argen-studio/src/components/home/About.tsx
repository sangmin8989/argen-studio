'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import dict from '@/lib/dict';

const standards = [
  { num: '01', title: 'about.s1.title' as const, desc: 'about.s1.desc' as const },
  { num: '02', title: 'about.s2.title' as const, desc: 'about.s2.desc' as const },
  { num: '03', title: 'about.s3.title' as const, desc: 'about.s3.desc' as const },
  { num: '04', title: 'about.s4.title' as const, desc: 'about.s4.desc' as const },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 18,
      delay: 0.2 + i * 0.15,
    },
  }),
};

export default function About() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-[clamp(5rem,10vw,9rem)] bg-warm-50">
      <div ref={ref} className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          >
            <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {t(dict['about.label'].ko, dict['about.label'].en)}
            </span>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-dark mb-6 leading-tight">
              {t(dict['about.headline1'].ko, dict['about.headline1'].en)}<br />
              {t(dict['about.headline2'].ko, dict['about.headline2'].en)}
            </h2>
            <p className="font-sans text-base leading-relaxed text-warm-700 max-w-md">
              {t(dict['about.desc'].ko, dict['about.desc'].en)}
            </p>
          </motion.div>

          {/* Right: cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {standards.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="bg-warm-100 rounded-lg p-6"
              >
                <span className="font-serif text-3xl font-bold text-warm-200 block mb-3">{s.num}</span>
                <h3 className="font-serif text-lg font-bold text-dark mb-2">
                  {t(dict[s.title].ko, dict[s.title].en)}
                </h3>
                <p className="font-sans text-sm text-warm-600 leading-relaxed">
                  {t(dict[s.desc].ko, dict[s.desc].en)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
