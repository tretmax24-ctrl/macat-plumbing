/* MACAT Plumbing - Main JS */
document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 600);
  });
  setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 2000);

  // AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  // Header scroll
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) {
      if (y > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    if (backToTop) {
      if (y > 300) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  });

  // ===== MOBILE MENU (Hamburger) =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Counter animation
  const counters = document.querySelectorAll('.stat-num');
  let counted = false;
  function animateCounters() {
    if (counted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counted = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-count') || 0;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        update();
      });
    }
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // Contact form -> WhatsApp
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const service = document.getElementById('service')?.value;
      const message = document.getElementById('message')?.value.trim();
      if (!name || !phone || !service || !message) {
        alert('Please fill in all fields.');
        return;
      }
      const serviceText = document.querySelector(`#service option[value="${service}"]`)?.text || service;
      const waMessage = encodeURIComponent(
        `Hello MACAT Plumbing!\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${serviceText}\n*Problem:* ${message}\n\nI would like a free quote. Thank you!`
      );
      window.open(`https://wa.me/25675680762?text=${waMessage}`, '_blank');
      form.reset();
    });
  }

  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
