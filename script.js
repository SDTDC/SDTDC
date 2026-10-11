document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('.page-section')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const nav = document.getElementById('siteNav');
  const menuToggle = document.getElementById('menuToggle');
  const year = document.getElementById('currentYear');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = new Date().getFullYear();

  function closeMenu() {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }

  function showSection(targetId, updateHistory = true) {
    const target = sections.find(section => section.id === targetId) || sections[0];
    if (!target) return;

    sections.forEach(section => {
      const isActive = section === target;
      section.classList.toggle('active', isActive);
      section.setAttribute('aria-hidden', String(!isActive));
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${target.id}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    closeMenu();
    if (updateHistory && window.location.hash !== `#${target.id}`) {
      history.replaceState(null, '', `#${target.id}`);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });

    target.querySelectorAll('.fade-in').forEach((element, index) => {
      element.classList.remove('show');
      if (reducedMotion) {
        element.classList.add('show');
      } else {
        window.setTimeout(() => element.classList.add('show'), Math.min(index * 75, 600));
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showSection(link.getAttribute('href').slice(1));
    });
  });

  document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href').slice(1);
      if (!sections.some(section => section.id === targetId)) return;
      event.preventDefault();
      showSection(targetId);
    });
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) closeMenu();
  });

  const initialSection = window.location.hash.slice(1);
  showSection(initialSection || 'home', false);
});
