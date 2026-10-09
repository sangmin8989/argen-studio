import type { Metadata } from 'next';
import { company } from '@/lib/company';

// 검색·공유(카카오톡 등) 메타데이터를 한곳에서 관리한다.
export const SITE = {
  // 실제로 서비스되는 주소(www). apex(argen.co.kr)는 www 로 넘어가므로 정식 주소·사이트맵을 이쪽으로 통일한다.
  // 대표 도메인을 apex 로 바꾸게 되면 이 한 줄만 바꾸면 된다.
  url: 'https://www.argen.co.kr',
  name: '아르젠 스튜디오',
  nameEn: 'ARGEN STUDIO',
  locale: 'ko_KR',
  title: '아르젠 스튜디오 | 상업공간·건물 외장·교회·주거 시공',
  description:
    '재료와 빛, 그리고 머무는 사람. 상업공간·건물 외장·교회·주거를 설계하고 시공하는 실내건축공사업 등록 업체, 아르젠 스튜디오.',
} as const;

/**
 * 공유 미리보기용 이미지 주소. Next 이미지 최적화 경로를 거치면 webp 원본도 크롤러에게 JPEG 로 내려가서
 * (카카오톡·페이스북 등이 webp 를 못 읽는 경우 방지) 가로 1200px 로 줄여서 제공된다.
 */
export function ogImageUrl(imagePath: string, width = 1200) {
  // q=75: 이 Next 버전은 images.qualities 를 따로 설정하지 않으면 75 만 허용한다 (다른 값은 400 오류)
  return `/_next/image?url=${encodeURIComponent(imagePath)}&w=${width}&q=75`;
}

// 이미지를 지정하지 않은 페이지의 공유 이미지: 루트의 기본 카드(src/app/opengraph-image.tsx).
// 페이지에서 openGraph 를 직접 지정하면 루트의 파일 기반 이미지가 이어지지 않아서 명시해야 한다.
const DEFAULT_OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: SITE.nameEn };

interface PageMeta {
  /** 페이지 제목 (사이트명은 루트 title.template 이 붙인다) */
  title: string;
  description: string;
  /** '/studio' 처럼 도메인 뒤 경로 — canonical 과 og:url 에 쓴다 */
  path: string;
  /** 공유 이미지로 쓸 사이트 내부 이미지 경로. 없으면 루트의 기본 카드(opengraph-image)를 쓴다 */
  image?: string;
}

export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const socialTitle = `${title} — ${SITE.nameEn}`;
  const images = image ? [{ url: ogImageUrl(image), alt: title }] : [DEFAULT_OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: SITE.locale,
      url: path,
      title: socialTitle,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/**
 * 회사 구조화 데이터 (schema.org). 건설업등록증에 적힌 사실만 쓴다: 상호·본사 주소·전화.
 * 이메일·설립일처럼 확인되지 않은 값은 넣지 않는다.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: company.name.ko,
    alternateName: [SITE.name, SITE.nameEn],
    url: SITE.url,
    description: SITE.description,
    image: `${SITE.url}/opengraph-image`,
    telephone: `+82-${company.phone.replace(/^0/, '')}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '동탄첨단산업1로 58, 퍼스트코리아 1층 147호',
      addressLocality: '화성시',
      addressRegion: '경기도',
      addressCountry: 'KR',
    },
  };
}
