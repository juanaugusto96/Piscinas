// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Seleccionar elementos de la galería
const scrollGallery = document.querySelector(".scroll-gallery");
const photos = document.querySelectorAll(".scroll-photo");

if (scrollGallery && photos.length > 0) {
  // Estado inicial: solo la primera foto visible
  gsap.set(photos, { opacity: 0 });
  gsap.set(photos[0], { opacity: 1 });

  // Timeline principal ligado al scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollGallery,
      start: "top top",
      end: "+=200%",
      scrub: 1,
      pin: true,
    },
  });

  // Transiciones encadenadas entre fotos
  if (photos[1]) {
    tl.to(photos[0], { opacity: 0 })
      .to(photos[1], { opacity: 1 }, "<");
  }
  if (photos[2]) {
    tl.to(photos[1], { opacity: 0 })
      .to(photos[2], { opacity: 1 }, "<");
  }
}
