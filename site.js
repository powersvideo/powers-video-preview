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

// ── Contact Form Status ──
const params = new URLSearchParams(window.location.search);
const formStatus = document.getElementById('form-status');
if (formStatus && params.get('status')) {
  const success = params.get('status') === 'success';
  const form = document.querySelector('.contact-form');
  if (success && form) {
    form.style.display = 'none';
    formStatus.className = 'form-status success';
    formStatus.innerHTML = '<h2 style="margin:0 0 8px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.15em; color:#888;">Message Sent</h2><p style="margin:0; color:#bbb;">Thanks for reaching out — I\'ll get back to you soon.</p>';
  } else {
    formStatus.className = 'form-status error';
    formStatus.innerHTML = 'Something went wrong. Please try again or email <a href="mailto:nathan@powers.video" style="color:#cc8888; text-decoration:underline;">nathan@powers.video</a> directly.';
  }
  formStatus.style.display = 'block';
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
  history.replaceState(null, '', window.location.pathname);
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
