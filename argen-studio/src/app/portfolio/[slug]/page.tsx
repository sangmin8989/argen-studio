import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { portfolios, getPortfolioImagePath } from '@/data/portfolios';
import { pageMetadata } from '@/lib/seo';
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
  // 설명이 비어 있는 프로젝트는 확인된 사실(이름·위치·연도)만으로 문장을 만든다
  const where = project.location.ko ? ` (${project.location.ko})` : '';
  return pageMetadata({
    title: project.title.ko,
    description: project.description.ko || `${project.title.ko}${where} — ${project.year}년 아르젠 스튜디오 시공 사례.`,
    path: `/portfolio/${project.slug}`,
    // 카카오톡 등으로 공유할 때 프로젝트의 대표 사진이 미리보기로 나온다
    image: getPortfolioImagePath(project, project.cardImageIndex ?? 1, 'hero'),
  });
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

  return <PortfolioDetail project={project} images={images} prev={prev} next={next} />;
}
