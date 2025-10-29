// Resaltar item activo
document.querySelectorAll(".sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// Toggle modo oscuro
const toggleBtn = document.getElementById("toggle-theme");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Cambia el ícono
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

