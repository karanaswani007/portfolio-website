/* ════════════════════════════════════════
   PORTFOLIO TEMPLATE — script.js
   ════════════════════════════════════════ */

/* ── PRELOADER ── */
(function () {
  const fill = document.getElementById('pre-fill');
  const label = document.getElementById('pre-label');
  const el = document.getElementById('preloader');
  let pct = 0;

  const id = setInterval(() => {
    pct += Math.random() * 14;
    if (pct >= 100) {
      pct = 100;
      clearInterval(id);
      setTimeout(() => el.classList.add('hide'), 350);
    }
    fill.style.width = pct + '%';
    label.textContent = Math.floor(pct) + '%';
  }, 55);
})();


/* ── NAV: scroll solid + active link ── */
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a, .nav-drawer a');

window.addEventListener('scroll', () => {
  /* solid bg */
  nav.classList.toggle('solid', window.scrollY > 55);

  /* active link */
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });


/* ── HAMBURGER (mobile drawer) ── */
const ham = document.getElementById('hamburger');
const drawer = document.getElementById('nav-drawer');

ham.addEventListener('click', () => drawer.classList.toggle('open'));
drawer.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => drawer.classList.remove('open'))
);
/* Close on outside click */
document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !drawer.contains(e.target)) {
    drawer.classList.remove('open');
  }
});


/* ── TYPEWRITER ── */
/* ↓ Edit this array with your roles */
const TW_ROLES = [
  'YOUR ROLE HERE',
  'SECOND ROLE',
  'THIRD ROLE',
  'FOURTH ROLE'
];
let twIdx = 0, twChar = 0, twDel = false;
const twEl = document.getElementById('tw-out');

function typeWriter() {
  if (!twEl) return;
  const word = TW_ROLES[twIdx];
  twEl.textContent = word.slice(0, twDel ? --twChar : ++twChar);

  if (!twDel && twChar === word.length) {
    twDel = true;
    setTimeout(typeWriter, 1800);
    return;
  }
  if (twDel && twChar === 0) {
    twDel = false;
    twIdx = (twIdx + 1) % TW_ROLES.length;
  }
  setTimeout(typeWriter, twDel ? 40 : 85);
}
setTimeout(typeWriter, 1400);


/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObs.unobserve(e.target); /* fire once */
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-l').forEach(el => revealObs.observe(el));


/* ── CONTACT FORM ── */
const form = document.getElementById('contact-form');
const fMsg = document.getElementById('f-msg');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.f-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      await emailjs.sendForm('service_bamjsxj', 'template_v3rf8kq', form);
      fMsg.textContent = '✓ Message sent! I\'ll get back to you soon.';
      fMsg.style.color = 'var(--teal)';
      form.reset();
    } catch {
      fMsg.textContent = '✗ Failed to send. Please try again.';
      fMsg.style.color = 'var(--rose)';
    }
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    setTimeout(() => fMsg.textContent = '', 5000);
  });
}


/* ── SKILL ICON ITEMS: subtle hover tilt ── */
document.querySelectorAll('.skill-icon-item').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ── SMOOTH SCROLL for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
