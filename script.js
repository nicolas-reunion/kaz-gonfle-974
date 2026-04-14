const structures = {
    zoli: [
        'assets/zoli_ciel_main.jpg',
        'assets/zoli_ciel_1.jpg',
        'assets/zoli_ciel_2.jpg',
        'assets/zoli_ciel_3.jpg'
    ]
};

function openLightbox(id) {
    const lightbox = document.getElementById('lightbox');
    const scrollContainer = document.getElementById('lightboxScroll');
    const images = structures[id];
    
    if (!images) return;
    
    scrollContainer.innerHTML = images.map(src => `<img src="${src}" alt="Gallery Image">`).join('');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 120, // Updated offset for large header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Contact Form
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#25d366';
                    formStatus.innerText = 'Merci ! Votre demande a bien été envoyée.';
                    submitBtn.innerText = 'Envoyé !';
                    contactForm.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                formStatus.style.display = 'block';
                formStatus.style.color = '#ff4444';
                formStatus.innerText = 'Oups ! Une erreur est survenue. Veuillez réessayer.';
                submitBtn.innerText = 'Réessayer';
            } finally {
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }

    // 4. Modal T&C
    const termsLink = document.getElementById('termsLink');
    const termsModal = document.getElementById('termsModal');
    const closeModal = document.getElementById('closeModal');

    if (termsLink && termsModal) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        });
        closeModal.addEventListener('click', () => {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // 5. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .step-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});
