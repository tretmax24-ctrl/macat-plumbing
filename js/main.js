/* MACAT Plumbing - Main JS */
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 800);
  });

  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
  }

  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    if (backToTop) {
      if (scrollY > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  });

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
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
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
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();
      if (!name || !phone || !service || !message) {
        alert('Please fill in all fields.');
        return;
      }
      const serviceText = document.querySelector(`#service option[value="${service}"]`)?.text || service;
      const waMessage = encodeURIComponent(
        `Hello MACAT Plumbing!\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${serviceText}\n*Problem:* ${message}\n\nI would like a free quote. Thank you!`
      );
      window.open(`https://wa.me/256705680762?text=${waMessage}`, '_blank');
      form.reset();
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
