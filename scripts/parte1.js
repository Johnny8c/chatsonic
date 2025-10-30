// Activa animaciones suaves cuando los bloques entran al viewport
document.addEventListener('DOMContentLoaded', () => {
  const observables = document.querySelectorAll('[data-animate]');

  if (!('IntersectionObserver' in window)) {
    observables.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  observables.forEach((element) => observer.observe(element));

  console.log('Introducción de ChatSonic lista para explorarse');
});

