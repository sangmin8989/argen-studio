import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Portfolio from '@/components/home/Portfolio';
import StoryGallery from '@/components/home/StoryGallery';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <Hero />
      <About />
      <Services />
      <StoryGallery />
      <Portfolio />
    </>
  );
}
