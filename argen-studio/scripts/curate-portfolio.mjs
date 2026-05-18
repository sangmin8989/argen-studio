// 신규 5개 프로젝트의 이미지를 큐레이션 순서대로 복사 + EXIF orientation 자동 회전.
// 메인 프로젝트 원본 → 워크트리 public/images/portfolio/[category]/[slug]/NN.ext

import sharp from 'sharp';
import { readdirSync, mkdirSync, unlinkSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const SRC = 'C:/argen_h_6/argen-studio/public/images/portfolio';
const DST = 'C:/argen_h_6/.claude/worktrees/angry-grothendieck-e9d4f4/argen-studio/public/images/portfolio';

// 각 프로젝트: 완성도 높은 베스트샷 → 디테일 → BEFORE/공사중 순서
const projects = [
  {
    slug: 'afternoontap',
    category: 'commercial',
    files: [
      'KakaoTalk_Photo_2026-05-14-18-41-20 001.jpeg', // 카페 정면 와이드 (메인)
      'KakaoTalk_Photo_2026-05-14-18-41-24 017.jpeg', // 외관 사인
      'KakaoTalk_Photo_2026-05-14-18-41-22 010.jpeg', // 좌석+카운터 와이드
      'KakaoTalk_Photo_2026-05-14-18-41-22 007.jpeg', // NEON 사인 클로즈업
      'KakaoTalk_Photo_2026-05-14-18-41-21 004.jpeg', // 카운터 정면
      'KakaoTalk_Photo_2026-05-14-18-41-21 006.jpeg', // 펜던트+카운터
      'KakaoTalk_Photo_2026-05-14-18-41-22 009.jpeg', // 통로+좌석
      'KakaoTalk_Photo_2026-05-14-18-41-20 002.jpeg', // 카운터 위
      'KakaoTalk_Photo_2026-05-14-18-41-23 013.jpeg', // 카운터 펜던트
      'KakaoTalk_Photo_2026-05-14-18-41-23 011.jpeg', // 천장 측면
      'KakaoTalk_Photo_2026-05-14-18-41-21 003.jpeg', // 측면 디테일
      'KakaoTalk_Photo_2026-05-14-18-41-21 005.jpeg', // 천장 디테일
      'KakaoTalk_Photo_2026-05-14-18-41-22 008.jpeg', // 테이블 좌석
      'KakaoTalk_Photo_2026-05-14-18-41-23 012.jpeg', // 디스펜서
      'KakaoTalk_Photo_2026-05-14-18-41-24 016.jpeg', // 외관 측면
    ],
  },
  {
    slug: 'gung-kkwabaegi',
    category: 'commercial',
    files: [
      'image-8.jpg',                            // 사인월 (브랜드 - 메인)
      'KakaoTalk_20251218_175400827_01.jpg',    // 매장 외관 정면
      'image-7.jpg',                            // 카운터 깔끔
      'image-10.jpg',                           // 측면 카운터
      'image-14.jpg',                           // 정면 와이드
      'image-9.jpg',                            // 카운터 진열
      'image-11.jpg',                           // 백키친
      'image-12.jpg',                           // 백키친 후드
      'image-13.jpg',                           // 백키친 냉장고
      'main.jpg',                               // 마무리 카운터
      'image-1.jpg',                            // main과 동일 카운터
      'image-2.jpg',                            // 창문 측면 빈공간
      'image-16.jpg',                           // 좁은 매장
      'KakaoTalk_20251218_175400827_07.jpg',    // 그랜드 오픈 배너
    ],
  },
  {
    slug: 'church-library',
    category: 'church',
    files: [
      'image-5.jpg', // 와이드 베스트샷 (메인)
      'image-4.jpg', // 좌석+책장
      'image-3.jpg', // 펜던트+책장
      'image-2.jpg', // 다른 각도
      'image-1.jpg', // 펜던트 설치 중
      'main.jpg',    // 공사 중 (초기)
    ],
  },
  {
    slug: 'office-hanam-50',
    category: 'commercial',
    files: [
      'main.jpg',     // 유리 파티션 완성 (메인)
      'after-2.png',  // 와이드 정면
      'after-3.png',  // 도어
      'after-1.png',  // 측면
      'after-5.png',  // 정면 닫힘
      'after-4.png',  // 다른 각도
      'after-6.png',  // 라인 디테일
      'before-1.png', // BEFORE 빈 사무실
      'before-2.png', // BEFORE
      'before-3.png', // BEFORE 박스
    ],
  },
  {
    slug: 'apt-34',
    category: 'residential',
    files: [
      'after-2.png',   // 깔끔한 화이트 주방 정면 (메인)
      'after-4.png',   // 거실+주방 와이드
      'after-3.png',   // 조명 켜진 주방
      'after-5.png',   // 다른 측면
      'detail-2.jpg',  // 측면 디테일
      'after-6.png',   // 펜던트 디테일
      'after-1.png',   // 천장 조명 (= detail-1.jpg 동일파일)
      'after-1.jpg',   // 환기구 디테일
      'after-2.jpg',   // ⚠️ 파일명 오류: 실제로는 BEFORE (구식 주방)
      'before-2.jpg',  // 공사 중
      'before-3.jpg',  // 공사 중
    ],
  },
];

const cleanDir = (dir) => {
  if (existsSync(dir)) {
    for (const f of readdirSync(dir)) unlinkSync(join(dir, f));
  } else {
    mkdirSync(dir, { recursive: true });
  }
};

const results = [];

for (const project of projects) {
  const srcDir = join(SRC, project.slug);
  const dstDir = join(DST, project.category, project.slug);
  cleanDir(dstDir);

  const outNames = [];
  for (let i = 0; i < project.files.length; i++) {
    const src = project.files[i];
    const num = String(i + 1).padStart(2, '0');
    const ext = extname(src).slice(1).toLowerCase();
    const outName = `${num}.${ext}`;
    const dst = join(dstDir, outName);
    // .rotate() with no args auto-rotates based on EXIF orientation,
    // then strips the orientation tag so browsers display correctly.
    await sharp(join(srcDir, src)).rotate().toFile(dst);
    outNames.push(outName);
  }
  results.push({ slug: project.slug, category: project.category, files: outNames });
  console.log(`✓ ${project.category}/${project.slug}: ${outNames.length} files`);
}

console.log('\n--- portfolios.ts images arrays ---');
for (const r of results) {
  console.log(`${r.slug}: [${r.files.map((f) => `'${f}'`).join(', ')}]`);
}
