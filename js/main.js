// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Scroll reveal animation
const revealEls = document.querySelectorAll(
  '.manfaat-card, .masalah-card, .segmen-card, .testi-card, .ba-stat-card'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Mobile sliders with dot indicators
function initMobileSliders() {
  if (window.innerWidth > 768) return;

  const grids = ['.masalah-grid', '.manfaat-grid', '.segmen-grid', '.testi-grid'];

  grids.forEach(selector => {
    const grid = document.querySelector(selector);
    if (!grid) return;

    const cards = Array.from(grid.children);
    if (!cards.length) return;

    const dotsEl = document.createElement('div');
    dotsEl.className = 'slider-dots';

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => {
        const pl = parseInt(getComputedStyle(grid).paddingLeft) || 28;
        grid.scrollTo({ left: cards[i].offsetLeft - pl, behavior: 'smooth' });
      });
      dotsEl.appendChild(dot);
    });

    grid.after(dotsEl);

    grid.addEventListener('scroll', () => {
      const scrollLeft = grid.scrollLeft;
      let activeIndex = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const pl = parseInt(getComputedStyle(grid).paddingLeft) || 28;
        const dist = Math.abs(card.offsetLeft - pl - scrollLeft);
        if (dist < minDist) { minDist = dist; activeIndex = i; }
      });
      dotsEl.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }, { passive: true });
  });
}

initMobileSliders();

// Sticky navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  }
});
