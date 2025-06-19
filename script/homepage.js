document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation for elements with .animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => { // Renamed 'observer' to 'observerInstance' to avoid conflict
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Unobserve after first animation
                }
            });
        }, {
            threshold: 0.15 // Adjust this threshold for when animations trigger (0.0 to 1.0)
                           // 0.15 means 15% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Number Counting Animation for Stats Section
    const statsNumbers = document.querySelectorAll('.stats-section .stat-number');

    const animateCountUp = (el) => {
        const target = +el.dataset.target;
        const duration = 2200; // Slightly longer for a smoother, more deliberate count
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 4.5))); // Slightly more ease-out

            el.textContent = currentCount;

            if (frame === totalFrames) {
                clearInterval(counter);
                el.textContent = target;
            }
        }, frameDuration);
    };

    if (statsNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!entry.target.classList.contains('counted')) {
                        animateCountUp(entry.target);
                        entry.target.classList.add('counted');
                        observerInstance.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.6 // Start counting when stat item is mostly visible
        });

        statsNumbers.forEach(numberEl => {
            statObserver.observe(numberEl);
        });
    }

    // Product Slider Logic (remains the same)
    const productSliders = document.querySelectorAll('.product-slider-container');
    productSliders.forEach(sliderContainer => {
        const viewport = sliderContainer.querySelector('.product-slider-viewport');
        const prevButton = sliderContainer.querySelector('.prev-arrow');
        const nextButton = sliderContainer.querySelector('.next-arrow');

        if (!viewport || !prevButton || !nextButton) {
            if(prevButton) prevButton.style.display = 'none';
            if(nextButton) nextButton.style.display = 'none';
            return;
        }

        const updateArrowStates = () => {
            if (!viewport.offsetParent) return;
            const scrollLeft = viewport.scrollLeft;
            const scrollWidth = viewport.scrollWidth;
            const clientWidth = viewport.clientWidth;
            prevButton.disabled = scrollLeft <= 1;
            nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
        };

        prevButton.addEventListener('click', () => {
            viewport.scrollBy({ left: -viewport.clientWidth * 0.8, behavior: 'smooth' });
        });
        nextButton.addEventListener('click', () => {
            viewport.scrollBy({ left: viewport.clientWidth * 0.8, behavior: 'smooth' });
        });

        viewport.addEventListener('scroll', updateArrowStates, { passive: true });
        
        const sliderVisibilityObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateArrowStates();
                }
            });
        }, {threshold: 0.01 });
        sliderVisibilityObserver.observe(sliderContainer);

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateArrowStates, 250);
        });
        updateArrowStates();
    });
});