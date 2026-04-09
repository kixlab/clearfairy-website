
/* ─── BibTeX copy button ─── */
function copyBibtex() {
  const text = document.getElementById('bibtex-content').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.copy-btn');
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = 'rgba(109,90,207,0.4)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 2000);
  });
}

/* ─── Animate stats on scroll ─── */
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

/* Observe cards for fade-in */
document.querySelectorAll(
  '.challenge-card, .property-card, .finding-card, .app-card, .stat-card, .pipeline-stage'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s, border-color 0.2s';
  observer.observe(el);
});

/* IntersectionObserver for visible class */
const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      visibilityObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.challenge-card, .property-card, .finding-card, .app-card, .stat-card, .pipeline-stage'
).forEach(el => visibilityObserver.observe(el));

/* ─── Animate donut charts ─── */
const donutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('circle').forEach((circle, i) => {
        circle.style.transition = `stroke-dasharray 1s ease ${i * 0.2}s`;
      });
      donutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.donut-chart').forEach(chart => donutObserver.observe(chart));


/* Pan container: calculate overflow and set speed-based duration */
function initPanContainers() {
  const PX_PER_SEC = 22; // pixels per second — adjust to taste

  document.querySelectorAll('.pan-container').forEach(container => {
    const img = container.querySelector('img');
    const update = () => {
      const overflow = img.offsetWidth - container.offsetWidth;
      if (overflow > 0) {
        container.style.setProperty('--pan-x', `-${overflow}px`);
        const duration = Math.max(10, overflow / PX_PER_SEC);
        img.style.setProperty('animation-duration', `${duration.toFixed(1)}s`);
      }
    };
    if (img.complete) update();
    else img.addEventListener('load', update);
    window.addEventListener('resize', update);
  });
}

initPanContainers();

/* ─── Decision step marquee: duplicate row content for seamless loop ─── */
document.querySelectorAll('.decision-row').forEach(row => {
  const original = Array.from(row.children);
  original.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    row.appendChild(clone);
  });
});
