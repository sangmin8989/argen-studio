import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Trust from '@/components/home/Trust';
import Services from '@/components/home/Services';
import Portfolio from '@/components/home/Portfolio';
import StoryGallery from '@/components/home/StoryGallery';
import Process from '@/components/home/Process';
import Pricing from '@/components/home/Pricing';
import CTA from '@/components/home/CTA';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <Hero />
      <About />
      <Trust />
      <Services />
      <StoryGallery />
      <Portfolio />
      <Process />
      <Pricing />
      <CTA />
    </>
  );
}
