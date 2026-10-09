import type { Metadata } from 'next';
import Portfolio from '@/components/home/Portfolio';
import type { PortfolioCategory } from '@/data/portfolios';
import { pageMetadata } from '@/lib/seo';

// 분류(?category=)별 주소가 따로 검색에 잡히지 않도록 정식 주소는 항상 /portfolio 로 둔다
export const metadata: Metadata = pageMetadata({
  title: '시공 사례',
  description: '아르젠 스튜디오가 완성한 상업공간, 건물 외장, 교회, 주거 시공 사례를 한곳에서 만나보세요.',
  path: '/portfolio',
  image: '/images/portfolio/exterior/star-sports-exterior/night-front-edited.webp',
});

const categories: PortfolioCategory[] = ['commercial', 'residential', 'exterior', 'church'];

// /portfolio?category=exterior 처럼 분류를 지정해 들어오면 해당 분류로 필터된 상태로 보여준다.
export default async function PortfolioIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  const value = Array.isArray(category) ? category[0] : category;
  const initial = categories.find((c) => c === value) ?? 'all';

  // key: 같은 페이지 안에서 분류만 바뀌어 다시 들어와도 필터 상태가 초기화되도록 한다
  return <Portfolio key={initial} initialFilter={initial} />;
}
