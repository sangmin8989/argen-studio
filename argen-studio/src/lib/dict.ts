// 정적 UI 텍스트 번역 사전
// portfolios.ts의 title/location 등은 이미 ko/en 필드가 있으므로 여기에 포함하지 않음

const dict = {
  // Nav
  'nav.about': { ko: '회사소개', en: 'About' },
  'nav.services': { ko: '서비스', en: 'Services' },
  'nav.portfolio': { ko: '포트폴리오', en: 'Portfolio' },
  'nav.process': { ko: '프로세스', en: 'Process' },
  'nav.contact': { ko: '문의', en: 'Contact' },
  'nav.quote': { ko: '무료 견적', en: 'Free Quote' },
  'nav.quoteFull': { ko: '무료 견적 받기', en: 'Get Free Quote' },

  // Hero
  'hero.eyebrow': { ko: 'DESIGN · BUILD · MANAGE', en: 'DESIGN · BUILD · MANAGE' },
  'hero.headline1': { ko: '공간이 바뀌면', en: 'Transform' },
  'hero.headline2': { ko: '일상이 바뀝니다', en: 'Your Space' },
  'hero.subtitle': { ko: '투명한 견적 · 책임 시공 · 전문 디자인', en: 'Transparent Quotes · Quality Construction · Expert Design' },
  'hero.cta1': { ko: '무료 견적 받기', en: 'Get Free Quote' },
  'hero.cta2': { ko: '포트폴리오 보기', en: 'View Portfolio' },
  'hero.scroll': { ko: '스크롤', en: 'Scroll' },

  // About
  'about.label': { ko: '회사 소개', en: 'About Us' },
  'about.headline1': { ko: '현장에서 검증된', en: 'Field-Tested' },
  'about.headline2': { ko: '기준과 구조', en: 'Standards' },
  'about.desc': {
    ko: '실제로 불편하지 않은 공간, 시간이 지나도 문제없는 마감, 추가 비용이 발생하지 않는 설계. 아르젠은 인테리어 판단을 대신해주는 파트너입니다.',
    en: 'Spaces without inconvenience, finishes without future issues, budgets without overruns. ARGEN is your interior decision-making partner.',
  },
  'about.s1.title': { ko: '시공 가능한 설계', en: 'Buildable Design' },
  'about.s1.desc': { ko: '모든 디자인은 실제 시공 가능 여부와 유지보수까지 고려합니다.', en: 'Every design considers construction feasibility and maintenance.' },
  'about.s2.title': { ko: '투명한 견적', en: 'Transparent Pricing' },
  'about.s2.desc': { ko: '자재비·인건비·공정비를 명확히 분리하여 안내합니다.', en: 'Materials, labor, and process costs are clearly separated.' },
  'about.s3.title': { ko: '자재 정보 공개', en: 'Material Disclosure' },
  'about.s3.desc': { ko: '모든 자재의 브랜드·규격·선정 근거를 공개합니다.', en: 'Brand, specifications, and selection rationale for all materials disclosed.' },
  'about.s4.title': { ko: '일관된 책임', en: 'Consistent Accountability' },
  'about.s4.desc': { ko: '착공부터 준공, 그 이후까지 동일한 기준으로 책임집니다.', en: 'Same standards of responsibility from start to finish and beyond.' },

  // Trust
  'trust.completed': { ko: '시공 완료', en: 'Completed' },
  'trust.retention': { ko: '재계약율', en: 'Retention' },
  'trust.experience': { ko: '업력', en: 'Experience' },
  'trust.experienceSuffix': { ko: '년', en: 'yrs' },
  'trust.satisfaction': { ko: '고객 만족도', en: 'Satisfaction' },

  // Services
  'services.label': { ko: '서비스', en: 'Services' },
  'services.title': { ko: '전문 분야', en: 'Our Expertise' },
  'services.subtitle': { ko: '공간의 특성과 용도에 맞는 맞춤형 리모델링', en: 'Custom remodeling tailored to your space' },
  'services.viewProjects': { ko: '프로젝트 보기', en: 'View Projects' },
  'services.exterior': { ko: '건물 외장 리모델링', en: 'Exterior Remodeling' },
  'services.exteriorDesc': { ko: '건물 외관의 가치를 높이는 파사드·간판·외장재 리모델링. 브랜드 이미지와 건물의 첫인상을 바꿉니다.', en: 'Facade, signage, and exterior remodeling that elevates building value and brand image.' },
  'services.commercial': { ko: '상업 공간', en: 'Commercial Space' },
  'services.commercialDesc': { ko: '카페, 클리닉, 오피스 등 브랜드 정체성이 드러나는 상업 공간. 고객 경험과 운영 효율을 동시에 고려한 전문 설계입니다.', en: 'Commercial spaces including cafes, clinics, and offices. Professional design for customer experience and operational efficiency.' },
  'services.church': { ko: '교회 인테리어', en: 'Church Interior' },
  'services.churchDesc': { ko: '예배 공간의 숭고함과 현대적 감각의 조화. 음향, 조명, 동선을 종합적으로 설계합니다.', en: 'Harmonizing sacredness with modern sensibility. Comprehensive design of acoustics, lighting, and flow.' },
  'services.hospital': { ko: '병원 인테리어', en: 'Hospital & Clinic Interior' },
  'services.hospitalDesc': { ko: '환자 경험과 의료 동선을 고려한 전문 설계. 신뢰감과 쾌적함을 동시에 갖춘 의료 공간을 완성합니다.', en: 'Professional design considering patient experience and medical workflow. Creating healthcare spaces that inspire trust and comfort.' },

  // Portfolio
  'portfolio.label': { ko: '포트폴리오', en: 'Portfolio' },
  'portfolio.title': { ko: '시공 사례', en: 'Our Work' },
  'portfolio.subtitle': { ko: '아르젠 스튜디오가 완성한 공간들', en: 'Spaces completed by ARGEN STUDIO' },
  'portfolio.all': { ko: '전체', en: 'All' },
  'portfolio.apartment': { ko: '아파트', en: 'Apartment' },
  'portfolio.commercial': { ko: '상업공간', en: 'Commercial' },
  'portfolio.church': { ko: '교회', en: 'Church' },
  'portfolio.empty': { ko: '준비 중입니다.', en: 'Coming soon.' },
  'portfolio.back': { ko: '← 포트폴리오', en: '← Portfolio' },
  'portfolio.location': { ko: '위치', en: 'Location' },
  'portfolio.area': { ko: '면적', en: 'Area' },
  'portfolio.completed': { ko: '준공', en: 'Completed' },
  'portfolio.photos': { ko: '장', en: 'photos' },
  'portfolio.prev': { ko: '← 이전', en: '← Prev' },
  'portfolio.next': { ko: '다음 →', en: 'Next →' },

  // Process
  'process.label': { ko: '프로세스', en: 'Process' },
  'process.title': { ko: '투명한 6단계 시공', en: '6-Step Process' },
  'process.subtitle': { ko: '체계적인 프로세스로 안심하고 맡기실 수 있습니다', en: 'Trust our systematic process for peace of mind' },
  'process.s1': { ko: '상담 및 견적', en: 'Consultation' },
  'process.s1d': { ko: '고객의 요구사항과 예산을 파악하고 현장 상황을 고려한 1차 견적을 제공합니다.', en: 'Understanding client needs and budget, providing initial quote based on site conditions.' },
  'process.s2': { ko: '현장 방문', en: 'Site Visit' },
  'process.s2d': { ko: '전문가가 직접 방문하여 실측하고 구조적 가능성을 검토합니다.', en: 'Expert on-site visit for measurement and structural feasibility assessment.' },
  'process.s3': { ko: '설계·제안', en: 'Design Proposal' },
  'process.s3d': { ko: '3D 도면과 자재 샘플을 통해 완성될 공간을 미리 확인할 수 있습니다.', en: 'Preview your space through 3D drawings and material samples.' },
  'process.s4': { ko: '계약·확정', en: 'Contract' },
  'process.s4d': { ko: '상세 견적서와 일정표를 확정하고 계약을 진행합니다.', en: 'Finalize detailed quote and schedule, proceed with contract.' },
  'process.s5': { ko: '시공', en: 'Construction' },
  'process.s5d': { ko: '자체 시공팀이 책임지고 진행하며, 실시간으로 진행 상황을 공유합니다.', en: 'In-house team manages construction with real-time progress updates.' },
  'process.s6': { ko: 'A/S·관리', en: 'After Service' },
  'process.s6d': { ko: '시공 완료 후 1년간 무상 A/S를 제공합니다.', en: '1-year free after-service support.' },

  // Pricing
  'pricing.label': { ko: '견적 구조', en: 'Pricing' },
  'pricing.title1': { ko: '투명한', en: 'Transparent' },
  'pricing.title2': { ko: '견적 구성', en: 'Pricing' },
  'pricing.subtitle': { ko: '숨김 없는 명확한 비용 안내', en: 'Clear cost breakdown with no hidden fees' },
  'pricing.materials': { ko: '자재비', en: 'Materials' },
  'pricing.materialsDesc': { ko: '마루, 벽지, 조명, 주방 가구 등 A/S가 가능한 정품 자재만 사용합니다.', en: 'Only genuine materials with warranty — flooring, wallpaper, lighting, cabinets.' },
  'pricing.labor': { ko: '인건비', en: 'Labor' },
  'pricing.laborDesc': { ko: '숙련된 자체 시공팀의 인건비. 외주가 아닌 직영 시공으로 품질을 보장합니다.', en: 'Skilled in-house team. Quality guaranteed through direct management.' },
  'pricing.design': { ko: '설계·관리비', en: 'Design & Mgmt' },
  'pricing.designDesc': { ko: '3D 설계, 현장 감리, 공정 관리 등 전문 인력의 기술료입니다.', en: '3D design, site supervision, project management fees.' },
  'pricing.misc': { ko: '기타', en: 'Misc.' },
  'pricing.miscDesc': { ko: '폐기물 처리, 양중비, 보험료 등 필수 부대 비용입니다.', en: 'Waste disposal, hoisting, insurance, and other essential costs.' },

  // CTA
  'cta.label': { ko: '무료 상담', en: 'Free Consultation' },
  'cta.headline1': { ko: '지금 무료 견적을', en: 'Get Your Free' },
  'cta.headline2': { ko: '받아보세요', en: 'Quote Today' },
  'cta.subtitle': { ko: '전화로 간편하게 상담하실 수 있습니다.', en: 'Easy consultation via phone call.' },
  'cta.phone': { ko: '전화 상담 (031-8043-7966)', en: 'Call (031-8043-7966)' },

  // Footer
  'footer.desc1': { ko: '실제 시공 기준으로 견적과 공정을 정리하는', en: 'Your remodeling partner with' },
  'footer.desc2': { ko: '리모델링 파트너, (주)아르젠', en: 'field-tested standards — ARGEN Inc.' },
  'footer.menu': { ko: '메뉴', en: 'Menu' },
  'footer.contactLabel': { ko: '연락처', en: 'Contact' },
  'footer.hq': { ko: '본사', en: 'HQ' },
  'footer.showroom': { ko: '수원 전시장', en: 'Suwon Showroom' },
} as const;

export type DictKey = keyof typeof dict;

export default dict;
