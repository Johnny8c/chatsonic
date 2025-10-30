/* ============================================
   parte3.js — Aplicaciones Prácticas
   (Joel) – Efectos suaves sin dependencias
   - Toggle de tema con persistencia (si no existe ya)
   - Revelar tarjetas al hacer scroll (IntersectionObserver)
   - Botón “Copiar prompt” en bloques de comparación
   Todo namescapeado en window.P3 para evitar colisiones.
============================================ */

(function () {
  const P3 = (window.P3 = window.P3 || {});

  /* -------------------------------
     Utils
  --------------------------------*/
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* -------------------------------
     1) Tema claro/oscuro con persistencia
     - Si otro script ya maneja el tema, esto solo respeta localStorage e icono.
  --------------------------------*/
  P3.initTheme = function initTheme() {
    try {
      const saved = localStorage.getItem("theme");
      const body = document.body;
      const btn = $("#toggle-theme");
      if (saved === "dark") body.classList.add("dark");
      if (saved === "light") body.classList.remove("dark");

      // Sync icono (luna/sol)
      if (btn) {
        const i = btn.querySelector("i");
        if (i) i.className = body.classList.contains("dark") ? "fas fa-sun" : "fas fa-moon";
        btn.addEventListener("click", () => {
          body.classList.toggle("dark");
          const nowDark = body.classList.contains("dark");
          localStorage.setItem("theme", nowDark ? "dark" : "light");
          if (i) i.className = nowDark ? "fas fa-sun" : "fas fa-moon";
        });
      }
    } catch (e) {
      // Si falla localStorage, continuamos sin persistir
      console.warn("[P3] No se pudo acceder a localStorage:", e);
    }
  };

  /* -------------------------------
     2) Revelado al hacer scroll
     - Aplica .is-visible a tarjetas/sections al entrar en viewport
     - Reutiliza clases existentes de parte4.css + parte3.css
  --------------------------------*/
  P3.initScrollReveal = function initScrollReveal() {
    const revealTargets = $$(
      ".section-container, .advantage-card, .comparison-table, .final-conclusion"
    );

    // Aplica estado inicial
    revealTargets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = "opacity .45s ease, transform .45s ease";
    });

    const onIntersect = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.unobserve(el);
        }
      });
    };

    // Fallback simple si IntersectionObserver no existe
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((el, idx) =>
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 80 * idx)
      );
      return;
    }

    const io = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    });

    revealTargets.forEach((el) => io.observe(el));
  };

  /* -------------------------------
     3) Botón “Copiar prompt” en bloques .comparison-intro
     - Toma el texto principal del párrafo y lo copia al portapapeles
  --------------------------------*/
  P3.initCopyPrompt = function initCopyPrompt() {
    const blocks = $$(".comparison-intro");
    if (!blocks.length) return;

    blocks.forEach((box) => {
      // Evitar duplicados si el script corre dos veces
      if (box.querySelector(".p3-copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "p3-copy-btn";
      btn.type = "button";
      btn.style.cssText =
        "margin-top:10px;padding:8px 12px;border-radius:10px;border:1px solid var(--p3-border);background:var(--p3-card-bg);cursor:pointer;font-weight:700;";
      btn.innerHTML = '<i class="fas fa-copy" style="margin-right:6px"></i>Copiar prompt';

      btn.addEventListener("click", async () => {
        // Extrae el texto del primer <p> dentro del bloque
        const p = $("p", box);
        const text = p ? p.innerText.replace(/^Prompt útil:\s*/i, "") : box.innerText;
        try {
          await navigator.clipboard.writeText(text.trim());
          btn.innerHTML = '<i class="fas fa-check" style="margin-right:6px"></i>¡Copiado!';
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy" style="margin-right:6px"></i>Copiar prompt';
          }, 1500);
        } catch (e) {
          console.warn("[P3] No se pudo copiar:", e);
          // Fallback
          const ta = document.createElement("textarea");
          ta.value = text.trim();
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          btn.innerHTML = '<i class="fas fa-check" style="margin-right:6px"></i>¡Copiado!';
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy" style="margin-right:6px"></i>Copiar prompt';
          }, 1500);
        }
      });

      box.appendChild(btn);
    });
  };

  /* -------------------------------
     4) Marcar activo en sidebar (seguridad)
     - Garantiza que “Aplicaciones Prácticas” quede seleccionado
  --------------------------------*/
  P3.ensureActiveSidebar = function ensureActiveSidebar() {
    const items = $$(".sidebar li[data-page]");
    items.forEach((li) => li.classList.remove("active"));
    const current = $('.sidebar li[data-page="aplicaciones"]');
    if (current) current.classList.add("active");
  };

  /* -------------------------------
     Init
  --------------------------------*/
  document.addEventListener("DOMContentLoaded", () => {
    P3.initTheme();
    P3.initScrollReveal();
    P3.initCopyPrompt();
    P3.ensureActiveSidebar();
  });
})();
