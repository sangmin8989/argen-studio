import type { Metadata } from 'next';
import ShowroomPage from '@/components/showroom/ShowroomPage';
import ScrollReveal from '@/components/ScrollReveal';
import { pageMetadata } from '@/lib/seo';
import { showroomHero } from '@/data/showroom';

export const metadata: Metadata = pageMetadata({
  title: '쇼룸',
  description: '수원 아르젠 스튜디오 쇼룸. 타일과 마감재, 조명, 주방과 욕실을 실제 공간으로 만나보세요.',
  path: '/showroom',
  image: showroomHero.src,
});

export default function ShowroomRoutePage() {
  return (
    <>
      <ScrollReveal />
      <ShowroomPage />
    </>
  );
}
