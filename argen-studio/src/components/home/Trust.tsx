'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/lib/i18n';

const skills = [
  { ko: '설계력', en: 'Design', value: 0.92 },
  { ko: '시공력', en: 'Build', value: 0.95 },
  { ko: '자재', en: 'Material', value: 0.88 },
  { ko: 'A/S', en: 'A/S', value: 0.90 },
  { ko: '투명성', en: 'Transparency', value: 0.93 },
];

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
  // Start from top (-90deg)
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function RadarChart({ animated }: { animated: boolean }) {
  const cx = 150;
  const cy = 150;
  const maxR = 110;
  const levels = 4;
  const count = skills.length;
  const angleStep = 360 / count;

  // Grid lines
  const gridPaths = Array.from({ length: levels }, (_, i) => {
    const r = (maxR / levels) * (i + 1);
    const points = Array.from({ length: count }, (_, j) => {
      const { x, y } = polarToXY(j * angleStep, r, cx, cy);
      return `${x},${y}`;
    });
    return `M${points.join('L')}Z`;
  });

  // Axis lines
  const axes = Array.from({ length: count }, (_, i) => {
    const { x, y } = polarToXY(i * angleStep, maxR, cx, cy);
    return { x1: cx, y1: cy, x2: x, y2: y };
  });

  // Data polygon
  const dataPoints = skills.map((s, i) => {
    const r = animated ? s.value * maxR : 0;
    return polarToXY(i * angleStep, r, cx, cy);
  });
  const dataPath = `M${dataPoints.map((p) => `${p.x},${p.y}`).join('L')}Z`;

  // Label positions
  const labels = skills.map((s, i) => {
    const { x, y } = polarToXY(i * angleStep, maxR + 24, cx, cy);
    return { ...s, x, y };
  });

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[320px] mx-auto">
      {/* Grid */}
      {gridPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(250,247,242,0.08)" strokeWidth="1" />
      ))}

      {/* Axes */}
      {axes.map((a, i) => (
        <line key={i} {...a} stroke="rgba(250,247,242,0.06)" strokeWidth="1" />
      ))}

      {/* Data area */}
      <motion.path
        d={dataPath}
        fill="rgba(140,117,96,0.2)"
        stroke="#8C7560"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#8C7560"
          stroke="#FAF8F5"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Labels */}
      {labels.map((l, i) => (
        <motion.text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-sans text-[11px] font-medium fill-warm-400"
          initial={{ opacity: 0 }}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
        >
          {l.ko}
        </motion.text>
      ))}
    </svg>
  );
}

export default function Trust() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-dark py-20 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          >
            <RadarChart animated={isInView} />
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.3 }}
          >
            <span className="inline-block font-sans text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {t('핵심 역량', 'Core Competency')}
            </span>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold text-warm-100 mb-6 leading-tight">
              {t('균형 잡힌', 'Balanced')}<br />
              {t('종합 시공 역량', 'Construction Expertise')}
            </h2>
            <p className="font-sans text-sm text-warm-400 leading-relaxed max-w-sm">
              {t(
                '설계부터 시공, 자재 선정, A/S까지 어느 한 쪽에 치우치지 않는 균형 잡힌 역량으로 프로젝트를 완성합니다.',
                'From design to construction, material selection, and after-service — we deliver balanced expertise across every aspect.'
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
