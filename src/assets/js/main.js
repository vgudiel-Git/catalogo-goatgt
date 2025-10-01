const hamburgerButton = document.getElementById('hamburger-button');
const mobileNav = document.getElementById('mobile-nav');
const menuLinks = document.querySelectorAll('.menu-link');

const toggleMenu = () => {
    hamburgerButton.classList.toggle('active');
    mobileNav.classList.toggle('active');
};

hamburgerButton.addEventListener('click', toggleMenu);

// Event listener for each menu link to close the menu on click
menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Black Friday Countdown Timer
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

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(timerInterval);
        const countdownTimer = document.getElementById("countdown-timer");
        if (countdownTimer) {
            countdownTimer.innerHTML = '<div style="color: #ef4444; font-size: 1.5rem; font-weight: bold;">OFERTA EXPIRADA</div>';
        }
    }
}, 1000);
