import type { Metadata } from 'next';
import Inquiry from '@/components/home/Inquiry';
import ScrollReveal from '@/components/ScrollReveal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: '문의',
  description: '아르젠 스튜디오에 프로젝트를 문의하세요. 전화 031-8043-7966, 본사와 쇼룸 위치를 안내합니다.',
  path: '/inquiry',
});

export default function InquiryPage() {
  return (
    <>
      <ScrollReveal />
      <Inquiry />
    </>
  );
}
