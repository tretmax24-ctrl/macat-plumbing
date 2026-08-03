/* MACAT Plumbing - Main JS */
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 600);
  });
  setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 2000);

  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

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

  // Contact form -> Email (macatplumbing@gmail.com)
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
      const subject = encodeURIComponent(`Quote Request from ${name} - ${serviceText}`);
      const body = encodeURIComponent(
        `Hello MACAT Plumbing,\n\nName: ${name}\nPhone: ${phone}\nService: ${serviceText}\n\nProblem:\n${message}\n\nPlease contact me with a quote. Thank you!`
      );
      window.location.href = `mailto:macatplumbing@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
