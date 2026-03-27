import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { portfolios, getPortfolioImagePath, categoryLabels } from '@/data/portfolios';
import PortfolioDetail from './PortfolioDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolios.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolios.find((p) => p.slug === slug);
  if (!project) return {};

  const title = project.title.ko;
  const description = project.description.ko || `${title} — ${project.location.ko} ${categoryLabels[project.category]} 인테리어 시공 사례. 아르젠 스튜디오 포트폴리오.`;
  const url = `https://argen.co.kr/portfolio/${project.slug}`;
  const ogImage = getPortfolioImagePath(project, project.cardImageIndex ?? 1, 'og');

  return {
    title,
    description,
    openGraph: {
      title: `${title} — ARGEN STUDIO`,
      description,
      url,
      type: 'article',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ARGEN STUDIO`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolios.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIdx = portfolios.indexOf(project);
  const prev = currentIdx > 0 ? portfolios[currentIdx - 1] : null;
  const next = currentIdx < portfolios.length - 1 ? portfolios[currentIdx + 1] : null;

  const images = Array.from({ length: project.imageCount }, (_, i) =>
    getPortfolioImagePath(project, i + 1, 'hero')
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title.ko,
    description: project.description.ko || `${project.title.ko} 인테리어 시공 사례`,
    url: `https://argen.co.kr/portfolio/${project.slug}`,
    image: images.slice(0, 3).map((img) => `https://argen.co.kr${img}`),
    creator: {
      '@type': 'LocalBusiness',
      name: '아르젠 스튜디오',
      url: 'https://argen.co.kr',
    },
    locationCreated: {
      '@type': 'Place',
      name: project.location.ko,
    },
    dateCreated: project.completedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioDetail project={project} images={images} prev={prev} next={next} />
    </>
  );
}
