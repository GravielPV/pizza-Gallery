/* =====================================================
   PIZZA GALLERY - MAIN JAVASCRIPT
   Bajos de Haina, República Dominicana
   ===================================================== */

'use strict';

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initMobileMenu();
  initMenuFilter();
  initGalleryFilter();
  initReviewsSwiper();
  initCounterAnimation();
  initContactForm();
  initLightbox();
  initScrollTop();
  initSmoothScroll();
});

// =====================================================
// AOS (Animate on Scroll)
// =====================================================
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }
}

// =====================================================
// NAVBAR — scroll behavior & active links
// =====================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll: add class when not at top
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once on load
}

// =====================================================
// MOBILE MENU
// =====================================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link, .btn-nav-order');

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('active');
      navMenu.classList.add('open');
      navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  navOverlay.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

// =====================================================
// MENU FILTER
// =====================================================
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      menuCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // Reflow
          card.style.animation = 'fadeInScale 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// =====================================================
// GALLERY FILTER
// =====================================================
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gal-filter-btn');
  const galItems = document.querySelectorAll('.gal-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.gal;

      galItems.forEach(item => {
        if (filter === 'all' || item.dataset.gal === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'none';
          item.offsetHeight;
          item.style.animation = 'fadeInScale 0.35s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// =====================================================
// REVIEWS SWIPER
// =====================================================
function initReviewsSwiper() {
  if (typeof Swiper === 'undefined') return;

  new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

// =====================================================
// COUNTER ANIMATION
// =====================================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current.toLocaleString();
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}

// =====================================================
// CONTACT FORM
// =====================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    // Simulate form submission
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
      btn.style.background = 'var(--success)';
      successMsg.classList.add('show');
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        btn.style.background = '';
        successMsg.classList.remove('show');
      }, 4000);
    }, 1800);
  });
}

// =====================================================
// LIGHTBOX
// =====================================================
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galItems = document.querySelectorAll('.gal-item');

  if (!lightbox) return;

  galItems.forEach(item => {
    item.addEventListener('click', () => {
      const bg = item.querySelector('.gal-img');
      if (!bg) return;

      // Extract URL from background-image CSS
      const style = bg.style.backgroundImage;
      const urlMatch = style.match(/url\(['"]?(.*?)['"]?\)/);
      if (!urlMatch) return;

      const imgUrl = urlMatch[1].replace(/&q=\d+/, '&q=90').replace(/w=\d+/, 'w=1200');
      lightboxImg.src = imgUrl;
      lightboxImg.alt = item.querySelector('.gal-overlay span')?.textContent || 'Pizza Gallery';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// =====================================================
// SCROLL TO TOP BUTTON
// =====================================================
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =====================================================
// NOTIFY FORM (Sucursales)
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const notifyForms = document.querySelectorAll('.notify-form');
  notifyForms.forEach(form => {
    const btn = form.querySelector('button');
    const input = form.querySelector('input[type="email"]');
    if (!btn || !input) return;

    btn.addEventListener('click', () => {
      if (!input.value || !input.value.includes('@')) {
        input.style.borderColor = 'var(--red)';
        input.focus();
        return;
      }
      input.style.borderColor = 'var(--success)';
      btn.textContent = '¡Listo!';
      btn.style.background = 'var(--success)';
      setTimeout(() => {
        input.value = '';
        input.style.borderColor = '';
        btn.textContent = 'Notificarme';
        btn.style.background = '';
      }, 3000);
    });
  });
});

// =====================================================
// HOURS CHART — bar animation on scroll
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.chart-bar');
  if (!bars.length) return;

  // Store original heights then reset to 0
  const originalHeights = [];
  bars.forEach(bar => {
    originalHeights.push(bar.style.height);
    bar.style.height = '0%';
    bar.style.transition = 'height 0.7s cubic-bezier(0.4,0,0.2,1)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.height = originalHeights[i];
          }, i * 50);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  const chartWrapper = document.querySelector('.hours-chart-wrapper');
  if (chartWrapper) observer.observe(chartWrapper);
});

// =====================================================
// RATING BARS — animate on scroll
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const barFills = document.querySelectorAll('.bar-fill');
  if (!barFills.length) return;

  const originalWidths = [];
  barFills.forEach(fill => {
    originalWidths.push(fill.style.width);
    fill.style.width = '0%';
    fill.style.transition = 'width 1s cubic-bezier(0.4,0,0.2,1)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        barFills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = originalWidths[i];
          }, i * 120);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  const ratingOverview = document.querySelector('.rating-overview');
  if (ratingOverview) observer.observe(ratingOverview);
});

// =====================================================
// HERO PARALLAX (subtle)
// =====================================================
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg-image');
  if (!heroBg) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
  }
}, { passive: true });

// =====================================================
// PRELOADER (Optional)
// =====================================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
