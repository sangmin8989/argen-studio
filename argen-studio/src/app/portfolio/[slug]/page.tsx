import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { portfolios, getPortfolioImagePath } from '@/data/portfolios';
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
  return {
    title: `${project.title.ko} — ARGEN STUDIO`,
    description: project.description.ko || `${project.title.ko} - ARGEN STUDIO 시공 사례`,
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

  return <PortfolioDetail project={project} images={images} prev={prev} next={next} />;
}
