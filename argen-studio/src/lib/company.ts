// 회사 정보 — 푸터, 회사소개, 문의 페이지가 같은 값을 쓰도록 한곳에서 관리한다.
// 상호·대표자·본사 주소는 건설업등록증(화성시장, 2026.08.25) 기준.
// 이메일은 푸터에서 의도적으로 제외된 상태라 여기에 두지 않는다 (사용 확정 시 추가).
export const company = {
  name: { ko: '주식회사 아르젠', en: 'ARGEN Inc.' },
  ceo: { ko: '이성우', en: 'Lee Seong-woo' },
  phone: '031-8043-7966',
  hq: {
    ko: '경기도 화성시 동탄구 동탄첨단산업1로 58, 퍼스트코리아 1층 147호',
    en: '#147, 1F, First Korea, 58 Dongtan Cheomdan-saneop 1-ro, Dongtan-gu, Hwaseong-si',
  },
  showroom: {
    ko: '경기도 수원시 권선로 681, 아르젠 스튜디오',
    en: '681 Gwonseon-ro, Suwon-si, ARGEN Studio',
  },
} as const;
