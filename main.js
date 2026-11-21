document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initScrollReveal();
  initInternshipInspector();
  bindCredentialSpotlight();
  initSmoothNavigation();
  initActiveSectionNavigation();
  initCursorFollower();
});

function initMobileNavigation() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileNav");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && menu.contains(link)) closeMenu();
  });
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  revealItems.forEach((item) => observer.observe(item));
}

function initInternshipInspector() {
  const inspector = document.querySelector(".internship-inspector");
  if (!inspector) return;

  const tabSelector = '[role="tab"]';
  if (!inspector.querySelector(tabSelector)) return;

  inspector.addEventListener("click", (event) => {
    const selectedTab = event.target.closest(tabSelector);
    if (!selectedTab || !inspector.contains(selectedTab)) return;

    const tabId = selectedTab.getAttribute("aria-controls");
    const selectedPanel = tabId ? inspector.querySelector(`#${CSS.escape(tabId)}`) : null;
    if (!selectedPanel) return;

    inspector.querySelectorAll(tabSelector).forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    inspector.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
      panel.hidden = panel !== selectedPanel;
    });
  });
}

function bindCredentialSpotlight() {
  const credentialGrid = document.querySelector(".credential-grid");
  if (!credentialGrid) return;

  credentialGrid.addEventListener("pointermove", (event) => {
    const tile = event.target.closest(".credential-tile");
    if (!tile || !credentialGrid.contains(tile)) return;

    const bounds = tile.getBoundingClientRect();
    tile.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    tile.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
    tile.classList.add("is-spotlit");
  });

  credentialGrid.addEventListener("pointerout", (event) => {
    const tile = event.target.closest(".credential-tile");
    if (!tile) return;

    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !tile.contains(nextTarget)) {
      tile.classList.remove("is-spotlit");
    }
  });
}

function initSmoothNavigation() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("click", (event) => {
    const clickedElement = event.target instanceof Element ? event.target : event.target.parentElement;
    const link = clickedElement?.closest('a[href^="#"]');
    if (!link) return;

    const targetId = decodeURIComponent(link.getAttribute("href").slice(1));
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });

    if (window.location.hash !== `#${targetId}`) {
      window.history.pushState(null, "", `#${targetId}`);
    }
  });
}

function initActiveSectionNavigation() {
  const nav = document.querySelector(".site-nav__links");
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = [...document.querySelectorAll("main > section[id]")];
  if (!links.length || !sections.length) return;

  const updateActiveLink = () => {
    const readingLine = window.scrollY + window.innerHeight * 0.4;
    let currentSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= readingLine) currentSection = section;
    });

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentSection.id}`;
      link.classList.toggle("active", isActive);
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();
}

function initCursorFollower() {
  const cursor = document.getElementById("cursorDot");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!cursor || !supportsHover) return;

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.style.opacity = "1";
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    if (target?.closest("a, button")) cursor.classList.add("is-hovered");
  });

  document.addEventListener("pointerout", (event) => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const nextTarget = event.relatedTarget;
    const remainsOnControl = nextTarget instanceof Element && nextTarget.closest("a, button");
    if (target?.closest("a, button") && !remainsOnControl) {
      cursor.classList.remove("is-hovered");
    }
  });
}
