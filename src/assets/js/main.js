// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // Initialize all components
    initMobileMenu();
    initProductAnimations();
    initOfertasButtons();
    initCountdownTimer();
});

// Mobile menu functionality
function initMobileMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileNav = document.getElementById('mobile-nav');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (hamburgerButton && mobileNav) {
        const toggleMenu = () => {
            hamburgerButton.classList.toggle('active');
            mobileNav.classList.toggle('active');
        };

        hamburgerButton.addEventListener('click', toggleMenu);

        // Event listener for each menu link to close the menu on click
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
}

// Product card animations
function initProductAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// Ofertas buttons functionality
function initOfertasButtons() {
    const ofertasButtons = document.querySelectorAll('.ofertas-button');
    
    ofertasButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Verificar si estamos en la página principal
            const categoryLinks = document.querySelectorAll('.category-nav a');
            const ofertasSection = document.getElementById('ofertas');
            
            // Si estamos en la página principal (tiene navegación de categorías y sección ofertas)
            if (categoryLinks.length > 0 && ofertasSection) {
                e.preventDefault();
                
                // Activar la pestaña de ofertas
                const categorySections = document.querySelectorAll('.category-section');
                
                // Eliminar la clase active de todos los enlaces y secciones
                categoryLinks.forEach(l => l.classList.remove('active'));
                categorySections.forEach(s => s.classList.remove('active'));
                
                // Activar la pestaña de ofertas
                const ofertasLink = document.querySelector('.category-nav a[href="#ofertas"]');
                
                if (ofertasLink && ofertasSection) {
                    ofertasLink.classList.add('active');
                    ofertasSection.classList.add('active');
                    
                    // Scroll suave hacia la sección
                    ofertasSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Si no estamos en la página principal, dejar que el enlace funcione normalmente
            // (no hacer preventDefault, permitir la navegación a /index.html#ofertas)
        });
    });
}

// Black Friday Countdown Timer
function initCountdownTimer() {
    console.log('Initializing Black Friday countdown timer...');
    const countdownDate = new Date("November 28, 2025 00:00:00").getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the respective elements
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        if (daysElement) daysElement.innerText = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.innerText = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.innerText = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.innerText = String(seconds).padStart(2, '0');

        // Debug: Log if elements are not found
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.log('Countdown elements not found:', {
                days: !!daysElement,
                hours: !!hoursElement,
                minutes: !!minutesElement,
                seconds: !!secondsElement
            });
        }

        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(timerInterval);
            const countdownTimer = document.getElementById("countdown-timer");
            if (countdownTimer) {
                countdownTimer.innerHTML = '<div style="color: #ef4444; font-size: 1.5rem; font-weight: bold;">OFERTA EXPIRADA</div>';
            }
        }
    }, 1000);
}
