gsap.registerPlugin(ScrollTrigger);

// Seleccionar elementos
const scrollGallery = document.querySelector(".scroll-gallery");
const photos = gsap.utils.toArray(".scroll-photo");
const text1 = document.querySelector(".floating-text");
const text2 = document.querySelector(".floating-text-2");

if (scrollGallery && photos.length > 0) {
    // Asegurar altura
    scrollGallery.style.minHeight = `${Math.max(3, photos.length + 1) * 100}vh`;

    // Configuración inicial de FOTOS
    gsap.set(photos, { opacity: 0, zIndex: 1, z: 0, scale: 1, transformOrigin: "50% 50%", force3D: true });
    gsap.set(photos[0], { opacity: 1, zIndex: 2 });

    // Configuración inicial de TEXTOS
    if (text1 || text2) {
        gsap.set([text1, text2], {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.8, // Empezamos un poco más grandes para que el efecto sea más sutil
            force3D: true
        });
    }

    // Timeline principal
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: scrollGallery,
            start: "top top",
            end: () => `+=${photos.length * 100}%`,
            scrub: 1.5, // Aumenté un poco el scrub para que sea más suave al frenar
            pin: true,
            anticipatePin: 1
        }
    });

    // Bucle de animaciones
    photos.forEach((photo, i) => {
        if (i === 0) return;

        const prevPhoto = photos[i - 1];

        // --- ANIMACIÓN DE FOTOS ---
        tl.to(prevPhoto, {
            zIndex: 1,
            z: 450, // Efecto 3D hacia el usuario
            opacity: 0,
            duration: 2, // Duración más larga para suavidad
            ease: "power2.inOut"
        })
        .fromTo(photo,
            { zIndex: 2, opacity: 0, z: -150, scale: 0.95 }, // Scale sutilmente menor
            { opacity: 1, z: 0, scale: 1, duration: 2, ease: "power2.inOut" },
            "<" // Empieza exactamente al mismo tiempo que la anterior se va
        );

        // --- ANIMACIÓN DE TEXTOS (Corrección del parpadeo) ---
        
        // 1. TEXTO "Lucas Martin Maidana"
        // Aparece en la Foto 2 (índice 1)
        if (i === 1 && text1) {
            tl.to(text1, { 
                opacity: 1, 
                scale: 1.1, 
                duration: 2, 
                ease: "power2.out",
                overwrite: "auto" // CLAVE: Mata animaciones previas
            }, "<+=0.1"); // Pequeño delay para no chocar con el inicio de la foto
        }
        
        // Desaparece al pasar a la Foto 3 (índice 2)
        if (i === 2 && text1) {
            tl.to(text1, { 
                opacity: 0, 
                scale: 0.8, 
                duration: 1.5, // Un poco más rápido que la foto para irse limpio
                ease: "power2.in",
                overwrite: "auto"
            }, "<"); // Se va junto con la foto
        }

        // 2. TEXTO "Presupuesto Sin Cargo"
        // Aparece en la Foto 5 (índice 4) - Ojo, ajusta este índice según dónde quieras que salga
        // En tu HTML, la foto 5 es el Grid de la derecha, o la siguiente. 
        // Si quieres que salga en el Grid, usa el índice correcto (el grid es un solo elemento .scroll-photo)
        if (i === 4 && text2) {
            tl.to(text2, { 
                opacity: 1, 
                scale: 1.1, 
                duration: 2, 
                ease: "power2.out",
                overwrite: "auto"
            }, "<+=0.1");
        }
        
        // Desaparece al pasar a la siguiente
        if (i === 5 && text2) {
            tl.to(text2, { 
                opacity: 0, 
                scale: 0.8, 
                duration: 1.5, 
                ease: "power2.in",
                overwrite: "auto"
            }, "<");
        }
    });
}