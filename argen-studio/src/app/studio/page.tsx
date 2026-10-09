import type { Metadata } from 'next';
import StudioPage from '@/components/studio/StudioPage';
import ScrollReveal from '@/components/ScrollReveal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '회사소개',
  description: '재료와 빛, 그리고 머무는 사람. 아르젠 스튜디오의 시선과 건설업 등록·특허, 회사 정보를 소개합니다.',
  path: '/studio',
  image: '/images/portfolio/exterior/star-sports-exterior/night-front-edited.webp',
});

export default function StudioRoutePage() {
  return (
    <>
      <ScrollReveal />
      <StudioPage />
    </>
  );
}
