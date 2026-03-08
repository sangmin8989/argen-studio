// ═══════════════════════════════════════════════════════
// ARGEN DESIGN — main.js
// ═══════════════════════════════════════════════════════

(function() {
  'use strict';

  // ── GLOBALS ──────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const langToggle = document.getElementById('langToggle');
  const mobileLangToggle = document.getElementById('mobileLangToggle');
  const body = document.body;

  let currentLang = 'ko';

  // ── NAVBAR SCROLL ────────────────────────────────────
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── MOBILE MENU TOGGLE ───────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking links
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        body.style.overflow = '';
      });
    });
  }

  // ── LANGUAGE TOGGLE ──────────────────────────────────
  function applyLang(lang) {
    currentLang = lang;
    body.className = body.className.replace(/lang-(ko|en)/, '') + ` lang-${lang}`;
    
    // Update all bilingual elements
    document.querySelectorAll('[data-ko][data-en]').forEach(el => {
      const text = lang === 'ko' ? el.getAttribute('data-ko') : el.getAttribute('data-en');
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Save preference
    localStorage.setItem('argen-lang', lang);
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'ko' ? 'en' : 'ko';
      applyLang(newLang);
    });
  }

  if (mobileLangToggle) {
    mobileLangToggle.addEventListener('click', () => {
      const newLang = currentLang === 'ko' ? 'en' : 'ko';
      applyLang(newLang);
    });
  }

  // Footer language buttons
  document.querySelectorAll('.footer-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLang(lang);
      
      // Update active state
      document.querySelectorAll('.footer-lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Load saved language preference
  const savedLang = localStorage.getItem('argen-lang');
  if (savedLang && savedLang !== currentLang) {
    applyLang(savedLang);
    // Update footer button active state
    document.querySelectorAll('.footer-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
    });
  }

  // ── COUNTER ANIMATION (Trust Metrics) ────────────────
  function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.floor(start + (target - start) * easedProgress);
      
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target);
        entry.target.dataset.animated = 'true';
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });

  // ── PORTFOLIO FILTER ─────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  function filterItems(category) {
    portfolioItems.forEach((item, index) => {
      const itemCategory = item.dataset.category;
      const shouldShow = category === 'all' || itemCategory === category;
      
      if (shouldShow) {
        item.classList.remove('hidden');
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, index * 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.classList.add('hidden');
        }, 400);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter
      const filter = btn.dataset.filter;
      filterItems(filter);
    });
  });

  // ── QUOTE BAR ANIMATION ──────────────────────────────
  const quoteBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const width = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 100);
        entry.target.dataset.animated = 'true';
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.quote-bar-fill').forEach(bar => {
    quoteBarObserver.observe(bar);
  });

  // ── SCROLL REVEAL ────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── SMOOTH SCROLL (with offset for fixed navbar) ────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ── HERO VIDEO HANDLING ──────────────────────────────
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    console.log('🎬 Hero video element found');
    
    // Check if video source loaded
    heroVideo.addEventListener('loadeddata', () => {
      console.log('✅ Video loaded successfully');
    });
    
    heroVideo.addEventListener('error', (e) => {
      console.error('❌ Video failed to load:', e);
      console.error('Video src:', heroVideo.querySelector('source')?.src);
    });
    
    // Ensure video plays on iOS
    heroVideo.play().then(() => {
      console.log('▶️ Video playing');
    }).catch((err) => {
      console.warn('⚠️ Autoplay blocked:', err.message);
      // Video autoplay blocked, try again on user interaction
      document.addEventListener('touchstart', () => {
        heroVideo.play();
      }, { once: true });
      document.addEventListener('click', () => {
        heroVideo.play();
      }, { once: true });
    });

    // Pause video if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroVideo.pause();
      console.log('⏸️ Video paused (reduced motion preference)');
    }
  } else {
    console.error('❌ Hero video element not found');
  }

  // ── ACTIVE NAV LINK ON SCROLL ────────────────────────
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ── WINDOW RESIZE HANDLER ────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 1024) {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('open');
        body.style.overflow = '';
      }
    }, 250);
  });

  // ── CONSOLE SIGNATURE ────────────────────────────────
  console.log('%c ARGEN DESIGN ', 'background: #8B7355; color: #FAF7F2; padding: 8px 16px; font-size: 14px; font-weight: bold;');
  console.log('%c Premium Interior Remodeling | argen.co.kr ', 'color: #8B7355; font-size: 12px;');

})();