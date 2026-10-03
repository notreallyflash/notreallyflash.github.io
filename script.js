const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const processSteps = document.querySelectorAll('.process-step');
const processTitle = document.getElementById('processTitle');
const processCopy = document.getElementById('processCopy');
const processTags = document.getElementById('processTags');
const processNumber = document.getElementById('processNumber');

function activateProcess(step) {
  processSteps.forEach(item => {
    const active = item === step;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  processTitle.textContent = step.dataset.title;
  processCopy.textContent = step.dataset.copy;
  processTags.textContent = step.dataset.tags;
  processNumber.textContent = step.dataset.step;
}

processSteps.forEach(step => {
  step.addEventListener('mouseenter', () => activateProcess(step));
  step.addEventListener('focus', () => activateProcess(step));
  step.addEventListener('click', () => activateProcess(step));
});

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => navObserver.observe(section));

const cursor = document.getElementById('cursorDot');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  document.querySelectorAll('a, button, .screen-card, .portrait-frame').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(1.8)');
    el.addEventListener('mouseleave', () => cursor.style.transform = cursor.style.transform.replace(' scale(1.8)', ''));
  });
}
