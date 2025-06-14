// Smooth scroll and section fade-in
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
});

// 🚢 Ship Wheel Scroll Animation
const shipWheel = document.querySelector('.ship-wheel');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;
  const rotationChange = delta > 0 ? 5 : -5; // clockwise or counterclockwise
  if (shipWheel) {
    const currentRotation = parseFloat(shipWheel.dataset.rotation || 0);
    const newRotation = currentRotation + rotationChange;
    shipWheel.style.transform = `rotate(${newRotation}deg)`;
    shipWheel.dataset.rotation = newRotation;
  }
  lastScrollY = currentY;
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  }).then(response => {
    if (response.ok) {
      document.getElementById('thank-you').style.display = 'flex';
      form.reset();
    } else {
      alert("There was a problem sending your message.");
    }
  });
});

function closeThankYou() {
  document.getElementById('thank-you').style.display = 'none';
}
