document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    // Cierra el menú al elegir una opción (mejora la experiencia en celular)
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  /* ---------- Header con sombra al hacer scroll ---------- */
  const header = document.getElementById("site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll suave para el botón "Descubrí la receta" ---------- */
  document.querySelectorAll(".js-scroll").forEach((el) => {
    el.addEventListener("click", (e) => {
      const targetId = el.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- Aparición suave de secciones al hacer scroll ---------- */
  const animatedSections = document.querySelectorAll(
    ".presentacion, .receta, .frase, .instagram"
  );

  if ("IntersectionObserver" in window) {
    animatedSections.forEach((section) => section.classList.add("section-fade"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedSections.forEach((section) => observer.observe(section));
  }

  /* ---------- Placeholder elegante mientras no estén las fotos definitivas ----------
     Si images/alfajores-hero.jpg o images/alfajores-2.jpg todavía no existen,
     se muestra un fondo decorativo en su lugar para que la página no se rompa. */
  document.querySelectorAll(".img-frame img").forEach((img) => {
    img.addEventListener("error", () => {
      img.closest(".img-frame")?.classList.add("missing");
    });
  });

  /* Mismo criterio para el logo (images/logo.png): si aún no fue cargado,
     se muestra un círculo simple en su lugar en vez de un ícono roto. */
  document.querySelectorAll(".brand-logo, .hero-logo, .footer-logo").forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("logo-missing");
    });
  });

});
