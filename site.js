// ── Active Nav Link ──
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});
document.querySelectorAll('.dropdown-menu a.active').forEach(a => {
  const dropdown = a.closest('.dropdown');
  if (dropdown) dropdown.querySelector('span').style.color = '#fff';
});

// ── Scroll Progress Bar ──
const bar = document.querySelector('.scroll-progress');
if (bar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Video Blocks: scroll reveal ──
const videoObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      videoObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.video-block').forEach(block => videoObs.observe(block));

// ── Photo Grid Items: scroll reveal with stagger ──
const photoObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      photoObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.photo-grid .item').forEach(item => photoObs.observe(item));

// ── Footer: scroll reveal ──
const footerEl = document.querySelector('footer');
if (footerEl) {
  const footerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        footerObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  footerObs.observe(footerEl);
}

// ── Hamburger Menu ──
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}
