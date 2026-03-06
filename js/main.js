/* ═══════════════════════════════════════════════════════════════
   CAFÉ 333 — Main JavaScript
   Smooth, jazz-inspired interactions.
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL EFFECT ────────────────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 80);
    lastScroll = currentScroll;
  }, { passive: true });

  // ─── MOBILE NAV TOGGLE ──────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    navLinks.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ─── SMOOTH SCROLL ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ─── SCROLL REVEAL ANIMATIONS ───────────────────────────────
  const revealElements = () => {
    const reveals = document.querySelectorAll(
      '.section-header, .about-image, .about-text, .exp-card, .menu-category, ' +
      '.perf-card, .gallery-item, .signup-content, .contact-info, .contact-map'
    );

    reveals.forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  revealElements();

  // ─── STAGGERED REVEAL FOR GRIDS ─────────────────────────────
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.exp-card, .perf-card, .menu-category, .gallery-item');
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 0.1}s`;
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.experience-cards, .perf-grid, .menu-grid, .gallery-grid').forEach(grid => {
    staggerObserver.observe(grid);
  });

  // ─── ACTIVE NAV LINK HIGHLIGHTING ──────────────────────────
  const sections = document.querySelectorAll('.section[id]');
  const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ─── FLOATING MUSIC NOTES ──────────────────────────────────
  const notesContainer = document.getElementById('floatingNotes');
  const noteSymbols = ['♪', '♫', '♬', '♩', '♭', '♯'];

  const createNote = () => {
    const note = document.createElement('span');
    note.className = 'note';
    note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
    note.style.left = `${Math.random() * 100}%`;
    note.style.animationDuration = `${12 + Math.random() * 10}s`;
    note.style.animationDelay = `${Math.random() * 5}s`;
    note.style.fontSize = `${0.8 + Math.random() * 1}rem`;
    notesContainer.appendChild(note);

    setTimeout(() => note.remove(), 25000);
  };

  // Create initial batch of notes
  for (let i = 0; i < 5; i++) {
    setTimeout(createNote, i * 2000);
  }

  // Continue creating notes periodically
  setInterval(createNote, 4000);

  // ─── HERO PARTICLE EFFECT ──────────────────────────────────
  const heroParticles = document.getElementById('heroParticles');

  const createParticle = () => {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      background: rgba(74, 158, 255, ${0.08 + Math.random() * 0.15});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleDrift ${8 + Math.random() * 12}s linear infinite;
    `;
    heroParticles.appendChild(particle);

    setTimeout(() => particle.remove(), 20000);
  };

  // Add particle animation
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes particleDrift {
      0% { opacity: 0; transform: translate(0, 0); }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { opacity: 0; transform: translate(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 40}px, -${50 + Math.random() * 100}px); }
    }
  `;
  document.head.appendChild(particleStyle);

  for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 500);
  }
  setInterval(createParticle, 2000);

  // ─── EMAIL SIGNUP FORM ─────────────────────────────────────
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());

    // For now, just show success (no backend yet)
    const submitBtn = signupForm.querySelector('.btn-submit');
    submitBtn.classList.add('submitted');

    // Store in localStorage as a simple backup until backend is ready
    const signups = JSON.parse(localStorage.getItem('cafe333_signups') || '[]');
    signups.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem('cafe333_signups', JSON.stringify(signups));

    // Reset form after delay
    setTimeout(() => {
      signupForm.reset();
    }, 500);
  });

  // ─── IMAGE PLACEHOLDER GENERATION ──────────────────────────
  // Generate beautiful placeholder images using canvas for sections
  // that don't have real photos yet
  const generatePlaceholder = (width, height, label, theme = 'dark') => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (theme === 'warm') {
      gradient.addColorStop(0, '#1A1518');
      gradient.addColorStop(1, '#2A1F22');
    } else if (theme === 'blue') {
      gradient.addColorStop(0, '#111118');
      gradient.addColorStop(1, '#1E2030');
    } else {
      gradient.addColorStop(0, '#1A1A1A');
      gradient.addColorStop(1, '#2A2A35');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle gold accent circles
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(
        width * (0.3 + Math.random() * 0.4),
        height * (0.3 + Math.random() * 0.4),
        Math.min(width, height) * (0.1 + Math.random() * 0.2),
        0, Math.PI * 2
      );
      ctx.fillStyle = `rgba(74, 158, 255, ${0.03 + Math.random() * 0.04})`;
      ctx.fill();
    }

    // Label text
    ctx.fillStyle = 'rgba(74, 158, 255, 0.3)';
    ctx.font = `${Math.min(width, height) * 0.06}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, width / 2, height / 2);

    return canvas.toDataURL('image/jpeg', 0.8);
  };

  // Apply placeholders to images that fail to load
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const alt = img.alt || 'Café 333';
      const rect = img.parentElement.getBoundingClientRect();
      const w = Math.max(rect.width || 800, 400);
      const h = Math.max(rect.height || 500, 300);

      const themes = ['dark', 'warm', 'blue'];
      const theme = themes[Math.floor(Math.random() * themes.length)];
      img.src = generatePlaceholder(w, h, alt, theme);
    });

    // Trigger error check for images that may have already failed
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });

  // ─── PARALLAX SUBTLE EFFECT ────────────────────────────────
  const hero = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.15}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  }, { passive: true });

});
