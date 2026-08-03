/* ============================================
   MACAT PLUMBING SERVICES - Main JavaScript
   Interactive features & animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ----- Preloader -----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // ----- AOS Init -----
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  // ----- Header Scroll -----
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();
  });

  // ----- Mobile Menu -----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ----- Active Navigation -----
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link && scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  // ----- Counter Animation -----
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

  // ----- Testimonial Slider -----
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;
  const totalSlides = track ? track.children.length : 0;

  function goToSlide(index) {
    if (!track) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Auto-slide
  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 6000);

  // ----- FAQ Accordion -----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ----- Contact Form -----
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

      // Build WhatsApp message
      const serviceText = document.querySelector(`#service option[value="${service}"]`)?.text || service;
      const waMessage = encodeURIComponent(
        `Hello MACAT Plumbing!\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Service:* ${serviceText}\n` +
        `*Problem:* ${message}\n\n` +
        `I would like a free quote. Thank you!`
      );

      // Open WhatsApp
      window.open(`https://wa.me/25675680762?text=${waMessage}`, '_blank');

      // Reset form + feedback
      form.reset();
      showToast('Request prepared! Opening WhatsApp...');
    });
  }

  // ----- Toast Notification -----
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: #10b981;
      color: white;
      padding: 14px 28px;
      border-radius: 50px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      animation: fadeInUp 0.4s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ----- Back to Top -----
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- Smooth scroll for all anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
