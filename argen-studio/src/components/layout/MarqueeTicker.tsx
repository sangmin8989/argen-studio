'use client';

export default function MarqueeTicker({ reverse = false }: { reverse?: boolean }) {
  const items = [
    'ARGEN STUDIO',
    'DESIGN',
    'BUILD',
    'MANAGE',
    '공간 창조에 대한 미학',
    'PREMIUM INTERIOR',
    '아르젠 스튜디오',
  ];

  const track = items.map((text, i) => (
    <span key={i} className="flex items-center gap-6 px-6">
      <span className="text-[#d5948d] text-[13px] font-medium tracking-[0.15em] uppercase whitespace-nowrap">
        {text}
      </span>
      <span className="text-[#8C7560] text-[10px]">·</span>
    </span>
  ));

  // Repeat enough times for seamless loop
  const repeated = Array.from({ length: 6 }, (_, i) => (
    <div key={i} className="flex shrink-0">
      {track}
    </div>
  ));

  return (
    <div className="h-9 bg-[#1C1917] overflow-hidden flex items-center">
      <div
        className={`flex shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {repeated}
      </div>
    </div>
  );
}
