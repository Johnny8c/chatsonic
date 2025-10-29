// ===== ANIMACIONES Y EFECTOS ESPECIALES PARA CONCLUSIONES.HTML =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las animaciones
    initScrollAnimations();
    initHoverEffects();
    initParallaxEffect();
    initTypewriterEffect();
    initProgressBars();
    initInteractiveCards();
});

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Efecto adicional para las tarjetas de comparación
                if (entry.target.classList.contains('comparison-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 200);
                }
                
                // Efecto de aparición escalonada para listas
                if (entry.target.classList.contains('feature-list')) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observar elementos con clases de animación
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .comparison-card, .feature-list'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== EFECTOS HOVER MEJORADOS =====
function initHoverEffects() {
    const cards = document.querySelectorAll('.comparison-card, .card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.zIndex = '10';
            
            // Efecto de brillo
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            glow.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, rgba(99, 94, 242, 0.1) 0%, transparent 70%);
                border-radius: 20px;
                pointer-events: none;
                z-index: -1;
            `;
            this.appendChild(glow);
            
            // Animación de iconos
            const icon = this.querySelector('.ai-header i, .card-header i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.remove();
            }
            
            // Reset iconos
            const icon = this.querySelector('.ai-header i, .card-header i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// ===== EFECTO PARALLAX =====
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ===== EFECTO MÁQUINA DE ESCRIBIR =====
function initTypewriterEffect() {
    const conclusionText = document.querySelector('.conclusion p');
    
    if (conclusionText) {
        const originalText = conclusionText.textContent;
        conclusionText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                conclusionText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        };
        
        // Iniciar cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500);
                observer.unobserve(conclusionText);
            }
        });
        
        observer.observe(conclusionText);
    }
}

// ===== BARRAS DE PROGRESO INTERACTIVAS =====
function initProgressBars() {
    // Crear barras de progreso para mostrar el potencial
    const potentialSection = document.querySelector('.info-section');
    
    if (potentialSection) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.style.cssText = `
            margin-top: 30px;
            padding: 20px;
            background: rgba(0,0,0,0.02);
            border-radius: 15px;
        `;
        
        const progressData = [
            { label: 'Automatización Inteligente', value: 85 },
            { label: 'Educación Personalizada', value: 90 },
            { label: 'Asistencia Creativa', value: 80 }
        ];
        
        progressData.forEach(item => {
            const progressWrapper = document.createElement('div');
            progressWrapper.className = 'progress-wrapper';
            progressWrapper.style.cssText = `
                margin-bottom: 20px;
            `;
            
            const label = document.createElement('div');
            label.className = 'progress-label';
            label.style.cssText = `
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-weight: 600;
                color: #1f2937;
            `;
            
            const labelText = document.createElement('span');
            labelText.textContent = item.label;
            
            const valueText = document.createElement('span');
            valueText.textContent = item.value + '%';
            valueText.style.color = '#10b981';
            
            label.appendChild(labelText);
            label.appendChild(valueText);
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                width: 100%;
                height: 8px;
                background: #e5e7eb;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
            `;
            
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.cssText = `
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, #10b981, #34d399);
                border-radius: 10px;
                transition: width 1.5s ease-in-out;
            `;
            
            progressBar.appendChild(progressFill);
            progressWrapper.appendChild(label);
            progressWrapper.appendChild(progressBar);
            progressContainer.appendChild(progressWrapper);
            
            // Animar cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        progressFill.style.width = item.value + '%';
                    }, 300);
                    observer.unobserve(progressWrapper);
                }
            });
            
            observer.observe(progressWrapper);
        });
        
        potentialSection.querySelector('.card').appendChild(progressContainer);
    }
}

// ===== TARJETAS INTERACTIVAS =====
function initInteractiveCards() {
    const cards = document.querySelectorAll('.comparison-card');
    
    cards.forEach((card, index) => {
        // Añadir efecto de click
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            // Toggle clase activa
            this.classList.toggle('active');
            
            // Efecto de expansión
            if (this.classList.contains('active')) {
                this.style.transform = 'translateY(-15px) scale(1.05)';
                this.style.zIndex = '20';
                
                // Mostrar contenido adicional
                const extraContent = document.createElement('div');
                extraContent.className = 'extra-content';
                extraContent.style.cssText = `
                    margin-top: 20px;
                    padding: 15px;
                    background: rgba(99, 94, 242, 0.05);
                    border-radius: 10px;
                    border-left: 4px solid #635EF2;
                `;
                
                const contents = [
                    'Esta funcionalidad está en desarrollo activo y se espera su implementación completa en los próximos 12 meses.',
                    'La integración con sistemas existentes permitirá una adopción más fluida en entornos empresariales.',
                    'Los prototipos actuales muestran un 95% de precisión en pruebas de laboratorio controladas.'
                ];
                
                extraContent.textContent = contents[index % contents.length];
                this.appendChild(extraContent);
            } else {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
                
                // Remover contenido adicional
                const extraContent = this.querySelector('.extra-content');
                if (extraContent) {
                    extraContent.remove();
                }
            }
        });
    });
}

// ===== ANIMACIÓN DE PARTÍCULAS PARA EL HERO =====
function initParticles() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1});
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
            `;
            
            // Posición inicial aleatoria
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            heroSection.appendChild(particle);
            
            // Animación de flotación
            animateParticle(particle);
        }
    }
}

function animateParticle(particle) {
    const duration = Math.random() * 20 + 10;
    const xMovement = (Math.random() - 0.5) * 100;
    const yMovement = (Math.random() - 0.5) * 100;
    
    particle.animate([
        {
            transform: `translate(0, 0)`,
            opacity: Math.random() * 0.3 + 0.1
        },
        {
            transform: `translate(${xMovement}px, ${yMovement}px)`,
            opacity: Math.random() * 0.3 + 0.1
        }
    ], {
        duration: duration * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}

// Inicializar partículas cuando la página esté cargada
window.addEventListener('load', initParticles);

// ===== EFECTO DE CONFETI AL HACER CLIC EN BOTONES IMPORTANTES =====
function initConfettiEffect() {
    const importantButtons = document.querySelectorAll('.back-button, .card-header');
    
    importantButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('back-button')) {
                createConfetti(e.clientX, e.clientY);
            }
        });
    });
}

function createConfetti(x, y) {
    const colors = ['#635EF2', '#BC6BF2', '#D9529C', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 2px;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            {
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${(Math.random() - 0.5) * 200}px, ${Math.random() * 300 + 100}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Inicializar efecto confetti
initConfettiEffect();