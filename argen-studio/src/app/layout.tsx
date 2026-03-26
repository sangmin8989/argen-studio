import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
  title: 'ARGEN DESIGN — 프리미엄 인테리어 리모델링',
  description: '(주)아르젠 — 실제 시공 기준으로 견적과 공정을 정리하는 리모델링 파트너. 상업공간·교회 전문 시공.',
  keywords: ['인테리어', '리모델링', '아파트 인테리어', '수원 인테리어', '화성 인테리어', '상업공간', '교회 인테리어'],
  openGraph: {
    title: 'ARGEN DESIGN — 프리미엄 인테리어',
    description: '공간이 바뀌면 일상이 바뀝니다',
    locale: 'ko_KR',
    type: 'website',
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
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-100 text-dark">
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
