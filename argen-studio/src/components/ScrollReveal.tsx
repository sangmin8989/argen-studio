'use client';

import { useEffect } from 'react';

// Enhanced scroll reveal with stagger support
// CSS class: reveal, reveal-delay-1~5, reveal-image (for clip-path effect)
export default function ScrollReveal() {
  useEffect(() => {
    // Small delay to ensure DOM is fully painted
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Also reveal child reveal-image elements
              entry.target.querySelectorAll('.reveal-image').forEach((img) => {
                img.classList.add('visible');
              });
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );

      const targets = document.querySelectorAll('.reveal, .reveal-image');
      targets.forEach((el) => observer.observe(el));

      // Clean up function stores observer ref
      (window as unknown as Record<string, IntersectionObserver>).__scrollRevealObserver = observer;
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const obs = (window as unknown as Record<string, IntersectionObserver>).__scrollRevealObserver;
      if (obs) obs.disconnect();
    };
  }, []);

  return null;
}
