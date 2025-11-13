// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== NUEVA FUNCIONALIDAD: Animación de números del proceso ===== 
const timelineMarkers = document.querySelectorAll('.timeline-marker');
const timelineItems = document.querySelectorAll('.timeline-item');

// Función para activar/desactivar números según el scroll
const animateTimelineNumbers = () => {
    const isMobile = window.innerWidth <= 768;
    
    timelineItems.forEach((item, index) => {
        const marker = item.querySelector('.timeline-marker');
        if (!marker) return;
        
        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top;
        const itemBottom = itemRect.bottom;
        const windowHeight = window.innerHeight;
        
        let shouldActivate = false;
        
        if (isMobile) {
            // En mobile: activar cuando el item entre en el viewport desde arriba
            shouldActivate = itemTop < windowHeight - 200;
        } else {
            // En desktop: activar cuando el item esté visible en el viewport
            // Más tolerante - activa cuando el item está entre 20% y 80% del viewport
            const activationTop = windowHeight * 0.2;
            const activationBottom = windowHeight * 0.8;
            
            shouldActivate = itemTop < activationBottom && itemBottom > activationTop;
        }
        
        if (shouldActivate) {
            marker.classList.add('active');
        } else if (!isMobile) {
            // En desktop, desactivar cuando salga del rango
            marker.classList.remove('active');
        }
        // En mobile, mantener activo una vez alcanzado
    });
};

// Ejecutar inmediatamente al cargar la página
const initTimelineAnimation = () => {
    // Esperar un momento para que el DOM esté completamente renderizado
    setTimeout(() => {
        animateTimelineNumbers();
    }, 100);
};

// Ejecutar en scroll, carga y resize
window.addEventListener('scroll', animateTimelineNumbers);
window.addEventListener('load', initTimelineAnimation);
window.addEventListener('resize', animateTimelineNumbers);

// También ejecutar cuando el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimelineAnimation);
} else {
    initTimelineAnimation();
}

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Parallax Effect for Video
const videoParallax = document.querySelector('.parallax-video');

if (videoParallax) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const videoSection = document.querySelector('.video-parallax');
        
        if (videoSection) {
            const videoTop = videoSection.offsetTop;
            const videoHeight = videoSection.offsetHeight;
            
            if (scrolled > videoTop - window.innerHeight && scrolled < videoTop + videoHeight) {
                const parallaxValue = (scrolled - videoTop) * 0.5;
                videoParallax.style.transform = `translate(-50%, calc(-50% + ${parallaxValue}px))`;
            }
        }
    });
}

// Hero Video Background Effect
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight) * 0.5;
            heroVideo.style.opacity = opacity;
        }
    });
}

// Timeline Animation on Scroll
const timelineItemsAnim = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

timelineItemsAnim.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    timelineObserver.observe(item);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Gallery Lightbox Effect
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${imgSrc}" alt="Gallery Image">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add styles dynamically
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.color = '#D2691E';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.color = 'white';
        });
        
        closeBtn.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            }
        });
    });
});

// Add keyframe animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Testimonials Carousel Auto-scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function highlightTestimonial() {
    testimonialCards.forEach((card, index) => {
        if (index === currentTestimonial) {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 20px 60px rgba(210, 105, 30, 0.3)';
        } else {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        }
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Auto-rotate testimonials every 5 seconds
if (testimonialCards.length > 0) {
    setInterval(highlightTestimonial, 5000);
}

// Form Input Animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('label').style.color = 'var(--accent-color)';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.querySelector('label').style.color = 'var(--primary-color)';
        }
    });
});

// Performance Optimization: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedReveal = debounce(revealOnScroll);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedReveal);

// Console welcome message
console.log('%c¡Bienvenido a Tashi Cerámica!', 'color: #D2691E; font-size: 20px; font-weight: bold;');
console.log('%cMás que una botella, creamos arte', 'color: #8B4513; font-size: 14px; font-style: italic;');

// Logo interactions
const navLogo = document.querySelector('.logo-interactive');
const sectionBadges = document.querySelectorAll('.logo-section-badge');
const accentLogos = document.querySelectorAll('.logo-accent-small');

// Nav logo click - scroll to top
if (navLogo) {
    navLogo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Section badges - add bounce effect on scroll into view
const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'bounce-in 0.8s ease-out';
        }
    });
}, { threshold: 0.5 });

sectionBadges.forEach(badge => {
    badgeObserver.observe(badge);
    
    // Add click interaction
    badge.addEventListener('click', () => {
        badge.style.transform = 'scale(1.3) rotate(720deg)';
        setTimeout(() => {
            badge.style.transform = '';
        }, 600);
    });
});

// Accent logos - wiggle on hover
accentLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'wiggle 0.5s ease-in-out';
    });
    
    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });
});

// Add CSS animations dynamically
const logoAnimations = document.createElement('style');
logoAnimations.textContent = `
    @keyframes bounce-in {
        0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.2) rotate(10deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg) scale(1.1); }
        75% { transform: rotate(10deg) scale(1.1); }
    }
`;
document.head.appendChild(logoAnimations);

// Add entrance animation to hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Interactive hover effects for feature cards
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Progress bar for page scroll
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
        z-index: 10000;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createProgressBar();

/* ===================================
   BUBBLE MENU JAVASCRIPT
   Funcionalidad del menú interactivo
   =================================== */

class BubbleMenu {
    constructor(options = {}) {
        this.isOpen = false;
        this.toggle = document.querySelector('.bubble-menu-toggle');
        this.overlay = document.querySelector('.bubble-menu-overlay');
        this.pills = document.querySelectorAll('.bubble-pill-link');
        this.staggerDelay = options.staggerDelay || 120;
        
        this.init();
    }

    init() {
        if (!this.toggle || !this.overlay) return;

        // Event listener para el botón toggle
        this.toggle.addEventListener('click', () => this.toggleMenu());

        // Event listener para cerrar al hacer click en el overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeMenu();
            }
        });

        // Event listener para cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Event listeners para los links
        this.pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                // Si el href es una ancla interna, cerrar el menú
                const href = pill.getAttribute('href');
                if (href && href.startsWith('#')) {
                    setTimeout(() => this.closeMenu(), 300);
                }
            });
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.toggle.classList.add('open');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animar las pills con stagger
        this.pills.forEach((pill, index) => {
            setTimeout(() => {
                pill.classList.add('show');
            }, index * this.staggerDelay);
        });
    }

    closeMenu() {
        this.isOpen = false;
        this.toggle.classList.remove('open');
        document.body.style.overflow = '';

        // Remover clase show de las pills
        this.pills.forEach(pill => {
            pill.classList.remove('show');
        });

        // Esperar a que termine la animación para ocultar el overlay
        setTimeout(() => {
            this.overlay.classList.remove('active');
        }, 300);
    }
}

// Inicializar el Bubble Menu cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Remover el navbar original si existe
    const originalNav = document.querySelector('.navbar');
    if (originalNav) {
        originalNav.style.display = 'none';
    }

    // Inicializar el bubble menu
    const bubbleMenu = new BubbleMenu({
        staggerDelay: 120 // Delay entre cada burbuja (ms)
    });

    console.log('🫧 Bubble Menu inicializado');
});

// Ajustar rotación en resize para mobile
window.addEventListener('resize', () => {
    const pills = document.querySelectorAll('.bubble-pill-link');
    const isMobile = window.innerWidth < 900;
    
    pills.forEach(pill => {
        if (isMobile) {
            pill.style.setProperty('--rotation', '0deg');
        } else {
            // Restaurar rotación original del atributo data
            const rotation = pill.getAttribute('data-rotation') || '0deg';
            pill.style.setProperty('--rotation', rotation);
        }
    });
});

/* ==================================================
   CARRUSEL INFINITO PARA TESTIMONIOS Y REVIEWS
   ================================================== */

// Función para crear carrusel infinito
function createInfiniteCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container || window.innerWidth > 768) return;
    
    const items = Array.from(container.children);
    if (items.length === 0) return;
    
    // Clonar items para crear efecto infinito
    items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });
    
    // Detectar cuando llega al final y volver al inicio sin animación
    let isScrolling;
    container.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        
        isScrolling = setTimeout(() => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;
            const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(container).gap);
            const totalOriginalWidth = itemWidth * items.length;
            
            // Si llegó al final (mostrando los clones), volver al inicio
            if (currentScroll >= totalOriginalWidth) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = currentScroll - totalOriginalWidth;
                setTimeout(() => {
                    container.style.scrollBehavior = 'smooth';
                }, 50);
            }
            // Si está al inicio y hace scroll hacia atrás, ir al final
            else if (currentScroll <= 0) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = totalOriginalWidth;
                setTimeout(() => {
                    container.style.scrollBehavior = 'smooth';
                }, 50);
            }
        }, 150);
    });
}

// Inicializar carruseles infinitos cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInfiniteCarousels);
} else {
    initInfiniteCarousels();
}

function initInfiniteCarousels() {
    // Solo en móvil
    if (window.innerWidth <= 768) {
        createInfiniteCarousel('.testimonials-carousel');
        createInfiniteCarousel('.reviews-grid');
    }
}

// Reinicializar en resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recargar página si cambia de móvil a desktop o viceversa
        const wasMobile = document.querySelector('.testimonials-carousel').children.length > 3;
        const isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile) {
            location.reload();
        }
    }, 250);
});

/* =========================================================
   BOOT VIDEO DON RAMÓN
   - Fuerza autoplay silencioso
   - Muestra el frame cuando el navegador puede decodificar
   - Registra causa probable si el códec no es compatible
   ========================================================= */
(function () {
  const video = document.querySelector('.video-parallax .parallax-video');
  if (!video) return;

  // Asegura atributos obligatorios para autoplay en todos los navegadores
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.muted = true;

  // Cuando el video tenga frames listos, lo hacemos visible
  const show = () => {
    video.style.opacity = '1';
  };

  video.addEventListener('loadeddata', show, { once: true });
  video.addEventListener('canplay', show, { once: true });

  // Intento de reproducción (autoplay). Si falla, explicamos por consola y habilitamos controles.
  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        // Autoplay ok
        show();
      }).catch((err) => {
        console.warn('[Don Ramón] Autoplay bloqueado o códec no soportado:', err);
        // Si es autoplay bloqueado, con controles el usuario puede iniciar.
        video.setAttribute('controls', '');
        // No desmutear: seguiría bloqueado en varios navegadores.
      });
    }
  };

  // Si hay error de carga/decodificación, lo reportamos (muy típico con MP4 H.265/HEVC en Chrome/Windows)
  video.addEventListener('error', (e) => {
    console.error('[Don Ramón] Error al cargar/decodificar el video. Es muy probable que el códec no sea H.264/AVC.', e);
    video.setAttribute('controls', '');   // deja iniciar manualmente si es posible
  });

  // En algunos navegadores, poner el src dinámico ayuda a inicializar correctamente
  if (!video.currentSrc) {
    const mp4 = video.querySelector('source[type="video/mp4"]');
    if (mp4 && mp4.src) {
      video.src = mp4.src;
    }
  }

  // Arrancamos
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    tryPlay();
  } else {
    document.addEventListener('DOMContentLoaded', tryPlay, { once: true });
  }
})();


console.log('🔄 Carruseles infinitos inicializados para móvil');
console.log('✨ Página web de Tashi Cerámica cargada exitosamente');