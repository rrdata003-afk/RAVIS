const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Typing animation for hero section
(() => {
  const phrases = [
    'Ravi Sir',
    'Professional English Teacher',
    '📘 12+ Years of Teaching Experience',
    '🏆 Trusted by Thousands of Students'
  ];

  const el = document.getElementById('heroTyped');
  const cursor = document.getElementById('heroCursor');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let typing = true;

  const typeSpeed = 120; // slower typing
  const backSpeed = 70;  // slower backspace
  const pauseDelay = 2400; // slightly longer pause at end of phrase

  function tick() {
    const current = phrases[phraseIndex];
    if (typing) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex >= current.length) {
        typing = false;
        setTimeout(tick, pauseDelay);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 200);
        return;
      }
      setTimeout(tick, backSpeed);
    }
  }

  // start after small delay so page fonts load
  setTimeout(tick, 700);
})();
