'use client';

import { useEffect } from 'react';

// Enhanced scroll reveal with stagger support
// CSS class: reveal, reveal-delay-1~5, reveal-image (for scale effect)
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    const targets = document.querySelectorAll('.reveal, .reveal-image');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
