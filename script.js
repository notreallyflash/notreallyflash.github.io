const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const scheduleLink = document.getElementById("scheduleLink");
const SCHEDULING_URL = "https://calendar.app.google/iQ8XPXrtWW8x7bCPA";

if (scheduleLink) scheduleLink.href = SCHEDULING_URL;

menuToggle?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const items = document.querySelectorAll(".capability-item");
const core = document.querySelector(".cap-core");
const title = document.getElementById("capTitle");
const copy = document.getElementById("capCopy");
const tools = document.getElementById("capTools");
let capabilityTimer;

function activateCapability(item) {
  if (!item || !title || !copy || !tools || !core) return;
  items.forEach(i => i.classList.remove("active"));
  item.classList.add("active");
  core.classList.add("active");
  title.style.opacity = "0";
  copy.style.opacity = "0";
  tools.style.opacity = "0";
  clearTimeout(capabilityTimer);
  capabilityTimer = setTimeout(() => {
    title.textContent = item.dataset.title;
    copy.textContent = item.dataset.copy;
    tools.textContent = item.dataset.tools;
    title.style.opacity = "1";
    copy.style.opacity = "1";
    tools.style.opacity = "1";
  }, 130);
}

items.forEach(item => {
  item.addEventListener("mouseenter", () => activateCapability(item));
  item.addEventListener("focus", () => activateCapability(item));
  item.addEventListener("click", () => activateCapability(item));
});

const canvas = document.querySelector(".capability-canvas");
canvas?.addEventListener("mouseleave", () => core?.classList.remove("active"));



/* V5 art-direction interactions */
const heroPhoto = document.querySelector('.hero-photo-frame');
if (heroPhoto && !window.matchMedia('(pointer: coarse)').matches) {
  heroPhoto.addEventListener('pointermove', (event) => {
    const r = heroPhoto.getBoundingClientRect();
    const x = ((event.clientX - r.left) / r.width - .5) * 6;
    const y = ((event.clientY - r.top) / r.height - .5) * 5;
    heroPhoto.style.setProperty('--photo-x', `${x}px`);
    heroPhoto.style.setProperty('--photo-y', `${y}px`);
  });
  heroPhoto.addEventListener('pointerleave', () => {
    heroPhoto.style.setProperty('--photo-x', '0px');
    heroPhoto.style.setProperty('--photo-y', '0px');
  });
}

document.querySelectorAll('.work-media').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    card.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - .5) * -1.2}deg`);
    card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 1.2}deg`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});
