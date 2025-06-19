document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const heroSection = document.getElementById('home'); // Assuming 'home' is your hero section ID

    // Hamburger Menu Toggle
    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerButton.classList.toggle('active');
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerButton.classList.remove('active');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Header Transparency Logic
    const handleHeaderScroll = () => {
        if (!header) return;

        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        // Adjust scrollThreshold to be slightly less than hero height,
        // or when a certain part of hero is scrolled past.
        // Using a smaller, fixed threshold can also work, e.g., 50px.
        const scrollThreshold = heroHeight > 0 ? heroHeight * 0.7 : 50; // When 70% of hero is scrolled or 50px


        if (window.scrollY > scrollThreshold || (heroHeight === 0 && window.scrollY > 50) ) { // Second condition if heroSection is not found
            header.classList.remove('header-transparent');
            header.classList.add('header-solid');
        } else {
            header.classList.add('header-transparent');
            header.classList.remove('header-solid');
        }
    };

    // Initial check in case page is loaded scrolled down
    if (header) { // ensure header exists before trying to modify its classList
        handleHeaderScroll();
    }


    window.addEventListener('scroll', handleHeaderScroll);


    // Initial check on load if heroSection is not immediately at the top (e.g. after a reload scrolled down)
    // This also ensures the classes are set correctly on page load before any scroll.
    // Make sure this runs after the DOM is fully ready to get correct offsetHeight
    if (header && heroSection) { // Ensure both elements exist
        handleHeaderScroll(); // Call it once on load to set initial state
    } else if (header) { // Fallback if only header exists (e.g., on other pages)
        // On non-hero pages, you might want the header to be solid by default
        // For now, let the scroll handler manage it, or add:
        if (!heroSection) { // If there's no hero section, make header solid
            header.classList.remove('header-transparent');
            header.classList.add('header-solid');
        }
    }
});