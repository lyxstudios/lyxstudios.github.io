// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Footer links
    document.querySelectorAll('.footer-section a').forEach(link => {
        link.addEventListener('click', (e) => {
            const page = link.getAttribute('data-page');
            if (page) {
                e.preventDefault();
                navigateTo(page);
            }
        });
    });
}

function navigateTo(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active sidebar link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Make navigateTo available globally
window.navigateTo = navigateTo;