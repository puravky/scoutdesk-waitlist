const motion = window.Motion || {};
const animate = motion.animate || (() => {});
const inView = motion.inView || (() => {});
const stagger = motion.stagger || (() => 0);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.getElementById('site-header');
const cursorGlow = document.querySelector('.cursor-glow');
const themeToggle = document.getElementById('theme-toggle');

const renderIcons = () => window.lucide?.createIcons?.({ attrs: { 'stroke-width': 1.7 } });
renderIcons();

const setTheme = (theme) => {
  const dark = theme === 'dark';
  document.body.dataset.theme = theme;
  if (!themeToggle) return;
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  const themeLabel = themeToggle.querySelector('span');
  if (themeLabel) themeLabel.textContent = dark ? 'Light' : 'Dark';
  themeToggle.querySelector('svg')?.setAttribute('data-lucide', dark ? 'sun' : 'moon');
  renderIcons();
};
const getSavedTheme = () => {
  try { return localStorage.getItem('scoutdeck-theme') || 'light'; } catch { return 'light'; }
};
const saveTheme = (theme) => {
  try { localStorage.setItem('scoutdeck-theme', theme); } catch { /* File-based pages can disable storage; the toggle still works for this visit. */ }
};
setTheme(getSavedTheme());
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  saveTheme(nextTheme);
  setTheme(nextTheme);
});

const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

if (!prefersReducedMotion) {
  animate('.motion-enter', { opacity: [0, 1], y: [18, 0] }, { duration: 0.8, delay: stagger(0.12), ease: [0.16, 1, 0.3, 1] });
  inView('.motion-reveal', (element) => animate(element, { opacity: [0, 1], y: [26, 0] }, { duration: 0.7, ease: [0.16, 1, 0.3, 1] }), { amount: 0.18 });
  inView('.form-shell', (element) => {
    animate(element.querySelectorAll('.form-star'), { y: [0, -10, 0], scale: [1, 1.2, 1] }, { duration: 2.8, delay: stagger(0.18), repeat: Infinity, ease: 'easeInOut' });
  }, { amount: 0.35 });
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
      animate(element, { x, y }, { duration: 0.18, ease: 'easeOut' });
    });
    element.addEventListener('pointerleave', () => animate(element, { x: 0, y: 0 }, { type: 'spring', stiffness: 260, damping: 14 }));
  });
} else {
  document.querySelectorAll('.motion-enter, .motion-reveal').forEach((element) => { element.style.opacity = '1'; element.style.transform = 'none'; });
}

const opportunities = [
  { type: 'HACKATHON', title: 'MIT Climate<br />&amp; AI Hack', score: '92% FIT', copy: 'Your climate research and ML projects point to a build weekend with actual momentum.', tag: 'Climate builder' },
  { type: 'FELLOWSHIP', title: 'Notion Campus<br />Leaders', score: '97% FIT', copy: 'A community-building role that matches your product club and design work.', tag: 'Community builder' },
  { type: 'CONFERENCE', title: 'South by Southwest<br />EDU', score: '89% FIT', copy: 'A room full of the people and questions sitting at the edge of your work.', tag: 'Network move' }
];
const opportunityButtons = document.querySelectorAll('.opportunity');
const detail = document.getElementById('brief-detail');
const detailType = document.getElementById('detail-type');
const detailScore = document.getElementById('detail-score');
const detailTitle = document.getElementById('detail-title');
const detailCopy = document.getElementById('detail-copy');
const detailTag = document.getElementById('detail-tag');

opportunityButtons.forEach((button) => button.addEventListener('click', () => {
  const selected = opportunities[Number(button.dataset.index)];
  opportunityButtons.forEach((item) => item.classList.toggle('active-op', item === button));
  if (!prefersReducedMotion) animate(detail, { opacity: [1, 0], y: [0, 8] }, { duration: 0.14 });
  window.setTimeout(() => {
    detailType.textContent = selected.type;
    detailScore.textContent = selected.score;
    detailTitle.innerHTML = selected.title;
    detailCopy.textContent = selected.copy;
    detailTag.innerHTML = '<i data-lucide="lightbulb"></i> ' + selected.tag;
    renderIcons();
    if (!prefersReducedMotion) animate(detail, { opacity: [0, 1], y: [8, 0] }, { duration: 0.25, ease: [0.16, 1, 0.3, 1] });
  }, prefersReducedMotion ? 0 : 145);
}));

document.querySelectorAll('.waitlist-form').forEach((form) => {
  const email = form.querySelector('input[name="email"]');
  const message = form.querySelector('.form-message');
  const submit = form.querySelector('button[type="submit"]');
  const label = submit.querySelector('.button-label');
  const success = document.getElementById(form.dataset.successTarget);
  const originalLabel = label.textContent;
  const showMessage = (text, type = '') => { message.textContent = text; message.className = 'form-message ' + type; };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = email.value.trim();
    if (!address) { showMessage('Enter your email address to get on the list.', 'error'); email.focus(); return; }
    if (!email.validity.valid) { showMessage('That email address doesn’t look quite right. Please check it and try again.', 'error'); email.focus(); return; }
    submit.disabled = true; label.textContent = 'Saving your spot…'; showMessage('Sending your request…', 'loading');
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.errors?.map((item) => item.message).filter(Boolean).join(' ') || 'We couldn’t save your spot just now. Please try again.');
      form.hidden = true; success.hidden = false; renderIcons(); success.focus();
    } catch (error) {
      showMessage(error.message || 'Something went wrong. Please check your connection and try again.', 'error');
      submit.disabled = false; label.textContent = originalLabel;
    }
  });
});
