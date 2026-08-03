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

  // Success message after FormSubmit redirect
  if (window.location.search.includes('sent=1')) {
    const note = document.querySelector('.form-note');
    if (note) {
      note.innerHTML = '<strong style="color:#10b981;">Message sent to macatplumbing@gmail.com. We will reply soon.</strong>';
    }
    alert('Thank you! Your message was sent to macatplumbing@gmail.com');
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
