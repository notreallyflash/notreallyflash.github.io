const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const rotatingWord = document.getElementById('rotatingWord');
const scheduleLink = document.getElementById('scheduleLink');
const scheduleHint = document.getElementById('scheduleHint');

/* Google Calendar scheduling link */
const SCHEDULING_URL =
  "https://calendar.app.google/iQ8XPXrtWW8x7bCPA";

/* Connect the Schedule a Call button */
if (scheduleLink) {
  scheduleLink.href = SCHEDULING_URL;
}

/* Dark / Light mode */
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');

  const isDark = body.classList.contains('dark');

  localStorage.setItem(
    'theme',
    isDark ? 'dark' : 'light'
  );

  themeToggle.textContent =
    isDark ? '☀' : '☾';
});


/* Mobile navigation */
menuToggle.addEventListener('click', () => {
  const open =
    mobileNav.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    String(open)
  );
});

document
  .querySelectorAll('.mobile-nav a')
  .forEach(link => {

    link.addEventListener('click', () => {

      mobileNav.classList.remove('open');

      menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });


/* Hero word rotation */
const words = [
  'Cloud',
  'Business Systems',
  'Technology',
  'AI',
  'Digital Experiences'
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWord() {

  const word = words[wordIndex];

  rotatingWord.textContent =
    deleting
      ? word.slice(0, charIndex - 1)
      : word.slice(0, charIndex + 1);

  charIndex += deleting ? -1 : 1;

  let delay =
    deleting ? 45 : 85;

  if (
    !deleting &&
    charIndex === word.length
  ) {

    deleting = true;
    delay = 1300;

  } else if (
    deleting &&
    charIndex === 0
  ) {

    deleting = false;

    wordIndex =
      (wordIndex + 1) % words.length;

    delay = 300;
  }

  window.setTimeout(
    typeWord,
    delay
  );
}

typeWord();


/* Scroll reveal */
const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'visible'
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.1
    }
  );

document
  .querySelectorAll('.reveal')
  .forEach(el => {

    observer.observe(el);

  });


/* Project filters */
const filters =
  document.querySelectorAll('.filter');

const cards =
  document.querySelectorAll('.project-card');

filters.forEach(filter => {

  filter.addEventListener(
    'click',
    () => {

      filters.forEach(btn => {
        btn.classList.remove(
          'active'
        );
      });

      filter.classList.add(
        'active'
      );

      const selected =
        filter.dataset.filter;

      cards.forEach(card => {

        const categories =
          card.dataset.category || '';

        card.style.display =
          selected === 'all' ||
          categories.includes(selected)
            ? ''
            : 'none';

      });

    }
  );

});


/* Scheduling CTA */
if (scheduleLink) {

  scheduleLink.addEventListener(
    'click',
    event => {

      event.preventDefault();

      if (SCHEDULING_URL) {

        window.open(
          SCHEDULING_URL,
          '_blank',
          'noopener,noreferrer'
        );

      }

    }
  );

}


/* Disable placeholder project links */
document
  .querySelectorAll(
    '.project-links .disabled'
  )
  .forEach(link => {

    link.addEventListener(
      'click',
      event => {
        event.preventDefault();
      }
    );

  });