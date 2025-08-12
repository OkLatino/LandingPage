document.addEventListener('DOMContentLoaded', function () {
    // --- Menú Móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // --- Header dinámico al hacer scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- LÓGICA DE ANIMACIÓN DE CRECIMIENTO DE NEGOCIO ---
    const animationContainer = document.getElementById('process-animation-container');
    if (animationContainer) {
        const ingredients = animationContainer.querySelectorAll('.process-ingredient');
        const stages = animationContainer.querySelectorAll('.business-stage');
        const resultDisplay = animationContainer.querySelector('.result-display');
        let currentStageIndex = 0;
        let isAnimating = false;
        let animationTimeout;

        function resetAnimationState() {
            resultDisplay.style.transition = 'none';
            resultDisplay.style.opacity = '0';
            resultDisplay.style.transform = 'translate(-50%, 50px)';
            ingredients.forEach(ing => {
                ing.style.transition = 'none';
                ing.style.opacity = '0';
                ing.style.transform = 'translate(-50%, -80px)';
            });
            stages.forEach(stage => stage.classList.remove('active'));
            stages[0].classList.add('active');
            currentStageIndex = 0;
            void animationContainer.offsetWidth; // Force reflow
            ingredients.forEach(ing => {
                ing.style.transition = 'opacity 0.5s ease-out, transform 1.5s ease-in-out';
            });
        }

        function runAnimationStep(index) {
            if (!isAnimating) return;
            if (index >= ingredients.length) {
                setTimeout(() => {
                    if (!isAnimating) return;
                    if (stages[currentStageIndex]) {
                        stages[currentStageIndex].classList.remove('active');
                    }
                    resultDisplay.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                    resultDisplay.style.opacity = '1';
                    resultDisplay.style.transform = 'translate(-50%, 0)';
                    setTimeout(() => {
                        if (!isAnimating) return;
                        resultDisplay.style.transition = 'opacity 1.5s ease-in, transform 1.5s ease-in';
                        resultDisplay.style.opacity = '0';
                        resultDisplay.style.transform = 'translate(-50%, -300px)';
                        animationTimeout = setTimeout(startAnimationCycle, 1500);
                    }, 2000);
                }, 1000);
                return;
            }
            const ingredient = ingredients[index];
            setTimeout(() => {
                if (!isAnimating) return;
                ingredient.style.opacity = '1';
                ingredient.style.transform = 'translate(-50%, 150px)';
            }, 100);
            setTimeout(() => {
                if (!isAnimating) return;
                ingredient.style.opacity = '0';
                if (stages[currentStageIndex]) {
                    stages[currentStageIndex].classList.remove('active');
                }
                currentStageIndex++;
                if (stages[currentStageIndex]) {
                    stages[currentStageIndex].classList.add('active');
                }
                runAnimationStep(index + 1);
            }, 2200);
        }

        function startAnimationCycle() {
            if (!isAnimating) return;
            resetAnimationState();
            runAnimationStep(0);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isAnimating) {
                        isAnimating = true;
                        startAnimationCycle();
                    }
                } else {
                    isAnimating = false;
                    clearTimeout(animationTimeout);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(animationContainer);
    }

    // --- Carrusel de Testimonios ---
    const slider = document.getElementById('testimonial-slider');
    const dots = document.querySelectorAll('.testimonial-controls button');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentSlide = 0;
    const totalSlides = slider ? slider.children.length : 0;

    function updateCarousel() {
        if (!slider || totalSlides === 0) return;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlide = parseInt(e.target.dataset.slide);
                updateCarousel();
            })
        });
        setInterval(() => nextBtn.click(), 7000);
        updateCarousel();
    }

    // --- Lógica del Modal de Pago ---
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const serviceButtons = document.querySelectorAll('.service-button');
    const modalPackageName = document.getElementById('modal-package-name');
    const modalPackagePrice = document.getElementById('modal-package-price');

    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageName = button.dataset.package;
            const packagePrice = button.dataset.price;
            modalPackageName.textContent = packageName;
            modalPackagePrice.textContent = packagePrice;
            paymentModal.classList.remove('hidden');
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            paymentModal.classList.add('hidden');
        });
    }

    if (paymentModal) {
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.classList.add('hidden');
            }
        });
    }

    // --- Efecto de toque para tarjetas en móvil ---
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.add('tapped');
        }, { passive: true });
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('tapped');
            }, 150);
        });
    });

    // --- 🎥 FUNCIONALIDAD OPTIMIZADA DEL MODAL DE VIDEO DEL EQUIPO ---
    const teamVideoModal = document.getElementById('team-video-modal');
    const teamVideo = document.getElementById('team-video');
    const modalMemberName = document.getElementById('modal-member-name');
    const closeVideoModalBtn = document.getElementById('close-video-modal');
    const prevMemberBtn = document.getElementById('prev-member-btn');
    const nextMemberBtn = document.getElementById('next-member-btn');
    const playButtons = document.querySelectorAll('.play-btn');
    const memberIndicators = document.querySelectorAll('.member-indicator');
    const videoContainer = document.querySelector('.video-container-modal');
    
    // ✅ Información de los miembros del equipo con rutas corregidas
    const teamMembers = [
        {
            name: 'Saúl Rangel',
            videoSrc: 'assets/V_SAUL.mp4', // ✅ Ruta corregida
        },
        {
            name: 'Pablo Jiménez',
            videoSrc: 'assets/V_PABLO.mp4', // ✅ Ruta corregida
        },
        {
            name: 'Reyna Marín',
            videoSrc: 'assets/V_REINA.mp4', // ✅ Ruta corregida
        }
    ];
    
    let currentMemberIndex = 0;
    let isVideoLoading = false;
    
    // 🔄 Función para mostrar indicador de carga
    function showVideoLoading() {
        isVideoLoading = true;
        if (videoContainer) {
            videoContainer.classList.add('video-loading');
        }
        if (teamVideo) {
            teamVideo.style.opacity = '0.7';
        }
    }
    
    // ✅ Función para ocultar indicador de carga
    function hideVideoLoading() {
        isVideoLoading = false;
        if (videoContainer) {
            videoContainer.classList.remove('video-loading');
        }
        if (teamVideo) {
            teamVideo.style.opacity = '1';
        }
    }
    
    // 🎯 Función optimizada para actualizar el contenido del modal
    function updateModalContent(memberIndex) {
        const member = teamMembers[memberIndex];
        
        console.log(`🎬 Cargando video para: ${member.name}`);
        console.log(`📁 Ruta del video: ${member.videoSrc}`);
        
        // Mostrar indicador de carga
        showVideoLoading();
        
        // ✅ Actualizar nombre en BLANCO
        if (modalMemberName) {
            modalMemberName.textContent = member.name;
            modalMemberName.style.color = '#ffffff'; // Forzar color blanco
        }
        
        // Pausar y actualizar video
        if (teamVideo) {
            teamVideo.pause();
            teamVideo.src = member.videoSrc;
            teamVideo.load(); // Forzar recarga del video
        }
        
        // Actualizar indicadores
        memberIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === memberIndex);
        });
        
        // Actualizar botones de navegación
        if (prevMemberBtn) {
            prevMemberBtn.disabled = memberIndex === 0;
            prevMemberBtn.style.opacity = memberIndex === 0 ? '0.4' : '1';
        }
        if (nextMemberBtn) {
            nextMemberBtn.disabled = memberIndex === teamMembers.length - 1;
            nextMemberBtn.style.opacity = memberIndex === teamMembers.length - 1 ? '0.4' : '1';
        }
        
        currentMemberIndex = memberIndex;
        
        // 🎥 Manejar eventos de carga del video
        const handleVideoLoaded = () => {
            hideVideoLoading();
            console.log(`✅ Video cargado exitosamente: ${member.name}`);
            
            // Auto-play después de cargar
            setTimeout(() => {
                if (teamVideo) {
                    teamVideo.play().catch(e => {
                        console.log('⚠️ Auto-play bloqueado por el navegador:', e);
                    });
                }
            }, 300);
        };
        
        const handleVideoError = (error) => {
            hideVideoLoading();
            console.error(`❌ Error cargando video de ${member.name}:`, error);
            console.error(`📁 Ruta problemática: ${member.videoSrc}`);
            
            // Mostrar mensaje de error elegante
            if (videoContainer) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'video-error-message';
                errorMsg.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(239, 68, 68, 0.95);
                    color: white;
                    text-align: center;
                    font-size: 16px;
                    z-index: 100;
                    padding: 20px 25px;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
                    backdrop-filter: blur(10px);
                    max-width: 300px;
                `;
                errorMsg.innerHTML = `
                    <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                    <strong>Error cargando video</strong><br>
                    <small style="opacity: 0.9; font-size: 14px;">Verificando: ${member.videoSrc}</small>
                `;
                
                videoContainer.style.position = 'relative';
                videoContainer.appendChild(errorMsg);
                
                // Limpiar mensaje después de 8 segundos
                setTimeout(() => {
                    if (errorMsg.parentNode) {
                        errorMsg.parentNode.removeChild(errorMsg);
                    }
                }, 8000);
            }
        };
        
        // Event listeners para el video
        if (teamVideo) {
            teamVideo.addEventListener('loadeddata', handleVideoLoaded, { once: true });
            teamVideo.addEventListener('error', handleVideoError, { once: true });
            
            // Timeout de seguridad
            setTimeout(() => {
                if (isVideoLoading) {
                    console.warn(`⏰ Timeout cargando video de ${member.name}`);
                    hideVideoLoading();
                }
            }, 12000); // 12 segundos timeout
        }
    }
    
    // 🚀 Función para abrir el modal
    function openVideoModal(memberIndex) {
        if (teamVideoModal) {
            // Añadir clase para optimización de videos verticales
            teamVideoModal.querySelector('.video-modal-content').classList.add('vertical-video-optimized');
            
            updateModalContent(memberIndex);
            teamVideoModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
            
            // Focus en el modal para accesibilidad
            teamVideoModal.focus();
            
            console.log(`🎯 Modal abierto para: ${teamMembers[memberIndex].name}`);
        }
    }
    
    // ❌ Función para cerrar el modal
    function closeVideoModal() {
        if (teamVideoModal) {
            teamVideoModal.classList.add('hidden');
        }
        document.body.style.overflow = ''; // Restaurar scroll del body
        
        if (teamVideo) {
            teamVideo.pause();
            teamVideo.currentTime = 0;
        }
        
        hideVideoLoading();
        
        // Limpiar cualquier mensaje de error
        if (videoContainer) {
            const errorMsgs = videoContainer.querySelectorAll('.video-error-message');
            errorMsgs.forEach(msg => msg.remove());
        }
        
        console.log('❌ Modal cerrado');
    }
    
    // ⬅️ Función para ir al miembro anterior
    function goToPreviousMember() {
        if (currentMemberIndex > 0) {
            console.log(`⬅️ Navegando al miembro anterior: ${currentMemberIndex - 1}`);
            updateModalContent(currentMemberIndex - 1);
        }
    }
    
    // ➡️ Función para ir al siguiente miembro
    function goToNextMember() {
        if (currentMemberIndex < teamMembers.length - 1) {
            console.log(`➡️ Navegando al siguiente miembro: ${currentMemberIndex + 1}`);
            updateModalContent(currentMemberIndex + 1);
        }
    }
    
    // 🎬 Event listeners para los botones de play
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const memberIndex = parseInt(button.dataset.member);
            console.log(`🎯 Click en botón play para miembro ${memberIndex} (${teamMembers[memberIndex]?.name})`);
            openVideoModal(memberIndex);
        });
    });
    
    // ❌ Event listener para cerrar el modal
    if (closeVideoModalBtn) {
        closeVideoModalBtn.addEventListener('click', closeVideoModal);
    }
    
    // 🔄 Event listeners para navegación
    if (prevMemberBtn) {
        prevMemberBtn.addEventListener('click', goToPreviousMember);
    }
    
    if (nextMemberBtn) {
        nextMemberBtn.addEventListener('click', goToNextMember);
    }
    
    // 🎯 Event listeners para los indicadores
    memberIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log(`🎯 Click en indicador ${index}`);
            updateModalContent(index);
        });
    });
    
    // 🖱️ Cerrar modal al hacer click fuera de él
    if (teamVideoModal) {
        teamVideoModal.addEventListener('click', (e) => {
            if (e.target === teamVideoModal) {
                closeVideoModal();
            }
        });
    }
    
    // ⌨️ Controles de teclado optimizados
    document.addEventListener('keydown', (e) => {
        if (teamVideoModal && !teamVideoModal.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    e.preventDefault();
                    closeVideoModal();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPreviousMember();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNextMember();
                    break;
                case ' ': // Spacebar para pausar/reproducir
                    e.preventDefault();
                    if (teamVideo) {
                        if (teamVideo.paused) {
                            teamVideo.play();
                            console.log('▶️ Video reproducido con spacebar');
                        } else {
                            teamVideo.pause();
                            console.log('⏸️ Video pausado con spacebar');
                        }
                    }
                    break;
                case 'f': // F para fullscreen
                case 'F':
                    e.preventDefault();
                    if (teamVideo) {
                        if (teamVideo.requestFullscreen) {
                            teamVideo.requestFullscreen();
                        }
                    }
                    break;
            }
        }
    });
    
    // 📱 Prevenir el scroll del cuerpo cuando el modal está abierto
    if (teamVideoModal) {
        teamVideoModal.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
    
    // 🔄 Manejar orientación en móviles para videos verticales
    window.addEventListener('orientationchange', () => {
        if (teamVideoModal && !teamVideoModal.classList.contains('hidden')) {
            setTimeout(() => {
                console.log('📱 Reajustando video después de cambio de orientación');
                if (teamVideo) {
                    // Reajustar dimensiones después del cambio de orientación
                    teamVideo.style.maxHeight = window.innerHeight * 0.7 + 'px';
                    
                    // Recentrar el modal
                    const modalContent = teamVideoModal.querySelector('.video-modal-content');
                    if (modalContent) {
                        modalContent.style.maxHeight = window.innerHeight * 0.95 + 'px';
                    }
                }
            }, 300); // Esperar a que termine la animación de orientación
        }
    });
    
    // 🔧 Función pública para configurar las rutas de video (mantener compatibilidad)
    window.setTeamVideoSources = function(saulVideo, pabloVideo, reynaVideo) {
        teamMembers[0].videoSrc = saulVideo;
        teamMembers[1].videoSrc = pabloVideo;
        teamMembers[2].videoSrc = reynaVideo;
        console.log('📁 Rutas de video actualizadas mediante función externa:', teamMembers);
    };
    
    // 📱 Mejorar la experiencia táctil en móviles
    playButtons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            button.style.transform = 'translate(-50%, -50%) scale(0.95)';
            console.log('📱 Touch start en botón play');
        }, { passive: false });
        
        button.addEventListener('touchend', (e) => {
            e.stopPropagation();
            button.style.transform = 'translate(-50%, -50%) scale(1)';
        }, { passive: false });
    });
    
    // 🐛 Debug: Verificar configuración al cargar
    console.log('🎬 ===== SISTEMA DE VIDEOS DEL EQUIPO INICIALIZADO =====');
    console.log('📁 Rutas de videos configuradas:', teamMembers);
    console.log('🎯 Botones de play encontrados:', playButtons.length);
    console.log('🔘 Indicadores encontrados:', memberIndicators.length);
    console.log('🎥 Modal de video:', teamVideoModal ? 'Encontrado' : 'NO ENCONTRADO');
    console.log('📺 Elemento de video:', teamVideo ? 'Encontrado' : 'NO ENCONTRADO');
    
    // Verificar si las rutas son válidas
    teamMembers.forEach((member, index) => {
        if (member.videoSrc && member.videoSrc !== '') {
            console.log(`✅ Miembro ${index}: ${member.name} - Video: ${member.videoSrc}`);
        } else {
            console.warn(`⚠️ Miembro ${index}: ${member.name} - SIN VIDEO CONFIGURADO`);
        }
    });

    // --- INICIALIZACIÓN DE GSAP Y LENIS ---

    // 1. INICIALIZACIÓN DE LENIS (SCROLL SUAVE)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integración de Lenis con los enlaces de ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId !== '#') {
                const headerOffset = document.querySelector('.header').offsetHeight;
                lenis.scrollTo(targetId, { offset: -headerOffset });
            }
            // Cierra el menú móvil si está abierto
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        });
    });

    // 2. INICIALIZACIÓN DE GSAP (ANIMACIONES)
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada para el Hero
    const heroContent = document.querySelector("#hero-content");
    if (heroContent) {
        gsap.from(heroContent.children, {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5
        });
    }

    // Animación genérica de aparición para secciones
    const fadeUpElements = document.querySelectorAll(".gsap-fade-up");
    fadeUpElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: el.style.getPropertyValue("--stagger-delay") || 0
        });
    });

    // Animación escalonada para las tarjetas de servicios
    gsap.to(".service-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
    });
});