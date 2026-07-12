/* ============================================
   EDELNORD CATERING — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  function animateRing() {
    if (ring) {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
    }

    requestAnimationFrame(animateRing);
  }

  animateRing();

  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (ring) {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'var(--gold-bright)';
      }

      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
      }
    });

    element.addEventListener('mouseleave', () => {
      if (ring) {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'var(--gold)';
      }

      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });
  });

  /* ── Navbar scroll ── */
  const nav = document.querySelector('nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── Mobile menu ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', event => {
      event.stopPropagation();

      const isOpen = navLinks.classList.toggle('open');

      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute(
        'aria-label',
        isOpen ? 'Menü schließen' : 'Menü öffnen'
      );
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
      });
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('nav')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
      }
    });
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay) || 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 1000);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  reveals.forEach(element => {
    observer.observe(element);
  });

  /* ── Counter animation ── */
  function animateCount(element) {
    const target = parseInt(element.dataset.count, 10);
    const suffix = element.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    if (Number.isNaN(target)) {
      return;
    }

    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = Math.floor(eased * target) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('[data-count]').forEach(element => {
    countObserver.observe(element);
  });

 /* ── Contact form with Formspree ── */
const form = document.querySelector('.contact-form');

if (form) {
  const button = form.querySelector('.form-submit');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!button) {
      return;
    }

    button.textContent = 'Wird gesendet…';
    button.disabled = true;

    if (status) {
      status.textContent = '';
      status.classList.remove('success', 'error');
    }

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        const responseData = await response.json().catch(() => null);

        const errorMessage =
          responseData?.errors
            ?.map(error => error.message)
            .join(', ') ||
          'Die Anfrage konnte nicht gesendet werden.';

        throw new Error(errorMessage);
      }

      button.textContent = '✓ Anfrage gesendet';

      if (status) {
        status.textContent =
          'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.';
        status.classList.add('success');
      }

      form.reset();

    } catch (error) {
      console.error('Formspree-Fehler:', error);

      button.textContent = 'Erneut versuchen';

      if (status) {
        status.textContent =
          'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
        status.classList.add('error');
      }

    } finally {
      button.disabled = false;

      setTimeout(() => {
        button.textContent = 'Anfrage senden';
      }, 4000);
    }
  });
}

  /* ── Parallax on hero ── */
  window.addEventListener('scroll', () => {
    const heroLines = document.querySelector('.hero-lines');

    if (heroLines) {
      heroLines.style.transform =
        `translateY(${window.scrollY * 0.15}px)`;
    }
  });

});