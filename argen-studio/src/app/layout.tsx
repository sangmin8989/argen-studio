import type { Metadata, Viewport } from 'next';
import { EB_Garamond } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { SITE, organizationJsonLd } from '@/lib/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import Preloader from '@/components/layout/Preloader';
import SmoothScroll from '@/components/SmoothScroll';

// 영문 디스플레이용 — 절제된 세리프. 한글 본문은 Pretendard (globals.css)
const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // 각 페이지는 title 에 페이지 이름만 적는다 → "회사소개 — ARGEN STUDIO"
  title: { default: SITE.title, template: `%s — ${SITE.nameEn}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['아르젠 스튜디오', '아르젠', '인테리어', '실내건축공사업', '공간 디자인', '상업공간', '건물 외장', '교회', '주거 리모델링', '동탄'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: '/',
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // 네이버 서치어드바이저 인증이 필요하면 verification: { other: { 'naver-site-verification': '발급받은 코드' } } 로 넣는다.
  // (비어 있는 값은 의미가 없어 제거)
};

// 모바일 브라우저 주소창 색: 페이지 바탕(크림)에 맞춘다
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      // 페이지 이동 때만 scroll-behavior 를 auto 로 바꿔서, 새 페이지가 이전 스크롤 위치에서
      // 천천히 미끄러져 올라오지 않고 즉시 맨 위에서 시작하게 한다 (평소 앵커 스크롤은 그대로 부드럽다)
      data-scroll-behavior="smooth"
      className={`${ebGaramond.variable} h-full antialiased`}
    >
      <head>
        {/* Pretendard Variable — 한국 디자인 업계의 본질 폰트 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-warm-100 text-dark">
        {/* 검색엔진용 회사 정보 (JSON-LD). '<' 를 이스케이프해서 스크립트 삽입을 막는다 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c') }}
        />
        <I18nProvider>
          <Preloader />
          <SmoothScroll />
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
