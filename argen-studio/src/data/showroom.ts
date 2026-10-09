// 수원 쇼룸 사진. 원본에서 회전 보정·축소(긴 변 2400px)·메타데이터 제거 후 webp 로 변환한 것.
// w/h 는 변환된 실제 크기이며, 갤러리가 레이아웃 흔들림 없이 자리를 잡는 데 쓴다.
export interface ShowroomPhoto {
  src: string;
  w: number;
  h: number;
  alt: { ko: string; en: string };
}

const dir = '/images/showroom';

export const showroomHero: ShowroomPhoto = {
  src: `${dir}/01-materials-wall.webp`,
  w: 2400,
  h: 1351,
  alt: {
    ko: '자재 샘플 벽 앞에 소파와 다이닝 공간이 놓인 수원 쇼룸 전경',
    en: 'Suwon showroom with a material sample wall, sofa and dining area',
  },
};

// 갤러리 순서: 전경 → 주방·다이닝 → 자재·조명 → 거실 → 욕실 (가로·세로 사진을 섞어 열이 고르게 차도록)
export const showroomPhotos: ShowroomPhoto[] = [
  { src: `${dir}/02-full-view.webp`, w: 2400, h: 1351, alt: { ko: '쇼룸 전경, 소파와 다이닝 공간', en: 'Showroom overview with sofa and dining area' } },
  { src: `${dir}/03-kitchen-island.webp`, w: 2400, h: 1351, alt: { ko: '주방 아일랜드', en: 'Kitchen island' } },
  { src: `${dir}/07-tile-wall.webp`, w: 1351, h: 2400, alt: { ko: '타일과 마감재 샘플 벽', en: 'Tile and finish sample wall' } },
  { src: `${dir}/04-living-area.webp`, w: 2400, h: 1351, alt: { ko: '주방과 다이닝 공간', en: 'Kitchen and dining area' } },
  { src: `${dir}/08-lighting-wall.webp`, w: 2400, h: 1800, alt: { ko: '조명 샘플 벽', en: 'Lighting sample wall' } },
  { src: `${dir}/12-kitchen-table.webp`, w: 1351, h: 2400, alt: { ko: '주방과 다이닝 테이블', en: 'Kitchen and dining table' } },
  { src: `${dir}/05-sofa.webp`, w: 2400, h: 1351, alt: { ko: '거실 소파 공간', en: 'Living room sofa area' } },
  { src: `${dir}/09-light-panels.webp`, w: 1800, h: 2400, alt: { ko: '조명 패널 샘플', en: 'Light panel samples' } },
  { src: `${dir}/06-dining.webp`, w: 2400, h: 1351, alt: { ko: '다이닝 공간과 마감재 샘플', en: 'Dining area with finish samples' } },
  { src: `${dir}/11-dining-table.webp`, w: 1351, h: 2400, alt: { ko: '원형 다이닝 테이블', en: 'Round dining table' } },
  { src: `${dir}/13-sofa-tv.webp`, w: 1351, h: 2400, alt: { ko: '거실 소파와 벽면', en: 'Living room sofa and feature wall' } },
  { src: `${dir}/10-bathroom.webp`, w: 1351, h: 2400, alt: { ko: '욕실 공간', en: 'Bathroom display' } },
];
