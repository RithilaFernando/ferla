document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year for Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});