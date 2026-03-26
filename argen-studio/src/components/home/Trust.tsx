'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/lib/i18n';

const skills = [
  { ko: '설계력', en: 'Design', value: 92, color: '#C4A882' },
  { ko: '시공력', en: 'Build', value: 95, color: '#8C7560' },
  { ko: '자재', en: 'Material', value: 88, color: '#A89279' },
  { ko: 'A/S', en: 'A/S', value: 90, color: '#B8A08A' },
  { ko: '투명성', en: 'Transparency', value: 93, color: '#9C8570' },
];

function CircleProgress({
  value,
  label,
  color,
  delay,
  animated,
}: {
  value: number;
  label: string;
  color: string;
  delay: number;
  animated: boolean;
}) {
  const size = 100;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 30 }}
      animate={animated ? { opacity: 1, y: [30, -8, 3, 0] } : {}}
      transition={{
        duration: 0.9,
        delay: delay + 0.8,
        ease: [0.16, 1, 0.3, 1],
        y: { duration: 0.7, delay: delay + 0.8, times: [0, 0.5, 0.75, 1], ease: 'easeOut' },
      }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(250,247,242,0.06)"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={animated ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        {/* Center number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-serif text-2xl font-bold text-warm-100"
            initial={{ opacity: 0 }}
            animate={animated ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
          >
            {animated ? value : 0}
          </motion.span>
        </div>
      </div>
      <motion.span
        className="font-sans text-xs font-medium tracking-wider text-warm-400"
        initial={{ opacity: 0 }}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.6 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

export default function Trust() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-dark py-20 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        >
          <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t('핵심 역량', 'Core Competency')}
          </span>
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-warm-100 mb-4 leading-tight">
            {t('균형 잡힌', 'Balanced')}<br />
            {t('종합 시공 역량', 'Construction Expertise')}
          </h2>
          <p className="font-sans text-sm text-warm-400 leading-relaxed max-w-md mx-auto">
            {t(
              '설계부터 시공, 자재 선정, A/S까지 어느 한 쪽에 치우치지 않는 균형 잡힌 역량으로 프로젝트를 완성합니다.',
              'From design to construction, material selection, and after-service — we deliver balanced expertise across every aspect.'
            )}
          </p>
        </motion.div>

        {/* Circles grid */}
        {/* Desktop: 5 in a row */}
        <div className="hidden sm:flex justify-center gap-8 lg:gap-14">
          {skills.map((skill, i) => (
            <CircleProgress
              key={skill.ko}
              value={skill.value}
              label={t(skill.ko, skill.en)}
              color={skill.color}
              delay={i * 0.15}
              animated={isInView}
            />
          ))}
        </div>

        {/* Mobile: 3 + 2 centered */}
        <div className="sm:hidden flex flex-col items-center gap-6">
          <div className="flex justify-center gap-4">
            {skills.slice(0, 3).map((skill, i) => (
              <CircleProgress
                key={skill.ko}
                value={skill.value}
                label={t(skill.ko, skill.en)}
                color={skill.color}
                delay={i * 0.15}
                animated={isInView}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4">
            {skills.slice(3).map((skill, i) => (
              <CircleProgress
                key={skill.ko}
                value={skill.value}
                label={t(skill.ko, skill.en)}
                color={skill.color}
                delay={(i + 3) * 0.15}
                animated={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
