(function () {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Animate skill bars when visible
  const skills = Array.from(document.querySelectorAll('.skill'));
  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in-view');
        const fill = el.querySelector('.skill__fill');
        const percent = Number(el.getAttribute('data-percent') || '0');
        if (fill) {
          fill.style.setProperty('--skill', percent + '%');
        }
        obs.unobserve(el);
      }
    }
  }, { threshold: 0.3 });

  skills.forEach(el => io.observe(el));

  // Scroll to top functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
