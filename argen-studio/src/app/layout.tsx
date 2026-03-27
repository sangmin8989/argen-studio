import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import Preloader from '@/components/layout/Preloader';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://argen.co.kr'),
  title: {
    default: '아르젠 스튜디오 | 상업공간·건물외장·교회 인테리어 전문 시공',
    template: '%s | 아르젠 스튜디오',
  },
  description: '아르젠 스튜디오 — 화성·수원 기반 인테리어 전문 업체. 스크린골프장, 음식점, 사무실, 교회, 건물 외장 리모델링. 설계부터 시공·A/S까지 직영 운영.',
  keywords: ['아르젠 스튜디오', '아르젠', '화성 인테리어', '동탄 인테리어', '수원 인테리어', '상업공간 인테리어', '교회 인테리어', '건물 외장 리모델링', '스크린골프장 인테리어', '사무실 인테리어', '인테리어 시공', '리모델링 전문'],
  openGraph: {
    title: '아르젠 스튜디오 | 상업공간·건물외장·교회 전문 시공',
    description: '공간이 바뀌면 일상이 바뀝니다 — 화성·수원 인테리어 전문',
    locale: 'ko_KR',
    type: 'website',
    siteName: '아르젠 스튜디오',
    url: 'https://argen.co.kr',
  },
  twitter: {
    card: 'summary_large_image',
    title: '아르젠 스튜디오 | 상업공간·건물외장·교회 전문 시공',
    description: '공간이 바뀌면 일상이 바뀝니다 — 화성·수원 인테리어 전문',
  },
  alternates: {
    canonical: 'https://argen.co.kr',
  },
  verification: {
    google: '',
    other: {
      'naver-site-verification': '',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://argen.co.kr/#organization',
  name: '아르젠 스튜디오',
  alternateName: 'ARGEN STUDIO',
  description: '화성·수원 기반 인테리어 전문 업체. 상업공간, 건물 외장, 교회 인테리어 설계부터 시공까지.',
  url: 'https://argen.co.kr',
  image: 'https://argen.co.kr/opengraph-image',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '화성시',
    addressRegion: '경기도',
    addressCountry: 'KR',
  },
  areaServed: [
    { '@type': 'City', name: '화성시' },
    { '@type': 'City', name: '수원시' },
    { '@type': 'City', name: '동탄' },
    { '@type': 'City', name: '서울' },
  ],
  sameAs: ['https://argenstudio.com'],
  serviceType: ['상업공간 인테리어', '건물 외장 리모델링', '교회 인테리어', '사무실 인테리어', '스크린골프장 인테리어'],
  priceRange: '$$',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-100 text-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <Preloader />
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
