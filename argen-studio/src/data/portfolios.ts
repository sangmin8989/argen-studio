// src/data/portfolios.ts
// 아르젠 스튜디오 포트폴리오 데이터
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📁 이미지 폴더 규칙 (신규 프로젝트는 이 방식으로)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   public/images/portfolio/[카테고리]/[슬러그]/01.jpg, 02.jpg, ...
//   - 한 폴더에 순서대로 NN.jpg/png/jpeg/webp 넣기
//   - 확장자는 자유, 단 portfolios 항목의 `images` 배열에 명시
//   - 기존 프로젝트는 size별 폴더(card/hero/og/thumb) 유지 (legacy)

export type PortfolioCategory = 'commercial' | 'exterior' | 'church' | 'residential';

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
  cardImageIndex?: number; // 카드 썸네일에 사용할 이미지 번호 (기본: 1)
  /**
   * 신규 단순 형식 프로젝트의 이미지 파일명 목록.
   * 있으면: /images/portfolio/[category]/[slug]/[images[i]] 로 해석
   * 없으면: legacy sized 폴더 구조 사용
   */
  images?: string[];
}

// 카테고리 라벨
export const categoryLabels: Record<PortfolioCategory | 'all', string> = {
  all: '전체',
  commercial: '상업공간',
  exterior: '건물 외장',
  church: '교회',
  residential: '주거',
};

// 단순 형식 헬퍼: 동일 확장자 N장
const seq = (count: number, ext: string): string[] =>
  Array.from({ length: count }, (_, i) => `${String(i + 1).padStart(2, '0')}.${ext}`);

export const portfolios: PortfolioProject[] = [
  // ─── 기존 (legacy sized 형식) ─────────────────────
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
    cardImageIndex: 3,
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
    cardImageIndex: 10,
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
    cardImageIndex: 2,
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
    category: 'exterior',
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

  // ─── 신규 (단순 형식 — images 배열로 파일명 지정) ──
  // TODO: 아래 5개 프로젝트는 title/location/year/description을 실제 정보로 업데이트하세요.
  {
    slug: 'titanium22-hq-2026',
    category: 'commercial',
    title: { ko: 'TITANIUM22 본사 (2026)', en: 'TITANIUM22 HQ (2026)' },
    location: { ko: '서울', en: 'Seoul' },
    year: 2026,
    description: { ko: '', en: '' },
    imageCount: 15,
    featured: true,
    completedAt: '2026-05',
    images: ['01.jpeg', '02.jpeg', '03.jpg', '04.jpeg', '05.jpeg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpeg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpeg'],
  },
  {
    slug: 'afternoontap',
    category: 'commercial',
    title: { ko: '애프터눈탭', en: 'Afternoontap' },
    location: { ko: '', en: '' },
    year: 2026,
    description: { ko: '', en: '' },
    imageCount: 15,
    featured: true,
    completedAt: '2026-05',
    images: seq(15, 'jpeg'),
  },
  {
    slug: 'gung-kkwabaegi',
    category: 'commercial',
    title: { ko: '궁꽈배기', en: 'Gung Kkwabaegi' },
    location: { ko: '', en: '' },
    year: 2025,
    description: { ko: '', en: '' },
    imageCount: 14,
    featured: true,
    completedAt: '2025-12',
    images: seq(14, 'jpg'),
  },
  {
    slug: 'office-hanam-50',
    category: 'commercial',
    title: { ko: '하남 50평 사무실', en: 'Hanam 50py Office' },
    location: { ko: '하남', en: 'Hanam' },
    year: 2025,
    description: { ko: '', en: '' },
    imageCount: 10,
    featured: true,
    completedAt: '2025-12',
    // 01: jpg(main), 02~10: png(after/before)
    images: ['01.jpg', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png', '10.png'],
  },
  {
    slug: 'church-library',
    category: 'church',
    title: { ko: '교회 도서관', en: 'Church Library' },
    location: { ko: '', en: '' },
    year: 2025,
    description: { ko: '', en: '' },
    imageCount: 6,
    featured: true,
    completedAt: '2025-12',
    images: seq(6, 'jpg'),
  },
  {
    slug: 'apt-34',
    category: 'residential',
    title: { ko: '34평 아파트 리모델링', en: '34py Apartment Remodeling' },
    location: { ko: '', en: '' },
    year: 2024,
    description: { ko: '', en: '' },
    imageCount: 11,
    featured: true,
    completedAt: '2024-12',
    // 큐레이션 순서: AFTER 완성(메인) → 디테일 → BEFORE/공사중
    images: ['01.png', '02.png', '03.png', '04.png', '05.jpg', '06.png', '07.png', '08.jpg', '09.jpg', '10.jpg', '11.jpg'],
  },
];

// 이미지 경로 헬퍼
// - images 배열 있으면 단순 형식: /images/portfolio/[cat]/[slug]/[filename]
// - 없으면 legacy sized 형식: /[size]/[cat]-[slug]-NN-[size].webp
export function getPortfolioImagePath(
  project: PortfolioProject,
  index: number,
  size: 'hero' | 'card' | 'thumb' | 'og'
): string {
  if (project.images) {
    const filename = project.images[index - 1];
    if (!filename) return '';
    return `/images/portfolio/${project.category}/${project.slug}/${filename}`;
  }
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
