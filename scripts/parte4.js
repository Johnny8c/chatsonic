// Sistema de navegación entre páginas
const sidebarItems = document.querySelectorAll(".sidebar li");
const pages = document.querySelectorAll(".page");

// Función para cambiar de página
function changePage(pageName) {
  // Ocultar todas las páginas
  pages.forEach(page => {
    page.classList.remove("active");
  });

  // Mostrar la página seleccionada
  const selectedPage = document.getElementById(pageName);
  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  // Actualizar el item activo del sidebar
  sidebarItems.forEach(item => {
    item.classList.remove("active");
  });
}

// Event listener para cada item del sidebar
sidebarItems.forEach(item => {
  item.addEventListener("click", () => {
    const pageName = item.getAttribute("data-page");
    changePage(pageName);
    item.classList.add("active");
    
    // Efecto de vibración sutil
    item.style.animation = "none";
    setTimeout(() => {
      item.style.animation = "pulse 0.3s ease";
    }, 10);
  });
});

// Establecer la primera página como activa al cargar
document.addEventListener("DOMContentLoaded", () => {
  const firstItem = sidebarItems[0];
  if (firstItem) {
    firstItem.classList.add("active");
  }
});

// Toggle modo oscuro
const toggleBtn = document.getElementById("toggle-theme");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Efecto de transición suave
  toggleBtn.style.transform = "rotate(360deg)";
  setTimeout(() => {
    toggleBtn.style.transform = "rotate(0deg)";
  }, 400);

  // Cambia el ícono
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

// Animación para las tarjetas de comparación
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observar las tarjetas cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .comparison-card");
  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });
});