// ── Scroll Progress Bar ──
const bar = document.querySelector('.scroll-progress');
if (bar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Work Rows: click to expand/collapse ──
function toggleRow(row) {
  row.classList.toggle('expanded');
  const arrow = row.querySelector('.work-arrow');
  const hint = row.querySelector('.work-hint-text');
  if (arrow) arrow.textContent = row.classList.contains('expanded') ? '\u2212' : '+';
  if (hint) hint.textContent = row.classList.contains('expanded') ? '' : 'Watch';
}

document.querySelectorAll('.work-row').forEach(row => {
  row.addEventListener('click', (e) => {
    // Don't toggle if clicking inside an expanded iframe
    if (row.classList.contains('expanded') && e.target.closest('.work-video-inner')) return;
    toggleRow(row);
  });
});

// ── Video Blocks: scroll reveal (for category pages) ──
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

// ── Contact Form Status ──
const params = new URLSearchParams(window.location.search);
const formStatus = document.getElementById('form-status');
if (formStatus && params.get('status')) {
  const success = params.get('status') === 'success';
  const form = document.querySelector('.contact-form');
  if (success && form) {
    form.style.display = 'none';
    formStatus.className = 'form-status success';
    formStatus.innerHTML = 'Thank you. I\'ll be in touch shortly.';
  } else {
    formStatus.className = 'form-status error';
    formStatus.innerHTML = 'Something went wrong. Please try again or email <a href="mailto:nathan@powers.video" style="border-bottom:1px solid rgba(255,255,255,0.3)">nathan@powers.video</a> directly.';
  }
  formStatus.style.display = 'block';
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
  history.replaceState(null, '', window.location.pathname);
}

// ── Hamburger Menu ──
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}
