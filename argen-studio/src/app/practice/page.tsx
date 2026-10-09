import type { Metadata } from 'next';
import Services from '@/components/home/Services';
import ScrollReveal from '@/components/ScrollReveal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '시공 분야',
  description: '건물 외장, 상업 공간, 의료 공간. 아르젠 스튜디오가 다루는 공간을 소개합니다.',
  path: '/practice',
});

export default function PracticePage() {
  return (
    <>
      <ScrollReveal />
      <Services standalone />
    </>
  );
}
