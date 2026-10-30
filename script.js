(() => {
  const gallery = document.querySelector('#gallery');
  const loading = document.querySelector('#loading');
  const count = document.querySelector('#work-count');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  const works = Array.isArray(window.PORTFOLIO_WORKS) ? window.PORTFOLIO_WORKS : [];
  let current = 0;

  count.textContent = `${works.length} 件作品`;
  loading.remove();

  works.forEach((work, index) => {
    const button = document.createElement('button');
    button.className = 'work';
    button.type = 'button';
    button.setAttribute('aria-label', `查看作品 ${index + 1}`);
    button.innerHTML = `<img src="${work.src}" alt="${escapeHtml(work.alt)}" loading="lazy" decoding="async"><span class="work__label">${String(index + 1).padStart(2, '0')} / ${escapeHtml(work.alt)}</span>`;
    button.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(button);
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function openLightbox(index) {
    current = (index + works.length) % works.length;
    const work = works[current];
    lightboxImage.src = work.src;
    lightboxImage.alt = work.alt;
    lightboxCaption.textContent = `${current + 1} / ${works.length}  ·  ${work.alt}`;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.removeAttribute('src');
  }

  function move(step) { openLightbox(current + step); }

  document.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('#lightbox-prev').addEventListener('click', () => move(-1));
  document.querySelector('#lightbox-next').addEventListener('click', () => move(1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
})();
