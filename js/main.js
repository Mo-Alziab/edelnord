/* ============================================
   EDELNORD CATERING — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
  });

  function animateRing() {
    if (ring) {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (ring) { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'var(--gold-bright)'; }
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
      if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--gold)'; }
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });

  /* ── Navbar scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── Mobile menu ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const bars      = document.querySelectorAll('.hamburger span');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      bars[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
      bars[1].style.opacity   = isOpen ? '0' : '1';
      bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = '1'; });
      });
    });
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  /* ── Counter animation ── */
  function animateCount(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  /* ── Contact form ── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Wird gesendet…';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1500));
      btn.textContent = '✓ Anfrage gesendet';
      btn.style.background = 'linear-gradient(135deg, #2a6e2a, #4caf50)';
      setTimeout(() => {
        btn.textContent = 'Anfrage senden';
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 4000);
    });
  }

  /* ── Parallax on hero ── */
  window.addEventListener('scroll', () => {
    const heroLines = document.querySelector('.hero-lines');
    if (heroLines) {
      heroLines.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    }
  });

});
