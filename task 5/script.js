// Smooth scrolling for nav links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.card, .about, .contact');

function checkFade() {
  const triggerBottom = window.innerHeight * 0.85;

  fadeElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      el.classList.add('fade-in');
    }
  });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Mobile menu toggle
const nav = document.querySelector('nav ul');
const logo = document.querySelector('.logo');

// Create hamburger button
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '&#9776;'; // ☰ icon
logo.insertAdjacentElement('afterend', hamburger);

// Toggle nav on mobile
hamburger.addEventListener('click', () => {
  nav.classList.toggle('show');
});
