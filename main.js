// Registrar plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Seleccionar elementos
const scrollGallery = document.querySelector(".scroll-gallery");
const photos = gsap.utils.toArray(".scroll-photo");
const text1 = document.querySelector(".floating-text");
const text2 = document.querySelector(".floating-text-2");

if (scrollGallery && photos.length > 0) {
    // Asegurar que haya suficiente altura para scrollear (además del pin)
    scrollGallery.style.minHeight = `${Math.max(3, photos.length + 1) * 100}vh`;

    // Configuración inicial: solo la primera foto visible
    gsap.set(photos, { opacity: 0, zIndex: 1, z: 0, scale: 1, transformOrigin: "50% 50%", force3D: true });
    gsap.set(photos[0], { opacity: 1, zIndex: 2 });

    // Configuración inicial de textos (centrado perfecto)
    if (text1 || text2) {
        gsap.set([text1, text2], {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.6,
            force3D: true
        });
    }

    // Crear timeline con ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: scrollGallery,
            start: "top top",
            end: () => `+=${photos.length * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    // Transiciones entre fotos
    photos.forEach((photo, i) => {
        if (i === 0) return;

        const prevPhoto = photos[i - 1];

        // Foto anterior: sale hacia el usuario (eje Z) y se desvanece
        // Foto actual: aparece al mismo tiempo (sin botones, ligado al scroll)
        tl.to(prevPhoto, {
            zIndex: 1,
            z: 450,
            scale: 1.08,
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut"
        })
        .fromTo(photo,
            { zIndex: 2, opacity: 0, z: -150, scale: 0.98 },
            { opacity: 1, z: 0, scale: 1, duration: 1.5, ease: "power2.inOut" },
            "<"
        );

        // Textos flotantes (en algunas fotos)
        // Nota: índices empiezan en 0. Ajustá si querés que aparezcan en otras.
        if (i === 1 && text1) {
            tl.to(text1, { opacity: 1, scale: 1.1, duration: 1.2, ease: "power2.out" }, "<");
        }
        if (i === 2 && text1) {
            tl.to(text1, { opacity: 0, scale: 0.7, duration: 1.0, ease: "power2.in" }, "<");
        }
        if (i === 4 && text2) {
            tl.to(text2, { opacity: 1, scale: 1.1, duration: 1.2, ease: "power2.out" }, "<");
        }
        if (i === 7 && text2) {
            tl.to(text2, { opacity: 0, scale: 0.7, duration: 1.0, ease: "power2.in" }, "<");
        }
    });
}