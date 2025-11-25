document.addEventListener('DOMContentLoaded', function () {
    var yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const galleries = {
        kone: [
            { src: 'assets/img/1101(1).png', alt: 'K0NE – NA BLOKU' },
            { src: 'assets/img/1101.png', alt: 'K0NE – NA BLOKU' },
            { src: 'assets/img/1101(2).png', alt: 'K0NE – NA BLOKU' },
            { src: 'assets/img/1101(5).png', alt: 'K0NE – NA BLOKU' },
            { src: 'assets/img/1101(12).png', alt: 'K0NE – NA BLOKU' },
            { src: 'assets/img/1101(11).png', alt: 'K0NE – NA BLOKU' },
            { src: 'assets/img/1101(9).png', alt: 'K0NE – NA BLOKU' }
        ],
        backstage: [
            { src: 'assets/img/plan.png',  alt: 'Backstage z nagrań' },
            { src: 'assets/img/plan2.png', alt: 'Backstage z nagrań' },
            { src: 'assets/img/plan3.png', alt: 'Backstage z nagrań' },
            { src: 'assets/img/plan4.png', alt: 'Backstage z nagrań' }
        ],
        moto: [
            { src: 'assets/img/photo3.jpg', alt: 'Zdjęcia motoru, kadr 1' }
        ]
    };

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const imgEl = lightbox.querySelector('.lightbox-image');
    const captionEl = lightbox.querySelector('.lightbox-caption');
    const btnClose = lightbox.querySelector('.lightbox-close');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');

    let currentGalleryName = null;
    let currentIndex = 0;

    function showImage() {
        if (!currentGalleryName) return;
        const gallery = galleries[currentGalleryName];
        if (!gallery || !gallery[currentIndex]) return;

        const item = gallery[currentIndex];
        imgEl.src = item.src;
        imgEl.alt = item.alt || '';
        captionEl.textContent = item.alt || '';
    }

    function openLightbox(galleryName, startIndex) {
        if (!galleries[galleryName]) return;

        currentGalleryName = galleryName;
        currentIndex = startIndex || 0;

        showImage();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentGalleryName = null;
        currentIndex = 0;
    }

    function showNext() {
        if (!currentGalleryName) return;
        const gallery = galleries[currentGalleryName];
        currentIndex = (currentIndex + 1) % gallery.length;
        showImage();
    }

    function showPrev() {
        if (!currentGalleryName) return;
        const gallery = galleries[currentGalleryName];
        currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        showImage();
    }

    const photoCards = document.querySelectorAll('.photo-grid .portfolio-item');
    photoCards.forEach(card => {
        const galleryName = card.dataset.gallery;
        if (!galleryName || !galleries[galleryName]) return;

        const thumb = card.querySelector('.portfolio-thumb');
        const link = card.querySelector('.portfolio-link');

        if (thumb) {
            thumb.style.cursor = 'pointer';
            thumb.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(galleryName, 0);
            });
        }

        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(galleryName, 0);
            });
        }
    });

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnNext) btnNext.addEventListener('click', showNext);
    if (btnPrev) btnPrev.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
        if (e.key === 'ArrowRight' && lightbox.classList.contains('is-open')) {
            showNext();
        }
        if (e.key === 'ArrowLeft' && lightbox.classList.contains('is-open')) {
            showPrev();
        }
    });
});