import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
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
  metadataBase: new URL('https://argen.co.kr'),
  title: '아르젠 스튜디오',
  description: '재료와 빛, 그리고 머무는 사람 — 아르젠 스튜디오의 공간 작업.',
  keywords: ['아르젠 스튜디오', '아르젠', '인테리어 스튜디오', '공간 디자인', '상업공간', '주거', '교회', '건물 외장'],
  openGraph: {
    title: '아르젠 스튜디오',
    description: '재료와 빛, 그리고 머무는 사람.',
    locale: 'ko_KR',
    type: 'website',
    siteName: '아르젠 스튜디오',
  },
  other: {
    'naver-site-verification': '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
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
