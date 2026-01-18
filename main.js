gsap.registerPlugin(ScrollTrigger);

const scrollGallery = document.querySelector(".scroll-gallery");
const photos = gsap.utils.toArray(".scroll-photo");
const text1 = document.querySelector(".floating-text");
const text2 = document.querySelector(".floating-text-2");

if (scrollGallery && photos.length > 0) {
  
  // 1. Configuración Inicial de FOTOS
  gsap.set(photos, { opacity: 0, zIndex: 1 });
  gsap.set(photos[0], { opacity: 1, zIndex: 2 });
  
  // 2. Configuración Inicial de TEXTOS (Centrado Perfecto)
  // Usamos left/top 50% y xPercent/yPercent -50 para un centrado a prueba de balas
  gsap.set([text1, text2], { 
      left: "50%", 
      top: "50%", 
      xPercent: -50, 
      yPercent: -50, 
      opacity: 0, 
      scale: 0.5,
      position: "absolute" // Aseguramos position absolute desde JS
  }); 

  // 3. Línea de Tiempo
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollGallery,
      start: "top top",
      end: () => "+=" + (photos.length * 100) + "%", 
      scrub: 1, // Un poco más de suavidad
      pin: true,
    },
  });

  // 4. El Bucle
  photos.forEach((photo, i) => {
    if (i === 0) return; 

    const prevPhoto = photos[i - 1];

    // Transición de fotos
    tl.to(prevPhoto, { opacity: 0, duration: 2 })
      .to(photo, { opacity: 1, zIndex: 2, duration: 2 }, "<");

    // --- CONTROL DE TEXTOS ---
    
    // Foto 2 (i=1): Aparece Text 1
    if (i === 1) {
       tl.to(text1, { opacity: 1, scale: 1.2, duration: 2.5, ease: "power2.out" }, "<");
    }

    // Foto 3 (i=2): Se va Text 1
    if (i === 2) {
       tl.to(text1, { opacity: 0, scale: 0.5, duration: 2, ease: "power2.in" }, "<");
    }

    // Foto 4 (i=3): Aparece Text 2
    if (i === 3) {
       tl.to(text2, { opacity: 1, scale: 1.2, duration: 2.5, ease: "power2.out" }, "<");
    }
    if (i === 5) {
      tl.to(text2, { opacity: 0, scale: 0.5, duration: 2, ease: "power2.in" }, "<");
   }

  });
}