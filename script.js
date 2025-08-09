(function () {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ========================================
  // SCROLL-BASED BACKGROUND GRADIENT EFFECT
  // ========================================

  function lerp(start, end, progress) {
    return start + (end - start) * progress;
  }

  function rgbToHex(r, g, b) {
    const toHex = (n) =>
      Math.round(Math.max(0, Math.min(255, n)))
        .toString(16)
        .padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function updateBackgroundGradient() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const scrollProgress =
      documentHeight > 0
        ? Math.max(0, Math.min(1, scrollTop / documentHeight))
        : 0;

    const startColor = { r: 211, g: 211, b: 211 };
    const endColor = { r: 255, g: 255, b: 255 };

    const currentColor = {
      r: lerp(startColor.r, endColor.r, scrollProgress),
      g: lerp(startColor.g, endColor.g, scrollProgress),
      b: lerp(startColor.b, endColor.b, scrollProgress),
    };

    const hexColor = rgbToHex(
      currentColor.r,
      currentColor.g,
      currentColor.b
    );
    document.body.style.backgroundColor = hexColor;
  }

  let scrollTimeout;
  let isScrolling = false;

  function handleScroll() {
    if (!isScrolling) {
      requestAnimationFrame(updateBackgroundGradient);
      isScrolling = true;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 16); // ~60fps
  }

  updateBackgroundGradient();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener(
    'resize',
    () => {
      requestAnimationFrame(updateBackgroundGradient);
    },
    { passive: true }
  );

  // ========================================
  // EXISTING FUNCTIONALITY (Skill bars, scroll-to-top)
  // ========================================

  const skills = Array.from(document.querySelectorAll('.skill'));
  const io = new IntersectionObserver(
    (entries, obs) => {
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
    },
    { threshold: 0.3 }
  );

  skills.forEach((el) => io.observe(el));

  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const startTime = performance.now();

    function animateGradient() {
      const currentScrollTop = window.pageYOffset;

      updateBackgroundGradient();

      if (currentScrollTop > 0 && performance.now() - startTime < 2000) {
        requestAnimationFrame(animateGradient);
      }
    }

    requestAnimationFrame(animateGradient);
  });
})();
