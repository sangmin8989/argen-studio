// src/data/portfolios.ts
// 아르젠 스튜디오 포트폴리오 데이터
// Claude Code에서 Next.js 프로젝트에 바로 복사해서 사용

export type PortfolioCategory = 'apartment' | 'commercial' | 'church';

export interface PortfolioProject {
  slug: string;
  category: PortfolioCategory;
  title: { ko: string; en: string };
  location: { ko: string; en: string };
  area?: string;
  year: number;
  description: { ko: string; en: string };
  imageCount: number;
  featured: boolean;
  completedAt: string;
}

// 카테고리 라벨
export const categoryLabels: Record<PortfolioCategory | 'all', string> = {
  all: '전체',
  apartment: '아파트',
  commercial: '상업공간',
  church: '교회',
};

export const portfolios: PortfolioProject[] = [
  {
    slug: 'golfzon-dongtan-central',
    category: 'commercial',
    title: { ko: '골프존파크 동탄센트럴점', en: 'Golfzon Park Dongtan Central' },
    location: { ko: '화성시 동탄', en: 'Dongtan, Hwaseong' },
    year: 2023,
    description: { ko: '', en: '' },
    imageCount: 15,
    featured: true,
    completedAt: '2023-05',
  },
  {
    slug: 'titanium22-office',
    category: 'commercial',
    title: { ko: 'TITANIUM22 사무실', en: 'TITANIUM22 Office' },
    location: { ko: '서울', en: 'Seoul' },
    year: 2023,
    description: { ko: '', en: '' },
    imageCount: 18,
    featured: true,
    completedAt: '2023-05',
  },
  {
    slug: 'sushiichi-isu',
    category: 'commercial',
    title: { ko: '스시이찌 이수점', en: 'Sushiichi Isu' },
    location: { ko: '서울 이수', en: 'Isu, Seoul' },
    year: 2026,
    description: { ko: '', en: '' },
    imageCount: 16,
    featured: true,
    completedAt: '2026-02',
  },
  {
    slug: 'sushiichi-seolleung',
    category: 'commercial',
    title: { ko: '스시이찌 선릉점', en: 'Sushiichi Seolleung' },
    location: { ko: '서울 선릉', en: 'Seolleung, Seoul' },
    year: 2025,
    description: { ko: '', en: '' },
    imageCount: 12,
    featured: true,
    completedAt: '2025-11',
  },
  {
    slug: 'sushiichi-pangyo',
    category: 'commercial',
    title: { ko: '스시이찌 판교점', en: 'Sushiichi Pangyo' },
    location: { ko: '성남 판교', en: 'Pangyo, Seongnam' },
    year: 2026,
    description: { ko: '', en: '' },
    imageCount: 11,
    featured: true,
    completedAt: '2026-02',
  },
  {
    slug: 'cheongwaok-exterior',
    category: 'commercial',
    title: { ko: '건물 파사드 리모델링', en: 'Building Facade Remodeling' },
    location: { ko: '서울 석촌호수', en: 'Seokchon Lake, Seoul' },
    year: 2024,
    description: { ko: '', en: '' },
    imageCount: 15,
    featured: true,
    completedAt: '2024-11',
  },
  {
    slug: 'vision-tea-station',
    category: 'church',
    title: { ko: '비전 티 스테이션', en: 'Vision Tea Station' },
    location: { ko: '서울', en: 'Seoul' },
    year: 2026,
    description: { ko: '', en: '' },
    imageCount: 10,
    featured: true,
    completedAt: '2026-02',
  },
  {
    slug: 'hanjin-hq-channel-sign',
    category: 'commercial',
    title: { ko: '한진 본사 채널사인', en: 'Hanjin HQ Channel Sign' },
    location: { ko: '서울 중구 남대문로', en: 'Namdaemun-ro, Jung-gu, Seoul' },
    year: 2025,
    description: { ko: '', en: '' },
    imageCount: 8,
    featured: true,
    completedAt: '2025-02',
  },
];

// 이미지 경로 헬퍼
export function getPortfolioImagePath(
  project: PortfolioProject,
  index: number,
  size: 'hero' | 'card' | 'thumb' | 'og'
): string {
  const num = String(index).padStart(2, '0');
  return `/images/portfolio/${project.category}/${project.slug}/${size}/${project.category}-${project.slug}-${num}-${size}.webp`;
}

// 카테고리별 필터
export function getByCategory(category: PortfolioCategory): PortfolioProject[] {
  return portfolios.filter((p) => p.category === category);
}

// featured 프로젝트
export function getFeatured(): PortfolioProject[] {
  return portfolios.filter((p) => p.featured);
}

// slug로 찾기
export function getBySlug(slug: string): PortfolioProject | undefined {
  return portfolios.find((p) => p.slug === slug);
}
