// 정적 UI 텍스트 사전 — 명품 토대 톤.
// 업체 단어("무료 견적", "20년 업력", "A/S", "투명한 견적", "PREMIUM") 폐기.
// 시인의 톤 · 절제 · 침묵.
// portfolios.ts의 title/location 등은 별도.

const dict = {
  // Nav — 짧게. 명령형 X.
  'nav.about': { ko: '회사소개', en: 'Studio' },
  'nav.services': { ko: '시공 분야', en: 'Practice' },
  'nav.portfolio': { ko: '시공 사례', en: 'Works' },
  'nav.contact': { ko: '문의', en: 'Inquiry' },

  // Hero — 한 줄의 시
  'hero.eyebrow': { ko: 'ARGEN STUDIO', en: 'ARGEN STUDIO' },
  'hero.headline1': { ko: '공간은 가구가 아니라', en: 'Space is not furniture' },
  'hero.headline2': { ko: '시간이다', en: 'but time' },
  'hero.subtitle': { ko: '재료와 빛, 그리고 머무는 사람.', en: 'Material, light, and those who stay.' },
  'hero.cta2': { ko: '작품 보기', en: 'View Works' },

  // About — Studio
  'about.label': { ko: '회사소개', en: 'Studio' },
  'about.headline1': { ko: '매장에서는 브랜드를,\n사무실에서는 일하는 방식을,', en: 'In a store, we see the brand.\nIn an office, the way people work.' },
  'about.headline2': { ko: '집에서는 사는 사람을 봅니다.', en: 'In a home, the people who live there.' },
  'about.desc': {
    ko: '아르젠 스튜디오는 상업공간과 주거, 건물 외장을 설계하고 시공합니다. 같은 재료도 누가 쓰고 무엇을 하는 공간인지에 따라 다르게 다룹니다. 우리의 작업이 서로 다른 모습인 이유입니다.',
    en: 'ARGEN Studio designs and builds commercial spaces, homes and building exteriors. We approach the same material differently depending on who uses a space and what happens there. That is why each of our projects takes a different form.',
  },
  'about.s1.title': { ko: '재료의 안목', en: 'A Sense for Material' },
  'about.s1.desc': { ko: '우드, 석재, 금속, 패브릭. 우리는 재료를 고르지 않고 만납니다.', en: 'Wood, stone, metal, fabric — we do not choose materials, we meet them.' },
  'about.s2.title': { ko: '빛과 그림자', en: 'Light and Shadow' },
  'about.s2.desc': { ko: '낮의 빛과 밤의 그림자를 같이 설계합니다. 둘 다 공간의 일부입니다.', en: 'We design daylight and shadow together. Both are part of the space.' },
  'about.s3.title': { ko: '시간이 흐른 마감', en: 'A Finish That Ages Well' },
  'about.s3.desc': { ko: '오늘 가장 새것이 아니라, 10년 뒤에도 그 자리에 있을 마감을 고릅니다.', en: 'Not the newest today, but a finish that will still belong ten years on.' },
  'about.s4.title': { ko: '다음 사람을 위해', en: 'For the Next Person' },
  'about.s4.desc': { ko: '디테일은 다음 사용자를 위한 배려입니다. 보이지 않는 곳까지.', en: 'Every detail is a kindness to the next user — including where no one looks.' },

  // Services — Practice (카테고리)
  'services.label': { ko: '시공 분야', en: 'Practice' },
  'services.title': { ko: '공간', en: 'Spaces' },
  'services.subtitle': { ko: '머무는 시간에 맞춰.', en: 'Designed for the time spent within.' },
  'services.viewProjects': { ko: '시공 사례 보기', en: 'Works' },
  'services.exterior': { ko: '건물 외장', en: 'Exterior' },
  'services.exteriorDesc': { ko: '거리에 면하는 첫 표정. 건물이 도시와 만나는 자리.', en: 'The first expression facing the street — where the building meets the city.' },
  'services.commercial': { ko: '상업 공간', en: 'Commercial' },
  'services.commercialDesc': { ko: '브랜드가 손님을 처음 마주하는 자리. 머무는 시간이 곧 인상이 되는 곳.', en: 'Where a brand meets its guest — where the time spent becomes the impression.' },
  'services.church': { ko: '교회', en: 'Sacred' },
  'services.churchDesc': { ko: '말하지 않아도 머무는 공간. 소리와 빛, 침묵이 함께 설계됩니다.', en: 'A space that holds without speaking — sound, light, and silence designed together.' },
  'services.hospital': { ko: '의료 공간', en: 'Clinic' },
  'services.hospitalDesc': { ko: '몸을 맡기는 자리. 신뢰는 분위기에서 시작합니다.', en: 'Where the body is entrusted. Trust begins with atmosphere.' },

  // Portfolio — Works
  'portfolio.label': { ko: '시공 사례', en: 'Works' },
  'portfolio.title': { ko: '선집', en: 'Selected' },
  'portfolio.subtitle': { ko: '아르젠이 머문 시간들.', en: 'Hours we have spent.' },
  'portfolio.all': { ko: '전체', en: 'All' },
  'portfolio.apartment': { ko: '주거', en: 'Residential' },
  'portfolio.commercial': { ko: '상업', en: 'Commercial' },
  'portfolio.church': { ko: '교회', en: 'Sacred' },
  'portfolio.residential': { ko: '주거', en: 'Residential' },
  'portfolio.empty': { ko: '곧 더해집니다.', en: 'More to come.' },
  'portfolio.back': { ko: '← 시공 사례', en: '← Works' },
  'portfolio.location': { ko: '위치', en: 'Location' },
  'portfolio.area': { ko: '면적', en: 'Area' },
  'portfolio.completed': { ko: '완공', en: 'Completed' },
  'portfolio.photos': { ko: '장', en: 'photos' },
  'portfolio.prev': { ko: '← 이전', en: '← Prev' },
  'portfolio.next': { ko: '다음 →', en: 'Next →' },

  // Footer — 침묵
  'footer.desc1': { ko: '재료와 빛, 그리고', en: 'Material, light, and' },
  'footer.desc2': { ko: '머무는 사람을 위해.', en: 'those who stay.' },
  'footer.menu': { ko: '메뉴', en: 'Index' },
  'footer.contactLabel': { ko: '연락처', en: 'Contact' },
  'footer.hq': { ko: '본사', en: 'Studio' },
  'footer.showroom': { ko: '쇼룸', en: 'Showroom' },
} as const;

export type DictKey = keyof typeof dict;

export default dict;
