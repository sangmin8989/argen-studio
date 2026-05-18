// titanium22 2026 본사 프로젝트 큐레이션
import sharp from 'sharp';
import { readdirSync, mkdirSync, unlinkSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const SRC = 'C:/argen_h_6/argen-studio/public/images/portfolio/titanium22';
const DST = 'C:/argen_h_6/.claude/worktrees/angry-grothendieck-e9d4f4/argen-studio/public/images/portfolio/commercial/titanium22-hq-2026';

// 큐레이션 순서: 베스트(브랜드+공간) → 와이드 → 디테일 → 회전사진
const files = [
  'KakaoTalk_Photo_2026-05-14-18-27-41-31.jpeg',  // 야외 정원 햇빛 (메인 베스트)
  'KakaoTalk_Photo_2026-05-14-18-27-41-18.jpeg',  // TITANIUM22 사인월 정면
  'KakaoTalk_20260424_153045771_08.jpg',          // 와이드 오피스 공간
  'KakaoTalk_Photo_2026-05-14-18-27-41-10.jpeg',  // 대형 미팅룸
  'KakaoTalk_Photo_2026-05-14-18-27-41-20.jpeg',  // 사인월 다른 각도
  'KakaoTalk_20260424_153045771_27.jpg',          // 오피스 와이드 + 그린플랜터
  'KakaoTalk_20260424_153045771_01.jpg',          // 야외 정원 (다른 각도)
  'KakaoTalk_20260424_153045771_17.jpg',          // 라운지/대기실
  'KakaoTalk_20260424_153045771_26.jpg',          // 임원실 (유리도어)
  'KakaoTalk_Photo_2026-05-14-18-27-41-12.jpeg',  // 작은 회의실
  'KakaoTalk_20260424_153045771_24.jpg',          // 화이트보드 디테일
  'KakaoTalk_20260424_153045771.jpg',             // 화이트 텍스처월 with 간접조명
  'KakaoTalk_20260424_153045771_03.jpg',          // 그린플랜터 클로즈업
  'KakaoTalk_20260424_153045771_28.jpg',          // 플랜터 박스 디테일
  'KakaoTalk_Photo_2026-05-14-18-27-41-32.jpeg',  // 정원 나무 (회전됨 - EXIF 자동회전)
];

if (existsSync(DST)) {
  for (const f of readdirSync(DST)) unlinkSync(join(DST, f));
} else {
  mkdirSync(DST, { recursive: true });
}

const outNames = [];
for (let i = 0; i < files.length; i++) {
  const num = String(i + 1).padStart(2, '0');
  const ext = extname(files[i]).slice(1).toLowerCase();
  const outName = `${num}.${ext}`;
  await sharp(join(SRC, files[i])).rotate().toFile(join(DST, outName));
  outNames.push(outName);
}

console.log(`✓ titanium22-hq-2026: ${outNames.length} files`);
console.log(`images: [${outNames.map((f) => `'${f}'`).join(', ')}]`);
