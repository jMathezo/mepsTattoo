/* ============================================================
   MEPS Tattoo — interações
   ============================================================ */

(function () {
  "use strict";

  var WHATSAPP_URL = "https://wa.me/5517981296909";

  /* ---------- Header: estado de scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Tema escuro ---------- */
  var themeRoot = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var storedTheme = localStorage.getItem("meps-theme");

  function applyTheme(dark) {
    themeRoot.classList.toggle("dark", dark);
    themeToggle.setAttribute("aria-pressed", dark ? "true" : "false");
    localStorage.setItem("meps-theme", dark ? "dark" : "light");
  }

  var prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(storedTheme ? storedTheme === "dark" : prefersDark);

  themeToggle.addEventListener("click", function () {
    applyTheme(!themeRoot.classList.contains("dark"));
  });

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Galeria ---------- */
  var galleryImages = [
    "assets/images/tattoo1.jpg",
    "assets/images/tattooAnime.jpg",
    "assets/images/tattooCanela.jpg",
    "assets/images/tattooCranio.jpg",
    "assets/images/tattooDragao.jpg",
    "assets/images/tattooFullmetal.jpg",
    "assets/images/tattooJustica.jpg",
    "assets/images/tattooPoseidon.jpg",
    "assets/images/tattooSol.jpg",
    "assets/images/tattoPokemon.jpg",
    "assets/images/esqueletoFlorido.jpg",
  ];

  var gallery = document.getElementById("gallery");
  gallery.innerHTML = galleryImages
    .map(function (src, index) {
      return (
        '<button type="button" class="gallery-tile" data-index="' + index + '" aria-label="Visualizar foto ' + (index + 1) + '">' +
        '<img src="' + src + '" alt="Trabalho da MEPS Tattoo" loading="lazy">' +
        "</button>"
      );
    })
    .join("");

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCount = document.getElementById("lightboxCount");
  var current = 0;

  function openLightbox(index) {
    current = index;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  function updateLightbox() {
    var img = galleryImages[current];
    lightboxImg.src = img;
    lightboxImg.alt = "Trabalho da MEPS Tattoo";
    lightboxCount.textContent = (current + 1) + " / " + galleryImages.length;
    document.querySelector(".lightbox-prev").style.display = galleryImages.length > 1 ? "" : "none";
    document.querySelector(".lightbox-next").style.display = galleryImages.length > 1 ? "" : "none";
  }

  function showImage(offset) {
    current = (current + offset + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }

  gallery.addEventListener("click", function (event) {
    var tile = event.target.closest(".gallery-tile");
    if (tile) openLightbox(Number(tile.dataset.index));
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  var lightboxClose = document.querySelector(".lightbox-close");
  lightboxClose.addEventListener("click", closeLightbox);

  var lightboxPrev = document.querySelector(".lightbox-prev");
  var lightboxNext = document.querySelector(".lightbox-next");
  lightboxPrev.addEventListener("click", function (event) {
    event.stopPropagation();
    showImage(-1);
  });
  lightboxNext.addEventListener("click", function (event) {
    event.stopPropagation();
    showImage(1);
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(-1);
    if (event.key === "ArrowRight") showImage(1);
  });

  /* ---------- Formulário -> WhatsApp ---------- */
  var form = document.getElementById("quoteForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = form.elements.nome.value.trim();
    var estilo = form.elements.estilo.value;
    var local = form.elements.local.value.trim();
    var ideia = form.elements.ideia.value.trim();

    var linhas = [];
    linhas.push("Olá, MEPS! Quero fazer um orçamento.");
    if (nome) linhas.push("\n*Nome:* " + nome);
    if (estilo) linhas.push("*Estilo:* " + estilo);
    if (local) linhas.push("*Local do corpo:* " + local);
    if (ideia) linhas.push("\n*Minha ideia:*\n" + ideia);

    var msg = linhas.join("\n");
    window.open(WHATSAPP_URL + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });

  /* ---------- Ano do rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();